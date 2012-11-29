var btnX: float;
var btnY: float;
var btnW: float;
var btnH: float;
var refresh: boolean;
var gameName: String = "BallerSphere";
var hostData: HostData[]; 
var spawnObject: Transform;
var playerPrefab: GameObject;

function OnGUI(){
	if(!Network.isClient && !Network.isServer){
		if(GUI.Button(Rect(btnX,btnY,btnW, btnY),"Connect to the Server")){
			Debug.Log("server started");
			startserver();
		}
	
		if(GUI.Button(Rect(btnX,btnY+20,btnW, btnY),"Refresh the Host")){
			Debug.Log("refresh function called");
			refreshHosts();
		}
		
		if(hostData !=null){
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

function startserver(){
	Network.InitializeServer(32,25001,!Network.HavePublicAddress);
	MasterServer.RegisterHost(gameName,"Tutorial Game name", "Tutorial");
}

function Update(){
	if(refresh){
		if(MasterServer.PollHostList().length > 0){
			refresh = false;
			Debug.Log(MasterServer.PollHostList().length);
			hostData = MasterServer.PollHostList();
		}
	}
}

function spawnPlayer(){
	Network.Instantiate(playerPrefab, spawnObject.position,Quaternion.identity,0);
}

function OnConnectedToServer(){
	Debug.Log("The player should spawn bitch");
	spawnPlayer();
}

function refreshHosts(){
	MasterServer.RequestHostList(gameName);
	refresh = true; 
}

function OnMasterServerEvent(mse:MasterServerEvent){
	if(mse ==MasterServerEvent.RegistrationSucceeded){
		Debug.Log("Registration Succeeded Bitch");
		}
}

function OnServerInitialized(){
	Debug.Log("Server is initialized");
	spawnPlayer();
}