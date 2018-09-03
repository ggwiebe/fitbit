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

