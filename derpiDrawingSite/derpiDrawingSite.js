
window.onload = function () {
	//testDraw();
}

function openSidePanel0() {
	document.getElementById("sidePanel0").style.width = "20%";
}
function closeSidePanel0() {
	document.getElementById("sidePanel0").style.width = "0";
}


var idValue;
document.getElementById("upVotesNumber").addEventListener("input", (event) => { idValue = "upVotesNumber"; noLettersHere(idValue); });
document.getElementById("downVotesNumber").addEventListener("input", (event) => { idValue = "downVotesNumber"; noLettersHere(idValue); });
document.getElementById("scoreNumber").addEventListener("input", (event) => { idValue = "scoreNumber"; noLettersHere(idValue); });
document.getElementById("timerHoursInput").addEventListener("input", (event) => { idValue = "timerHoursInput"; noLettersHere(idValue); });
document.getElementById("timerMinutesInput").addEventListener("input", (event) => { idValue = "timerMinutesInput"; noLettersHere(idValue); });
document.getElementById("timerSecondsInput").addEventListener("input", (event) => { idValue = "timerSecondsInput"; noLettersHere(idValue); });
document.getElementById("timerNumTimes").addEventListener("input", (event) => { idValue = "timerNumTimes"; noLettersHere(idValue); });

function noLettersHere(id) {
	var numCheck = /[0-9]+$/;
	if (document.getElementById(id).value.match(numCheck)) {
		//console.log("yes");
	}
	else {
		var t = document.getElementById(id).value;
		document.getElementById(id).value = t.substring(0, t.length - 1);
		//console.log(t);
	}
}




function saveDrawing() {
	var imageData = ctx.getImageData(0, 0, 1000, 800);
	var theDrawing = new Image();
	var URLImageData = getImageURL(imageData, 1000, 800);
	theDrawing.src = URLImageData;
	theDrawing.setAttribute("width", "95%");
	theDrawing.setAttribute("style", "background-color:white; margin: 20px 0px");
	document.getElementById("imageSaveArea").appendChild(theDrawing);



	var drawingButton = document.createElement("a");
	drawingButton.innerHTML = "Save image";
	drawingButton.setAttribute("href", URLImageData);
	drawingButton.setAttribute("download", "image.png");
	document.getElementById("imageSaveArea").appendChild(drawingButton);


	function getImageURL(imgData, width, height) {
		var canv = document.createElement("canvas");
		var ctx = canv.getContext("2d");
		canv.width = width;
		canv.height = height;
		ctx.putImageData(imgData, 0, 0);
		return canv.toDataURL();
	}
}

//function testDraw(){

var canv = document.getElementById("drawingArea");
ctx = canv.getContext("2d");

ctx.clearRect(0, 0, 800, 800);

ctx.strokeStyle = "blue";
ctx.fillStyle = "red";
ctx.fillRect(10, 20, 30, 40);
ctx.strokeRect(10, 20, 30, 40);

ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(70, 80, 30, 30);
ctx.fillStyle = "rgba(0, 0, 200, 0.7)";
ctx.fillRect(85, 95, 30, 30); //(x, y, length x, length y)

ctx.beginPath();
ctx.moveTo(0, 20);
ctx.lineTo(20, 0);
ctx.lineTo(0, 0);
ctx.closePath();
ctx.fill();
//}

/////////
// Timer area
/////////



document.getElementById("startTimer").addEventListener("click", checkRunningTimer);

var timerCheckFlag = 0;

function checkRunningTimer() {
	if (timerCheckFlag != 1) {
		timerCheckFlag = 1;
		startTimer();
	}
	return;
}

var timerSetMemory;

var timerPause = 0;
var loadTimerSetMemory;
var loadTimerSetMemoryFlag = 0;
var memoryPauseFlag = 1;
var STOP = 1;

