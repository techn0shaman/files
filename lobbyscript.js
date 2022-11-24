// When true, disable js effects
var boats = [];
var deg_to_rad = 3.14159 / 180.0;
var globalTime = 0.0;
var toggle = true;

function Boat(js_id_p, id_p, snd_id_p, pos_p) {
	
	this.on = false;
	this.js_id = js_id_p;
	this.snd_js_id = "snd_" + js_id_p;
	this.id = id_p;
	this.snd_id = snd_id_p;
	this.initial_pos = pos_p;
    this.pos = pos_p;
	this.goForward = false;
	this.rotateLeft = false;
	this.rotateRight = false;
	this.rotateCounter = 0.0;
	this.speed = 8.0; //in metres per second
	this.turnRate = 60.0; //in degrees per second

	room.createObject("Object", {js_id: this.js_id, id:this.id, pos: this.pos});
	room.createObject("Sound", {js_id: this.snd_js_id, id:this.snd_id, pos: this.pos});

	this.controls = function(delta_time) {
		delta_time_sec = delta_time/1000.0;
		var boat = room.objects[this.js_id];

		// Make the boat going forward when holding W
		if (this.goForward) {
			var vel = (delta_time_sec * this.speed);		
			boat.pos.z += vel * boat.xdir.x;
			boat.pos.x -= vel * boat.xdir.z;
		}

		// Rotate the boat when holding A or D
		if (this.rotateLeft) {
			this.rotateCounter += delta_time_sec * this.turnRate;
			rotateObject(this.js_id, this.rotateCounter * deg_to_rad);
		} 
		else if (this.rotateRight) {
			this.rotateCounter -= delta_time_sec * this.turnRate;
			rotateObject(this.js_id, this.rotateCounter * deg_to_rad);
		}

		// Stay fixed on the boat (also prevent teleporting)
		player.pos.x = boat.pos.x;
		player.pos.y = boat.pos.y;
		player.pos.z = boat.pos.z;

		var snd = room.objects[this.snd_js_id];
		snd.pos.x = boat.pos.x;
		snd.pos.y = boat.pos.y;
		snd.pos.z = boat.pos.z;

		boat.sync = true;	
	}

	this.onKeyDown = function(event) {
		// Use or leave the boat
		if (event.keyCode == 'B') {	
			var dist = distance(player.pos, room.objects[this.js_id].pos);

			if (dist < 2) {
				this.on = !this.on;
			}
		
			print("Distance to " + this.js_id + " " + dist);
			if (this.on) {
				room.playSound(this.snd_js_id, true); //play the engine sound
				print("You're on the boat (W: move forward; A/D: turn left/right; B: leave)");
			}
			else {
				room.stopSound(this.snd_js_id); //stop the engine sound
				print("You're off the boat");
			}
		}
	
		if (this.on) {
			// Forward
			if (event.keyCode == 'W') {
				event.preventDefault();			
				this.goForward = true;
			}
		
			// Rotate left
			if (event.keyCode == 'A') {
				event.preventDefault();			
				this.rotateLeft = true;
			}
		
			// Rorate right
			if (event.keyCode == 'D') {
				event.preventDefault();			
				this.rotateRight = true;
			}
		}
	}

	this.onKeyUp = function(event) {
		if (this.on) {
			// Forward
			if (event.keyCode == 'W') {
				event.preventDefault();			
				this.goForward = false;
			}
		
			// Rotate left
			if (event.keyCode == 'A') {
				event.preventDefault();			
				this.rotateLeft = false;
			}
		
			// Rorate right
			if (event.keyCode == 'D') {
				event.preventDefault();			
				this.rotateRight = false;		
			}
		}
	}	

	this.update = function() {
		var waveHeight = 0.25;
		var calc = (Math.sin(globalTime/1000)/4) * waveHeight;
		room.objects[this.js_id].pos.y = this.initial_pos.y + calc;
	}

	this.getInfo = function() {
		print(" Boat: " + this.js_id + " " + room.objects[this.js_id].pos);
	}
}

/**
 * Rotate an object.
 * @param jsId: Object's js_id
 * @param t: An incrementing counter, can be globalTime
 *				A negative value rotate clockwise, a negative one anticlockwise
 */
var rotateObject = function(jsId, t) 
{	
	room.objects[jsId].xdir.x = Math.sin(t);
	room.objects[jsId].xdir.y = 0.0;
	room.objects[jsId].xdir.z = Math.cos(t)

	room.objects[jsId].zdir.x = -Math.cos(t);
	room.objects[jsId].zdir.y = 0.0;
	room.objects[jsId].zdir.z = Math.sin(t);
}


///// Events /////
room.onLoad = function() 
{
	//How to use:
	//Create a "boat" like the following, the parameters are
	//  js_id (of the object)
	//  id (connects the object to the AssetObject)
	//  sound_id (the sound to play/repeat when the boat is being ridden)
	//  pos (where the Boat should be placed initially in the scene)
    var b0 = new Boat("boat0", "lapras", "music", Vector(-21,47.799999,144.300003));
	var b1 = new Boat("boat1", "boat", "music", Vector(8.900001,48.100002,118.200005));
	var b2 = new Boat("boat2", "boat", "music", Vector(12.873913,48.157768,118.787148));

	//since lapras is badass, we can make him "custom" and extra awesome
	b0.speed = 10.0;
	b0.turnSpeed = 90.0;

	boats.push(b0);
	boats.push(b1);
	boats.push(b2);
}

room.update = function(delta_time) {
	globalTime += delta_time;
	
	if (toggle) {
		for (var i=0; i<boats.length; ++i) {
			boats[i].update();

			if (boats[i].on) {
				boats[i].controls(delta_time);
			}
		}
	}
}

room.onKeyDown = function(event)
{
	// Toggle JS
	if (event.keyCode == 'J') {
		toggle = !toggle;
		print("Toggle JS: now " + toggle);
		for (var i=0; i<boats.length; ++i) {
			boats[i].getInfo();
		}
	}
	
	for (var i=0; i<boats.length; ++i) {
		boats[i].onKeyDown(event);
	}
}

room.onKeyUp = function(event)
{
	for (var i=0; i<boats.length; ++i) {
		boats[i].onKeyUp(event);
	}
}


