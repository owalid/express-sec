const express = require('express');
const app = express();
const PORT = 9999;
      
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
	console.log(res.statusCode, req.method, req.url);
	if (req.method == "POST") {
		console.log("[BODY]", req.body);
	}
	next();
})

app.get('/exploit/:flag', (req, res) => {
	console.log("[FLAG]", req.params.flag);
	return res.status(200);
})

app.post('/exploit', (req, res) => {
	return res.status(200);
})

app.listen(PORT, () => { console.log(`Express sec listen on ${PORT} port`) });