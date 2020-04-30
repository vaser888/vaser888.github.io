
function getRandomImage(){
    alert("Nothing here to see yet\n\nUse 'Go to specific image #', that's working ;)");
};

document.getElementById("realDerpiButton").addEventListener("click", (event)=>{
    window.location.href = "https://derpibooru.org/";
});

var idValue;
document.getElementById("imageNumberSearch").addEventListener("input", (event)=> {idValue = "imageNumberSearch"; noLettersHere(idValue); });

////////
//  Does not allow letters to be input into an Input, only numbers 
////////

function noLettersHere(id) {
    var numCheck = /[0-9]+$/;
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
       
        var x = imageJson.image.width;
        var y = imageJson.image.height;
        var i = imageJson.image.created_at;
        var d = new Date(i);
        document.getElementById("imageInfo").innerHTML = "Date created: " + d.toDateString() + "<br><br>" + "Resolution: " + x + " x " + y;

        var i = imageJson.image.uploader;
        if (i ===null){
            i = "A Background Pony"
        }
        document.getElementById("uploaderUser").innerHTML = i;

        var i = imageJson.image.description;
        i = decodeURI(i);
        document.getElementById("descriptionUser").innerHTML = i;

        getComments(e);
        
    }).catch(function(){
        alert("This page is broken or the image has moved\nlet's try to take you there!");});
        //window.location.href = "https://derpibooru.org/images/" + e;
}

////////
// Get comments for an image
////////

function getComments(e){
    fetch("https://derpibooru.org/api/v1/json/search/comments?q=image_id:"+ e +"&page=1&key=PpzyTx7523PoVv4y9WrG").then(function (r) { return r.json() }).then(function (commentJson){

    });

}


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

function slideMenuTopMenuPressed(n){
    var a = document.getElementById("descriptionBtn");
    var b = document.getElementById("filtersBtn");
    var c = document.getElementById("commentsBtn");

    var a1 = document.getElementById("descriptionArea");
    var b1 = document.getElementById("filtersArea");
    var c1 = document.getElementById("commentsArea");
    
    if (n === "1"){
        a.style.backgroundColor = "#3d92d0";
        b.style.backgroundColor = "";
        c.style.backgroundColor = "";

        a1.style.display = "";
        b1.style.display = "none";
        c1.style.display = "none";
    }
    if (n === "2"){
        a.style.backgroundColor = "";
        b.style.backgroundColor = "#3d92d0";
        c.style.backgroundColor = "";

        a1.style.display = "none";
        b1.style.display = "";
        c1.style.display = "none";

    }
    if (n === "3"){
        a.style.backgroundColor = "";
        b.style.backgroundColor = "";
        c.style.backgroundColor = "#3d92d0";

        a1.style.display = "none";
        b1.style.display = "none";
        c1.style.display = "";
    }


    //"#62a7d9"
    //"#3d92d0"
}