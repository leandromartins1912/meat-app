"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var cors = require("cors");
var app_api_1 = require("../src/app/app.api");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
var corsConf = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    origin: app_api_1.MEAT_API,
    preflightContinue: false
};
server.use(cors(corsConf));
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/login', auth_1.handleAuthentication);
server.use('/orders', authz_1.handleAuthorization);
server.use(router);
//server.options('*', cors(corsConf))
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('Json server is running');
});
//# sourceMappingURL=server.js.map