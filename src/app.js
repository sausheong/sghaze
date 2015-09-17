var ajax = require('ajax');
var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Window({
	fullscreen: true,
});

ajax({
		url: 'http://sghazeserv.herokuapp.com/psi/region/all',
		type: 'json'
	},
	function(data) {

		var rect = new UI.Rect({
			position: new Vector2(0, 0),
			size: new Vector2(144, 168),
			backgroundColor: 'white',
		});
		main.add(rect);

		var north = new UI.Text({
			position: new Vector2(0, 0),
			size: new Vector2(144, 30),
			font: 'bitham-34-medium-numbers',
			text: data.north,
			color: 'black',
			textAlign: 'center'
		});
		main.add(north);

		var south = new UI.Text({
			position: new Vector2(0, 118),
			size: new Vector2(144, 30),
			font: 'bitham-34-medium-numbers',
			text: data.south,
			color: 'black',
			textAlign: 'center'
		});
		main.add(south);
		
		var east = new UI.Text({
			position: new Vector2(0, 62),
			size: new Vector2(144, 30),
			font: 'bitham-34-medium-numbers',
			text: data.east,
			color: 'black',
			textAlign: 'right'
		});
		main.add(east);
		
		var west = new UI.Text({
			position: new Vector2(0, 62),
			size: new Vector2(144, 30),
			font: 'bitham-34-medium-numbers',
			text: data.west,
			color: 'black',
			textAlign: 'left'
		});
		main.add(west);				

		var center = new UI.Text({
			position: new Vector2(0, 62),
			size: new Vector2(144, 30),
			font: 'bitham-34-medium-numbers',
			text: data.center,
			color: 'black',
			textAlign: 'center'
		});
		main.add(center);				


	});

main.show();
