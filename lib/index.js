"use strict";

const request = require("request")
    , querystring = require("querystring")
    ;

module.exports = class SmartSMSSuiteAPI {
    /**
     * SmartSMSSuiteAPI
     * Creates the instance of the `SmartSMSSuiteAPI` class.
     *
     * @name SmartSMSSuiteAPI
     * @function
     * @param {Object} options An object containing:
     *
     *  - `username` (String): SmartSMSSuite API username credentials (mandatory).
     *  - `password` (String): SmartSMSSuite API password credentials (mandatory).
     *  - `host` (String): SmartSMSSuite API host (Optional default: `https://messagingsuite.smart.com.ph/cgphttp/servlet`).
     *  - `timeout` (Integer): integer containing the number of milliseconds to wait for a server to send response headers (and start the response body) before aborting the request.  (Optional default: 60000).
     */
    constructor (options) {

        this.username = options.username;
        this.password = options.password;
        this.host = options.host || "https://messagingsuite.smart.com.ph/cgphttp/servlet";
        this.timeout = options.timeout || 60*1000;
        this.request = request;
    }

    /**
     * sendmsg
     * Send message request to SmartSMSSuiteAPI
     *
     * @name sendmsg
     * @function
     * @param {Object} num. To be passed by the client. (mandatory)
     * @param {Object} msg. To be passed by the client. (mandatory)
     * @param {Function} cb The callback function.
     */
    sendmsg (num, msg, cb) {
        return this._request({
            url: "sendmsg?destination="+num+"&text="+msg,
            method: "post"
        }, cb);
    }

    /**
     * _request
     * Low level function for making requests to the API endpoints.
     *
     * @name _request
     * @function
     * @param {Object} options An object containing the following fields:
     *
     *  - `url` (String): The api endpoint.
     *  - `method` (String): The request method (default: `get`).
     *  - `query` (Object): The query object.
     *  - `data` (Object): The POST data object.
     *  - `version` (String): API Version. If not specified your pinned verison is used.
     *
     * @param {Function} cb The callback function.
     */
    _request (options, cb) {
        let _url = options.url
          , method = options.method || "get"
          , query = options.query || {}
          , data = options.data
          , timeout = this.timeout
          , qs = querystring.stringify(query)
          , removeTrailingSlash = options.removeTrailingSlash || false
          , url = this.host + "/" + _url + (removeTrailingSlash ? "" : "") + (qs ? "?" + qs : "")
          ;

        return request({
            url: url
          , method: method
          , timeout: timeout
          , headers: {
             'Date': (new Date()).toUTCString(),
             'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
             'Authorization': 'Basic ' + (new Buffer(this.username+':'+this.password).toString('base64')) 
            }
          , json: data ? data : true
        }, (err, res) => {
            if (res && res.body ) 
                cb(err, res.body, res); 
            else 
                cb(err, null, res)
        })
    }
};