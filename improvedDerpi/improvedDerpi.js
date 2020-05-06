window.onload = function(){
    getFilterPossibilityNumber(0);
}

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
        if (setting === 1){
            getFilterPossibilityNumber(0);
        }
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
        document.getElementById("theImageLow").style.display = "none";
        document.getElementById("theImage").style.display = "block";
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
    refreshImageAndVideoDivs();
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
        console.log("This page is broken or the image has moved\nlet's try to take you there!");
    });
        //window.location.href = "https://derpibooru.org/images/" + e;
}

////////
//  Update everything in the website for random image search
////////

function imagesUpdateWebsite(imageJson, e){
    
    //console.log(imageJson);
    var testOfDupe = imageJson.images[0].duplicate_of;
    //console.log(testOfDupe);
    if (testOfDupe === null){
        document.getElementById("imageNumberSearch").value = e;
    }
    else{
        e = testOfDupe;
        searchImage(e);
        document.getElementById("imageNumberSearch").value = e;
    }
    

    imageNumberRam = e;
    //console.log(imageNumberRam);

    document.getElementById("toImageDerpiLink").href = "https://derpibooru.org/images/" + e;
    var i = imageJson.images[0].source_url;
    if (i === ""){
        i = "404-No-Image";
    }
    document.getElementById("toImageSourceLink").href = i;

    var formatType = imageJson.images[0].format;
    if (formatType === "webm"){
        document.getElementById("theImage").style.display = "none";
        document.getElementById("theVideo").style.display = "";
        var webmlink = imageJson.images[0].representations.full;
        var z = webmlink.length;
        z = z - 4;
        var mp4Link = webmlink.substr(0, z) +"mp4";
        //var mp4Link = videolink
        console.log(mp4Link);
        var videosrc = document.createElement("source");
        videosrc.setAttribute("src", webmlink);
        videosrc.setAttribute("type", "video/webm");
        document.getElementById("theVideo").appendChild(videosrc);
        var videosrc = document.createElement("source");
        videosrc.setAttribute("src", mp4Link);
        videosrc.setAttribute("type", "video/mp4");
        document.getElementById("theVideo").appendChild(videosrc);
        document.getElementById("theVideo").muted = true;
        //document.getElementById("theVideo").src = imageJson.images[0].representations.full;
    }
    else {
        document.getElementById("theVideo").style.display= "none";
        document.getElementById("theVideo").pause();
        document.getElementById("theImage").style.display = "none";
        document.getElementById("theImageLow").src = imageJson.images[0].representations.large;
        document.getElementById("theImage").src = imageJson.images[0].view_url;
    }


    var upv = imageJson.images[0].upvotes;
    document.getElementById("numberOfUp").innerHTML = "Upvotes:<br>" + upv;

    var sco = imageJson.images[0].score;
    document.getElementById("numberOfScore").innerHTML = "Score:<br>" + sco;

    var dwnv = imageJson.images[0].downvotes;
    document.getElementById("numberOfDown").innerHTML = "Downvotes:<br>" + dwnv;

    var fav = imageJson.images[0].faves;
    document.getElementById("numberOfFaves").innerHTML = "Faves:<br>" + fav;

    ////////
    //  History area
    ////////
    var smallImage = imageJson.images[0].representations.thumb_tiny;
    saveImageNumberToHistory(imageNumberRam, smallImage);

    ////////
    //  Description area
    ////////

    var x = imageJson.images[0].width;
    var y = imageJson.images[0].height;
    var i = imageJson.images[0].created_at;
    var f = imageJson.images[0].format;
    var d = new Date(i);
    document.getElementById("imageInfo").innerHTML = "<u>Date created:</u> " + d.toDateString() + "<br>" + "<u>Resolution:</u> " + x + " x " + y+ "<br>" + "<u>File type:</u> ." + f;

    var i = imageJson.images[0].uploader;
    if (i ===null){
        i = "A Background Pony"
    }
    document.getElementById("uploaderUser").innerHTML = i;
    var i = imageJson.images[0].description;
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

    var imgTags = imageJson.images[0].tags;
    getIamgeTags(imgTags);

    ////////
    //  Comment area
    ////////
    commentPageNumber = 1;
    document.getElementById("commentNumberPage").innerHTML = "Page: <br>" + commentPageNumber;
    getComments(e, commentPageNumber);
} 

