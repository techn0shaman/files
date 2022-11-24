var updateposcounter = 0;

room.update = function(delta_time) 
{
    updateposcounter++;

    //moves sphere on the y axis with sin of updateposcounter
    room.objects["sphere"].pos.y = Math.sin(updateposcounter/100)
}