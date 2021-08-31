// const path = require('path')
// const http = require('http')
// const express = require('express')
// const app = express()
// const server = http.createServer(app);
const WebSocket = require('ws');
class Cortex {
  constructor (user, socketUrl) {
      // create socket
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
      this.socket = new WebSocket(socketUrl)

      // read user infor
      this.user = user
      this.data = []
  }

  queryHeadsetId(){
      const QUERY_HEADSET_ID = 2
      let socket = this.socket
      let queryHeadsetRequest =  {
          "jsonrpc": "2.0", 
          "id": QUERY_HEADSET_ID,
          "method": "queryHeadsets",
          "params": {}
      }

      return new Promise(function(resolve, reject){
          socket.send(JSON.stringify(queryHeadsetRequest));
          socket.on('message', (data)=>{
              try {
                  if(JSON.parse(data)['id']==QUERY_HEADSET_ID){
                      // console.log(data)
                      // console.log(JSON.parse(data)['result'].length)
                      if(JSON.parse(data)['result'].length > 0){
                          let headsetId = JSON.parse(data)['result'][0]['id']
                          resolve(headsetId)
                      }
                      else{
                          console.log('No have any headset, please connect headset with your pc.')
                      }
                  }
                 
              } catch (error) {}
          })
      })
  }

  requestAccess(){
      let socket = this.socket
      let user = this.user
      return new Promise(function(resolve, reject){
          const REQUEST_ACCESS_ID = 1
          let requestAccessRequest = {
              "jsonrpc": "2.0", 
              "method": "requestAccess", 
              "params": { 
                  "clientId": user.clientId, 
                  "clientSecret": user.clientSecret
              },
              "id": REQUEST_ACCESS_ID
          }

          // console.log('start send request: ',requestAccessRequest)
          socket.send(JSON.stringify(requestAccessRequest));

          socket.on('message', (data)=>{
              try {
                  if(JSON.parse(data)['id']==REQUEST_ACCESS_ID){
    
                      resolve(data)
                  }
              } catch (error) {}
          })
      })
  }

  authorize(){
      let socket = this.socket
      let user = this.user
      return new Promise(function(resolve, reject){
          const AUTHORIZE_ID = 4
          let authorizeRequest = { 
              "jsonrpc": "2.0", "method": "authorize", 
              "params": { 
                  "clientId": user.clientId, 
                  "clientSecret": user.clientSecret, 
                  // "license": user.license, 
                  "debit": user.debit
              },
              "id": AUTHORIZE_ID
          }
          socket.send(JSON.stringify(authorizeRequest))
          socket.on('message', (data)=>{
              try {
                  if(JSON.parse(data)['id']==AUTHORIZE_ID){
                      let cortexToken = JSON.parse(data)['result']['cortexToken']
                      resolve(cortexToken)
                  }
              } catch (error) {}
          })
      })
  }

  controlDevice(headsetId){
      let socket = this.socket
      const CONTROL_DEVICE_ID = 3
      let controlDeviceRequest = {
          "jsonrpc": "2.0",
          "id": CONTROL_DEVICE_ID,
          "method": "controlDevice",
          "params": {
              "command": "connect",
              "headset": headsetId
          }
      }
      return new Promise(function(resolve, reject){
          socket.send(JSON.stringify(controlDeviceRequest));
          socket.on('message', (data)=>{
              try {
                  if(JSON.parse(data)['id']==CONTROL_DEVICE_ID){
                      resolve(data)
                  }
              } catch (error) {}
          })
      }) 
  }

  createSession(authToken, headsetId){
      let socket = this.socket
      const CREATE_SESSION_ID = 5
      let createSessionRequest = { 
          "jsonrpc": "2.0",
          "id": CREATE_SESSION_ID,
          "method": "createSession",
          "params": {
              "cortexToken": authToken,
              "headset": headsetId,
              "status": "active"
          }
      }
      return new Promise(function(resolve, reject){
          socket.send(JSON.stringify(createSessionRequest));
          socket.on('message', (data)=>{
              // console.log(data)
              try {
                  if(JSON.parse(data)['id']==CREATE_SESSION_ID){
                      let sessionId = JSON.parse(data)['result']['id']
                      resolve(sessionId)
                  }
              } catch (error) {}
          })
      })
  }

  startRecord(authToken, sessionId, recordName){
      let socket = this.socket
      const CREATE_RECORD_REQUEST_ID = 11

      let createRecordRequest = {
          "jsonrpc": "2.0", 
          "method": "updateSession", 
          "params": {
              "cortexToken": authToken,
              "session": sessionId,
              "status": "startRecord",
              "title": recordName,
              "description":"test_marker",
              "groupName": "QA"
          }, 
          "id": CREATE_RECORD_REQUEST_ID
      }

      return new Promise(function(resolve, reject){
          socket.send(JSON.stringify(createRecordRequest));
          socket.on('message', (data)=>{
              try {
                  if(JSON.parse(data)['id']==CREATE_RECORD_REQUEST_ID){
                      // console.log('CREATE RECORD RESULT --------------------------------')
                      // console.log(data)
                      resolve(data)
                  }
              } catch (error) {}
          })
      })
  }



