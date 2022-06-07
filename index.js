const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;

const decodeParamsBase64 = (params, key) => {
  params_decoded = Buffer.from(params, 'base64')

  if (params_decoded.toString('base64') === params) {
    console.log(`[${key} DECODED]: '${params_decoded}'`)
  }
}
      
app.use(express.json({limit: '50mb'}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
	console.log(`[METHOD]: ${req.method}`);
	console.log(`[URL]: ${req.url}`);
	next();
})

app.get('/exploit/:flag', (req, res) => {
  console.log("[RAW PARAMS]:", req.params);
  for (let key in req.params) {
    decodeParamsBase64(req.params[key], key);
  }
  for (let key in req.query) {
    decodeParamsBase64(req.query[key], key);
  }
	return res.status(200);
})

app.post('/exploit', (req, res) => {
  console.log(req.body)
  for (let key in req.body) {
    decodeParamsBase64(req.body[key], key);
  }
	return res.status(200);
})

app.listen(PORT, () => { console.log(`Express sec listen on ${PORT} port`) });
