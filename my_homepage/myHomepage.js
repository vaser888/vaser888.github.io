

var names = ["vaser888", "TechPony", "lollipony", "TheFloatingTree", "PennyWren", "VanillaGhosties",
"aemuhn", "JeNnDyLyOn", "RenardeLouve", "SPW", "AnderDragon", "Pucksterv", 
"TheOtherDash", "TwoKinds", "bluesound", "lilfunkman", "Neotheta", "ST4Z", "S6RR6", "Sketchiix3", 
"VulpesVant", "Selenophile"];
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
			
			var videoThumbnail = thumbnail;
			videoThumbnail = (videoThumbnail.substring(0, videoThumbnail.length - 3)) + "mp4";
			
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
				image.setAttribute("style", "width:95%; display: block; margin-left: auto;margin-right: auto;position:relative;");
				image.style.zIndex = "0";
				image.setAttribute("onmouseenter", "hide(this)");
				image.setAttribute("onmouseleave", "unhide(this)");
				
				linkElement.appendChild(image);
				
				var video = document.createElement("video");
				video.setAttribute("type", "video/mp4");
				video.setAttribute("muted", "");
				video.setAttribute("loop", "");
				video.setAttribute("autoplay", "");
				video.setAttribute("src", videoThumbnail);
				video.setAttribute("style", "width:95%; display: block; margin-left: auto;margin-right: auto;margin-top: -53.8%;");
				linkElement.appendChild(video);

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
			/*
			document.getElementById("previousHome").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
			document.getElementById("previousAway").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.name;
			document.getElementById("previousHomeScore").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
			document.getElementById("previousAwayScore").innerHTML = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
			*/

			var a = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.team.name;
			var b = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.team.name;
			var c = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.home.score;
			var d = myObj.teams[0].previousGameSchedule.dates[0].games[0].teams.away.score;
			var i = getLastGameInfo(a,b,c,d);
			makeTable(i,3,"lastGame");
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
	//console.log(json0);
	var w = "At " + json0.teams[0].nextGameSchedule.dates[0].games[0].venue.name;
	var utcDate = json0.teams[0].nextGameSchedule.dates[0].games[0].gameDate;
	var localDate = new Date(utcDate);

	var x = "Next game: " + localDate.toLocaleString("en-US", {hour:"numeric", hour12:true,year:"numeric", month:"numeric", day:"numeric", minute:"numeric"});//use can also use Long instead of numeric
	var y = innerHTML =json0.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name;
	var z =json0.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name;
	//document.getElementById("nextGameDate").innerHTML = "Next game: " + json0.teams[0].nextGameSchedule.dates[0].date;
	var i = getNextGameInfo(x,y,z,w);
	makeTable(i,3,"nextGame");
	//document.getElementById("nextHome").innerHTML =json0.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name;
	//document.getElementById("nextAway").innerHTML =json0.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name;
	var testj = json0.teams[0].nextGameSchedule.dates[0].games[0].gamePk;
	fetch("https://statsapi.web.nhl.com/api/v1/game/"+testj+"/feed/live").then(function (r) { return r.json() }).then(function (json1) {
		//console.log(json1);
		var testLive = json1.liveData.plays.currentPlay.about.period;
		var time;
		var NumberOfTotalCol = 4;
		if (testLive != "0"){

			var IntTest = json1.liveData.linescore.intermissionInfo.inIntermission;
			if (IntTest === true){
				var t = json1.liveData.linescore.intermissionInfo.intermissionTimeRemaining;
				var min = Math.floor(t/60);
				var sec = t % 60;
				time = "Next period: " + min + ":" + sec;
				NumberOfTotalCol = 5;
			}
			var a = json1.gameData.teams.home.abbreviation;
			var b = json1.gameData.teams.away.abbreviation;
			var c = json1.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals;
			var d = json1.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals;
			var e = json1.liveData.linescore.teams.home.shotsOnGoal;
			var f = json1.liveData.linescore.teams.away.shotsOnGoal;
			var g = json1.liveData.linescore.currentPeriodOrdinal;
			var h = json1.liveData.linescore.currentPeriodTimeRemaining;
			var i = getCurrentGameInfo(a,b,c,d,e,f,g,h,time);
			makeTable(i,NumberOfTotalCol,"currentGame");
		}
		/*
		document.getElementById("currentAway").innerHTML = json1.gameData.teams.away.abbreviation;
		document.getElementById("currentHome").innerHTML = json1.gameData.teams.home.abbreviation;
		document.getElementById("currentAwayScore").innerHTML = json1.liveData.boxscore.teams.away.teamStats.teamSkaterStats.goals;
		document.getElementById("currentHomeScore").innerHTML = json1.liveData.boxscore.teams.home.teamStats.teamSkaterStats.goals;
		document.getElementById("currentAwayShots").innerHTML = json1.liveData.linescore.teams.away.shotsOnGoal;
		document.getElementById("currentHomeShots").innerHTML = json1.liveData.linescore.teams.home.shotsOnGoal;	
		*/
	})

})

//hover over stream image to show gif 
function hide(x){
	x.style.opacity = "0";
}
function unhide(x){
	x.style.opacity = "1";
}

/////

