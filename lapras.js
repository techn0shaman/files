// When true, disable js effects
var toggle = true;
var onLapras = false;

var LaprasGoForward = false;
var LaprasRotateLeft = false;
var LaprasRotateRight = false;
var rotateLaprasCounter = 0.0;
var LaprasSpeed = 9.0; //in metres per second
var LaprasTurnRate = 70.0; //in degrees per second
var deg_to_rad = 3.14159 / 180.0;

var globalTime = 0.0;

room.update = function(delta_time) {
	globalTime += delta_time;
	
	if (toggle) {		
		//LaprasEffects();
		
		if (onLapras) {
			LaprasControls(delta_time);
		}
	}
}

var LaprasControls = function(delta_time) {

	delta_time_sec = delta_time/1000.0;
	var jsId = "Lapras";
	var Lapras = room.objects[jsId];

	// Make the Lapras going forward when holding W
	if (LaprasGoForward) {
		var vel = (delta_time_sec * LaprasSpeed);		
		Lapras.pos.z += vel * room.objects[jsId].xdir.x;
		Lapras.pos.x -= vel * room.objects[jsId].xdir.z;
	}

	// Rotate the Lapras when holding A or D
	if (LaprasRotateLeft) {
		rotateLaprasCounter += delta_time_sec * boatTurnRate;
		rotateObject(jsId, rotateLaprasCounter * deg_to_rad);
	} else if (LaprasRotateRight) {
		rotateLaprasCounter -= delta_time_sec * boatTurnRate;
		rotateObject(jsId, rotateLaprasCounter * deg_to_rad);
	}
	
	// Stay fixed on the Lapras (also prevent teleporting)
	player.pos.x = Lapras.pos.x;
	player.pos.y = Lapras.pos.y;
	player.pos.z = Lapras.pos.z;

	var snd = room.objects["music_snd"];
	snd.pos.x = Lapras.pos.x;
	snd.pos.y = Lapras.pos.y;
	snd.pos.z = Lapras.pos.z;

	boat.sync = true;	
}

var boatEffects = function() {
	float("Lapras", -1.85, 0.5);
}


///// Utils /////

/**
 * Make an object seems to float.
 */
var float = function(jsId, offset, multiplier) {
	var calc = (Math.sin(globalTime/1000)/5 + 0.5) * multiplier;
	
	room.objects[jsId].pos.y = calc + offset;
}

/**
 * Rotate an object.
 * @param jsId: Object's js_id
 * @param t: An incrementing counter, can be globalTime
 *				A negative value rotate clockwise, a negative one anticlockwise
 */
var rotateObject = function(jsId, t) {	
	room.objects[jsId].xdir.x = Math.sin(t);
	room.objects[jsId].xdir.y = 0.0;
	room.objects[jsId].xdir.z = Math.cos(t)

	room.objects[jsId].zdir.x = -Math.cos(t);
	room.objects[jsId].zdir.y = 0.0;
	room.objects[jsId].zdir.z = Math.sin(t);
}


///// Events /////

room.onKeyDown = function(event)
{
	// Toggle JS
	if (event.keyCode == 'J') {
		toggle = !toggle;
		print("Toggle JS: now " + toggle);
	}
	
	// Use or leave the boat
	if (event.keyCode == 'L') {
		var dist = distance(player.pos, room.objects["Lapras"].pos);

		if (dist < 2) {
			onLapras = !onLapras;
		}
		
		if (onLapras) {
			room.playSound("music_snd", true); //play the engine sound
			print("You're on the Lapras (W: move forward; A/D: turn left/right; B: leave)");
		}
		else {
			room.stopSound("music_snd"); //stop the engine sound
			print("You're off the Lapras");
		}
	}
	
	if (onBoat) {
		// Forward
		if (event.keyCode == 'W') {
			event.preventDefault();
			
			LaprasGoForward = true;
		}
		
		// Rotate left
		if (event.keyCode == 'A') {
			event.preventDefault();
			
			LaprasRotateLeft = true;
		}
		
		// Rorate right
		if (event.keyCode == 'D') {
			event.preventDefault();
			
			LaprasRotateRight = true;
		}
	}
}

room.onKeyUp = function(event)
{
	if (onLapras) {
		// Forward
		if (event.keyCode == 'W') {
			event.preventDefault();
			
			LaprasGoForward = false;
		}
		
		// Rotate left
		if (event.keyCode == 'A') {
			event.preventDefault();
			
			LaprasRotateLeft = false;
		}
		
		// Rorate right
		if (event.keyCode == 'D') {
			event.preventDefault();
			
			LaprasRotateRight = false;		
		}
	}
}

