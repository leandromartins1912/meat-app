import * as jsonServer from 'json-server'
import {Express} from 'express'

import * as fs from 'fs' 
import * as https from 'https'

import{handleAuthentication} from './auth'
import{handleAuthorization} from './authz'

import * as cors from 'cors'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


const corsConf = {
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, X-Access-Token'],
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE',
    origin: 'https://localhost:3001',
    preflightContinue: false
}


server.use(cors(corsConf))
server.use(middlewares)

server.use(jsonServer.bodyParser)
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

server.use(router)

const options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(options, server).listen(3001, () => {
    console.log('Json server is running')
})