function generateNextGameInfo(date,homeTeam,awayTeam,venue) {
	var div1 = document.createElement("div");
	var table1 = document.createElement("table");
	var tbody1 = document.createElement("tbody");
	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	var td4 = document.createElement("td");
	var td5 = document.createElement("td");
	td1.innerHTML = date;
	td2.innerHTML = homeTeam;
	td3.innerHTML = "Vs.";
	td4.innerHTML = awayTeam;
	td5.innerHTML = venue;
	div1.setAttribute("class", "game1");
	td1.setAttribute("colspan", "3");
	td5.setAttribute("colspan", "3");
	tr1.appendChild(td1);
	tbody1.appendChild(tr1);
	tr2.appendChild(td2);
	tr2.appendChild(td3);
	tr2.appendChild(td4);
	tr3.appendChild(td5);
	tbody1.appendChild(tr2);
	tbody1.appendChild(tr3); 
	table1.appendChild(tbody1);
	div1.appendChild(table1);
	document.getElementById("nextGame").appendChild(div1);
}

function generateNextGameInfoV2(date,homeTeam,awayTeam,venue) {
	var div1 = document.createElement("div");
	var table1 = document.createElement("table");
	var tbody1 = document.createElement("tbody");
	var a = [venue];
	var tr1 = gameTableMakeTr1(3,date);
	var tr2 = gameTableMakeTr2(0,homeTeam,awayTeam);
	var tr3 = gameTableMakeTr3(1,3,a);
	div1.setAttribute("class", "game");
	tbody1.appendChild(tr1);
	tbody1.appendChild(tr2);
	tbody1.appendChild(tr3);
	table1.appendChild(tbody1);
	div1.appendChild(table1);
	document.getElementById("nextGame").appendChild(div1);
}

function generatePreviousGameInfo (homeTeam,awayTeam,homeScore,awayScore) {
	var div1 = document.createElement("div");
	var table1 = document.createElement("table");
	var tbody1 = document.createElement("tbody");
	var a = [homeScore,"",awayScore]
	var tr1 = gameTableMakeTr1(3,"Last game");
	var tr2 = gameTableMakeTr2(0,homeTeam,awayTeam);
	var tr3 = gameTableMakeTr3(3,0,a);
	tbody1.appendChild(tr1);
	tbody1.appendChild(tr2);
	tbody1.appendChild(tr3);
	table1.appendChild(tbody1);
	div1.appendChild(table1);
	document.getElementById("lastGame").appendChild(div1);
}

function getTheThings() {
	var a= ["test","", "lol"]
	return [
		gameTableMakeTr1(3,"Last game"),
		gameTableMakeTr2(0,"mtl","bos"),
		gameTableMakeTr3(3,0,a)
	];
}


/////////


function getNextGameInfo(date,homeTeam,awayTeam,venue) {
	var a= [venue];
	return [
		gameTableMakeTr1(3,date),
		gameTableMakeTr2(0,homeTeam,awayTeam),
		gameTableMakeTr3(1,3,a)
	];
}

function getLastGameInfo(homeTeam,awayTeam,homeScore,awayScore) {
	var a= [homeScore,"",awayScore];
	return [
		gameTableMakeTr1(3,"Last game"),
		gameTableMakeTr2(0,homeTeam,awayTeam),
		gameTableMakeTr3(3,0,a)
	];
}

function getCurrentGameInfo(homeTeam,awayTeam,homeScore,awayScore,homeShots,awayShots,thePeriod,timeLeftInPeriod,TimeLeftIntermission) {
	var a= [homeShots,homeScore,"",awayScore,awayShots];
	var c = thePeriod + " " + timeLeftInPeriod;
	var b = [c];
	var d = [TimeLeftIntermission];
	return [
		gameTableMakeTr1(5,"Current game"),
		gameTableMakeTr2(2,homeTeam,awayTeam),
		gameTableMakeTr3(5,0,a),
		gameTableMakeTr3(1,5,b),
		gameTableMakeTr3(1,5,d)
	];
}

function testGen () {
	var i = getTheThings();
	testGen(i,3,"infoArea");
}

function makeTable(tdArray,tdLength,elementId) {
	var div1 = document.createElement("div");
	var table1 = document.createElement("table");
	var tbody1 = document.createElement("tbody");
	div1.setAttribute("class", "game");
	for (r=0; r<=(tdLength-1); r++) {
		tbody1.appendChild(tdArray[r]);
	}
	table1.appendChild(tbody1);
	div1.appendChild(table1);
	document.getElementById(elementId).appendChild(div1);
}

function gameTableMakeTr1(colspanNumber, title) {
	var tr1 = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.innerHTML = title;
	td1.setAttribute("colspan", colspanNumber);
	tr1.appendChild(td1);
	return tr1;
}

function gameTableMakeTr2(colspanNumberSides, homeTeam, awayTeam){
	var tr2 = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	td1.innerHTML = homeTeam;
	td2.innerHTML = "Vs.";
	td3.innerHTML = awayTeam;
	td1.setAttribute("colspan", colspanNumberSides);
	td3.setAttribute("colspan", colspanNumberSides);
	tr2.appendChild(td1);
	tr2.appendChild(td2);
	tr2.appendChild(td3);
	return tr2;
}

function gameTableMakeTr3(numberOfCol, colspanNumber, dataArray) {
	var tr3 = document.createElement("tr");
	for (i=0; i<=(numberOfCol-1); i++){

		var td = document.createElement("td");
		if (numberOfCol == "1"){
			td.setAttribute("colspan", colspanNumber);
		}		
		td.innerHTML = dataArray[i];
		tr3.appendChild(td);
	}
	return tr3;
}

