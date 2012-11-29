#pragma strict

var bullet : GameObject;

function Start () {
}

function Update () {
	if(Input.GetKeyDown("space")){
		Instantiate(bullet,transform.position, transform.rotation);
	}
}
