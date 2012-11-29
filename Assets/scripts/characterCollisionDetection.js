#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter(other:Collider){
	if(other.gameObject.tag == "bullet")
	{
		Debug.Log("Collider Detected");
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter (other : Collision) 
{ 
    if (other.gameObject.name == "bullet_prf") { 
       Debug.Log("Collision");
   } 
}