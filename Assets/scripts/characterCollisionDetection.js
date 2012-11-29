#pragma strict

function Start () {

}

function Update () {

}

//detects if something has entered the same 3d space as the 
//current object(a character controller, or gameobject with a collider).
//This is one of the implicit functions that will respond to something happening in the unity game, these implicit functions
//usually start with 'On'
function OnTriggerEnter(other:Collider){
	if(other.gameObject.tag == "bullet")
	{
		Debug.Log("Collider Detected");//if object entering the current object is tagged with "bullet" (which is configured in the bullet_pfb)
		Destroy(other.gameObject);//destroys the other object(the bullet prefab in this case)
		Destroy(gameObject); //destroys the current game object, in this case the current character controller. 
		}
}

//alternative that doesn't work. 
//function OnCollisionEnter (other : Collision) 
//{ 
//    if (other.gameObject.name == "bullet_prf") { 
//       Debug.Log("Collision");
//   } 
//}