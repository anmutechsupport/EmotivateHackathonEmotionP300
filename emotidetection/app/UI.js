// import { io } from "http://localhost:3000/socket.io/socket.io.js";
class UI{

  static id = String(Math.floor(Math.random()*1000000))

  constructor(label, session) {

      // Generic Plugin Attributes
      this.label = label
      this.session = session
      this.params = {}

      // UI Identifier
      this.props = {
          id: String(Math.floor(Math.random()*1000000)),
          timestamps: {
              startEEG: Date.now(),
              start: null,
              stop: null,
              startTrial: null,
              stopTrial: null
          },
      }

    this.pages = {
        div1: null,
        div2: null,
        currdiv: null
    }

      this.colors = ['red', 'blue', 'green', 'yellow'],
      this.messageCount = 0,
      this.characterSequence = [], 
      this.keyPattern = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "@", "?", "-", "[]", "XX"], 

      this.io = null
      this.socket = null

      // Port Definition
      this.ports = {
          // message: {
          //   default: {message:'connected'},
          //   input: {type: undefined},
          //   output: {type: 'object'},
          //   onUpdate: (userData) => {
          //     return userData
          //   }
          // },
          // onmessage: {
          //   input: {type: 'object'},
          //   output: {type: null},
          //   onUpdate: (userData) => {
          //     userData.forEach(u => {
          //       if (u.data.message === 'connected'){

          //         console.log(this.session.info)
          //         if (u.id == this.session.info.auth.id) this.messageContainer.innerHTML = ''

          //         this._appendMessage(`${u.username} connected`)
          //       } else {
          //         this._appendMessage(`${u.username}: ${u.data.message}`, u.data.color)
          //       }
        
          //     })
          //   }
          // }
      }
  }


