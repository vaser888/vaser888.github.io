
function getRandomImage(){
    var randomImageNumber = ((Math.floor(Math.random()*2336854))+1);
    document.getElementById("imageNumberSearch").value = randomImageNumber;
    searchImage(randomImageNumber);
};

document.getElementById("realDerpiButton").addEventListener("click", (event)=>{
    window.location.href = "https://derpibooru.org/";
});


////////
//  Things that don't want letters in them
////////


var idValue;
document.getElementById("imageNumberSearch").addEventListener("input", (event)=> {idValue = "imageNumberSearch"; noLettersHere(idValue, 0); });
document.getElementById("filteredImageNumber").addEventListener("input", (event)=> {idValue = "filteredImageNumber"; noLettersHere(idValue, 0); });
document.getElementById("filteredScoreNumber").addEventListener("input", (event)=> {idValue = "filteredScoreNumber"; noLettersHere(idValue, 1); });
document.getElementById("filteredUpVotesNumber").addEventListener("input", (event)=> {idValue = "filteredUpVotesNumber"; noLettersHere(idValue, 1); });
document.getElementById("filteredDownVotesNumber").addEventListener("input", (event)=> {idValue = "filteredDownVotesNumber"; noLettersHere(idValue, 1); });


////////
//  Does not allow letters to be input into an Input, only numbers 
////////

function noLettersHere(id, setting) {
    if (setting === 0){
        var numCheck = /[0-9]+$/;
    }
    if (setting === 1){
        var numCheck = /[0-9,-]+$/;
    }

    if (document.getElementById(id).value.match(numCheck)) {

    }
    else{
        var t = document.getElementById(id).value;
        document.getElementById(id).value = t.substring(0, t.length - 1);
    }
}

////////
//  Click on image/video to zome to max width of page
////////

document.getElementById("clickExpand").addEventListener("click", (event)=>{
   a = document.getElementById("theImage").style.maxHeight;
   if (a === "100%"){
       document.getElementById("theImage").style.maxHeight = "none";
       document.getElementById("theVideo").style.maxHeight = "none";
   }
   else{
        document.getElementById("theImage").style.maxHeight = "100%";
        document.getElementById("theVideo").style.maxHeight = "100%";
   }
});

////////
//  Slide menu button
////////

document.getElementById("slideMenuBtn").addEventListener("click", (event)=>{
    a = document.getElementById("imageDisplayArea");
    b = document.getElementById("settingsAndInfo");
    h = document.getElementById("imageDisplayArea").style.width;
    
    if (h === "75%"){
        a.style.width = "100%";
        b.style.width = "0%";
        b.style.display = "none";
        document.getElementById("slideMenuBtn").innerHTML = "< ☰ Open menu";
    }
    else{
        setTimeout( (event)=> {b.style.display = "";}, 300);
        b.style.width = "25%";
        a.style.width = "75%";
        document.getElementById("slideMenuBtn").innerHTML = "> ☰ Close menu";

    }
});

////////
//  top bar go button. It searches for specific images by an image number from Derpibooru.
//  It also updates info on the page and displays the image or video. 
///////

var imageNumberRam;

function goButton(){
    event.preventDefault();
    var e = document.getElementById("imageNumberSearch").value;
    if (e === ""){
        alert("Please enter a number")
    }
    else{
        searchImage(e);
    }
}

function searchImage(e){
    fetch("https://derpibooru.org/api/v1/json/images/" + e + "?key=PpzyTx7523PoVv4y9WrG").then(function (r) { return r.json() }).then(function (imageJson){
        
        updateWebsite(imageJson, e);

    }).catch(function(){
        console.log("This page is broken or the image has moved\nlet's try to take you there!");});
        //window.location.href = "https://derpibooru.org/images/" + e;
}

////////
//  Update everything in the website
////////

