window.onload = function(){
    //siteOptions();

    setupSiteWithOptions();
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
document.getElementById("currentFilteredGridPageNumber").addEventListener("input", (event)=> {idValue = "currentFilteredGridPageNumber"; noLettersHere(idValue, 0)});

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

document.getElementById("slideMenuBtn").addEventListener("click", sideMenuToggle);

function sideMenuToggle(){
    a = document.getElementById("imageDisplayArea");
    a2 = document.getElementById("optionsDisplayArea");
    a3 = document.getElementById("gridDisplayArea");
    b = document.getElementById("settingsAndInfo");
    h = document.getElementById("imageDisplayArea").style.width;
    
    if (h === "75%"){
        a.style.width = "100%";
        a2.style.width = "100%";
        a3.style.width = "100%";
        b.style.width = "0%";
        b.style.display = "none";
        document.getElementById("slideMenuBtn").innerHTML = "< ☰ Open menu";
    }
    else{
        setTimeout( (event)=> {b.style.display = "";}, 300);
        b.style.width = "25%";
        a.style.width = "75%";
        a2.style.width = "75%";
        a3.style.width = "75%";
        document.getElementById("slideMenuBtn").innerHTML = "> ☰ Close menu";
    }
}

////////
//  top bar go button. It searches for specific images by an image number from Derpibooru.
//  It also updates info on the page and displays the image or video. 
///////

var imageNumberRam;

function goButton(){
    event.preventDefault();
    refreshImageAndVideoDivs();
    turnOffGrid();
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
        //console.log(mp4Link);
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
    turnOffGrid();
    searchImage(a);
}

function saveImageNumberToHistory(imgNum, imgLink){
    var divHist = document.createElement("div");
    var aHist = document.createElement("a");
    var imgHist = document.createElement("img");
    divHist.setAttribute("class", "historyStyle");
    imgHist.setAttribute("src", imgLink);
    divHist.appendChild(imgHist);
    aHist.setAttribute("href", "");
    aHist.setAttribute("onclick", "historySearch(this.innerHTML)");
    aHist.setAttribute
    aHist.innerHTML += imgNum;
    divHist.appendChild(aHist);
    document.getElementById("imageHistoryArea").appendChild(divHist);
    checkHistoryLimit();
}

function checkHistoryLimit(){
    var r = document.getElementById("historyMemoryLength").value;
    if (r != "infinite") {
        var q = document.querySelectorAll(".historyStyle");
        t = Array.from(q);
        //console.log(r,t);
        if (t.length > r){
            document.querySelector(".historyStyle").remove();
        }
    }
}

////////
// Tags and filter area
////////

function addTag(a){
    generateTag(a);
    getFilterPossibilityNumber(0);
    giveTagsAValue();
    //var q = document.querySelectorAll(".tag");
    //t = Array.from(q);
}

function deleteTag(a){
 
    a.remove();
    getFilterPossibilityNumber(0);
    giveTagsAValue();  
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
    giveTagsAValue();
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
    giveTagsAValue();
}

function generateTag(tagName){
    var div1 = document.createElement("div");
    div1.setAttribute("class", "tagButton");
    div1.setAttribute("id", tagName);
    div1.setAttribute("draggable", "true");
    div1.setAttribute("ondragstart", "drag(event)");
    div1.setAttribute("onmouseover", "hoverValue(this)")
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

function customIdBox(inputIdName, area, qMark, update) {
	customBox = document.createElement("input");
	document.getElementById(area).appendChild(customBox);
	customBox.setAttribute("id", inputIdName);
	customBox.setAttribute("value", "");
	customBox.setAttribute("size", "6");
	customBox.setAttribute("pattern", "[0-9]+")
    check1 = 1;
    if (update === true){
        document.getElementById(inputIdName).addEventListener("input", (event)=> {idValue = inputIdName; noLettersHere(idValue, 0); getFilterPossibilityNumber(0);});
    }
	filterHelp = document.createElement("a");
	document.getElementById(area).appendChild(filterHelp);
	filterHelp.setAttribute("id", qMark);
	filterHelp.setAttribute("target", "_blank");
	document.getElementById(qMark).href = "derpiDrawingSiteInstructions.jpg";
	document.getElementById(qMark).innerHTML = "?";	
}

function delCustomIdBox(check){
	if (check === 1){
        var myEle = document.getElementById("customIdInput");
        if (myEle){
            document.getElementById("customIdInput").remove();
            document.getElementById("filterQuestionMark").remove(); //customBox.parentNode.removeChild(customBox);filterHelp.parentNode.removeChild(filterHelp);
        }
    }
    if (check === 2){
        var myEle = document.getElementById("savedIdInput");
        if (myEle){
            document.getElementById("savedIdInput").remove();
            document.getElementById("optionsQuestionMark").remove();
        }
    }
	else{
		return;
	}
}

document.getElementById("filter").addEventListener("change", loadIdBoxAndGetPossibNum);

function loadIdBoxAndGetPossibNum() {
    loadIdBox();
    getFilterPossibilityNumber(0);
}

function loadIdBox() {

    var filterCheck = document.getElementById("filter").value;  //event.target.value;

    if  (filterCheck === "56027"||filterCheck === "37429"||filterCheck === "37432"){
        alert("By selecting this filter you can access content which is not suitable for everyone, such as sexually explicit, grimdark or gory material.\n\nBy changing away from the default filters, you accept you are legally permitted to view this content in your jurisdiction.\n\nIf in doubt, stick with the recommended default filters.");
    }
    if (filterCheck === "Custom"){
        customIdBox("customIdInput", "selectFilterArea", "filterQuestionMark", true);
    }
    else{
        delCustomIdBox(1);
    }
    loadTagData();
}

document.getElementById("savedFilter").addEventListener("change", (event) => {
    var filterCheck = event.target.value;
    //console.log(filterCheck);
    if (filterCheck === "Custom") {
        customIdBox("savedIdInput", "savedFilterArea", "optionsQuestionMark", false);
    }
    else {
        delCustomIdBox(2);
    }
});

////////
//  Random button with filters
////////

function getRandomFilterImage() {
    refreshImageAndVideoDivs();
    turnOffGrid();
    var test = getFilterDataAndEncode(1, 1);
    fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (RngImageJson){
        var tNum = RngImageJson.total
        document.getElementById("possibleFilteredImageNumber").innerHTML = tNum;
        var randomImageNumber = ((Math.floor(Math.random()*tNum))+1);
        document.getElementById("filteredImageNumber").value = (randomImageNumber);

        var test = getFilterDataAndEncode(randomImageNumber, 1);
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
    var specificPageNumber = document.getElementById("filteredImageNumber").value;
    if (specificPageNumber === ""){
        alert("input a number to the 'Total possible images' input");
        return;
    }
    refreshImageAndVideoDivs();
    var test = getFilterDataAndEncode(specificPageNumber, 1);
    //console.log("v get filter image")
    fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (thisImageJson){
        //console.log("^ get filter image")
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
    if (n <= 0){
        document.getElementById("filteredImageNumber").value = p;
    }
    goToFilterImage(false);
}

////////
//  Filter possiblities 
////////

function getFilterPossibilityNumber(specificPageNumber) {
    var test = getFilterDataAndEncode(specificPageNumber, 1);
    //console.log("v gets first")
    fetch("https://derpibooru.org/api/v1/json/search/images"+ test).then(function (r) { return r.json() }).then(function (assumeFilterJson){
        //console.log("^ gets first")
        var tot = assumeFilterJson.total;
        document.getElementById("possibleFilteredImageNumber").innerHTML = tot;
        document.getElementById("filteredImageNumber").value = "1";

        var pn = (Math.floor(tot/gridDisplayValue)) + 1
        document.getElementById("possibleFilteredPagesNumber").innerHTML = pn;
        document.getElementById("currentFilteredGridPageNumber").value = "1";  

        if (document.getElementById("changeImageLayoutButton").innerHTML === "▣"){
            refreshGrid();
            getDataForGrid();
        }
        goToFilterImage(false); //load page with first image on DB
        singleImageFilteredImageNumberRam = 1;
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

function getFilterDataAndEncode(page, per_page){
    var filterNumber = document.getElementById("filter").value;
    var score = document.getElementById("filteredScoreNumber").value;
    var upVoteNumber = document.getElementById("filteredUpVotesNumber").value;
    var downVoteNumber = document.getElementById("filteredDownVotesNumber").value;
    var q = document.querySelectorAll(".tag");
    t = Array.from(q);
    //console.log(filterNumber);
    if(filterNumber === "Custom"){
        filterNumber = document.getElementById("customIdInput").value;
        if (filterNumber === ""){
            filterNumber = 0
        }
        //alert("Insert your custom filter number\nOr\nChange the filter to one of the 4 choices");
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
    encodedFilterSearch += "&per_page=" + per_page;
    encodedFilterSearch += "&key=PpzyTx7523PoVv4y9WrG"
    encodedFilterSearch += "&page=" + page;
    encodedFilterSearch += "&q=upvotes.gte:" + upVoteNumber;
    encodedFilterSearch += ",+downvotes.gte:" + downVoteNumber;
    encodedFilterSearch += ",+score.gte:" + score;
    encodedFilterSearch += tag;
    //console.log(encodedFilterSearch);
    return encodedFilterSearch;
}

////////
//  Touch code
////////

var touchAlertRam = true;
document.getElementById("imageDisplayArea").addEventListener("touchstart", function(e){
 
    if (e.touches.length === 3) {
        hideAllUi();
        if (touchAlertRam === true){
            alert("use 3 fingers on the screen to bring back UI");
            touchAlertRam = false;
        }
    }
},false);

////////
//  remove all ui but image
////////

function hideAllUi(){

    tb = document.getElementById("topBar");
    btb = document.getElementById("bottomTopBar");
    sm = document.getElementById("settingsAndInfo");
    tbw = document.getElementById("topBar").style.width;

    if (tbw === "100%"){
        tb.style.width = "0%";
        btb.style.width = "0%";
        sm.style.width = "0%";
        document.getElementById("imageDisplayArea").setAttribute("class", "fullWindowImage");
        document.getElementById("imageDisplayArea").style.width = "100%";
        document.getElementById("gridDisplayArea").setAttribute("class", "fullWindowImage");
        document.getElementById("gridDisplayArea").style.width = "100%";

        document.getElementById("optionsDisplayArea").setAttribute("class", "fullWindowDescription");
        document.getElementById("optionsDisplayArea").style.width = "100%";
    }
    else{
        tb.style.width = "100%";
        btb.style.width = "100%";
        document.getElementById("imageDisplayArea").setAttribute("class", "imageDisplayArea");
        document.getElementById("optionsDisplayArea").setAttribute("class", "optionsDisplayArea");
        document.getElementById("gridDisplayArea").setAttribute("class", "gridDisplayArea");
        sideMenuToggle();
    }
}

////////
//  Swipe for next button
////////

var isMoving = false;
var xIni, imageDisplayAreaWidth, swipePercentPos, swipePercentNeg;
var nextRam, previousRam;

document.getElementById("imageDisplayArea").addEventListener("touchstart", function(e){
    xIni = e.touches[0].clientX;
    imageDisplayAreaWidth = document.getElementById("imageDisplayArea").clientWidth;
    swipePercentPos = Math.floor(swipeSensitivityValue * imageDisplayAreaWidth);
    swipePercentNeg = swipePercentPos * -1;  
    isMoving = true;
    nextRam = false;
    previousRam = false;
});

document.getElementById("imageDisplayArea").addEventListener("touchmove", function(e){
    if (isMoving === true){
        //console.log("hey", xIni,imageDisplayAreaWidth);
        var x = e.touches[0].clientX;
        var distanceTravled = xIni - x; 
        //console.log("x:"+distanceTravled);

        if (distanceTravled >= swipePercentPos){
            nextRam = true;
            document.getElementById("nextImageSwipe").className = "buttonNextSwipe";
        }
        else if (distanceTravled <= swipePercentNeg){
            previousRam = true;
            document.getElementById("PreviousImageSwipe").className = "buttonPreviousSwipe"; 
        }
        else{
            document.getElementById("nextImageSwipe").className = "";
            document.getElementById("PreviousImageSwipe").className = "";
            nextRam = false;
            previousRam = false;
        } 

    }
    else{
        isMoving = false;
    }
});

document.getElementById("imageDisplayArea").addEventListener("touchend", function(e){
    if (nextRam === true){
        nextFilterImage();
    }
    if (previousRam === true){
        previousFilterImage();
    }
    document.getElementById("nextImageSwipe").className = "";
    document.getElementById("PreviousImageSwipe").className = "";
    isMoving = false;
});

////////
//  Use Keyboard to control site. 
////////

document.onkeydown = function (event) {
    var keyPressed = event.keyCode;
    //console.log(event.keyCode);
    if (keyPressed === 219){
        hideAllUi();
    }
    if (keyPressed === 221){
        toggleImageLayoutButton();
    }
    var thisButton =  document.getElementById("changeImageLayoutButton");
    if (thisButton.innerHTML === "▦"){
        if (keyPressed === 190){
            nextFilterImage();
        }
        if (keyPressed === 188){
            previousFilterImage();
        }
    }
    if (thisButton.innerHTML === "▣"){
        if (keyPressed === 190){
            nextGridPage();
        }
        if (keyPressed === 188){
            previousGridPage();
        }
    }
}

////////
//  Site Options
////////

function siteOptions() {
    document.getElementById("optionsDisplayArea").style.display = "flex";
    document.getElementById("imageDisplayArea").style.display = "none";
    document.getElementById("gridDisplayArea").style.display = "none"; 
}

////////
//  close site Options
////////

document.getElementById("closeOptionsButton").addEventListener("click", closeSiteOptions);

function closeSiteOptions() {

    testIfYouChangedASettingAndForgotToSave();
    document.getElementById("optionsDisplayArea").style.display = "none";

    var thisButton =  document.getElementById("changeImageLayoutButton"); // check if 
    if (thisButton.innerHTML === "▦"){
        document.getElementById("imageDisplayArea").style.display = ""; 
    }
    else {
        document.getElementById("gridDisplayArea").style.display = ""; 
    }
}

////////
//  Get and create cookie data
////////

function setCookie(cName, cData, numDays) {
    var d = new Date();
    d.setTime(d.getTime() + (numDays*24*60*60*1000));
    var CookieExpires = "expires=" + d.toUTCString();
    document.cookie = cName + "=" + cData + ";" + CookieExpires + ";path=/; SameSite=Strict";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {      
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

////////
//  Site options test and load
////////

var swipeSensitivityValue;
var gridDisplayValue;

function testForOptionsCookie(){
    var cookie = getCookie("siteSettings");
    if (cookie != ""){
        //cookie is there already
        //update cookie date
    }
    else {
        document.getElementById("historyMemoryLength").value = 25;
        document.getElementById("safeTag").value = "true";
        document.getElementById("swipeSensitivity").value = 78;
        document.getElementById("savedFilter").value = 100073;
        document.getElementById("gridDisplayNumberSlider").value = 15;
        document.getElementById("gridStart").value = "true";
        var d = compressCookieData();
        setCookie("siteSettings", d, 730);
    }
}

function setupSiteWithOptions() {
    testForOptionsCookie(); // creates cookie if no cookie is found
    data = setOptions();
    checkIntegrityOfCookie(data);
    if (data.safeFilter === "true"){
        generateTag("safe");
        giveTagsAValue();
    }
    if (data.gridStartVal === "true"){
        toggleGird();
    }
    document.getElementById("filter").value = data.startDFilter;
    updateGridDisplayNumberValue();
}

function setOptions () {
    var optionsCookie = getCookie("siteSettings");
    var data = JSON.parse(optionsCookie);
    //console.log(data);

    document.getElementById("historyMemoryLength").value = data.historyLength;
    document.getElementById("safeTag").value = data.safeFilter;
    document.getElementById("swipeSensitivity").value = data.swipeSensitivity;
    document.getElementById("savedFilter").value = data.startDFilter;
    document.getElementById("gridDisplayNumberSlider").value = data.numGridDisplay;
    document.getElementById("gridStart").value = data.gridStartVal;

    if (data.startDFilter === "Custom") {
        delCustomIdBox(1);
        delCustomIdBox(2);
        customIdBox("savedIdInput", "savedFilterArea", "optionsQuestionMark", false);
        customIdBox("customIdInput", "selectFilterArea", "filterQuestionMark", true);
        document.getElementById("savedIdInput").value = data.customFilterNumber;
        document.getElementById("customIdInput").value = data.customFilterNumber;
        document.getElementById("filter").value = data.startDFilter;
    }

    var b = data.swipeSensitivity;
    swipeSensitivityValue = (((b - 100)* -1)/100);
    gridDisplayValue = data.numGridDisplay;
    return data;
}

////////
//  Save options into cookie
////////

function compressCookieData(){
    var k0 = document.getElementById("historyMemoryLength").value;
    var k1 = document.getElementById("safeTag").value;
    var k2 = document.getElementById("swipeSensitivity").value;
    var k3 = document.getElementById("savedFilter").value;

    if (k3 === "Custom"){
        var myEle = document.getElementById("savedIdInput");
        if (myEle){
            var k4 = document.getElementById("savedIdInput").value;
        }
    }

    var k5 = document.getElementById("gridDisplayNumberSlider").value;
    var k6 = document.getElementById("gridStart").value;

    var cookieData0 = JSON.stringify({
        historyLength: k0,
        safeFilter: k1,
        swipeSensitivity: k2,
        startDFilter: k3,
        customFilterNumber: k4,
        numGridDisplay: k5,
        gridStartVal: k6
    }) 
    //console.log(cookieData0);
    return cookieData0;
}

function saveOptionsCookie() {
    event.preventDefault();
    var d = compressCookieData();
    setCookie("siteSettings", d, 730);
    setOptions();
    alert("saved"); 
    location.reload(); 
}

////////
//  Make sure everything is in cookie and update cookie expire date
////////

function checkIntegrityOfCookie(c) {
    //console.log(c);
    if (typeof c.historyLength === "undefined"){
        document.getElementById("historyMemoryLength").value = 25;
    }
    if (typeof c.safeFilter === "undefined"){
        document.getElementById("safeTag").value = "true";
    }
    if (typeof c.swipeSensitivity === "undefined"){
        document.getElementById("swipeSensitivity").value = 78;
    }
    if (typeof c.startDFilter === "undefined"){
        document.getElementById("savedFilter").value = 100073;
    }
    if (typeof c.numGridDisplay === "undefined"){
        document.getElementById("gridDisplayNumberSlider").value = 15;
    }
    if (typeof c.gridStartVal === "undefined"){
        document.getElementById("gridStart").value = "true"; 
    }  
    var d = compressCookieData();
    setCookie("siteSettings", d, 730);
} 

////////
//  Test if you saved before leaving options and if no then give prompt 
////////

function testIfYouChangedASettingAndForgotToSave() {
    var currentSettings = compressCookieData();
    var cookieSettings = getCookie("siteSettings");
    //console.log(currentSettings);
    //console.log(cookieSettings);
    if (currentSettings === cookieSettings){
        //do nothing
    }
    else{
        var i = confirm("You changed settings and forgot to press save\n\nDo you want me to save changes?");
        if (i === true){
            saveOptionsCookie();
        }
        else{
            setOptions();
            updateGridDisplayNumberValue();
            delCustomIdBox(2);
        }
    }
}

////////
//  Drag and Drop
////////

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("tagBubble", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("tagBubble");
    var something = document.getElementById(data);
    var tagArea = document.getElementById("yourTagArea");
    
    setTimeout((event) => {
        tagArea.insertBefore(something, tagArea.childNodes[tagDropRam]);
        giveTagsAValue();
    }, 200);
}

var tagDropRam;

function hoverValue(ev) {
    tagDropRam = ev.getAttribute("data-order")
    //console.log(tagDropRam); 
}

////////
//  assign tags values
////////

function giveTagsAValue() {
    var q = document.querySelectorAll(".tagButton");
    a = Array.from(q);
    for (i = 0; i <= a.length - 1; i++){
        document.getElementById(a[i].id).setAttribute("data-order", i); 
    }
}

////////
//  Change site to multi-image view 
////////

var singleImageFilteredImageNumberRam;

function toggleImageLayoutButton() {

    toggleGird();
    updateWholeGrid(); 
    singleImageFilteredImageNumberRam = document.getElementById("filteredImageNumber").value;
}

function toggleGird() {
    if(document.getElementById("optionsDisplayArea").style.display === "flex"){
        //do nothing
    }
    else{
        var thisButton =  document.getElementById("changeImageLayoutButton");
        if (thisButton.innerHTML === "▦"){
            thisButton.innerHTML = "▣";

            document.getElementById("gridDisplayArea").style.display = "flex";
            document.getElementById("imageDisplayArea").style.display = "none";
            document.getElementById("gridControlsArea").style.display = "flex";
            document.getElementById("basicPictureInfo").style.display = "none";
            document.getElementById("filteredImageNumber").disabled = true;
            document.getElementById("goFilterButton").disabled = true; 

            singleImageFilteredImageNumberRam = document.getElementById("filteredImageNumber").value;
        }
        else {
            thisButton.innerHTML = "▦";
            document.getElementById("gridDisplayArea").style.display = "none";
            document.getElementById("imageDisplayArea").style.display = "";
            document.getElementById("gridControlsArea").style.display ="none";
            document.getElementById("basicPictureInfo").style.display = "flex";
            document.getElementById("filteredImageNumber").disabled = false;
            document.getElementById("goFilterButton").disabled = false;

            document.getElementById("filteredImageNumber").value = singleImageFilteredImageNumberRam;
        }
    }
}

function turnOffGrid() {
    if(document.getElementById("optionsDisplayArea").style.display === "flex"){
        //do nothing
    }
    else{
        document.getElementById("changeImageLayoutButton").innerHTML = "▦"
        document.getElementById("gridDisplayArea").style.display = "none";
        document.getElementById("imageDisplayArea").style.display = "";
        document.getElementById("gridControlsArea").style.display ="none";
        document.getElementById("basicPictureInfo").style.display = "flex";
        document.getElementById("filteredImageNumber").disabled = false;
        document.getElementById("goFilterButton").disabled = false;
    }
}

////////
//  updates the current grid page value and gets images
////////

function updateWholeGrid() {
    var i = document.getElementById("filteredImageNumber").value;
    i = Math.floor((i / gridDisplayValue) + 1)
    document.getElementById("currentFilteredGridPageNumber").value = i;
    refreshGrid();
    getDataForGrid();
}

function refreshGrid() {
    document.getElementById("theGrid").remove();
    var div = document.createElement("div");
    div.setAttribute("id", "theGrid");
    div.setAttribute("class", "theGrid");
    document.getElementById("gridDisplayArea").appendChild(div);
}

function getDataForGrid() {
    var gridPageNumber = document.getElementById("currentFilteredGridPageNumber").value;
    if (gridPageNumber === "" || gridPageNumber <= 0){
        gridPageNumber = 1;
    }
    var searchParameters = getFilterDataAndEncode(gridPageNumber, gridDisplayValue);
    fetch("https://derpibooru.org/api/v1/json/search/images" + searchParameters).then(function (r) {return r.json() }).then(function (gridData){
        generateGridBoxes(gridData);
    });
}

function generateGridBoxes(theData) {

    for (i = 0; i < gridDisplayValue; i++){

        var mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "gridImageBox");
        mainDiv.setAttribute("data-image-order", i+1);
        mainDiv.setAttribute("data-image-id", theData.images[i].id);
        mainDiv.setAttribute("onclick", "getClickedGridImage(this)")

        var statsDiv = document.createElement("div");
        statsDiv.setAttribute("class", "gridImageStats");

            var div0 = document.createElement("div");
            div0.setAttribute("class", "gold");
            div0.innerHTML = theData.images[i].faves;
            statsDiv.appendChild(div0);

            var div1 = document.createElement("div");
            div1.setAttribute("class", "green");
            div1.innerHTML = theData.images[i].upvotes;
            statsDiv.appendChild(div1);

            var div2 = document.createElement("div");
            div2.innerHTML = theData.images[i].score;
            statsDiv.appendChild(div2);

            var div3 = document.createElement("div");
            div3.setAttribute("class", "red");
            div3.innerHTML = theData.images[i].downvotes;
            statsDiv.appendChild(div3);

        mainDiv.appendChild(statsDiv);

        var imgDiv = document.createElement("div");
        imgDiv.setAttribute("class", "gridImage");
            var img = document.createElement("img");
            img.setAttribute("src", getImageAndFilterToGifIfWebm(theData, i, imgDiv));
        imgDiv.appendChild(img);
        mainDiv.appendChild(imgDiv);
        document.getElementById("theGrid").appendChild(mainDiv);

    }
}

////////
//  go to the image you press on when you click on a grid image
////////

function getClickedGridImage(img) {
    var imageId = img.getAttribute("data-image-id"); 
    var imageVal = img.getAttribute("data-image-order");

    var i = document.getElementById("currentFilteredGridPageNumber").value;
    i = ((Number(i) - 1) * Number(gridDisplayValue)) + Number(imageVal);
    document.getElementById("filteredImageNumber").value = i;
    document.getElementById("imageNumberSearch").value = imageId;
    goButton();
    //console.log(imageId, imageVal, i); 
}

////////
//  check for webm and convert to gif
////////

function getImageAndFilterToGifIfWebm(jsonData, imageNumber, imgDiv) {
    var formatType = jsonData.images[imageNumber].format;
    if (formatType === "webm") {
        var webmLink = jsonData.images[imageNumber].representations.thumb;
        var z = webmLink.length;
        z = z - 4;
        var gifLink = webmLink.substr(0, z) + "gif";

        var webmDiv = document.createElement("div");
        webmDiv.setAttribute("class", "webmSign");
        webmDiv.innerHTML = "Webm";
        imgDiv.appendChild(webmDiv);

        return gifLink;
    }
    else {
        var imgLink = jsonData.images[imageNumber].representations.thumb;
        return imgLink;
    }

}

////////
//  navigation Grid
////////

function gridGoButton() {
    event.preventDefault();
    refreshGrid();
    getDataForGrid();
}

function nextGridPage() {
    var i = document.getElementById("currentFilteredGridPageNumber").value;
    var p = Number(i) + 1;
    var t = document.getElementById("possibleFilteredPagesNumber").innerHTML;
    if (p > t){
        p = 1;
    }

    document.getElementById("currentFilteredGridPageNumber").value = p;
    refreshGrid();
    getDataForGrid();
    updateFilteredImageNumberBecauseGrid();
}

function previousGridPage() {
    var i = document.getElementById("currentFilteredGridPageNumber").value;
    var p = Number(i) - 1;
    var t = document.getElementById("possibleFilteredPagesNumber").innerHTML;
    if (p <= 0){
        p = t;
    }

    document.getElementById("currentFilteredGridPageNumber").value = p;
    refreshGrid();
    getDataForGrid();
    updateFilteredImageNumberBecauseGrid();
}

function updateFilteredImageNumberBecauseGrid() {
    var i = document.getElementById("currentFilteredGridPageNumber").value;
    var t = (i * gridDisplayValue)-1; 
    document.getElementById("filteredImageNumber").value = t;
}

////////
//  Update slider in options  
////////

document.getElementById("gridDisplayNumberSlider").addEventListener("input", updateGridDisplayNumberValue);

function updateGridDisplayNumberValue() {
    var i = document.getElementById("gridDisplayNumberSlider").value;
    document.getElementById("gridDisplayNumberValue").innerHTML = i;
}

////////
//
////////


/*
// i don't need this anymore because i fixed my problmes and everything is working fine but this is cool code and could be useful in the future.

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    //loadIdBox();
}
*/