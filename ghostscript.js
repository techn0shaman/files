var onGhost=false;
var oldwalk_speed = room.walk_speed;
var oldrun_speed = room.run_speed;
var oldjump_velocity = room.jump_velocity;


room.onKeyDown = function(event) {
  // Use or leave the boat
  if (event.keyCode == 'B') {	
    var dist = distance(player.pos, room.objects["TECHNOSHAMAN-1-1528563899"].pos);

    if (dist < 2) {
      onGhost = !onGhost;
    }
  }
  if (onGhost) {
    room.walk_speed =20;
    room.run_speed =20;
    room.jump_velocity=0;
    room.objects["TECHNOSHAMAN-1-1528563899"].collision_id="";
  }else{
    room.walk_speed =oldwalk_speed;
    room.run_speed =oldrun_speed;
    room.jump_velocity=oldjump_velocity;
    room.objects["TECHNOSHAMAN-1-1528563899"].collision_id="http://techn0shaman.one/misc/Ghost/Ghost.DAE";
  }
}

room.update = function() {
  
}


//euler angles to rotation matrix
function rotateXYZ(xrot, yrot, zrot, rot){
    var A       = Math.cos(xrot);
    var B       = Math.sin(xrot);
    var C       = Math.cos(yrot);
    var D       = Math.sin(yrot);
    var E       = Math.cos(zrot);
    var F       = Math.sin(zrot);

    room.objects[rot].xdir = Vector(A*E , A*F , -B);
    room.objects[rot].ydir = Vector(D*B*E - C*F , D*B*F + C*E , A*D);
    room.objects[rot].zdir = Vector(C*B*E + D*F , C*B*F - D*E , A*C);
}


room.update = function() {
  if (onGhost) {
    var playerxrot= Math.atan2( -player.view_dir.z,player.view_dir.x);
    rotateXYZ(playerxrot, 0, 0, "TECHNOSHAMAN-1-1528563899");
    room.objects["TECHNOSHAMAN-1-1528563899"].pos.x =player.pos.x;
    room.objects["TECHNOSHAMAN-1-1528563899"].pos.y =player.pos.y;
    room.objects["TECHNOSHAMAN-1-1528563899"].pos.z =player.pos.z;
  }
}