  stopRecord(authToken, sessionId, recordName){
      let socket = this.socket
      const STOP_RECORD_REQUEST_ID = 12
      let stopRecordRequest = {
          "jsonrpc": "2.0", 
          "method": "updateSession", 
          "params": {
              "cortexToken": authToken,
              "session": sessionId,
              "status": "stopRecord",
              "title": recordName,
              "description":"test_marker",
              "groupName": "QA"
          }, 
          "id": STOP_RECORD_REQUEST_ID
      }

      return new Promise(function(resolve, reject){
          socket.send(JSON.stringify(stopRecordRequest));
          socket.on('message', (data)=>{
              try {
                  if(JSON.parse(data)['id']==STOP_RECORD_REQUEST_ID){
                      console.log('STOP RECORD RESULT --------------------------------')
                      console.log(data)
                      resolve(data)
                  }
              } catch (error) {}
          })
      })
  }



  subRequest(stream, authToken, sessionId){
      let socket = this.socket
      const SUB_REQUEST_ID = 6 
      let subRequest = { 
          "jsonrpc": "2.0", 
          "method": "subscribe", 
          "params": { 
              "cortexToken": authToken,
              "session": sessionId,
              "streams": stream
          }, 
          "id": SUB_REQUEST_ID
      }
      console.log('sub eeg request: ', subRequest)
      socket.send(JSON.stringify(subRequest))
      // socket.on('message', (data)=>{
      //     try {
      //         // if(JSON.parse(data)['id']==SUB_REQUEST_ID){
      //             console.log('SUB REQUEST RESULT --------------------------------')
      //             console.log(data)
      //             console.log('\r\n')
      //         // }
      //     } catch (error) {}
      // })
  }


  /**
   * - query headset infor
   * - connect to headset with control device request
   * - authentication and get back auth token
   * - create session and get back session id
   */
  async querySessionInfo(){
      let headsetId=""
      await this.queryHeadsetId().then((headset)=>{headsetId = headset})
      this.headsetId = headsetId

      let ctResult=""
      await this.controlDevice(headsetId).then((result)=>{ctResult=result})
      this.ctResult = ctResult
      console.log(ctResult)

      let authToken=""
      await this.authorize().then((auth)=>{authToken = auth})
      this.authToken = authToken

      let sessionId = ""
      await this.createSession(authToken, headsetId).then((result)=>{sessionId=result})
      this.sessionId = sessionId

      console.log('HEADSET ID -----------------------------------')
      console.log(this.headsetId)
      console.log('\r\n')
      console.log('CONNECT STATUS -------------------------------')
      console.log(this.ctResult)
      console.log('\r\n')
      console.log('AUTH TOKEN -----------------------------------')
      console.log(this.authToken)
      console.log('\r\n')
      console.log('SESSION ID -----------------------------------')
      console.log(this.sessionId)
      console.log('\r\n')
  }

  /**
   * - check if user logined
   * - check if app is granted for access
   * - query session info to prepare for sub and train
   */
  async checkGrantAccessAndQuerySessionInfo(){
      let requestAccessResult = ""
      await this.requestAccess().then((result)=>{requestAccessResult=result})

      let accessGranted = JSON.parse(requestAccessResult)
      console.log(accessGranted)
  
      // check if user is logged in CortexUI
      if ("error" in accessGranted){
          console.log('You must login on CortexUI before request for grant access then rerun')
          throw new Error('You must login on CortexUI before request for grant access')
      }else{
          console.log(accessGranted['result']['message'])
          // console.log(accessGranted['result'])
          if(accessGranted['result']['accessGranted']){
              await this.querySessionInfo()
          }
          else{
              console.log('You must accept access request from this app on CortexUI then rerun')
              throw new Error('You must accept access request from this app on CortexUI')
          }
      }   
  }


  /**
   * 
   * - check login and grant access
   * - subcribe for stream
   * - logout data stream to console or file
   */

  sub(streams){
      this.socket.on('open',async ()=>{
          await this.checkGrantAccessAndQuerySessionInfo()
          this.subRequest(streams, this.authToken, this.sessionId)
          this.socket.on('message', (data)=>{
              // log stream data to file or console here
              // console.log(JSON.parse(data))
              // console.log(this.data.length)
              this.data.push(JSON.parse(data))
          })
      })
  }
  
}

// ---------------------------------------------------------
// let socketUrl = 'wss://localhost:6868'
// let user = {
//   "license":"your license",
//   "clientId":"your clientId",
//   "clientSecret":"your client secret",
//   "debit":1
// }

// let c = new Cortex(user, socketUrl)

// // ---------- sub data stream
// // have six kind of stream data ['fac', 'pow', 'eeg', 'mot', 'met', 'com']
// // user could sub one or many stream at once
// let streams = ['pow']
// c.sub(streams)

const io = require("socket.io")(3000, {
    rejectUnauthorized: false,
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    allowEIO3: true
  });
  
const users = {}
const c = {}
// const data = []

io.on('connection', socket => {
  socket.on('new-user', name => {
    // console.log(name)
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (data) => { // I like to eat eat 
    console.log(data)
    socket.broadcast.emit('chat-message', { message: data.message, name: users[socket.id], color: data.color})
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
  socket.on('auth', (authinfo) => {

    let socketUrl = 'wss://localhost:6868'
    let userAuth = {
      // "license":"your license",
      "clientId": authinfo.userid,
      "clientSecret": authinfo.usersecret,
      "debit" : 100
    }
    
    c[socket.id] = new Cortex(userAuth, socketUrl)
    let streams = ['pow']
    c[socket.id].sub(streams)
    socket.emit("succesful-connection", "success!")

  })

  socket.on('P300done', () => {
    
    let data = c[socket.id].data
    // console.log(data)
    socket.emit("P300data", data)

  })

  socket.on('doneText', () => {
    
    let data = c[socket.id].data
    // console.log(data)
    socket.emit("emotionData", data)

  })


})

  // httpServer.listen(3000);
