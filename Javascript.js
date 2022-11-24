					// JAVA
					// SCRIPT
					
					
					
					
										// HTML/CSS
<html>
<head>
			<title> Techn0Shaman's Cyberverse</title>
</head>
<body>
	<script>
		console.log("hi there");
	</script>
</body>
<html>

alert("use words here");
console.log("use words here");
console.log("use words here"); alert("use words here");

<html>
<body>									
<script src="javascrip0.js"></script>
<script src="javascript1.js"></script>
<script src="javascript2.js"></script>
</body>
</html>

				// Variables allow you to store information and pull it back up at another time
var name = "Techn0Shaman"
alert("name");

var message = "Hello there! ^___^ "
alert(message);

var myage = "23"
myage + 20;
43



					// if/else statement
var age = 23
if (age < 21 ) {
alert("too young sorry!")
}

var age = 23
if (age < 21 ) {
alert("too young sorry!")
} else{
alert("Welcome!")
}

var age = 16;
age = 15;
if(age < 16) {
alert("You can not drive\!");
}
LT Less than
GT Greater than
LT= Less than or equal to
GT= Greater than or equal to
== equal to
!= not equal to

There are also "strict" equality types
=== same value and same type
!== not same value and same type

For example:
"2" == 2 will be true - even though they're different types, they're considered equal
"2" === 2 will be false because the second value is a number type, where the first is a string type
You should use the triple === whenever possible, as it's more specific.




					// ARRAYS stores a list of items[uses a zero index]					

var mylist = ['eggs', 'milk', 'fruit', 'meat'];
mylist
['eggs', 'milk', 'fruit', 'meat']
mylist[0]
"eggs"
mylist[1]
"milk"

prompt()
"Techn0Shaman"
var name = prompt()
name
"Techn0Shaman"
lastname
var name = prompt('What is your first name?'); var lastname= prompt('What is your last name?'); alert(name+','+lastname);	


									// FUNCTIONS
// piece of code that does one or more actions
								
function go(name, age){
	alert(name);
	alert(age);
}	
go('Techn0Shaman, 23);						
go('Name2', 23);

function add(first, second) {
return first+second;
//return'Techn0Shaman';	
}
var sum = add(1, 2);
alert(sum);


var a;
alert( a );

					// ONCLICK
					
room.onClick = function()
{
	print(distance(player.cursor_pos,room.objects["assetjobjectid"].pos) < 1);
	if(distance(player.cursor_pos,room.objects["assetjobjectid"].pos) < 1)
	{
		room.objects["assetjobjectid"].visible = !room.objects["assetjobjectid"].visible;
	}
	if(distance(player.cursor_pos,room.objects["assetjobjectid"].pos) < 1)
	{
		room.objects["assetjobjectid"].visible = !room.objects["assetjobjectid"].visible;
	}
}				

// <Light js_id="OmniLight1" pos="-6 1.5 0" light_intensity="10" light_cone_angle="0" light_cone_exponent="1" light_range="16" />
- example stuff in the roomcode
to turn it on, you'd do like
NEW MESSAGES
//Spyduck - Today at 9:59 PM
room.objects["OmniLight1"].light_cone_angle = 0 // anywhere from 0 to 1 is "on", 1 is directional, 0 is omni, between is spotlight
to turn it off just set that number to -1
	




