function startTimer() {

	document.getElementById("pauseTimer").disabled = false;
	document.getElementById("startTimer").innerHTML = "Start";
	document.getElementById("startTimer").disabled = true;
	STOP = 1;
	var startTime = Date.now(),
		x = document.getElementById("timerNumTimes").value,
		timerSet,

		timeRemaining,
		hours,
		minutes,
		seconds;

	seconds = ((document.getElementById("timerSecondsInput").value) * 1);
	minutes = ((document.getElementById("timerMinutesInput").value) * 60);
	hours = ((document.getElementById("timerHoursInput").value) * 3600);
	timerSet = seconds + minutes + hours;

	timerSetMemory = timerSet;

	if (timerSet === 0) {
		alert("Timer is set to 0h 0m 0s\n\nPlease input a time");
		document.getElementById("startTimer").disabled = false;
		document.getElementById("pauseTimer").disabled = true;
		setTimerToDefault();
		return;
	}

	if (timerPause != 1) {
		getImage();
	}
	timerPause = 0;
		//console.log("timer function starts")
	timer();


	function timer() {

		timeRemaining = timerSet - Math.floor((Date.now() - startTime) / 1000);

		hours = Math.floor(timeRemaining / 3600);
		minutes = Math.floor((timeRemaining - (3600 * hours)) / 60);
		seconds = Math.floor(timeRemaining % 60);

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		document.getElementById("timerHoursInput").value = hours;
		document.getElementById("timerMinutesInput").value = minutes;
		document.getElementById("timerSecondsInput").value = seconds;

		if (timeRemaining <= 0) {
			x = x - 1;
			if (x <= 0) {
				alert("you are all done!");
				x = 0;
				document.getElementById("timerNumTimes").value = 0;
				timerButtonsState(false, true, false);
				timerPause = 0;
				loadTimerSetMemoryFlag = 0;
				memoryPauseFlag = 1;
				timerCheckFlag = 0;
				STOP = 0;
				return;
			}
			getImage();
			alert("Your done this sketch.\n\nOn to the next drawing!");
			saveDrawing();
			document.getElementById("timerNumTimes").value = x;
			clearInterval(stopTimer);
			timeRemaining = timerSetMemory;
			if (loadTimerSetMemoryFlag != 0) {
				timerSet = loadTimerSetMemory;
				timeRemaining = loadTimerSetMemory;
				timerSetMemory = loadTimerSetMemory;
			}
			loadTimerSetMemoryFlag = 0;
			startTime = Date.now();
		}
		if (Number.isNaN(x) === true) {
			document.getElementById("timerNumTimes").value = "0";
			clearInterval(stopTimer);
			alert("Oops. You managed to put a letter in the timer 'x' (times) area.\n\nSet a new number.");
			setTimerToDefault();
			return;
		}
		if (Number.isNaN(seconds) === true || Number.isNaN(minutes) === true || Number.isNaN(hours) === true) {
			clearInterval(stopTimer);
			document.getElementById("timerSecondsInput").value = "00";
			document.getElementById("timerMinutesInput").value = "00";
			document.getElementById("timerHoursInput").value = "00";
			alert("Oops. You managed to put a letter in the timer.\n\nSet a new time.");
			document.getElementById("startTimer").disabled = false;
			document.getElementById("pauseTimer").disabled = true;
			setTimerToDefault();
			return;
		}

		clearTimeout(stopTimer);

		if (STOP != 0) {
			var stopTimer = setTimeout(timer, 1000);
		}
		return;
	};
	return;
}

// Known bug => when pause timer is hit at 1 second and the time counts down to 0 it fires the done drawing code. when you press continue the timer is set at 0 causing you to have to manually reinput the number. 

document.getElementById("pauseTimer").addEventListener("click", function () {
	timerPause = 1;
	loadTimerSetMemoryFlag = 1;

	if (memoryPauseFlag != 0) {
		loadTimerSetMemory = timerSetMemory;
	}
	memoryPauseFlag = 0;

	clearTimeout(stopTimer);
	timerButtonsState(false, true, false);
	document.getElementById("startTimer").innerHTML = "Continue";

	timerCheckFlag = 0;
	STOP = 0;
});

document.getElementById("stopTimer").addEventListener("click", function () {

	clearTimeout(stopTimer);

	timerButtonsState(false, true, false);
	document.getElementById("startTimer").innerHTML = "Start";

	timerPause = 0;
	loadTimerSetMemoryFlag = 0;
	memoryPauseFlag = 1;
	setTimeout(setTimerToZeros, 1200);
	function setTimerToZeros(){
		document.getElementById("timerHoursInput").value = "00";
		document.getElementById("timerMinutesInput").value = "00";
		document.getElementById("timerSecondsInput").value = "00";
	}
	//console.log(".");
	timerCheckFlag = 0;
	STOP = 0;
	return;
});

function timerButtonsState(start, pause, stop) {
	document.getElementById("startTimer").disabled = start;
	document.getElementById("pauseTimer").disabled = pause;
	document.getElementById("stopTimer").disabled = stop;
}

function setTimerToDefault(){
	clearTimeout(stopTimer);
	timerButtonsState(false, true, false);
	timerPause = 0;
	loadTimerSetMemoryFlag = 0;
	memoryPauseFlag = 1;
	timerCheckFlag = 0;
	STOP = 0;
	console.log(timerCheckFlag);
	return;
}

/////////
// Description: Code to get images and handle the filters 
/////////

var countNumber = 0;

