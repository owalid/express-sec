const express = require('express')
const app = express()

app.use(express.json());
app.use(express.static("public"));

app.get('/exploit/:flag', (req, res) => {
	console.log("[FLAG]", req.params.flag);
	return res.statusCode(200);
})

app.post('/exploit', (req, res) => {
	console.log("[BODY]", req.body);
	return res.statusCode(200);
})

app.listen(9999, () => {console.log("Express sec listen on 9999 port")})