function updateWebsite(imageJson, e){
    //console.log(imageJson);
    var testOfDupe = imageJson.image.duplicate_of;
    //console.log(testOfDupe);
    if (testOfDupe === null){
        //do nothing
    }
    else{
        e = testOfDupe;
        searchImage(e);
        document.getElementById("imageNumberSearch").value = e;
    }

    imageNumberRam = e;
    //console.log(imageNumberRam);

    document.getElementById("toImageDerpiLink").href = "https://derpibooru.org/images/" + e;
    var i = imageJson.image.source_url;
    if (i === ""){
        i = "404-No-Image";
    }
    document.getElementById("toImageSourceLink").href = i;

    var formatType = imageJson.image.format;
    if (formatType === "webm"){
        document.getElementById("theImage").style.display = "none";
        document.getElementById("theVideo").style.display = "";
        document.getElementById("theVideo").src = imageJson.image.representations.full;
    }
    else {
        document.getElementById("theVideo").style.display= "none";
        document.getElementById("theVideo").pause();
        document.getElementById("theImage").style.display = "";
        document.getElementById("theImage").src = imageJson.image.representations.full;
    }


    var upv = imageJson.image.upvotes;
    document.getElementById("numberOfUp").innerHTML = "Up votes: " + upv;

    var sco = imageJson.image.score;
    document.getElementById("numberOfScore").innerHTML = "Score: " + sco;

    var dwnv = imageJson.image.downvotes;
    document.getElementById("numberOfDown").innerHTML = "Down votes: " + dwnv;

    var fav = imageJson.image.faves;
    document.getElementById("numberOfFaves").innerHTML = "Faves: " + fav;

    ////////
    //  History area
    ////////
    var smallImage = imageJson.image.representations.thumb_tiny;
    saveImageNumberToHistory(imageNumberRam, smallImage);

    ////////
    //  Description area
    ////////

    var x = imageJson.image.width;
    var y = imageJson.image.height;
    var i = imageJson.image.created_at;
    var d = new Date(i);
    document.getElementById("imageInfo").innerHTML = "<u>Date created:</u> " + d.toDateString() + "<br>" + "<u>Resolution:</u> " + x + " x " + y;

    var i = imageJson.image.uploader;
    if (i ===null){
        i = "A Background Pony"
    }
    document.getElementById("uploaderUser").innerHTML = i;
    var i = imageJson.image.description;
    //i = decodeURI(i);
    if (i === ""){
        document.getElementById("descriptionUser").innerHTML = "[No Description]"
    }
    else{
    document.getElementById("descriptionUser").innerHTML = i;
    }
    ////////
    //  diplay Tags of the image.
    ////////

    var imgTags = imageJson.image.tags;
    getIamgeTags(imgTags);

    ////////
    //  Comment area
    ////////
    commentPageNumber = 1;
    document.getElementById("commentNumberPage").innerHTML = "Page: <br>" + commentPageNumber;
    getComments(e, commentPageNumber);
} 

////////
// Get comments for an image
////////

function getComments(e, commentPageNumber){

    document.getElementById("theComments").remove();
    var commentArea = document.createElement("div");
    commentArea.setAttribute("id", "theComments");
    commentArea.setAttribute("class", "theComments");
    document.getElementById("commentsArea").appendChild(commentArea);

    fetch("https://derpibooru.org/api/v1/json/search/comments?q=image_id:"+ e +"&page=" + commentPageNumber + "&key=PpzyTx7523PoVv4y9WrG").then(function (r) { return r.json() }).then(function (commentJson){

        var numCom = commentJson.total

        if (numCom === 0){
            commentPageNumber = 1;
            document.getElementById("commentNumberPage").innerHTML = "Page: <br>" + commentPageNumber;
        }
        
        if (numCom >= 24){
            numCom = 25;
        }
        for (i = 0; i <= (numCom - 1); i++){
            var a = commentJson.comments[i].author;
            var b = commentJson.comments[i].body;
            var t = commentJson.comments[i].created_at;
            var p = commentJson.comments[i].avatar;
            var d = new Date(t);

            var commentName = document.createElement("div");
            commentName.setAttribute("class", "user");
            var profileImg = document.createElement("img");
            profileImg.setAttribute("class", "commentProfilePic");
            profileImg.setAttribute("src", p);
            commentName.appendChild(profileImg);
            commentName.innerHTML += " " + a + "<br>" + d.toDateString();
            document.getElementById("theComments").appendChild(commentName);
            var comment = document.createElement("div");
            comment.setAttribute("class", "comment");
            comment.innerHTML = b;
            document.getElementById("theComments").appendChild(comment);
        }

    }).catch(function(){
        var errorMessage = document.createElement("div");
        errorMessage.setAttribute("style", "color:#cf0001;padding-left:5px;");
        errorMessage.innerHTML = "Error <br> The comments failed to load <br><br>You have hit the end of the comments, press back to get to the last comments you can veiw on this site<br><br> Try going to the Depribooru page to see the comments";
        document.getElementById("theComments").appendChild(errorMessage);
    });

}

