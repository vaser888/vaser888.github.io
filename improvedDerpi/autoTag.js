
function loadTagData() {
    let tags = [
        "twilight sparkle", "fluttershy", "rainbow dash", "apple jack", "Pinkie Pie", "Rarity",
        "safe",
        "luna",
        "derpy hooves", "zecora",
        "trixie",
        

        
    ]
    tags.sort();
    
    for (i = 0; i <= tags.length - 1; i++){
        var data = document.createElement("option");
        data.setAttribute("value", tags[i]);
        data.setAttribute("class", "tagData")
        data.innerHTML = tags[i];
        document.getElementById("autoTags").appendChild(data);
        //console.log(tags[i]);
    }  
}

loadTagData();

var initialArray;
var t = document.querySelectorAll(".tagData");
initialArray = Array.from(t);

document.getElementById("tagEnterBoxInput").addEventListener("input", (function() {
    var inputVal = document.getElementById("tagEnterBoxInput").value;
    var first = [];
    first = document.querySelectorAll("#autoTags option");
    first = initialArray;
    if (inputVal != "" && inputVal != "undefinded") {
        var options ="";
        for (var i = 0; i < first.length; i++) {
            if (first[i].value.toLowerCase().startsWith(inputVal.toLowerCase())) {
                options += "<option value='" + first[i].value + "' />";
            }
        }
        document.getElementById("autoTags").innerHTML = options;
    }
    else{
        document.getElementById("autoTags").innerHTML = "";
        loadTagData();
    }
    t = "";
}));

