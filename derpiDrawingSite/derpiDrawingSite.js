
window.onload = function (){

}

var countNumber=0;

function getImage (){
	
	var filterNumber = document.querySelector("#filter").value;
	var upvoteNumber = document.getElementById("upvotesNumber").value;
	var artist = document.getElementById("artistName").value;
	if (artist === ""){
		var artistN = "";
	}
	else{
		var artistN = "artist%3A" + artist + "%2C+";
		//console.log(artistN);
	}
	//console.log(upvoteNumber);
	
fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&q=" +artistN+ "upvotes.gte%3A" + upvoteNumber).then(function (r) { return r.json() }).then(function (json0) {
		
		//console.log(json0);
		
		var maxImageNumber = json0.total;
		if (maxImageNumber === 0){
			alert("there are no images available with your current filters. If you have an artist in the artist filter make sure the name is spelled correctly");
			return;
		}
		document.getElementById("imagesAvailable").innerHTML = "Total possible images with your filters: " + maxImageNumber;
		var randomImageNumber = Math.floor(Math.random()*maxImageNumber);
		
		fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&page=" + randomImageNumber + "&q=" +artistN+ "upvotes.gte%3A" + upvoteNumber).then(function (r) { return r.json() }).then(function (json1) {
			
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
let customBox
var check1 = 0;
function customIdBox(){
	if (check1 === 0){
		customBox = document.createElement("input");
		document.getElementById("test3").appendChild(customBox);
		customBox.setAttribute("id", "test5");
		customBox.setAttribute("value", "");
		check1 = 1;
		document.getElementById("test5").addEventListener("keyup", test6)
		function test6(){
			var i = document.getElementById("test5").value;
			document.getElementById("customId").setAttribute("value", i);
			//console.log(i);
			
		}
	}
	else {
		return;
	}
}
function delCustomIdBox(){
	if (check1 === 1){
		customBox.parentNode.removeChild(customBox);
		check1 = 0;
	}
	else{
		return;
	}
}




function testV(){
	var t =document.getElementById("upvotesNumber").value;
	console.log(t);
}


function testE (){
	var i = document.getElementById("boxx").value;
	console.log(encodeURIComponent(i));
}



function timer (){
	var setTime =
	
	var t = Date.now();
	t= t/1000
	console.log(t);
	setTimeout(timer, 1000);
}






//https://derpibooru.org/api/v1/json/search/images?q=safe+AND+twilightsparkle+AND+fluttershy&per_page=1

//artist%3Alollipony

//https://derpibooru.org/api/v1/json/search/images?q=explicit+AND+twilightsparkle+AND+fluttershy&per_page=50&filter_id=56027

