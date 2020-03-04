

var names = ["vaser888", "TechPony", "lollipony", "TheFloatingTree", "PennyWren", "VanillaGhosties",
"aemantaslim", "JeNnDyLyOn", "RenardeLouve", "stratodraw", "SPW", "AnderDragon", "Pucksterv", 
"TheOtherDash", "TwoKinds"];
var numberOfUsers = names.length-1;


// searchs for streams that are live and display any that are live 
for (i=0; i<= numberOfUsers; i++) {

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var thumbnail = myObj.thumbnails.web;
			var artistName = myObj.name;
			var onlineTest = myObj.online;
			var nsfwTest = myObj.adult;
			
			
			if (onlineTest === true){
				
				if(nsfwTest === true){
					var para = document.createElement('p');
					para.innerHTML = '<center><a href= https://picarto.tv/' + artistName + ' title="http://example.com">'+artistName+'</a>';
					document.getElementById("rightColumn").appendChild(para);	
				}
				
				else {
				var linkElement = document.createElement('a');
				linkElement.href = "https://picarto.tv/" + artistName;

				var image = document.createElement("img");
				image.setAttribute("src", thumbnail);
				image.setAttribute("style", "width:95%; display: block; margin-left: auto;margin-right: auto");
				linkElement.appendChild(image);

				document.getElementById("rightColumn").appendChild(linkElement);

				var para = document.createElement('p');
				para.innerHTML = '<center><a href= https://picarto.tv/' + artistName + ' title="http://example.com">'+artistName+'</a>';
				document.getElementById("rightColumn").appendChild(para);
				}
			}
			
		}		  
	};
	xmlhttp.open("GET", "https://api.picarto.tv/v1/channel/name/" + names[i], true);
	xmlhttp.send();
}

// get previous game NHL data and display it
var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			//document.getElementById("previousGame").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
			//var prevHome = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
			//var prevAway = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.name;
			//var prevHomeScore = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
			//var prevAwayScore = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
			
			//var para = document.createElement('p');
			//para.innerHTML = prevHome + " VS. " + prevAway + "<br>" + 
			//prevHomeScore + " " + prevAwayScore;
			//document.getElementById("previousGame").appendChild(para);
			
			document.getElementById("previousHome").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
			document.getElementById("previousAway").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.name;
			document.getElementById("previousHomeScore").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
			document.getElementById("previousAwayScore").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
			
			
		}
	};
xmlhttp.open("GET", "https://statsapi.web.nhl.com/api/v1/teams/8?expand=team.schedule.previous" , true);
xmlhttp.send();

/* var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			var currentGameId = myObj.teams[0].nextGameSchedule.dates[0].games[0].gamePk;
			//document.getElementById("currentHome").innerHTML = myObj.teams[0].nextGameSchedule.dates[0].games[0].gamePk;
			document.getElementById("nextHome").innerHTML = myObj.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name;
			document.getElementById("nextAway").innerHTML = myObj.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name;

		}

	};
xmlhttp.open("GET", "https://statsapi.web.nhl.com/api/v1/teams/8?expand=team.schedule.next" , true);
xmlhttp.send(); */

fetch("https://statsapi.web.nhl.com/api/v1/teams/8?expand=team.schedule.next").then(function (r) { return r.json() }).then(function (json0) {
	//console.log(json);
	document.getElementById("nextGameDate").innerHTML = "Next game: " + json0.teams[0].nextGameSchedule.dates[0].date;
	document.getElementById("nextHome").innerHTML =json0.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name;
	document.getElementById("nextAway").innerHTML =json0.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name;
	var testj = json0.teams[0].nextGameSchedule.dates[0].games[0].gamePk;
	fetch("https://statsapi.web.nhl.com/api/v1/game/"+testj+"/feed/live").then(function (r) { return r.json() }).then(function (json1) {
		console.log(json1);
		document.getElementById("currentAway").innerHTML = json1.gameData.teams.away.abbreviation;
		document.getElementById("currentHome").innerHTML = json1.gameData.teams.home.abbreviation;
		document.getElementById("currentAwayScore").innerHTML = json1.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals;
		document.getElementById("currentHomeScore").innerHTML = json1.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals;
		document.getElementById("currentAwayShots").innerHTML = json1.liveData.linescore.teams.away.shotsOnGoal;
		document.getElementById("currentHomeShots").innerHTML = json1.liveData.linescore.teams.home.shotsOnGoal;	
	})

})