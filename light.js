room.update = function(dt)
{
	lightsync()
}

function lightsync()
{
	var flashlight = room.getObjectById("js_flashlight");
	var lightobj = room.getObjectById("js_lamp_obj");
	var light = room.getObjectById("js_lamp_light");
	if (light != null && lightobj != null && flashlight != null)
	{
		if (lightobj.lighting == false)
		{
			light.light_cone_angle = 0;
			flashlight.light_cone_angle = -1;
		}
		else if (lightobj.lighting == true)
		{
			light.light_cone_angle = -1;
			flashlight.light_cone_angle = 0;
		}
	}
}

room.onMouseUp = function()
{
	var light = room.getObjectById("js_lamp_light");
	if (light != null)
	{
		if (light.light_cone_angle == 0)
		{
			light.light_cone_angle = -1;
			room.getObjectById("js_lamp_obj").lighting = true;
		}
		else
		{
			light.light_cone_angle = 0;
			room.getObjectById("js_lamp_obj").lighting = false;
		}
		room.getObjectById("js_lamp_obj").sync = true;
	}
}