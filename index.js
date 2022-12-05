const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

const decodeParamsBase64 = (params, key) => {
  params_decoded = Buffer.from(params, 'base64')

  if (params_decoded.toString('base64') === params) {
    console.log(`[${key} BASE64 DECODED]: '${params_decoded}'`)
  }
}

const decodeJWT = (params, key) => {
  const decodeToken = jwt.decode(params)

  if (decodeToken) {
    console.log(`[${key} JWT DECODED]: `, decodeToken)
  }
}

const decodeRouter = (params, key) => {
  if (params.includes('session=')) {
    params = params.split('session=')[1]
  }
  if (params.match(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)) {
    decodeJWT(params, key)
  } else if (params.match(/^@[a-zA-Z0-9+/]+={,2}$/)) {
    decodeParamsBase64(params, key);
  }

}

const color = {
  red: '\033[31m',
  yellow: '\033[33m',
  default: '\033[39m'
}
app.use(express.json({limit: '50mb'}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use((req, _res, next) => {
  console.log()
  console.log(`${color.yellow}# ==================================== #${color.default}`);
	console.log(`${color.red}[IP]${color.default}: ${req.ip}`);
  console.log(`${color.red}[DATE]${color.default}: ${new Date().toISOString()}`);
  console.log(`${color.yellow}# ==================================== #${color.default}`);
	console.log(`${color.red}[METHOD]${color.default}: ${req.method}`);
	console.log(`${color.red}[URL]${color.default}: ${req.url}`);
	console.log(`${color.red}[HEADERS]${color.default}:`, req.headers);
	next();
})

app.get('/exploit/:flag', (req, res) => {
  console.log(`${color.red}[RAW PARAMS]${color.default}:`, req.params);
  console.log(`${color.red}[QUERY]${color.default}:`, req.query);
  for (const key in req.params) {
    decodeRouter(req.params[key], key);
  }
  for (const key in req.query) {
    decodeRouter(req.query[key], key);
  }
	return res.json({}).status(200);
})

app.post('/exploit', (req, res) => {
  console.log(`${color.red}[BODY]${color.default}:`, req.params);
  for (const key in req.body) {
    decodeRouter(req.body[key], key);
  }
	return res.json({}).status(200);
})

app.listen(PORT, () => { console.log(`Express sec listen on ${PORT} port`) });
