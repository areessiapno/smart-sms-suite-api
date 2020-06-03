Documentation

You can see below the API reference of this module.

SmartSMSSuiteAPI(options)

Creates the instance of the SmartSMSSuiteAPI class.

Params
String yourUserName: API username (mandatory).

String yourPassword : API password (mandatory).

Integer timeout : integer containing the number of milliseconds to wait for a server to send response headers (and start the response body) before aborting the request. (Optional default: 60000).

sendmsg(number,message, cb)

Send outgoing sms request to api

Params
String number : (mandatory)
String message (mandatory)
Function cb The callback function.
