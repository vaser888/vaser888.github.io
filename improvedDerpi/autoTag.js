
function loadTagData() {

    document.getElementById("autoTags").innerHTML = "";

    let tags = [
        "twilight sparkle", "fluttershy", "rainbow dash", "apple jack", "pinkie Pie", "rarity", "spike",
        "safe", "semi-grimdark", "suggestive",
        "pony", "unicorn", "pegasus", "anthro", "alicorn", "earth pony", "human",
        "dragon", "bat pony", "changeling", "griffon", "original species",
        "webm", "gif", "animation", "loop", "prefect loop", "comic", "animated",
        "mare", "male", "female", "stallion",
        "luna", "celestia ", "flurry heart", "cadance", "shining armor",
        "queen chrysalis", "discord", 
        "sandbar", "gallus", "yona", "smolder", "silverstream", "ocellus",
        "sunset shimmer", "starlight glimmer", 
        "zecora",
        "lyra heartstrings", "bon bon", "vinyl scratch", "derpy hooves", "octavia melody",
        "trixie",
           
    ]

    if (document.getElementById("filter").value === "56027"){
        let nsfwTags = [
            "explicit", "questionable", "grotesque", "grimdark",
            "sex", "cum", "penis", "nipples", "anus", "oral", "vulva",

        ]
        tags = tags.concat(nsfwTags);
    }
    //console.log(tags);
    tags.sort();

    for (i = 0; i <= tags.length - 1; i++){
        var data = document.createElement("option");
        data.setAttribute("value", tags[i]);
        data.setAttribute("class", "tagData")
        data.innerHTML = tags[i];
        document.getElementById("autoTags").appendChild(data);
        //console.log(tags[i]);
    } 
    
    var ta = document.querySelectorAll(".tagData");
    initialArray = Array.from(ta);
}

loadTagData();
var initialArray;
var ta = document.querySelectorAll(".tagData");
initialArray = Array.from(ta);


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
}));

