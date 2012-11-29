#pragma strict
var speed: float = 3000;

function Start () {
	Invoke ("destroy_bullet", 2.0);
}

function Update () {
	transform.Translate(Vector3.forward * speed * Time.deltaTime); 
}

function destroy_bullet(){
	Destroy(gameObject);
}