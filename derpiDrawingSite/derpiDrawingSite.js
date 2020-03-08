
window.onload = function (){
	//testDraw();
}

function openSidePanel0(){
	document.getElementById("sidePanel0").style.width = "20%";
}
function closeSidePanel0(){
	document.getElementById("sidePanel0").style.width = "0";
}

function test234(){
	alert("hey");
}

function saveDrawing(){
	var imageData = ctx.getImageData(0, 0, 1000, 800);
	var theDrawing = new Image();
	var URLImageData = getImageURL(imageData, 1000, 800);
	theDrawing.src = URLImageData;
	theDrawing.setAttribute("width", "95%");
	theDrawing.setAttribute("style", "background-color:white; margin: 20px 0px");
	document.getElementById("imageSaveArea").appendChild(theDrawing);
	
	
	
	var drawingButton = document.createElement("a");
	drawingButton.innerHTML="Save image";
	drawingButton.setAttribute("href", URLImageData);
	drawingButton.setAttribute("download", "image.png");
	document.getElementById("imageSaveArea").appendChild(drawingButton);
	

	function getImageURL(imgData, width, height){
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
ctx.lineTo(0,0);
ctx.closePath();
ctx.fill();
//}

/////////
// Description: Code to get images and handle the filters 
/////////
var countNumber=0;

function getImage (){
	document.getElementById("pictureCredits").className="pictureCredits";
	
	var artist = document.getElementById("artistName").value;
	var filterNumber = document.querySelector("#filter").value;
	var upvoteNumber = document.getElementById("upvotesNumber").value;
	var downVoteNumber = document.getElementById("downVotesNumber").value;
	var score = document.getElementById("scoreNumber").value;
	var encodedFilterBox = encodeURIComponent(document.getElementById("applyFilterBox").value);
	
	if (score === ""){
		score = 0;
	}
	
	if (upvoteNumber === ""){
		upvoteNumber = 0;
	}
	if (downVoteNumber === ""){
		downVoteNumber = 0;
	}
	
	if (artist === ""){
		var artistN = "";
	}
	else{
		var artistN = "artist%3A" + artist + "%2C+";
		//console.log(artistN);
	}
	
	if (encodedFilterBox === ""){
		var encodedFilterBoxN = "";
	}
	else{
		var encodedFilterBoxN = "%2C+" + encodedFilterBox;
	}


	if	(filterNumber === "" || filterNumber === "Custom"){
		alert("Input a custom filter number or change the filter"); 
	}

	
fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&q=" +artistN+ "upvotes.gte%3A" + upvoteNumber + "%2C+downvotes.gte%3A" + downVoteNumber + "%2C+score.gte%3A" + score + encodedFilterBoxN).then(function (r) { return r.json() }).then(function (json0) {
		//console.log(json0);
		var maxImageNumber = json0.total;
		if (maxImageNumber === 0){
			alert("there are no images available with your current filters. If you have an artist in the artist filter make sure the name is spelled correctly");
			return;
		}
		document.getElementById("imagesAvailable").innerHTML = "Total possible images with your filters: " + maxImageNumber;
		var randomImageNumber = ((Math.floor(Math.random()*maxImageNumber))+1);
		
		fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&page=" + randomImageNumber + "&q=" +artistN+ "upvotes.gte%3A" + upvoteNumber + "%2C+downvotes.gte%3A" + downVoteNumber + "%2C+score.gte%3A" + score + encodedFilterBoxN).then(function (r) { return r.json() }).then(function (json1) {
			
			var testFormat = json1.images[0].format;
			var testHidden = json1.images[0].hidden_from_users;
			
			if (testFormat === "webm" || testHidden === true || testFormat === "GIF" || testFormat === "gif"){
				console.log("that was a bad image");
				if (countNumber >=10){
					alert("Infint loop detected. There are too many Gifs or Webm sources where you are searching, I have made it so that they will never display on this site. >>> try lowering the fav or upvote or downvote values <<<");
					return;
				}
				countNumber++;
				getImage();
			}

			else{
				countNumber=0;
				document.getElementById("picture").src = json1.images[0].view_url;
				document.getElementById("hrefPicture").href="https://derpibooru.org/images/" + json1.images[0].id; 
				document.getElementById("picturePlaceHolder").style.removeProperty("height");
			}
		})
	})
}


let customBox;
let filterHelp;
var check1 = 0;
function customIdBox(){
	if (check1 === 0){
		customBox = document.createElement("input");
		document.getElementById("selectFilterArea").appendChild(customBox);
		customBox.setAttribute("id", "customIdInput");
		customBox.setAttribute("value", "");
		customBox.setAttribute("size", "8");
		customBox.setAttribute("pattern", "[0-9]+")
		check1 = 1;
		document.getElementById("customIdInput").addEventListener("keyup", function(){
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

function delCustomIdBox(){
	if (check1 === 1){
		customBox.parentNode.removeChild(customBox);
		filterHelp.parentNode.removeChild(filterHelp);
		check1 = 0;
	}
	else{
		return;
	}
}

document.getElementById("filter").addEventListener('change', (event) => {
    var filterCheck = event.target.value;
	var customFilterNumber = document.getElementById("customId").value;
	if (filterCheck === customFilterNumber){
		customIdBox();
	}
	else {
		delCustomIdBox();
	}
});







//https://derpibooru.org/api/v1/json/search/images?q=safe+AND+twilightsparkle+AND+fluttershy&per_page=1
//https://derpibooru.org/api/v1/json/search/images?q=explicit+AND+twilightsparkle+AND+fluttershy&per_page=50&filter_id=56027

