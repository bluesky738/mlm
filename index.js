const express = require("express");
var bodyParser = require("body-parser");
const { google } = require("googleapis");
const app = express();
app.use(bodyParser.json());

let data = [];
app.get("/", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// Read rows from spreadsheet
	const getRows = await googleSheets.spreadsheets.values.get({
		spreadsheetId,
		range: `${req.query.table}:${req.query.table}`,
	});
	data = getRows;
	const peopleObjects = getRows.data.values[0];
	const arr = [peopleObjects[0]];
	for (let index = 1; index < peopleObjects.length; index++) {
		arr.push({
			item: peopleObjects[index],
			quantity: peopleObjects[index + 1],
		});
		index++;
	}
	res.send(arr);
});
// update
// update
// update
// update
// update
// update
// update
// update
// update
// update
// update
app.get("/update/quantity", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// get
	const getRows = await googleSheets.spreadsheets.values.get({
		// auth,
		spreadsheetId,
		range: `sheet1!${req.query.table}:${req.query.table}`,
	});
	data = getRows.data.values;
	let index = await data[0].indexOf(req.query.item);
	// console.log(data);
	let val = (await parseInt(data[0][index + 1])) + parseInt(req.query.quantity);
	if (index !== -1) {
		data[0][index + 1] = val;
	} else {
		data[0].push(req.query.item);
		data[0].push(req.query.quantity);
	}
	// get done
	googleSheets.spreadsheets.values.update({
		spreadsheetId,
		range: `${req.query.table}:${req.query.table}`,
		valueInputOption: "USER_ENTERED",
		resource: { values: data },
	});
	res.send(data);
});
// delete
// delete
// delete
app.get("/done", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// get
	const getRows = await googleSheets.spreadsheets.values.get({
		// auth,
		spreadsheetId,
		range: `${req.query.table}:${req.query.table}`,
	});
	data = getRows.data.values;
	data[0].length = 1;
	googleSheets.spreadsheets.values.clear({
		spreadsheetId,
		range: `${req.query.table}:${req.query.table}`,
	});
	// add table
	googleSheets.spreadsheets.values.update({
		spreadsheetId,
		range: `${req.query.table}:${req.query.table}`,
		valueInputOption: "USER_ENTERED",
		resource: { values: data },
	});
	res.send(data);
});

//
//
//
//
app.get("/quantity/kitchen", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	const getRows = await googleSheets.spreadsheets.values.get({
		spreadsheetId,
		range: `sheet2`,
	});
	data = getRows.data.values;
	res.send(data);
});
app.post("/update/quantity/kitchen", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// get
	googleSheets.spreadsheets.values.update({
		spreadsheetId,
		range: `sheet2`,
		valueInputOption: "USER_ENTERED",
		resource: { values: req.body },
	});
	res.send(req.body);
});
app.listen(8080, (req, res) => {
	console.log("server started ");
});
// http://localhost:8080/done?table=7 to delete
// http://localhost:8080/update/quantity?table=7&item=roti&quantity=4 to add or update the quantity and item
// http://localhost:8080?table=10  to get the data of table
