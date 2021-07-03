const express = require('express')
const app = express()
const port = 3000
const path = require("path")

var Gpio = require('onoff').Gpio;
var BlueLEDPin = new Gpio(26, 'out'); 
var GreenLEDPin = new Gpio(19, 'out'); 
var RedLEDPin = new Gpio(13, 'out'); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/lights.html'));
})

let greenLightState = 0;
app.get("/toggleGreenLight", (req, res) => {
  greenLightState = greenLightState === 0 ? 1 : 0;
  GreenLEDPin.writeSync(greenLightState)
  res.sendStatus(200);
})
app.get("/greenLight", (req, res) => {
  res.json({"state": GreenLEDPin.readSync()})
})

let blueLightState = 0;
app.get("/toggleBlueLight", (req, res) => {
  blueLightState =blueLightState === 0 ? 1 : 0;
  BlueLEDPin.writeSync(blueLightState)
  res.sendStatus(200);
})
app.get("/blueLight", (req, res) => {
  res.json({"state": BlueLEDPin.readSync()})
})

let redLightState = 0;
app.get("/toggleRedLight", (req, res) => {
  redLightState =redLightState === 0 ? 1 : 0;
  RedLEDPin.writeSync(redLightState)
  res.sendStatus(200);
})
app.get("/redLight", (req, res) => {
  res.json({"state": RedLEDPin.readSync()})
})

app.listen(port, () => {
  console.log(`Light controller listening on http://localhost:${port}`)
})

