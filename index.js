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
app.post("/coustmer", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// get
	googleSheets.spreadsheets.values.append({
		spreadsheetId,
		range: `coustmer`,
		valueInputOption: "USER_ENTERED",
		resource: { values: req.body },
	});
	res.send(req.body);
});
// post for expenses
app.post("/expenses/post", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// get
	googleSheets.spreadsheets.values.append({
		spreadsheetId,
		range: `expenses`,
		valueInputOption: "USER_ENTERED",
		resource: { values: [req.body] },
	});
	res.send(req.body);
});
// get for expenses
app.get("/expenses", async (req, res) => {
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
		range: `expenses`,
	});
	let val = getRows.data.values.shift();
	res.send(getRows.data.values);
});
// for getting coustmer history
app.get("/coustmer/history", async (req, res) => {
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
		range: `coustmer`,
	});
	let val = getRows.data.values.shift();
	res.send(getRows.data.values);
});
// get for items
// get for total amount
app.get("/expenses/get", async (req, res) => {
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
		range: `expenses`,
	});
	let val = getRows.data.values.shift();
	var total = 0;
	var online_total = 0;
	var cash_total = 0;
	var lenght = getRows.data.values.length;
	let date_ob = new Date();
	let year = date_ob.getFullYear();
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let date = ("0" + date_ob.getDate()).slice(-2);
	var dd = date + "/" + month + "/" + year;
	for (i = 0; i < lenght; i++) {
		if (getRows.data.values[i][0] == dd) {
			total = total + parseInt(getRows.data.values[i][4]);
			if (getRows.data.values[i][2] == "Cash") {
				cash_total = cash_total + parseInt(getRows.data.values[i][3]);
			} else {
				online_total = online_total + parseInt(getRows.data.values[i][3]);
			}
		}
	}
	res.status(200).send(JSON.stringify([total, online_total, cash_total]));
});
// for getting menu item and rate and catageory
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
		range: `menu`,
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
	res.send(arr);
});
function removeDuplicates(arr) {
	return arr.filter((item, index) => arr.indexOf(item) === index);
}
//
//
//
//
//
// for geting coustmer information like today amout and etc
app.get("/coustmer/get", async (req, res) => {
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
		range: `coustmer`,
	});
	let val = getRows.data.values.shift();
	var total = 0;
	var online_total = 0;
	var cash_total = 0;
	var lenght = getRows.data.values.length;
	let date_ob = new Date();
	let year = date_ob.getFullYear();
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let date = ("0" + date_ob.getDate()).slice(-2);
	var dd = date + "/" + month + "/" + year;
	var today_coustmer = 0;
	for (i = 0; i < lenght; i++) {
		if (getRows.data.values[i][0] == dd) {
			today_coustmer++;
			total = total + parseInt(getRows.data.values[i][4]);
			if (getRows.data.values[i][3] == "Cash") {
				cash_total = cash_total + parseInt(getRows.data.values[i][4]);
			} else {
				online_total = online_total + parseInt(getRows.data.values[i][4]);
			}
		}
	}
	res
		.status(200)
		.send(JSON.stringify([total, online_total, cash_total, today_coustmer]));
});
//  for getting menu and rates of menu componenet
app.get("/rate", async (req, res) => {
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
		range: `menu!B:C`,
	});
	arr = [];
	for (index = 0; index < getRows.data.values.length; index++) {
		arr.push({
			item: getRows.data.values[index][0],
			price: getRows.data.values[index][1],
		});
	}

	res.send(arr);
});
// for adding cousmter information
app.post("/coustmer/post", async (req, res) => {
	const auth = new google.auth.GoogleAuth({
		keyFile: "credential.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
	const client = await auth.getClient();
	const googleSheets = google.sheets({ version: "v4", auth: client });
	const spreadsheetId = "1UQe7uy4tDrf_xOSJMODalqdFW7verWjK_IeHLRpOBHY";
	// get
	googleSheets.spreadsheets.values.append({
		spreadsheetId,
		range: `coustmer`,
		valueInputOption: "USER_ENTERED",
		resource: { values: req.body },
	});
	res.send(req.body);
});
//
// for sending sms
app.post("/send-sms", async (req, res) => {
	var unirest = require("unirest");

	var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

	req.headers({
		authorization: "YOUR_API_KEY",
	});

	req.form({
		sender_id: "DLT_SENDER_ID",
		message: "YOUR_MESSAGE_ID",
		variables_values: "",
		route: "dlt",
		numbers: req.body.number,
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);

		console.log(res.body);
	});
});
app.listen(process.env.PORT || 5300, () => {
	console.log("Server is running");
});
// http://localhost:8080/done?table=7 to delete
// http://localhost:8080/update/quantity?table=7&item=roti&quantity=4 to add or update the quantity and item
// http://localhost:8080?table=10  to get the data of table
