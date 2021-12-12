/*
let newWin = window.open("about:blank", "hello", "width=600,height=600,left=0,top=0");
newWin.document.write("<head><link rel='stylesheet' href='https://vaser888.github.io/sudoku/scrapeTest.css'></head>");
newWin.document.write("Page Loaded");
newWin.document.write("<body id='mainBody' class='mainBody'><div id='main' class='main'></div></body>");
newWin.document.write("<script src='https://vaser888.github.io/sudoku/scrapeTest.js'><\/script>");
*/

//var csv is the CSV file with headers
function csvJSON(csv){

    var lines=csv.split("\n");

    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    //return result; //JavaScript object
    return result;
  }

var g = [];

function retrieveSiteData(company,sDate,eDate,selec) {

    g = [];
 
    var htmlLink="https://query1.finance.yahoo.com/v7/finance/download/"+ company +"?period1="+ sDate +"&period2="+ eDate +"&interval="+ selec +"&events=history&includeAdjustedClose=true"

    var t = fetch(htmlLink).then(function(r) {
        return r.text().then(function(text){
            console.log(text);
            g = csvJSON(text);
            console.log(g);
            displayData(g);
            return g;
        });
    });    
}

// genorate website

var input1 = document.createElement("input");
input1.setAttribute("id", "ticker");
input1.setAttribute("type","text");
document.getElementById("main").appendChild(input1);

var input2 = document.createElement("input");
input2.setAttribute("type", "date");
input2.setAttribute("id", "startDate");
document.getElementById("main").appendChild(input2);

var input3 = document.createElement("input");
input3.setAttribute("type", "date");
input3.setAttribute("id", "endDate");
document.getElementById("main").appendChild(input3);

var select1 = document.createElement("select");
select1.setAttribute("id", "selector");

var option1 = document.createElement("option");
option1.setAttribute("value", "1d");
option1.innerHTML = "Daily";

var option2 = document.createElement("option");
option2.setAttribute("value", "1wk");
option2.innerHTML = "Weekly";

var option3 = document.createElement("option");
option3.setAttribute("value", "1mo");
option3.innerHTML = "Mothly";

select1.appendChild(option1);
select1.appendChild(option2);
select1.appendChild(option3);
document.getElementById("main").appendChild(select1);

var btn1 = document.createElement("button");
btn1.setAttribute("onclick","getData()")
btn1.innerHTML = "Get data"
document.getElementById("main").appendChild(btn1);

var dataDis = document.createElement("div");
dataDis.setAttribute("id","dataDisplayArea");
document.getElementById("mainBody").appendChild(dataDis);

function getData(){
    var company = document.getElementById("ticker").value; 
    var startDate = document.getElementById("startDate").valueAsNumber;
    var endDate = document.getElementById("endDate").valueAsNumber;
    var selector = document.getElementById("selector").value;
    startDate = startDate/1000;
    endDate = endDate/1000;
    console.log(company, startDate, endDate, selector);
    retrieveSiteData(company,startDate,endDate,selector);
}

function displayData(array){
    console.log("i have fired");
    refreshDataArea();
    var r = array.length - 1;
    for (i=0; i<=array.length-1;i++){
        var div = document.createElement("div");
        div.innerHTML = array[r-i].Date + ", " + array[r-i].Open;
        document.getElementById("dataDisplayArea").appendChild(div);
    }
}

function refreshDataArea(){
    document.getElementById("dataDisplayArea").remove();
    var div = document.createElement("div");
    div.setAttribute("id","dataDisplayArea");
    document.getElementById("mainBody").appendChild(div);
}