function getImage() {
	document.getElementById("pictureCredits").className = "pictureCredits";

	var artist = document.getElementById("artistName").value;
	var filterNumber = document.querySelector("#filter").value;
	var upVoteNumber = document.getElementById("upVotesNumber").value;
	var downVoteNumber = document.getElementById("downVotesNumber").value;
	var score = document.getElementById("scoreNumber").value;
	var encodedFilterBox = encodeURIComponent(document.getElementById("applyFilterBox").value);

	if (score === "") {
		score = 0;
	}

	if (upVoteNumber === "") {
		upVoteNumber = 0;
	}
	if (downVoteNumber === "") {
		downVoteNumber = 0;
	}

	if (artist === "") {
		var artistN = "";
	}
	else {
		var artistN = "artist%3A" + artist + "%2C+";
		//console.log(artistN);
	}

	if (encodedFilterBox === "") {
		var encodedFilterBoxN = "";
	}
	else {
		var encodedFilterBoxN = "%2C+" + encodedFilterBox;
	}


	if (filterNumber === "" || filterNumber === "Custom") {
		alert("Input a custom filter number or change the filter");
	}


	fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&q=" + artistN + "upvotes.gte%3A" + upVoteNumber + "%2C+downvotes.gte%3A" + downVoteNumber + "%2C+score.gte%3A" + score + encodedFilterBoxN).then(function (r) { return r.json(); }).then(function (json0) {
		//console.log(json0);
		var maxImageNumber = json0.total;
		if (maxImageNumber === 0) {
			alert("There are no images available with your current filters.\n\nIf you have tags in the Search Specific Tags area make sure they are spelled correctly.\nIf you have an 'AND' 'OR' 'NOT' in the Search Specific Tags area they have to be all capitalized.\n\nIf you have an artist name in the Artist filter box make sure the name is spelled correctly.");
			return;
		}
		document.getElementById("imagesAvailable").innerHTML = "Total possible images with your filters: " + maxImageNumber;
		var randomImageNumber = ((Math.floor(Math.random() * maxImageNumber)) + 1);

		fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&page=" + randomImageNumber + "&q=" + artistN + "upvotes.gte%3A" + upVoteNumber + "%2C+downvotes.gte%3A" + downVoteNumber + "%2C+score.gte%3A" + score + encodedFilterBoxN).then(function (r) { return r.json() }).then(function (json1) {

			var testFormat = json1.images[0].format;
			var testHidden = json1.images[0].hidden_from_users;

			if (testFormat === "webm" || testHidden === true || testFormat === "GIF" || testFormat === "gif") {
				console.log("that was a bad image");
				if (countNumber >= 10) {
					alert("Infint loop detected.\nThere are too many Gifs or Webm sources where you are searching.\nI have made it so that they will never display on this site.\n\nTry lowering the Score or Upvote or Downvote numbers.\nOr\nTry the Get image button or Start button on the timer again.");
					countNumber = 0;
					return;
				}
				countNumber++;
				getImage();
			} else {
				countNumber = 0;
				document.getElementById("picture").src = json1.images[0].view_url;
				document.getElementById("hrefPicture").href = "https://derpibooru.org/images/" + json1.images[0].id;
				document.getElementById("picturePlaceHolder").style.removeProperty("height");
			}
		})
	})
		.catch((error) => { alert("There is an imporper character (eg.(),   ) in the Search Specific Tags box.\nOr\nYou have an OR / AND / NOT being the last thing in the search area."); })
}


let customBox;
let filterHelp;
var check1 = 0;
function customIdBox() {
	if (check1 === 0) {
		customBox = document.createElement("input");
		document.getElementById("selectFilterArea").appendChild(customBox);
		customBox.setAttribute("id", "customIdInput");
		customBox.setAttribute("value", "");
		customBox.setAttribute("size", "8");
		customBox.setAttribute("pattern", "[0-9]+")
		check1 = 1;
		document.getElementById("customIdInput").addEventListener("keyup", function () {
			var i = document.getElementById("customIdInput").value;
			document.getElementById("customId").setAttribute("value", i);
			//console.log(i);
		});
		filterHelp = document.createElement("a");
		document.getElementById("selectFilterArea").appendChild(filterHelp);
		filterHelp.setAttribute("id", "filterQuestionMark");
		filterHelp.setAttribute("target", "_blank");
		document.getElementById("filterQuestionMark").href = "derpiDrawingSiteInstructions.jpg";
		document.getElementById("filterQuestionMark").innerHTML = "?";

	}
	else {
		return;
	}
}

function delCustomIdBox() {
	if (check1 === 1) {
		customBox.parentNode.removeChild(customBox);
		filterHelp.parentNode.removeChild(filterHelp);
		check1 = 0;
	}
	else {
		return;
	}
}

document.getElementById("filter").addEventListener('change', (event) => {
	var filterCheck = event.target.value;
	var customFilterNumber = document.getElementById("customId").value;
	if (filterCheck === customFilterNumber) {
		customIdBox();
	}
	else {
		delCustomIdBox();
	}
});







//https://derpibooru.org/api/v1/json/search/images?q=safe+AND+twilightsparkle+AND+fluttershy&per_page=1
//https://derpibooru.org/api/v1/json/search/images?q=explicit+AND+twilightsparkle+AND+fluttershy&per_page=50&filter_id=56027