////////
//  Get tags for an image
////////

function getIamgeTags (t){
    document.getElementById("currentImageTags").remove();
    var imageTagArea = document.createElement("div");
    imageTagArea.setAttribute("id", "currentImageTags");
    imageTagArea.setAttribute("class", "currentImageTags")
    document.getElementById("descriptionArea").appendChild(imageTagArea);
    for (i = 0; i <= t.length - 1; i++){
        //document.getElementById("currentImageTags").innerHTML += t[i] + "<br>"; 
    
    
        var div1 = document.createElement("div");
        div1.setAttribute("class", "addTagButton");
        var div2 = document.createElement("div");
        div2.innerHTML = t[i];
        div2.setAttribute("class", "imgTag");
        div1.appendChild(div2);
        var addButton = document.createElement("button");
        addButton.innerHTML = "+";
        addButton.setAttribute("value", t[i]);
        addButton.setAttribute("onclick", "addTag(this.value)");
        div1.appendChild(addButton);
        document.getElementById("currentImageTags").appendChild(div1);
    }
    

}


////////
//  Comment area Next and back buttons 
////////
document.getElementById("previousCommentPage").addEventListener("click", (event) => {
    
    if (commentPageNumber <= 1 || commentPageNumber == 0){ 
        //alert("nothing minused");
    }
    else{
        commentPageNumber = commentPageNumber - 1;
        document.getElementById("commentNumberPage").innerHTML = "Page: <br>" + commentPageNumber;
        getComments(imageNumberRam, commentPageNumber);
    }
});

document.getElementById("nextCommentPage").addEventListener("click", (event) => {
    if (commentPageNumber <= 0 ){
        //alert("nothing added");  
    }
    else{
        commentPageNumber = commentPageNumber + 1;
        document.getElementById("commentNumberPage").innerHTML = "Page: <br>" + commentPageNumber;
        getComments(imageNumberRam, commentPageNumber);
    }
}); 


////////
//  Slide menu top menu button press update and state.
////////

document.getElementById("descriptionBtn").addEventListener("click" , (event) => {
    var n = "1";
    slideMenuTopMenuPressed(n);
});
document.getElementById("filtersBtn").addEventListener("click" , (event) => {
    var n = "2";
    slideMenuTopMenuPressed(n);
});
document.getElementById("commentsBtn").addEventListener("click" , (event) => {
    var n = "3";
    slideMenuTopMenuPressed(n);
});
document.getElementById("imageHistoryBtn").addEventListener("click" , (event) => {
    var n = "4";
    slideMenuTopMenuPressed(n);
});

function slideMenuTopMenuPressed(n){
    var a = document.getElementById("descriptionBtn");
    var b = document.getElementById("filtersBtn");
    var c = document.getElementById("commentsBtn");
    var d = document.getElementById("imageHistoryBtn");

    var a1 = document.getElementById("descriptionArea");
    var b1 = document.getElementById("filtersArea");
    var c1 = document.getElementById("commentsArea");
    var d1 = document.getElementById("imageHistoryArea");
    var e1 = document.getElementById("pageSelector");
    
    if (n === "1"){
        // description/info
        a.style.backgroundColor = "#3d92d0";
        b.style.backgroundColor = "";
        c.style.backgroundColor = "";
        d.style.backgroundColor = "";

        a1.style.display = "";
        b1.style.display = "none";
        c1.style.display = "none";
        d1.style.display = "none";
        e1.style.display = "none"; 
    }
    if (n === "2"){
        // filters
        a.style.backgroundColor = "";
        b.style.backgroundColor = "#3d92d0";
        c.style.backgroundColor = "";
        d.style.backgroundColor = "";

        a1.style.display = "none";
        b1.style.display = "";
        c1.style.display = "none";
        d1.style.display = "none";
        e1.style.display = "none";        
    }
    if (n === "3"){
        // comments
        a.style.backgroundColor = "";
        b.style.backgroundColor = "";
        c.style.backgroundColor = "#3d92d0";
        d.style.backgroundColor = "";

        a1.style.display = "none";
        b1.style.display = "none";
        c1.style.display = "";
        d1.style.display = "none";
        e1.style.display = "";
    }
    if (n === "4"){
        // history
        a.style.backgroundColor = "";
        b.style.backgroundColor = "";
        c.style.backgroundColor = "";
        d.style.backgroundColor = "#3d92d0";

        a1.style.display = "none";
        b1.style.display = "none";
        c1.style.display = "none";
        d1.style.display = "";
        e1.style.display = "none"; 
    }
}

