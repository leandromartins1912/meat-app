import * as jsonServer from 'json-server'
import {Express} from 'express'

import * as fs from 'fs' 
import * as https from 'https'

import{handleAuthentication} from './auth'
import{handleAuthorization} from './authz'

import * as cors from 'cors'
import * as crs from 'restify-cors-middleware'

import {MEAT_API} from '../src/app/app.api'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

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
server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // (*) todos os dominios
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

server.use(router)
//server.options('*', cors(corsConf))

const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
    console.log('Json server is running')
})