////////
//  Update everything in the website for specific image search
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
        document.getElementById("theImageLow").style.display = "none";
        document.getElementById("theVideo").style.display = "";
        
        var webmlink = imageJson.image.representations.full;
        var z = webmlink.length;
        z = z - 4;
        var mp4Link = webmlink.substr(0, z) +"mp4";
        //var mp4Link = videolink
        console.log(mp4Link);
        var videosrc = document.createElement("source");
        videosrc.setAttribute("src", webmlink);
        videosrc.setAttribute("type", "video/webm");
        document.getElementById("theVideo").appendChild(videosrc);
        var videosrc = document.createElement("source");
        videosrc.setAttribute("src", mp4Link);
        videosrc.setAttribute("type", "video/mp4");
        document.getElementById("theVideo").appendChild(videosrc);
        document.getElementById("theVideo").muted = true;
        //document.getElementById("theVideo").src = imageJson.image.representations.full;
    }
    else {
        document.getElementById("theVideo").style.display= "none";
        document.getElementById("theVideo").pause();
        //document.getElementById("theImage").style.display = "none";
        document.getElementById("theImageLow").src = imageJson.image.representations.large;
        document.getElementById("theImage").src = imageJson.image.view_url;
    }


    var upv = imageJson.image.upvotes;
    document.getElementById("numberOfUp").innerHTML = "Upvotes:<br>" + upv;

    var sco = imageJson.image.score;
    document.getElementById("numberOfScore").innerHTML = "Score:<br>" + sco;

    var dwnv = imageJson.image.downvotes;
    document.getElementById("numberOfDown").innerHTML = "Downvotes:<br>" + dwnv;

    var fav = imageJson.image.faves;
    document.getElementById("numberOfFaves").innerHTML = "Faves:<br>" + fav;

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
    var f = imageJson.image.format;
    var d = new Date(i);
    document.getElementById("imageInfo").innerHTML = "<u>Date created:</u> " + d.toDateString() + "<br>" + "<u>Resolution:</u> " + x + " x " + y + "<br>" + "<u>File type:</u> ." + f;

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
        errorMessage.innerHTML = "Error <br> The comments failed to load <br><br>You have hit the end of the comments, press back to get to the last comments you can view on this site<br><br> Try going to the Depribooru page to see the comments if you think there should be more comments.";
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
// Tags and filter area
////////

function addTag(a){
    generateTag(a);
    getFilterPossibilityNumber(0);
    //var q = document.querySelectorAll(".tag");
    //t = Array.from(q);
}

function deleteTag(a){
 
    a.remove();
    getFilterPossibilityNumber(0);  
    //var q = document.querySelectorAll(".tag");
    //t = Array.from(q);
}

function addTagToTagArea(){
    event.preventDefault();
    var tagName = document.getElementById("tagEnterBoxInput").value;
    if (tagName === ""){
        return;
    } 
    generateTag(tagName);
    document.getElementById("tagEnterBoxInput").value = "";
    getFilterPossibilityNumber(0);
}

function addArtistToTagArea(){
    event.preventDefault();
    var artist = document.getElementById("atistNameEnterBoxInput").value;

    if (artist === ""){
        return;
    } 

    var encodedArtist = "artist:" + artist;
    generateTag(encodedArtist);
    document.getElementById("atistNameEnterBoxInput").value = "";
    getFilterPossibilityNumber(0);
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

    //var q = document.querySelectorAll(".tag");
    //t = Array.from(q);
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
    if  (filterCheck === "56027"||filterCheck === "37429"||filterCheck === "37432"){
        loadTagData();
        alert("By selecting this filter you can access content which is not suitable for everyone, such as sexually explicit, grimdark or gory material.\n\nBy changing away from the default filters, you accept you are legally permitted to view this content in your jurisdiction.\n\nIf in doubt, stick with the recommended default filters.");
    }
	if (filterCheck === customFilterNumber){
		customIdBox();
	}
	else {
        loadTagData();
        delCustomIdBox();
        getFilterPossibilityNumber(0);
	}
});

////////
//  Random button with filters
////////

function getRandomFilterImage() {
    refreshImageAndVideoDivs();
    var test = getFilterDataAndEncode(1);
    fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (RngImageJson){
        var tNum = RngImageJson.total
        document.getElementById("possibleFilteredImageNumber").innerHTML = tNum;
        var randomImageNumber = ((Math.floor(Math.random()*tNum))+1);
        document.getElementById("filteredImageNumber").value = (randomImageNumber);

        var test = getFilterDataAndEncode(randomImageNumber);
        fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (theImageJson){
            var id = theImageJson.images[0].id;
            imagesUpdateWebsite(theImageJson, id);
        });
    });
//var encodedFilterBox = encodeURIComponent(document.getElementById("applyFilterBox").value);
}

////////
//  goto Specific image with filters
////////

