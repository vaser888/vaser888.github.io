Generate.addEventListener("click", generateNumber);
generateRow.addEventListener("click", generateRowNumbers) 
const testArea = document.querySelector(".testArea");
const testAreaRow = document.querySelector(".testAreaRow");

function generateNumber(){
	let randomNumber = Math.floor(Math.random() * 9) + 1;
	testArea.textContent = randomNumber;
}

var rowStore = [8];
var i;
var x;
var randomNumber
function generateRowNumbers(){
		testAreaRow.textContent = "";
		let randomNumber = Math.floor(Math.random() * 9) + 1;
	
	
	for (i=0; i<9; i++){
		
		rowStore[i] = randomNumber;
		//alert("first number is "+randomNumber);
		checkRowNumbers();
		testAreaRow.textContent += rowStore[i] + " ";
	}
//alert("done");
}

function checkRowNumbers(){
	for (x = 0; x <= i; x++){
		//alert("x="+x);
		if (i === x){ 
		//alert("pass");
		}
		else if (rowStore[i] === rowStore[x]){
			let randomNumber = Math.floor(Math.random() * 9) + 1;
			rowStore[i] = randomNumber;
			x=-1;
			//alert("The number is "+randomNumber+" x="+x);
		}
		//testArea.textContent += x +".",i;
	}
}
/* 
function checkColumnNumbers(){
	for (y = 0; y <= i; y++){
		
		
		
	}
	
	
}

var r = 1;
var s = 1;
function test (r,s	 */
	
	
