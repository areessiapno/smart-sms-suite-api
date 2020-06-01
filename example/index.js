"use strict";

const SmartSMSSuiteAPI = require("../lib");

var client = new SmartSMSSuiteAPI({
    username: "jeff@comgtech.com"
  , password: "Comgtech1"
});

client.sendmsg('09197780258', 'hey',(err,body,result)=>{
	console.log(result.toJSON());
});
