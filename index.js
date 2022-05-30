const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9999;
      
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
	console.log("[METHOD]: req.method");
	console.log("[URL]: req.url");
	if (req.method == "POST") {
		console.log("[BODY]", req.body);
	} else {
		console.log("[PARAMS]", req.params);
        }
	next();
})

app.get('/exploit/:flag', (req, res) => {
	return res.status(200);
})

app.post('/exploit', (req, res) => {
	return res.status(200);
})

app.listen(PORT, () => { console.log(`Express sec listen on ${PORT} port`) });
