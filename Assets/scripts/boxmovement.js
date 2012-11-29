var movement: float;

function Start(){}

function Update(){
	transform.Translate(0, 0, movement * Time.deltaTime); 
}
