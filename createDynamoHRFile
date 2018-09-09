// Simple script to convert from Fitbit JSON to DynamoDB JSON for loading

// Require packages
var jsonfile = require('jsonfile');
var fs = require('fs-extra');
var moment = require('moment');
var _ = require('lodash');
var attr = require('dynamodb-data-types').AttributeValue;

// Define variables
var hrFile = "data/hr.json";
var hrJson = jsonfile.readFileSync(hrFile);
var hrResults = hrJson.results;
var hrs = [];

// Define a function to loop through all Fitbit formatted HeartRate JSON objects,
//   creating DynamoDB compliant objects
function loopHrs(){
	for(var i=0; i<hrResults.length; i++){
		var hr = hrResults[i];
		hr.createdAt = moment(hr.createdAt).valueOf();
		hr.user = hr.user.objectId;
		delete hr.updatedAt;
		delete hr.objectId;
		// For json in dynamodb format
		hr.push(attr.wrap(hr));
		hrs.push(hr);
	}
}

// Run the loop through all Fitbit HeartRates - creating out DynamoDB Objects
loopHrs();

// Write the file from the DynamoDB JSON object
var ws = fs.createOutputStream('data/hr.dyndb.json')
ws.write(JSON.stringify(hrs));
