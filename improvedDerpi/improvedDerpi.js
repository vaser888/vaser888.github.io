
function getRandomImage(){
    alert("Nothing here to see yet\n\nUse 'Go to specific image #', that's working ;)");
};

document.getElementById("realDerpiButton").addEventListener("click", (event)=>{
    window.location.href = "https://derpibooru.org/";
});

var idValue;
document.getElementById("imageNumberSearch").addEventListener("input", (event)=> {idValue = "imageNumberSearch"; noLettersHere(idValue); });

function noLettersHere(id) {
    var numCheck = /[0-9]+$/;
    if (document.getElementById(id).value.match(numCheck)) {

    }
    else{
        var t = document.getElementById(id).value;
        document.getElementById(id).value = t.substring(0, t.length - 1);
    }
}

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

function goButton(){
    var e = document.getElementById("imageNumberSearch").value;
    if (e === ""){
        alert("Please enter a number")
    }
    else{
        fetch("https://derpibooru.org/api/v1/json/images/" + e).then(function (r) { return r.json() }).then(function (imageJson){
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
            document.getElementById("numberOfDown").innerHTML = "Down votes " + dwnv;
        })
        //window.location.href = "https://derpibooru.org/images/" + e;
    }
}