function goToFilterImage(t){
    if (t === true){
    event.preventDefault();
    }
    var sPage = document.getElementById("filteredImageNumber").value;
    if (sPage === ""){
        alert("input a number to the 'Total possible images' input");
        return;
    }
    refreshImageAndVideoDivs();
    var test = getFilterDataAndEncode(sPage);
    fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (thisImageJson){
        var id = thisImageJson.images[0].id;
        imagesUpdateWebsite(thisImageJson, id);
    });
}

////////
//  goto next Specific image with filters
////////
function nextFilterImage(){
    refreshImageAndVideoDivs();
    var n = document.getElementById("filteredImageNumber").value;
    var p = document.getElementById("possibleFilteredImageNumber").innerHTML;
    n = Number(n) + 1;
    document.getElementById("filteredImageNumber").value = n;
    if (n === Number(p) + 1){
        document.getElementById("filteredImageNumber").value = 1;
    }
    goToFilterImage(false);
}

////////
//  goto previous image with filters
////////

function previousFilterImage(){
    refreshImageAndVideoDivs();
    var n = document.getElementById("filteredImageNumber").value;
    var p = document.getElementById("possibleFilteredImageNumber").innerHTML;
    n = Number(n) - 1;
    document.getElementById("filteredImageNumber").value = n;
    if (n === 0){
        document.getElementById("filteredImageNumber").value = p;
    }
    goToFilterImage(false);
}

////////
//  Filter possiblities 
////////

function getFilterPossibilityNumber(sPage) {
    var test = getFilterDataAndEncode(sPage);
    fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (assumeFilterJson){
        var tot = assumeFilterJson.total;
        document.getElementById("possibleFilteredImageNumber").innerHTML = tot;
        document.getElementById("filteredImageNumber").value = "1";
    });
}

////////
//  Refesh image and video divs
////////

function refreshImageAndVideoDivs() {
    document.getElementById("theImageLow").remove();
    document.getElementById("theImage").remove();
    document.getElementById("theVideo").remove();
    div = document.getElementById("clickExpand");
    var imgLow = document.createElement("img");
    imgLow.setAttribute("id", "theImageLow");
    imgLow.setAttribute("class", "theImage");
    imgLow.setAttribute("style", "display:block"); 
    div.appendChild(imgLow);
    var img = document.createElement("img");
    img.setAttribute("id", "theImage");
    img.setAttribute("class", "theImage");
    img.setAttribute("style", "display: none;");
    div.appendChild(img);
    var vid = document.createElement("video");
    vid.setAttribute("id", "theVideo");
    vid.setAttribute("class", "theVideo");
    vid.setAttribute("style", "display: none;");
    vid.setAttribute("controls", "");
    vid.setAttribute("autoplay", "");
    vid.setAttribute("muted", "");
    vid.setAttribute("loop", "");
    vid.setAttribute("playsinline", "");
    div.appendChild(vid);
}

////////
//  grab filter values and encode
////////

function getFilterDataAndEncode(page){
    var filterNumber = document.getElementById("filter").value;
    var score = document.getElementById("filteredScoreNumber").value;
    var upVoteNumber = document.getElementById("filteredUpVotesNumber").value;
    var downVoteNumber = document.getElementById("filteredDownVotesNumber").value;
    var q = document.querySelectorAll(".tag");
    t = Array.from(q);

    if(filterNumber === "Custom"|| filterNumber === ""){
        alert("Insert you custom fitler number\nOr\nChange the fitler to one of the 4 choices");
        return;
    }

    if (t.length === 0){
        var tag = "";
    }
    else{
        var tag = "";
        for (i = 0; i <= t.length-1; i++){
            if (i === 0){
                tag += "+"
            }
            tag += "," + t[i].innerHTML;
        }
    }
    if (score === ""){
        score = "-2000";
    }
    if (upVoteNumber === ""){
        upVoteNumber = "0"
    }
    if (downVoteNumber === ""){
        downVoteNumber = "-2000"
    }

    //console.log(filterNumber, score, upVoteNumber, downVoteNumber, tag);
    var encodedFilterSearch = "";
    encodedFilterSearch += "?filter_id=" + filterNumber;
    encodedFilterSearch += "&per_page=1"
    encodedFilterSearch += "&key=PpzyTx7523PoVv4y9WrG"
    encodedFilterSearch += "&page=" + page;
    encodedFilterSearch += "&q=upvotes.gte:" + upVoteNumber;
    encodedFilterSearch += ",+downvotes.gte:" + downVoteNumber;
    encodedFilterSearch += ",+score.gte:" + score;
    encodedFilterSearch += tag;
    //console.log(encodedFilterSearch);
    return encodedFilterSearch;
}

document.getElementById("clickExpand").addEventListener("touchmove", touchTest());

function touchTest(){
    document.getElementById("test").innerHTML = TouchList.length;
}

