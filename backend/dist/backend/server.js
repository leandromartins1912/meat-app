"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
/*const corsConf: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    origin: MEAT_API,
    preflightContinue: false,
  };

  
server.use(cors(corsConf))*/
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // (*) todos os dominios
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
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