////////
//  History area code
////////

function historySearch(a){
    event.preventDefault();
    document.getElementById("imageNumberSearch").value = a;
    searchImage(a);
}

function saveImageNumberToHistory(imgNum, imgLink){
    var divComment = document.createElement("div");
    var aComment = document.createElement("a");
    var imgComment = document.createElement("img");
    divComment.setAttribute("style", "display: flex;justify-content: center;");
    imgComment.setAttribute("src", imgLink);
    divComment.appendChild(imgComment);
    aComment.setAttribute("href", "");
    aComment.setAttribute("onclick", "historySearch(this.innerHTML)");
    aComment.setAttribute
    aComment.innerHTML += imgNum;
    divComment.appendChild(aComment);
    document.getElementById("imageHistoryArea").appendChild(divComment);

}

////////
// Tags filter area
////////



function addTag(a){
    generateTag(a);
    var q = document.querySelectorAll(".tag");
    t = Array.from(q);
}


function deleteTag(a){
    a.remove();
    var q = document.querySelectorAll(".tag");
    t = Array.from(q);
}

function addTagToTagArea(){
    event.preventDefault();
    var tagName = document.getElementById("tagEnterBoxInput").value;
    if (tagName === ""){
        return;
    } 
    generateTag(tagName);
}
    function generateTag(tagName){
    
    var div1 = document.createElement("div");
    div1.setAttribute("class", "tagButton");
    var div2 = document.createElement("div");
    div2.innerHTML = tagName;
    div2.setAttribute("class", "tag");
    div1.appendChild(div2);
    var dltButton = document.createElement("button");
    dltButton.innerHTML = "x";
    dltButton.setAttribute("onclick", "deleteTag(this.parentElement)");
    div1.appendChild(dltButton);
    document.getElementById("yourTagArea").appendChild(div1);
    document.getElementById("tagEnterBoxInput").value = "";

    var q = document.querySelectorAll(".tag");
    t = Array.from(q);
}


////////
//  Custom ID filter box
////////

let customBox;
let filterHelp;
var check1 = 0;
function customIdBox(){
	if (check1 === 0){
		customBox = document.createElement("input");
		document.getElementById("selectFilterArea").appendChild(customBox);
		customBox.setAttribute("id", "customIdInput");
		customBox.setAttribute("value", "");
		customBox.setAttribute("size", "6");
		customBox.setAttribute("pattern", "[0-9]+")
		check1 = 1;
		document.getElementById("customIdInput").addEventListener("keyup", function(){
			var i = document.getElementById("customIdInput").value;
			document.getElementById("customId").setAttribute("value", i);
            //console.log(i);
            document.getElementById("customIdInput").addEventListener("input", (event)=> {idValue = "customIdInput"; noLettersHere(idValue, 0); });
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


////////
//  Random button with filters
////////

function getRandomFilterImage() {

var artist = document.getElementById("filteredartistName").value;
var filterNumber = document.querySelector("#filter").value;
var upVoteNumber = document.getElementById("filteredUpVotesNumber").value;
var downVoteNumber = document.getElementById("filteredDownVotesNumber").value;
var score = document.getElementById("filteredScoreNumber").value;
//var encodedFilterBox = encodeURIComponent(document.getElementById("applyFilterBox").value);

}