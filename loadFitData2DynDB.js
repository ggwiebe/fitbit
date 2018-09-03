/*********************************************
Simple script for loading files into DynamoDB.
*********************************************/
 
// Add package to read json files
var jsonfile = require('jsonfile');
// Add package for AWS node sdk
var AWS = require('aws-sdk');
//choose region in config
AWS.config.update({
    region: "us-east-1"
});
 
// create a DynamoDB document client to allow using JSON directly
var docClient = new AWS.DynamoDB.DocumentClient();
 
// prepared JSON file
var hrFile = "data/hr.dyndb.json";
var hrArray = jsonfile.readFileSync(hrFile);
 
//utility function to create a single put request
function getHR(index){
    return {
        TableName: 'fitbit.heartrate',
        Item: hrArray[index]
    };
}
 
// Define Recursive function to save one HeartRate at a time
function saveHeartRates(index){
    if(index == hrArray.length){
        console.log("saved all.");
        return;
    }
 
    var params = getHR(index);
    
    // Log the save value for tracing
    console.log(JSON.stringify(params));
    
    //use the client to execute put request.
    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
        }else{
            console.log("saved HeartRate item "+index);
            index += 1;
            //save the next HeartRate on the list
            //with half a second delay
            setTimeout(function(){
                saveHeartRates(index);
            }, 500);
        }
    });
}
 
// Start saving from index = 0
saveHeartRates(0);
