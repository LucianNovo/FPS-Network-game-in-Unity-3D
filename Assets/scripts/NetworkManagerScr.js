var btnX: float;
var btnY: float;
var btnW: float;
var btnH: float;
var refresh: boolean;
var gameName: String = "Totally unique game name";
var hostData: HostData[]; 
var spawnObject: Transform;
var playerPrefab: GameObject;

/*
Interface for the buttons, I've declared the variables here but assigned them in (the unity) application. That makes it easier
to see the actual location of the buttons. 
*/
function OnGUI(){
	if(!Network.isClient && !Network.isServer){ //As long as the user isn't connected as a server or client, the buttons will be available. Know that the buttons don't matter to anyone who's already connected to the server. 
		if(GUI.Button(Rect(btnX,btnY,btnW, btnY),"Connect to the Server")){
			Debug.Log("server started");
			startserver();//initiates the server
		}
	
		if(GUI.Button(Rect(btnX,btnY+20,btnW, btnY),"Refresh the Host")){
			Debug.Log("refresh function called");
			refreshHosts();//looks for the initialize game on the server, returns the option to connect if is. 
		}
		
		if(hostData !=null){//if the host data isn't null(which is assigned when the user refreshes the host), shows the options 
			for(var i:int =0;i<hostData.length;i++)
			{
				if(GUI.Button(Rect(btnX,btnY+40+(20*i),btnW,btnH),hostData[i].gameName))
					{
						Network.Connect(hostData[i]);
					}
			}
		}
		
	}
}

function startserver(){ // starts the server, specifies the name of the game for connecting later
	Network.InitializeServer(32,25001,!Network.HavePublicAddress);
	MasterServer.RegisterHost(gameName,"Tutorial Game name", "Tutorial");
}

function Update(){
	if(refresh){//if the refresh button has been pressed.
		if(MasterServer.PollHostList().length > 0){//if the  host list is longer than 0, meaning the host has actually registered the game(by means of another player initializing the server). 
			refresh = false;
			Debug.Log(MasterServer.PollHostList().length);//shows the number of games with the same gameName
			hostData = MasterServer.PollHostList();//assigns the hostData array to the list of games with the same name. 
		}
	}
}

function spawnPlayer(){
	Network.Instantiate(playerPrefab, spawnObject.position,Quaternion.identity,0);//creates the playerprefab at the location spcified.
}

//spawns the player who connects by refreshing the host, then pressing the button with the gameName in it.  
function OnConnectedToServer(){//immediately called when the server is connected 
	Debug.Log("The player should spawn."); 
	spawnPlayer();
}

function refreshHosts(){
	MasterServer.RequestHostList(gameName);//looks for the gameName on the (unity) Masterserver
	refresh = true; //see Update().
}

//verifies the connection to the masterserver
function OnMasterServerEvent(mse:MasterServerEvent){
	if(mse ==MasterServerEvent.RegistrationSucceeded){
		Debug.Log("Registration Succeeded");
		}
}

//Connects the player who initializes the server
function OnServerInitialized(){
	Debug.Log("Server is initialized");
	spawnPlayer();
}