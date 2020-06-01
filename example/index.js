"use strict";

const SmartSMSSuiteAPI = require("../lib");

var client = new SmartSMSSuiteAPI({
    username: "yourusername"
  , password: "yourpassword"
});

client.sendmsg('Number', 'Message',(err,body,result)=>{
	console.log(result.toJSON());
});
