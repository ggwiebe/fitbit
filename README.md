# fitbit
Fitbit API Stuff
- Added DynamoDB as target to hold Fitbit HeartRate data

## Objective
To support greater visibility & access of my Fitbit data for tracking and visualization.
Work with DynamoDB to store HeartRate data
*** Future: use AWS Step Functions to automate the process of extracting and then loading DynamoDB

## Overview
Start with Fitbit OAuth2.0 security;
Use the Fitbit API for extracting ("exporting") the data.
Use DynamoDB and AWS utilities to transform Fitbit HR data to Dynamo Load format
*** Future

### Pre-requisites - Node HTTP Request Setup
i.  Use NPM to get and install the REQUEST package
ii.

### Fitbit Authorization
We will be using the code grant authorization profile, so there needs to be an application to which Fitbit will grant authorization.
1. create / register an application (at Fitbit.com); most of the information here is not physically validated (other than for structural correctness, e.g. http://somesite.com would work);
2. Take the Client ID and Client Secret from the registration and use them (along with all the URLs supplied) with the REST service that will be using OAuth2.0 authentication support;

### AWS DynamoDB format conversion
1. Perform Fitbit JSON to DynamoDB compliant JSON
2. Perform the DynamoDB load by looping through DynamoDB Compliant HeartRate array
...

## Modeling Decisions

####Fitbit's HeartRate object
API has two key elements:
1. a Dated summary section about hear activities:
```javascript
  {
    "activities-heart": [
        {
            "dateTime": "2018-09-01",
            "value": {
                "customHeartRateZones": [],
                "heartRateZones": [... ]
                "restingHeartRate": 67
            }
        }
    ],
```
2. an intraday Timeseries of heart readings:
```javascript
    "activities-heart-intraday": {
        "dataset": [
            {
                "time": "00:08:00",
                "value": 70
            },
            ...
        ],
        "datasetInterval": 1,
        "datasetType": "minute"
    }
}
```

#### Modeling Decision
The above Fitbit object has a large list of heartrate readings isolated by a context-free time and heartrate value PLUS the metadata segment with the date context and summary values.
Thoughts:
1. Create a metadata segment and either:
  - populate directly from Fitbit response, or
  - initialize and allow for intraday updates as data is received
2. De-normalize the date into the time to get a full timestamp for each reading.


## Development & Debugging
Running from ~/apps/Fitbit
Debug node components using --inspect-brk start parameter and Chrome DevTools for step debugging
e.g. \fitbit> node --inspect-brk createDynamoHRFile.js
