room.onClick = function()
{
	print(distance(player.cursor_pos,room.objects["sink"].pos) < 1);
	if(distance(player.cursor_pos,room.objects["sink"].pos) < 1)
	{
		room.objects["sink"].visible = !room.objects["sink"].visible;
	}
	if(distance(player.cursor_pos,room.objects["shower"].pos) < 1)
	{
		room.objects["shower"].visible = !room.objects["shower"].visible;
	}
}