var express = require('express');
var router = express.Router();

// Custom Encryption and Decrypion operation
var csop = require("../services/csOperation");

/* API URL. */
router.post('/', function(req, res) {
    var data = req.query.data;
    var task = req.query.task;
    var algo = req.query.algo;
    var key = req.query.key;

    var checkUndefinedArr = [data, task, algo, key].filter(item => item === undefined);
    
    try {
        if (checkUndefinedArr.length > 0) {
            throw "Incomplete request body.";
        } else {
            var body = {
                data: data.trim(),
                task: task.trim(),
                algo: algo.trim(),
                key: key.trim()
            };
            var checkForEmptyArr = [body.data, body.task, body.algo, body.key].filter(item => item === "");
            if (checkForEmptyArr.length > 0) {
                throw "Parameters not recieved.";
            } else {
                var result = {
                    response: getResult(body)
                };
                res.status(200).send(JSON.stringify(result));
            }
        }
    } catch (error) {
        console.error("CS_ERROR: Cannot process operation. " + error);
        var result = {
            response: ""
        };
        res.status(500).send(JSON.stringify(result));
    }

});

module.exports = router;
