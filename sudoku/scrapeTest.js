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

var htmlLink="https://query1.finance.yahoo.com/v7/finance/download/AAPL?period1=1607717043&period2=1639253043&interval=1d&events=history&includeAdjustedClose=true"

 var t = fetch(htmlLink).then(function(r) {
    return r.text().then(function(text){
        console.log(text);
        g = csvJSON(text);
        console.log(g);
        return g;
    });
});

/*
let newWin = window.open("about:blank", "hello", "width=200,height=200,left=0,top=0");
newWin.document.write("Page Loaded");
newWin.document.write("<div id='main'><div id='dataDump'></div></div>");
newWin.document.write("<script src='https://vaser888.github.io/sudoku/scrapeTest.js'><\/script>");
*/
