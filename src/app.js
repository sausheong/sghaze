var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
Accel.init();

var main = new UI.Window({
	fullscreen: true,
});

var rect = new UI.Rect({
	position: new Vector2(0, 0),
	size: new Vector2(144, 168),
	backgroundColor: 'white',
});
main.add(rect);

var time = new UI.TimeText({
	position: new Vector2(0, 52),
	size: new Vector2(144, 30),
	font: 'bitham-42-medium-numbers',
	text: "%H:%M",
	color: 'black',
	textAlign: 'center'
});
main.add(time);

var date = new UI.TimeText({
	position: new Vector2(0, 90),
	size: new Vector2(144, 30),
	font: 'gothic-24-bold',
	text: "%a, %d %b",
	color: 'black',
	textAlign: 'center'
});
main.add(date);

var overall = new UI.Text({
	position: new Vector2(3, 125),
	size: new Vector2(138, 30),
	font: 'gothic-18-bold',
	text: '',
	color: 'black',
	borderColor: 'black',
	textAlign: 'center'
});

var north = new UI.Text({
	position: new Vector2(4, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});

var west = new UI.Text({
	position: new Vector2(32, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});

var center = new UI.Text({
	position: new Vector2(60, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});

var east = new UI.Text({
	position: new Vector2(88, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: '',
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});

var south = new UI.Text({
	position: new Vector2(116, 0),
	size: new Vector2(25, 25),
	font: 'gothic-18-bold',
	text: "",
	color: 'white',
	backgroundColor: 'black',
	textAlign: 'center'
});

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

		main.add(north);
		main.add(west);
		main.add(center);
		main.add(east);
		main.add(south);

		overall.text(data.readings.overall + " " + data.descriptors.overall);
		main.add(overall);
	});

main.show();

main.on('accelTap', function(e) {
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

	Vibe.vibrate('short');
});
