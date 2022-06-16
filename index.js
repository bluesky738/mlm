const express = require("express");
var bodyParser = require("body-parser");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

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
	if (req.query.table != undefined) {
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
	} else {
		res.send("please enter table number");
	}
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
// get for items
app.get("/menu", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	const getRows = await googleSheets.spreadsheets.values.get({
		spreadsheetId,
		range: `sheet3`,
	});
	category = [];
	for (let index = 0; index < getRows.data.values.length; index++) {
		category.push(getRows.data.values[index][0]);
	}
	new_arr = removeDuplicates(category);
	arr = [];
	for (let index = 0; index < new_arr.length; index++) {
		for (let i = 0; i < getRows.data.values.length; i++) {
			if (getRows.data.values[i][0] === new_arr[index]) {
				arr[index] = { category: new_arr[index], item: [] };
			}
		}
	}
	for (let index = 0; index < new_arr.length; index++) {
		for (let i = 0; i < getRows.data.values.length; i++) {
			if (getRows.data.values[i][0] === arr[index].category) {
				arr[index].item.push({
					item: getRows.data.values[i][1],
					price: getRows.data.values[i][2],
					quantity: 0,
				});
			}
		}
	}
	res.send(getRows.data.values);
});
function removeDuplicates(arr) {
	return arr.filter((item, index) => arr.indexOf(item) === index);
}
app.listen(process.env.PORT || 5300, () => {
	console.log("Server is running");
});
// http://localhost:8080/done?table=7 to delete
// http://localhost:8080/update/quantity?table=7&item=roti&quantity=4 to add or update the quantity and item
// http://localhost:8080?table=10  to get the data of table