
window.onload = function (){

}


function getImage (){
	
	var filterNumber = document.querySelector("#filter").value;
	
	fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&q=*").then(function (r) { return r.json() }).then(function (json0) {
		
		//console.log(json0);
		
		var maxImageNumber = json0.total;
		var randomImageNumber = Math.floor(Math.random()*maxImageNumber);
		
		fetch("https://derpibooru.org/api/v1/json/search/images?filter_id=" + filterNumber + "&per_page=1&page=" + randomImageNumber + "&q=*").then(function (r) { return r.json() }).then(function (json1) {
			
			var testFormat = json1.images[0].format;
			var testHidden = json1.images[0].hidden_from_users;
			
			if (testFormat === "webm" || testHidden === true || testFormat === "GIF" || testFormat === "gif"){
				console.log("that was a bad image");
				getImage();
			}

			else{
				document.getElementById("picture").src = json1.images[0].view_url;
				document.getElementById("hrefPicture").href="https://derpibooru.org/images/" + json1.images[0].id; 
			}
		})
})
}

function testE (){
	var i = document.getElementById("boxx").value;
	console.log(encodeURIComponent(i));
}


//https://derpibooru.org/api/v1/json/search/images?q=safe+AND+twilightsparkle+AND+fluttershy&per_page=1

//artist%3Alollipony

//https://derpibooru.org/api/v1/json/search/images?q=explicit+AND+twilightsparkle+AND+fluttershy&per_page=50&filter_id=56027

