

const express = require("express");
const bodyParser = require("body-parser")

const cucumberMockRouter = express.Router();
cucumberMockRouter.use(bodyParser.json());


var nextRequestId = "not set";
var nextMasterEntitySourceId = "not set";
var nextMasterEntitySourceEntity_Entity_Id = "not set";
var nextMasterEntitySourceEntity_EntityName_Id = "not set";
var nextMasterEntitySourceEntity_EntityAddress_Id = "not set";
var nextMasterEntitySourceEntity_EntityPhone_Id = "not set";
var nextMasterEntitySourceEntity_EntityCredential_Id = "not set";

var nextIATSummaryRequestId = "not set";
var nextBAGSSummaryRequestId = "not set";
var nextAirCargoId = "not set";
var nextSeaCargoId = "not set";
var nextDGMSSummaryId = "not set";
var nextIATPassportDetailsRequestId = "not set";
var nextIATVisaDetailsRequestId = "not set";
var nextIATAliasDetailsRequestId = "not set";
var nextIATMovementDetailsRequestId = "not set";
var nextIATListListDetailsRequestId = "not set";

var cucumberDataPath = "__cucumber__test__/cucumber/cucumberData/";

// Different routes
cucumberMockRouter.get('/', function(req, res) {

    console.log("/ default");

    console.log("req=" + req);
    console.log("req=" + req.query);
    console.log("req=" + JSON.stringify(req.query));

    res.json({ message: 'default get requestId' });
});


