
//causes the object(that this script is applied to) to respond by changing the network view of the object.
//We use a vector to pass the newColor rbg color inputs( (1,0,0) represents the color red);
//The networkView.RPC function syntax is available in the unity scriping reference manual.
//networkView.RPC specifies the network function to call, the way it should show up 
//to everyone connectect to the game, and the variable to pass to the function
function OnTriggerEnter(){ 
	var newColor:Vector3 = Vector3(1,0,0);
	networkView.RPC("SetColor", RPCMode.AllBuffered, newColor);
}

@RPC
function SetColor(newColor:Vector3){
	renderer.material.color = Color(newColor.x,newColor.y,newColor.z,1);
}