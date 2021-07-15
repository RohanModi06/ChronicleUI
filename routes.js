var express =  require("express");
var fetch = require("node-fetch");

var router = express.Router();
var ssn;
router.get("/",function(req,res){
    ssn = req.session;
    if(ssn.serviceabilityLogs===undefined){
        ssn.serviceabilityLogs=[];
    }
    if(ssn.courierPreferenceLogs===undefined){
        ssn.courierPreferenceLogs=[];
    }
    var serviceabilityLogs=ssn.serviceabilityLogs;
    var courierPreferenceLogs=ssn.courierPreferenceLogs;

    console.log("Start page");
    res.render("index",{serviceabilityLogs,courierPreferenceLogs});
});

router.post("/fetch-logs", async (req,res)=>{
    ssn=req.session;
    var myHeaders = {"accept": "application/json",
                        "cache-control": "no-cache",
                    "content-type": "application/json",
                    "authorization": "Basic WVhCcFlXUnRhVzQ2YlRGOnVkSEpoVWpCamEyVjBNVE1oSXc9PQ=="};
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    var url = `http://lmsreg-chronicle.dockins.myntra.com/myntra-chronicle-service/chronicle/v2/log/${req.body.entityName}/${req.body.group}/${req.body.pincode}`;
    const response = await fetch(url, requestOptions)
    .then(res => res.json())
    .catch(e=>{
        console.error({
        "message":"cannot fetch",
        error:e
        });
    });
    console.log(response.data);
    if(req.body.entityName === "ServiceabilityConfig"){
    ssn.serviceabilityLogs.unshift(response.data);
    }else if(req.body.entityName === "CourierPreferenceConfig"){
        ssn.courierPreferenceLogs.unshift(response.data);
    }
    
   
    res.redirect("/");

});

router.post("/clear-logs", (req,res)=>{
    ssn=req.session;
    ssn.serviceabilityLogs=[]
    ssn.courierPreferenceLogs=[]

   
    res.redirect("/");

});



module.exports = router;