// http://localhost:3000/Dataservices/api?nextMasterEntitySourceEntity_EntityName_Id=2-personsearch-1-record
cucumberMockRouter.get('/api', function(req, res) {

    console.log("/api - req=" + JSON.stringify(req.query));

    var value = req.query.nextTestResultId;
    if (value)
    {
        nextRequestId = value;
        res.json({ message: 'api get nextRequestId=' + nextRequestId });
    }

    value = req.query.nextMasterEntitySourceId;
    if (value)
    {
        nextMasterEntitySourceId = value;
        console.log("nextMasterEntitySourceId=" + nextMasterEntitySourceId);
        res.json({ message: 'api get nextMasterEntitySourceId=' + nextMasterEntitySourceId });
    }

    value = req.query.nextMasterEntitySourceEntity_Entity_Id;
    if (value)
    {
        nextMasterEntitySourceEntity_Entity_Id = value;
        console.log("nextMasterEntitySourceEntity_Entity_Id=" + nextMasterEntitySourceEntity_Entity_Id);
        res.json({ message: 'api get nextMasterEntitySourceEntity_Entity_Id=' + nextMasterEntitySourceEntity_Entity_Id });
    }

    // nextMasterEntitySourceEntity_EntityName_Id
    value = req.query.nextMasterEntitySourceEntity_EntityName_Id;
    if (value)
    {
        nextMasterEntitySourceEntity_EntityName_Id = value;
        console.log("nextMasterEntitySourceEntity_EntityName_Id=" + nextMasterEntitySourceEntity_EntityName_Id);
        res.json({ message: 'api get nextMasterEntitySourceEntity_EntityName_Id=' + nextMasterEntitySourceEntity_EntityName_Id });
    }

    // nextMasterEntitySourceEntity_EntityAddress_Id
    value = req.query.nextMasterEntitySourceEntity_EntityAddress_Id;
    if (value)
    {
        nextMasterEntitySourceEntity_EntityAddress_Id = value;
        console.log("nextMasterEntitySourceEntity_EntityAddress_Id=" + nextMasterEntitySourceEntity_EntityAddress_Id);
        res.json({ message: 'api get nextMasterEntitySourceEntity_EntityAddress_Id=' + nextMasterEntitySourceEntity_EntityAddress_Id });
    }

    value = req.query.nextMasterEntitySourceEntity_EntityPhone_Id;
    if (value)
    {
        nextMasterEntitySourceEntity_EntityPhone_Id = value;
        console.log("nextMasterEntitySourceEntity_EntityPhone_Id=" + nextMasterEntitySourceEntity_EntityPhone_Id);
        res.json({ message: 'api get nextMasterEntitySourceEntity_EntityPhone_Id=' + nextMasterEntitySourceEntity_EntityPhone_Id });
    }

    value = req.query.nextMasterEntitySourceEntity_EntityCredential_Id;
    if (value)
    {
        nextMasterEntitySourceEntity_EntityCredential_Id = value;
        console.log("nextMasterEntitySourceEntity_EntityCredential_Id=" + nextMasterEntitySourceEntity_EntityCredential_Id);
        res.json({ message: 'api get nextMasterEntitySourceEntity_EntityCredential_Id=' + nextMasterEntitySourceEntity_EntityCredential_Id });
    }

    value = req.query.nextIATSummaryRequestId;
    if (value)
    {
        nextIATSummaryRequestId = value;
        console.log("nextIATSummaryRequestId=" + nextIATSummaryRequestId);
        res.json({ message: 'api get nextIATSummaryRequestId=' + nextIATSummaryRequestId });
    }

    value = req.query.nextBAGSSummaryRequestId;
    if (value)
    {
        nextBAGSSummaryRequestId = value;
        console.log("nextBAGSSummaryRequestId=" + nextBAGSSummaryRequestId);
        res.json({ message: 'api get nextBAGSSummaryRequestId=' + nextBAGSSummaryRequestId });
    }

    value = req.query.nextEXAMSSummaryAirCargoRequestId;
    if (value)
    {
        nextEXAMSSummaryAirCargoRequestId = value;
        console.log("nextEXAMSSummaryAirCargoRequestId=" + nextEXAMSSummaryAirCargoRequestId);
        res.json({ message: 'api get nextEXAMSSummaryAirCargoRequestId=' + nextEXAMSSummaryAirCargoRequestId });
    }

    value = req.query.nextEXAMSSummarySeaCargoRequestId;
    if (value)
    {
        nextEXAMSSummarySeaCargoRequestId = value;
        console.log("nextEXAMSSummarySeaCargoRequestId=" + nextEXAMSSummarySeaCargoRequestId);
        res.json({ message: 'api get nextEXAMSSummarySeaCargoRequestId=' + nextEXAMSSummarySeaCargoRequestId });
    }

    value = req.query.nextAirCargoId;
    if (value)
    {
        nextAirCargoId = value;
        console.log("nextAirCargoId=" + nextAirCargoId);
        res.json({ message: 'api get nextAirCargoId=' + nextAirCargoId });
    }

    value = req.query.nextSeaCargoId;
    if (value)
    {
        nextSeaCargoId = value;
        console.log("nextSeaCargoId=" + nextSeaCargoId);
        res.json({ message: 'api get nextSeaCargoId=' + nextSeaCargoId });
    }

    value = req.query.nextDGMSSummaryId;
    if (value)
    {
        nextDGMSSummaryId = value;
        console.log("nextDGMSSummaryId=" + nextDGMSSummaryId);
        res.json({ message: 'api get nextDGMSSummaryId=' + nextDGMSSummaryId });
    }


    value = req.query.nextIATPassportDetailsRequestId;
    if (value)
    {
        nextIATPassportDetailsRequestId = value;
        console.log("nextIATPassportDetailsRequestId=" + nextIATPassportDetailsRequestId);
        res.json({ message: 'api get nextIATPassportDetailsRequestId=' + nextIATPassportDetailsRequestId });
    }


    value = req.query.nextIATVisaDetailsRequestId;
    if (value)
    {
        nextIATVisaDetailsRequestId = value;
        console.log("nextIATVisaDetailsRequestId=" + nextIATVisaDetailsRequestId);
        res.json({ message: 'api get nextIATVisaDetailsRequestId=' + nextIATVisaDetailsRequestId });
    }

    value = req.query.nextIATAliasDetailsRequestId;
    if (value)
    {
        nextIATAliasDetailsRequestId = value;
        console.log("nextIATAliasDetailsRequestId=" + nextIATAliasDetailsRequestId);
        res.json({ message: 'api get nextIATAliasDetailsRequestId=' + nextIATAliasDetailsRequestId });
    }

    value = req.query.nextIATMovementDetailsRequestId;
    if (value)
    {
        nextIATMovementDetailsRequestId = value;
        console.log("nextIATMovementDetailsRequestId=" + nextIATMovementDetailsRequestId);
        res.json({ message: 'api get nextIATMovementDetailsRequestId=' + nextIATMovementDetailsRequestId });
    }

    value = req.query.nextIATListListDetailsRequestId;
    if (value)
    {
        nextIATListListDetailsRequestId = value;
        console.log("nextIATListListDetailsRequestId=" + nextIATListListDetailsRequestId);
        res.json({ message: 'api get nextIATListListDetailsRequestId=' + nextIATListListDetailsRequestId });
    }

});


