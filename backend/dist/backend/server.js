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
var serverCors = {
    allowedHeaders: ['Origin', 'X-Request-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Access-Control-Allow-Origin'],
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
    origin: app_api_1.MEAT_API,
    preflightContinue: false
};
server.use(cors(serverCors));
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/login', auth_1.handleAuthentication);
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
server.options('*', cors(serverCors));
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running');
});
//# sourceMappingURL=server.js.map