// Copyright (c) 2015 Chang Sau Sheong
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
Accel.init();

var main = new UI.Window({
	fullscreen: true,
});

// white background -- I have a white Pebble :)
var rect = new UI.Rect({
	position: new Vector2(0, 0),
	size: new Vector2(144, 168),
	backgroundColor: 'white',
});
main.add(rect);

// main time
var time = new UI.TimeText({
	position: new Vector2(0, 52),
	size: new Vector2(144, 30),
	font: 'bitham-42-medium-numbers',
	text: "%H:%M",
	color: 'black',
	textAlign: 'center'
});
main.add(time);

// day, date, month
var date = new UI.TimeText({
	position: new Vector2(0, 90),
	size: new Vector2(144, 30),
	font: 'gothic-24-bold',
	text: "%a, %d %b",
	color: 'black',
	textAlign: 'center'
});
main.add(date);

// overall PSI hourly reading
var overall = new UI.Text({
	position: new Vector2(3, 125),
	size: new Vector2(138, 30),
	font: 'gothic-18-bold',
	text: '',
	color: 'black',
	borderColor: 'black',
	textAlign: 'center'
});
main.add(overall);

// hourly PSI reading for northern Singapore
var north = new UI.Text({
	position: new Vector2(4, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});
main.add(north);

// hourly PSI reading for western Singapore
var west = new UI.Text({
	position: new Vector2(32, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});
main.add(west);

// hourly PSI reading for central Singapore
var center = new UI.Text({
	position: new Vector2(60, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});
main.add(center);

// hourly PSI reading for eastern Singapore
var east = new UI.Text({
	position: new Vector2(88, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});
main.add(east);

// hourly PSI reading for southern Singapore
var south = new UI.Text({
	position: new Vector2(116, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: "",
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});
main.add(south);

// function used to update PSI readings from server
var update = function() { 
	ajax({
		url: 'http://sghazeserv.herokuapp.com/psi/region/all',
		type: 'json'
	},
	function(data) {
		north.text(data.readings.north);
		west.text(data.readings.west);
		center.text(data.readings.center);
		east.text(data.readings.east);
		south.text(data.readings.south);
		overall.text(data.readings.overall + " " + data.descriptors.overall);
	});
};
// update on startup
update();
main.show();

// update again on accelerator tapping
main.on('accelTap', function(e) {
	update();
	Vibe.vibrate('short');
});