init = () => {

    this.props.script = document.createElement("script");
    this.props.script.src = "https://cdn.socket.io/4.1.2/socket.io.min.js" 
    this.props.script.async = true;

    console.log('loading io')
    this.props.script.onload = () => {
        this.io = io('http://localhost:3000')
    }
    document.body.appendChild(this.props.script);

    // Simply define the HTML template
    let HTMLtemplate = () => {return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Chat App</title>
      <link rel="stylesheet" href="style.css">
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>P300-based BCI Stimulus Presentation Paradigm</title>

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    </head>
    <body style="background-color:rgb(204, 255, 255);">
      
      
      <div style = "width: 100%; height: 100%; background-color:rgb(204, 255, 255); z-index: 2; position: absolute;" class: "pages" id="div1"> 

          <h1 style="position: relative; top: 300px; left: 830px;" > Emotion300 </h1>
          <button onclick="document.getElementById('id01').style.display='block'" style='position: relative; top: 350px; left: 750px; min-height: 200px; width: 400px; font-size: 150%; border-radius: 50px;' type="button", class="brainsatplay-default-button">Authenticate Emotiv Stream</button>
          <!-- The Modal -->
          <div id="id01" class="modal">
            <span onclick="document.getElementById('id01').style.display='none'"
          class="close" title="Close Modal">&times;</span>

            <!-- Modal Content -->
            <form class="modal-content animate" id="authform">
              
              <div class="container">
                <br>
                <br>
                <label for="uname"><b>Authenticate Emotiv Stream</b></label>
                <br>
                <br>
                <label for="uname"><b>Client ID</b></label>
                <input type="text" placeholder="Enter Client ID" id="uname" required>
                <br>
                <br>
                <label for="psw"><b>Client Secret</b></label>
                <input type="password" placeholder="Enter Client Secret" id="psw" required>
                <br>
                <br>
                <br>
                <button type="submit" id="authsubmitbutton">Login</button>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                <br>
                <br>
                <br>

              </div>

              
            </form>
          </div>

      </div>


      <div style = "width: 100%; height: 100%; background-color:rgb(204, 255, 255); z-index: 1; opacity: 0; position: relative;", class: "pages" id="div2" >
        
        <div id="main-div">
          <div id="message-container"></div>
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

        <form class="send-container" id="send-container">
          <input type="text" class="message-input" id="message-input">
          <button type="submit" class="send-button">Send</button>
          <button style='display: none' type="button", class="brainsatplay-default-button" id="devicebutton">Connect BCI</button>
        </form>
        
        <div id="speller_matrix">
          <div id="mydiv">
            <div id = "mydivheader"> Drag Matrix</div>
              <div>
                <table>
                  <tr>
                    <td id="A">A</td>
                    <td id="B">B</td> 
                    <td id="C">C</td>
                    <td id="D">D</td>
                    <td id="E">E</td> 
                    <td id="F">F</td>
                  </tr>
                
                  <tr>
                    <td id="G">G</td>
                    <td id="H">H</td> 
                    <td id="I">I</td>
                    <td id="J">J</td>
                    <td id="K">K</td> 
                    <td id="L">L</td>
                  </tr>
                
                  <tr>
                    <td id="M">M</td>
                    <td id="N">N</td> 
                    <td id="O">O</td>
                    <td id="P">P</td>
                    <td id="Q">Q</td> 
                    <td id="R">R</td>
                  </tr>
                  
                  <tr>
                    <td id="S">S</td>
                    <td id="T">T</td> 
                    <td id="U">U</td>
                    <td id="V">V</td>
                    <td id="W">W</td> 
                    <td id="X">X</td>
                  </tr>
                  
                  <tr>
                    <td id="Y">Y</td>
                    <td id="Z">Z</td> 
                    <td id="0">.</td>
                    <td id="1">,</td>
                    <td id="2">:</td> 
                    <td id="3">;</td>
                  </tr>
                  
                  <tr>
                    <td id="4">@</td>
                    <td id="5">?</td> 
                    <td id="6">-</td>
                    <td id="7">bk</td>
                    <td id="8">[]</td> 
                    <td id="9">XX</td>
                  </tr>
        
                <button class="btn-primary btn-lg" id="start">Start P300 Experiment</button>
          
              </div> 
              
              </table>

              
          </div>
        </div>
        
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
        
        <script src="functions.js"></script>
          
      </div>

    </body>
    </html>`
    }
    


    let setupHTML = () => {

        setTimeout(() => {

            this.socket = this.io

            this.dragElement(document.getElementById("mydiv"));

            this.pages.div1 = document.getElementById('div1')
            this.pages.div2 = document.getElementById('div2')

            console.log(this.socket)
            this.messageContainer = document.getElementById('message-container')
            this.props.startP300 = document.getElementById('start')

            const messageInput = document.getElementById('message-input')
            const messageForm = document.getElementById('send-container')
            console.log(messageForm)

            const authDiv = document.getElementById('id01')
            const authForm = document.getElementById('authform')

            const uid = document.getElementById('uname')
            const usecret = document.getElementById('psw')

            this.loader = document.getElementsByClassName('lds-roller')[0]
            console.log(this.loader)
            
            const name = prompt('What is your name?') // not necessary 
            this._appendMessage('You joined')
            // this._appendMessage('[ Authentication Required ]')
            this.socket.emit('new-user', name)

            this.socket.on('chat-message', data => {
          
                this._appendMessage(`${data.name}: ${data.message}`, data.color)
            
            })

            this.socket.on('user-connected', name => {
            // console.log(name)
            this._appendMessage(`[ ${name} connected ]`)
            })

            this.socket.on('user-disconnected', name => {
            this._appendMessage(`[ ${name} disconnected ]`)
            })

            this.socket.on('succesful-connection', e => {
              this._setOpacity(this.pages.div1, this.pages.div2)
            })

            this.socket.on('P300data', data => {
              // console.log("done")
              // console.log(data) // array of x size, 70 features per row, .pow = features, .time = The timestamp of this sample. 
              //                   //It is the number of seconds that have elapsed since 00:00:00 Thursday, 1 January 1970 UTC.
              console.log(data)
              let indexOfSmallest = (a) => {
                var lowest = 0;
                for (var i = 1; i < a.length; i++) {
                  if (a[i] < a[lowest]) lowest = i;
                }
                return lowest;
                }
              
              let approx_start = []
              let approx_end = []
              console.log(data.length)
              for (let i = 0; i < data.length; i++) {
                if (data[i].time*1000 <= this.props.timestamps.startTrial+(1/8*1000) && data[i].time*1000 >= this.props.timestamps.startTrial-(1/8*1000)) {
                  console.log(data[i].time*1000, this.props.timestamps.startTrial+(1/8*1000))
                  approx_start.push([i, data[i].time])

                } else if (data[i].time*1000 <= this.props.timestamps.stopTrial+(1/8*1000) && data[i].time*1000 >= this.props.timestamps.stopTrial-(1/8*1000)) {
                  console.log(data[i].time*1000, this.props.timestamps.stopTrial+(1/8*1000))
                  approx_end.push([i, data[i].time])
                  
                }

              }

              console.log(approx_start)
              console.log(approx_end)
              
              try{
                
                if (approx_end.length > 1) {
                  let stamp_differences = []
                  for (const indexTime in approx_end) {

                    stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.stopTrial))
                    
                  }
                  
                  this.stopIndex = approx_end[indexOfSmallest(stamp_differences)][0]

                } else {this.stopIndex = approx_end[0][0]}

              } catch(err) {

                this.stopIndex = data.length

              }

              // if (approx_end.length > 1) {
              //   let stamp_differences = []
              //   for (const indexTime in approx_end) {

              //     stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.stopTrial))
                  
              //   }
                
              //   this.stopIndex = approx_end[indexOfSmallest(stamp_differences)][0]

              // } else {this.stopIndex = approx_end[0][0]}

              try {

                if (approx_start.length > 1) {
                  let stamp_differences = []
                  for (const indexTime in approx_start) {

                    stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.startTrial))
                    
                  }
                  
                  this.startIndex = approx_start[indexOfSmallest(stamp_differences)][0]

                } else {this.startIndex = approx_start[0][0]}

              } catch(err) {

                this.startIndex = 0

              }

              // if (approx_start.length > 1) {
              //   let stamp_differences = []
              //   for (const indexTime in approx_start) {

              //     stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.startTrial))
                  
              //   }
                
              //   this.startIndex = approx_start[indexOfSmallest(stamp_differences)][0]

              // } else {this.startIndex = approx_start[0][0]}

              if (this.startIndex < this.stopIndex) {
                console.log(this.startIndex, this.stopIndex) 
              }

              this.P300data = data.slice(this.startIndex, this.stopIndex)
              console.log(this.P300data.length)

              this._sendP300().then((char) => {
                console.log(char)
                messageInput.value = messageInput.value + this.keyPattern[char-1]
                this.characterSequence = []
              })

            })

            this.socket.on('emotionData', data => {
              // console.log("done")
              // console.log(data) // array of x size, 70 features per row, .pow = features, .time = The timestamp of this sample. 
              //                   //It is the number of seconds that have elapsed since 00:00:00 Thursday, 1 January 1970 UTC.
              console.log(data)
              let indexOfSmallest = (a) => {
                var lowest = 0;
                for (var i = 1; i < a.length; i++) {
                  if (a[i] < a[lowest]) lowest = i;
                }
                return lowest;
                }
              
              let approx_start = []
              let approx_end = []
              console.log(data.length)
              for (let i = 0; i < data.length; i++) {
                if (data[i].time*1000 <= this.props.timestamps.start+(1/8*1000)-5*1000 && data[i].time*1000 >= this.props.timestamps.start-(1/8*1000)-5*1000) {
                  console.log(data[i].time*1000, this.props.timestamps.start+(1/8*1000))
                  approx_start.push([i, data[i].time])

                } else if (data[i].time*1000 <= this.props.timestamps.stop+(1/8*1000) && data[i].time*1000 >= this.props.timestamps.stop-(1/8*1000)) {
                  console.log(data[i].time*1000, this.props.timestamps.stop+(1/8*1000))
                  approx_end.push([i, data[i].time])
                  
                }

              }

              console.log(approx_start)
              console.log(approx_end)

              try {

                if (approx_end.length > 1) {
                  let stamp_differences = []
                  for (const indexTime in approx_end) {

                    stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.stop))
                    
                  }
                  
                  this.stopIndexEmo = approx_end[indexOfSmallest(stamp_differences)][0]

                } else {this.stopIndexEmo = approx_end[0][0]}

              } catch(err) {

                this.stopIndexEmo = data.length

              }
              
              // if (approx_end.length > 1) {
              //   let stamp_differences = []
              //   for (const indexTime in approx_end) {

              //     stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.stop))
                  
              //   }
                
              //   this.stopIndex = approx_end[indexOfSmallest(stamp_differences)][0]

              // } else {this.stopIndex = approx_end[0][0]}

              try {

                if (approx_start.length > 1) {
                  let stamp_differences = []
                  for (const indexTime in approx_start) {

                    stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.start))
                    
                  }
                  
                  this.startIndexEmo = approx_start[indexOfSmallest(stamp_differences)][0]

                } else {this.startIndexEmo = approx_start[0][0]}

              } catch(err) {

                this.startIndexEmo = 0

              }

              // if (approx_start.length > 1) {
              //   let stamp_differences = []
              //   for (const indexTime in approx_start) {

              //     stamp_differences.push(Math.abs(indexTime[0]*1000-this.props.timestamps.start))
                  
              //   }
                
              //   this.startIndexEmo = approx_start[indexOfSmallest(stamp_differences)][0]

              // } else {this.startIndexEmo = approx_start[0][0]}

              if (this.startIndexEmo < this.stopIndexEmo) {
                console.log(this.startIndexEmo, this.stopIndexEmo) 
              }

              this.emotionData = data.slice(this.startIndexEmo, this.stopIndexEmo)
              
              this._onMessageSendHack().then((m_color) => {
                console.log('COLOR',m_color)
                // this.session.graph.runSafe(this, 'message', [{data: {message, color: m_color}}])
                this.socket.emit('send-chat-message', {message: this.message, color: m_color})
                this._appendMessage(`You: ${this.message}`, m_color)
                messageInput.value = ''
            }).catch((error) => {
                this._hideLoader()
                // this.session.graph.runSafe(this, 'message', [{data: {message, color: "grey"}}])
                this.socket.emit('send-chat-message', {message: this.message} ) // this._appendMessage(`You: ${message}`)
                alert("Error detecting your emotion: "+error)
                this._appendMessage(`You: ${this.message}`)
                messageInput.value = ''
                return
      
                })

            })

            

          messageInput.addEventListener('input', (e) => {
            if (e.target.value !== '') {
              if (e.target.value.length == 1) { // potential error
                if (Date.now() - this.props.timestamps.startEEG > 5*1000) {
                  console.log('start message');
                  this.props.timestamps.start = Date.now() - 5*1000
                }
                else {
                  console.log('start message');
                  this.props.timestamps.start = Date.now()
                }
              }
            }
            else {
              console.log('nothing in box');
              this.props.timestamps.start = null
            }
          })

          messageForm.addEventListener('submit', e => {
            e.preventDefault()
            this.props.timestamps.stop = Date.now()
            this.message = messageInput.value
            console.log(messageInput.value)
            this.socket.emit('doneText')
        
            })          
          
          authForm.addEventListener('submit', e => {
            e.preventDefault()
            const uid_val = uid.value
            const usecret_val = usecret.value
            this.socket.emit('auth', {userid: uid_val, usersecret: usecret_val})
            authDiv.style.display='none'


          // match to form used for auth TODO
      
          })          
        
          // messageForm.addEventListener('submit', e => {
          //   e.preventDefault()
          //   const message = messageInput2.value
          //   this._auth(message) // .then((m_color) => {
          //   //     // this.session.graph.runSafe(this, 'message', [{data: {message, color: m_color}}])
          //   //     socket.emit('send-chat-message', {message: message, color: m_color})
          //   //     messageInput2.value = ''
          //   // }).catch((error) => {
          //   //     this._hideLoader()
          //   //     // this.session.graph.runSafe(this, 'message', [{data: {message, color: "grey"}}])
          //   //     socket.emit('send-chat-message', {message: message} ) // this._appendMessage(`You: ${message}`)
          //   //     alert("Error detecting your emotion: "+error)
          //   //     this._appendMessage(`You: ${message}`)
          //   //     messageInput2.value = ''
          //   //     return
      
          //   //    })
     
          // })
            
          this.props.startP300.onclick  = (e) => {

            console.log("clicked")
            e.preventDefault()
            this.runParadigm()
            
          }
        
      }, 1000)

    }


    return {HTMLtemplate, setupHTML}
}

deinit = () => {}


dragElement = (elmnt) => {
  this.pos1 = 0, this.pos2 = 0, this.pos3 = 0, this.pos4 = 0;
  this.elmnt = elmnt
  if (document.getElementById(this.elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(this.elmnt.id + "header").onmousedown = this.dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    this.elmnt.onmousedown = this.dragMouseDown;
  }
}

dragMouseDown = (e) => {
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  this.pos3 = e.clientX;
  this.pos4 = e.clientY;
  document.onmouseup = this.closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = this.elementDrag;
}

elementDrag = (e) => {
  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  this.pos1 = this.pos3 - e.clientX;
  this.pos2 = this.pos4 - e.clientY;
  this.pos3 = e.clientX;
  this.pos4 = e.clientY;
  // set the element's new position:
  this.elmnt.style.top = (this.elmnt.offsetTop - this.pos2) + "px";
  this.elmnt.style.left = (this.elmnt.offsetLeft - this.pos1) + "px";
}

closeDragElement = () => {
  // stop moving when mouse button is released:
  document.onmouseup = null;
  document.onmousemove = null;
}


_userAdded = (userData) => {
  let u = userData[0]
  console.log(u)
  // this.props.readouts.innerHTML += `<p id="${this.props.id}-${u.id}" class="readout" >${u.username}: ${u.data ?? ''}</p>`
  // _appendMessage because userconnected has already been broadcasted, no need to runsafe

}

_userRemoved = (userData) => {
  let u = userData[0]
  console.log(u)
  // let readout = document.getElementById(`${this.props.id}-${u.id}`)
  // readout.remove()
  // _appendMessage
}

_showLoader = () => {
  this.loader.style.visibility = "visible";
}

      //  if (finalData[0].length < fs*5) {
      //   this._hideLoader()
      //   reject("We are still collecting data, no emotion detected")
      //  }

      // // data.forEach((item, index, array) => {
      // //   console.log(array)
      // // })

      //  let url = 'http://127.0.0.1:5000/emotions'
      //  let body = {
      //      finalData,
      //      fs
      //  }

      // let response = await fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5000/", "Content-Type": "application/json"} })
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

_hideLoader = () => {
  this.loader.style.visibility = "hidden";

}

_setOpacity = (inp, out) => {
  inp.style.opacity = "0";
  out.style.opacity = "1";
  inp.style.display = 'none';
  out.style.display = "";
  this.pages.currdiv = out;
} 

_appendMessage = (message, color="black") => { // add conditional that checks user id 
  ++this.messageCount;
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.style.color = color
  // if (this.messageCount % 4 == 0) {
  //   messageElement.style.color = this.fakecolors[0]
  // }else if (this.messageCount % 4 == 1){
  //   messageElement.style.color = this.fakecolors[1]
  // }else if (this.messageCount % 4 == 2){
  //   messageElement.style.color = this.fakecolors[2]
  // }else if (this.messageCount % 4 == 3){
  //   messageElement.style.color = this.fakecolors[3]
  // }
  this.messageContainer.append(messageElement)
}

_onMessageSend = (message) => {

  return new Promise(async (resolve, reject) => {
     // Detect when Video Stops
     this.props.timestamps.stop = Date.now()
     this._showLoader()

     // Grab Data from B@P
     let data = this.session.atlas.data.eeg // parse EEG using timestamps in JS
     console.log(data)
    
     try {
        this.fs = this.session.deviceStreams[0].info.sps
     } catch (error) {
        this._hideLoader()
        reject('Please Connect a Device')
     }

     let time_delay = Math.abs(Math.round((this.props.timestamps.start -  this.props.timestamps.startEEG)/1000))
    
     let finalData = []
     let fs = this.fs


     // Pick Headset and Splice Number of Channels
     if (this.session.deviceStreams[0].info.deviceName == "muse") {
       for (const x in data.slice(0, 4)) { 
          finalData.push(data[x]["raw"].slice(time_delay*Math.round(this.fs), data[x]["raw"].length+1)) 
        
        }

      } else {
        for (const x in data.slice(0, 8)) {
          finalData.push(data[x]["raw"].slice(time_delay*Math.round(this.fs), data[x]["raw"].length+1))
        }
      }

     console.log(finalData[0].length)

     if (finalData[0].length < fs*5) {
      this._hideLoader()
      reject("We are still collecting data, no emotion detected")
     }

    // data.forEach((item, index, array) => {
    //   console.log(array)
    // })

     let url = 'http://127.0.0.1:5000/emotions'
     let body = {
         finalData,
         fs
     }

     // Send to server
    //  fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5000/", "Content-Type": "application/json"} })
    // .then(response => response.json())
    // .then(emotion => {

    //      // Get Video Back
    //      console.log(emotion)
    //      this._hideLoader()
    //      this._appendMessage(`You: ${message}`, this.colors[emotion])
    //      return await this.colors[emotion]
         
    //      // Display Video
         
    //  }).catch((error) => {
    //   this._hideLoader()
    //   this._appendMessage(`You: ${message}`)
    //   alert("Error detecting your emotion: "+error)
    //   return

    //  });
    let response = await fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5000/", "Content-Type": "application/json"} })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    let pred = await response.json()
    console.log(pred)
    this._hideLoader()
    this._appendMessage(`You: ${message}`, this.colors[pred])
    resolve(this.colors[pred])
  })
}

_onMessageSendHack = (message) => {

  return new Promise(async (resolve, reject) => {

     this._showLoader()

     let finalData = this.emotionData

     console.log(finalData.length)

     if (finalData.length < 40) {
      this._hideLoader()
      reject("We are still collecting data, no emotion detected")
     }

    // data.forEach((item, index, array) => {
    //   console.log(array)
    // })

     let url = 'http://127.0.0.1:5000/emotionshack'
     let body = {
         finalData,
     }

     // Send to server
    //  fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5000/", "Content-Type": "application/json"} })
    // .then(response => response.json())
    // .then(emotion => {

    //      // Get Video Back
    //      console.log(emotion)
    //      this._hideLoader()
    //      this._appendMessage(`You: ${message}`, this.colors[emotion])
    //      return await this.colors[emotion]
         
    //      // Display Video
         
    //  }).catch((error) => {
    //   this._hideLoader()
    //   this._appendMessage(`You: ${message}`)
    //   alert("Error detecting your emotion: "+error)
    //   return

    //  });
    let response = await fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5000/", "Content-Type": "application/json"} })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    let pred = await response.json()
    console.log(pred)
    this._hideLoader()
    // this._appendMessage(`You: ${message}`, this.colors[pred])
    resolve(this.colors[pred])
  })
}

// _auth = () => {
  
//   return new Promise(async (resolve, reject) => {

//     let starttime = this.props.timestamps.startTrial
//     let stoptime = this.props.timestamps.stopTrial
//     let labels = this.characterSequence
    
//     let url = 'http://127.0.0.1:5001/auth'
//     let body = {
//         starttime,
//         stoptime,
//         labels
//     }

//     let response = await fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5001/", "Content-Type": "application/json"} })
      
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     let pred = await response.json()
//     console.log(pred)
//     // this._hideLoader()
//     // this._appendMessage(`You: ${message}`, this.colors[pred])
//     resolve(pred)

//   })
// }

_sendP300 = () => {
  
  return new Promise(async (resolve, reject) => {

    let starttime = this.props.timestamps.startTrial
    let stoptime = this.props.timestamps.stopTrial
    let labels = this.characterSequence
    let data = this.P300data
    
    let url = 'http://127.0.0.1:5000/p300'
    let body = {
        starttime,
        stoptime,
        labels,
        data

    }

    let response = await fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {"Access-Control-Allow-Origin": "http://127.0.0.1:5000/", "Content-Type": "application/json"} })
      
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let pred = await response.json()
    // console.log(pred)
    // this._hideLoader()
    // this._appendMessage(`You: ${message}`, this.colors[pred])
    resolve(pred)

  })
}

runParadigm = () => {
  
  let light_unlit = (char_index,state) => {
    
    let stim_colour = null;
    
    if(state==0) {
      stim_colour = "white";
    } else {
      stim_colour = "red";
    }
    
    switch(char_index) {
    case 1: document.getElementById('A').style.color =  stim_colour; break;
    case 2: document.getElementById('B').style.color =  stim_colour; break;
    case 3: document.getElementById('C').style.color =  stim_colour; break;
    case 4: document.getElementById('D').style.color =  stim_colour; break;
    case 5: document.getElementById('E').style.color =  stim_colour; break;
    case 6: document.getElementById('F').style.color =  stim_colour; break;
    case 7: document.getElementById('G').style.color =  stim_colour; break;
    case 8: document.getElementById('H').style.color =  stim_colour; break;
    case 9: document.getElementById('I').style.color =  stim_colour; break;
    case 10: document.getElementById('J').style.color =  stim_colour; break;
    case 11: document.getElementById('K').style.color =  stim_colour; break;
    case 12: document.getElementById('L').style.color =  stim_colour; break;
    case 13: document.getElementById('M').style.color =  stim_colour; break;
    case 14: document.getElementById('N').style.color =  stim_colour; break;
    case 15: document.getElementById('O').style.color =  stim_colour; break;
    case 16: document.getElementById('P').style.color =  stim_colour; break;
    case 17: document.getElementById('Q').style.color =  stim_colour; break;
    case 18: document.getElementById('R').style.color =  stim_colour; break;
    case 19: document.getElementById('S').style.color =  stim_colour; break;
    case 20: document.getElementById('T').style.color =  stim_colour; break;
    case 21: document.getElementById('U').style.color =  stim_colour; break;
    case 22: document.getElementById('V').style.color =  stim_colour; break;
    case 23: document.getElementById('W').style.color =  stim_colour; break;
    case 24: document.getElementById('X').style.color =  stim_colour; break;
    case 25: document.getElementById('Y').style.color =  stim_colour; break;
    case 26: document.getElementById('Z').style.color =  stim_colour; break;
    case 27: document.getElementById('0').style.color =  stim_colour; break;
    case 28: document.getElementById('1').style.color =  stim_colour; break;
    case 29: document.getElementById('2').style.color =  stim_colour; break;
    case 30: document.getElementById('3').style.color =  stim_colour; break;
    case 31: document.getElementById('4').style.color =  stim_colour; break;
    case 32: document.getElementById('5').style.color =  stim_colour; break;
    case 33: document.getElementById('6').style.color =  stim_colour; break;
    case 34: document.getElementById('7').style.color =  stim_colour; break;
    case 35: document.getElementById('8').style.color =  stim_colour; break;
    case 36: document.getElementById('9').style.color =  stim_colour; break;
    default: 
    }
  
  }

  let shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  let flash = () => {
    
    let d = new Date();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let n = d.getMilliseconds();
    console.log(m*60*1000+1000*s+n); // output second+ms to console log

    if(i===0) {
      this.props.timestamps.startTrial = Date.now()
    }
                  
    if(i<c) {
      
      let flash_index = new_chars[i];
      
      light_unlit(flash_index,1); // highlight element
      this.characterSequence.push([flash_index, Date.now()])
      
      setTimeout(
        () => {
          light_unlit(flash_index,0); // revert element to default colour after flash
          
          let d = new Date();
          let m = d.getMinutes();
          let s = d.getSeconds();
          let n = d.getMilliseconds();
          console.log(m*60000+1000*s+n); // output second+ms to console log
          
          setTimeout(flash,ISI);
        }
      ,flash_time);
      
      // console.log(this.characterSequence)
    } else {
      this.props.timestamps.stopTrial = Date.now()
      console.log("done")
      this.socket.emit('P300done')
    }
  
    i++;
  
  }

  let number_of_trials = 2;
  
  let all_chars = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
  let new_chars = shuffle(all_chars);
  number_of_trials--;
  
  for (let a=0; a<number_of_trials; a++) {
    let temp_chars = shuffle(all_chars);
    new_chars = new_chars.concat(temp_chars);
  }
  
  // console.log(new_chars) -> this is the sequence of letters. no need to append
  let c=new_chars.length;
  let i=0;
  
  let d = new Date();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let n = d.getMilliseconds();
  console.log(m*60*1000+1000*s+n); // output second+ms to console log
  setTimeout(flash,2000);
  // 2 second pause before stimulus presentation starts
  
  let flash_time = 100;
  let ISI = 100;
      
}

_deviceConnected = () => {
    // let museButton = document.getElementById(`${this.props.id}`).querySelector(`[id="musebutton"]`)
    // museButton.style.display = 'none'
    this.props.timestamps.startEEG =  Date.now()
}

_auth = () => {
  var input = document.getElementById('uname').value;
  alert(input);
  var input2 = document.getElementById('psw').value;
  alert(input2)
}

}

export {UI}
