const express = require("express");
var bodyParser = require("body-parser");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
// const serverless = require("serverless-http");
const router = express.Router();

app.get("/", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "./credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1Z5G8r7qPYVO-B4cxzVGi2Ob1Mfzg4XNHna-jaxhzi_I";
	// Read rows from spreadsheet

	const getRows = await googleSheets.spreadsheets.values.get({
		spreadsheetId,
		range: `A:C`,
	});
	res.send(getRows.data.values);
});
// updat
app.post("/", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "./credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1Z5G8r7qPYVO-B4cxzVGi2Ob1Mfzg4XNHna-jaxhzi_I";
	let resource = {
		values: [[req.body.userid, req.body.product, req.body.quantity]],
	};
	const append = await googleSheets.spreadsheets.values.append({
		spreadsheetId,
		range: "sheet2",
		resource,
		valueInputOption: "RAW",
	});
	res.send("done");
});
//
app.listen(process.env.PORT || 5300, () => {
	console.log("Server is running");
});