cucumberMockRouter.post('/resources/entitysearch', function(req, res) {

    console.log("/resources/entitysearch called");

    var fileNameToRead = cucumberDataPath + nextRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.post('/TravellerService/resources/TravellerSummary', function(req, res) {

 console.log("/resources/iatSummary called");

 var fileNameToRead = cucumberDataPath + nextIATSummaryRequestId + ".json";
 readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.post('/resources/bagsSummary', function(req, res) {

    console.log("/resources/bagsSummary called");

    var fileNameToRead = cucumberDataPath + nextBAGSSummaryRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.post('/resources/ExamsAirCargoSummary', function(req, res) {

    console.log("/resources/ExamsAirCargoSummary called");

    var fileNameToRead = cucumberDataPath + nextEXAMSSummaryAirCargoRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.post('/resources/ExamsSeaCargoSummary', function(req, res) {

    console.log("/resources/ExamsSeaCargoSummary called");

    var fileNameToRead = cucumberDataPath + nextEXAMSSummarySeaCargoRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});


cucumberMockRouter.post('/TravellerService/resources/TravellerPassportDetails', function(req, res) {

    console.log("/TravellerService/resources/TravellerPassportDetails called");

    var fileNameToRead = cucumberDataPath + nextIATPassportDetailsRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});


cucumberMockRouter.get('/TravellerService/resources/TravellerVisa/:visaId', function(req, res) {

    console.log("/TravellerService/resources/TravellerVisa/:visaId called");

    var visaId = req.params.visaId;
    console.log("visaId=" + visaId);

    var fileNameToRead = cucumberDataPath + nextIATVisaDetailsRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});


cucumberMockRouter.get('/TravellerService/resources/TravellerPersonAliasInformation/:aliasId', function(req, res) {

    console.log("/TravellerService/resources/TravellerPersonAliasInformation/:aliasId called");

    var aliasId = req.params.aliasId;
    console.log("aliasId=" + aliasId);

    var fileNameToRead = cucumberDataPath + nextIATAliasDetailsRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});



cucumberMockRouter.post('/TravellerService/resources/TravellerMovements', function(req, res) {

    console.log("/TravellerService/resources/TravellerMovements called");

    var fileNameToRead = cucumberDataPath + nextIATMovementDetailsRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.post('/TravellerService/resources/TravellerFlightList', function(req, res) {

    console.log("/TravellerService/resources/TravellerFlightList called");

    var fileNameToRead = cucumberDataPath + nextIATListListDetailsRequestId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/masterEntitySource/:entityId', function(req, res) {

    console.log("/resources/masterEntitySource/:entityId called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextMasterEntitySourceId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/masterEntitySource/:entityId/Entity', function(req, res) {

    console.log("/resources/masterEntitySource/:entityId/Entity called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextMasterEntitySourceEntity_Entity_Id + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/masterEntitySource/:entityId/EntityName', function(req, res) {

    console.log("/resources/masterEntitySource/:entityId/EntityName called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextMasterEntitySourceEntity_EntityName_Id + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/masterEntitySource/:entityId/EntityAddress', function(req, res) {

    console.log("/resources/masterEntitySource/:entityId/EntityAddress called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextMasterEntitySourceEntity_EntityAddress_Id + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/masterEntitySource/:entityId/EntityPhone', function(req, res) {

    console.log("/resources/masterEntitySource/:entityId/EntityPhone called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextMasterEntitySourceEntity_EntityPhone_Id + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/masterEntitySource/:entityId/EntityCredential', function(req, res) {

    console.log("/resources/masterEntitySource/:entityId/EntityCredential called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextMasterEntitySourceEntity_EntityCredential_Id + ".json";
    readFileAndRespond(fileNameToRead, res);
});


cucumberMockRouter.get('/resources/airCargo/:entityId', function(req, res) {

    console.log("/resources/airCargo/:entityId called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextAirCargoId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/seaCargo/:entityId', function(req, res) {

    console.log("/resources/seaCargo/:entityId called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextSeaCargoId + ".json";
    readFileAndRespond(fileNameToRead, res);
});

cucumberMockRouter.get('/resources/dgmsSummary/:entityId', function(req, res) {

    console.log("/resources/dgmsSummary/:entityId called");

    var entityId = req.params.entityId;
    console.log("entityId=" + entityId);

    var fileNameToRead = cucumberDataPath + nextDGMSSummaryId + ".json";
    readFileAndRespond(fileNameToRead, res);
});


// log everything else
cucumberMockRouter.all("/**/*", function(req, res, next)  {

    console.log("==================================================================================");
    console.log("catch everything else");
    console.log("==================================================================================");
    console.log("req=" + req);
    console.log("req.originalUrl=" + req.originalUrl);
    console.log("==================================================================================");

    var responseData = {
        "data" : "failed"
    };

    res.json(responseData);

});



function readFileAndRespond(fileNameToRead, res, log) {

    var jsonfile = require('jsonfile');
    if (log) {
        console.log("started reading file :" + fileNameToRead);
    }

    jsonfile.readFile(fileNameToRead, function(err, jsonData) {

        if (jsonData) {


            var stringValue = JSON.stringify(jsonData);

            if (log) {
                console.log("jsonData(length):" + stringValue.length);
            }
        }
        else {
            console.log("no jsonData read");
        }

        // console.log("completed reading file :" + fileNameToRead);
        if (err)
        {
            console.log("cannot read file :" + fileNameToRead);
            console.log("err+" + err);
            res.json({message: "could not read file:" + fileNameToRead,
                text: err});
        }
        else
        {
            if (log) {
                console.log("=====================================================================================");
                console.log(jsonData);
                console.log("=====================================================================================");
            }
            res.json(jsonData);
        }
    });
}


module.exports = cucumberMockRouter;