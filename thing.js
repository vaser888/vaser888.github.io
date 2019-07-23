

var thebutton = document.getElementById('abutton');

var inputa = document.getElementById('a');
var inputb = document.getElementById('b');
var inputc = document.getElementById('c');

var ball = document.getElementById('ball');

thebutton.onclick = function (open) {
	var na = parseInt(inputa.value);
	var nb = parseInt(inputb.value);
	var nc = na + nb;
	inputc.value = nc;
}

document.onmousemove = function (event) {
	//ball.style.top = event.pageY - 32 +'px';
	//ball.style.left = event.pageX - 32 + 'px';
}

document.onkeydown = function (event) {
console.log(event.keyCode);
}

var numberthing = document.querySelector(".square");
numberthing.onclick = function(){
	var num = parseInt(document.body.getAttribute("data-number")) || 0;
	document.body.setAttribute("data-number", (num + 1) % 2);
}

/*numberthing.onclick = function () {
	var el = document.body;
	var attr = el.getAttribute("date-number") || "0";
	var nextnum = (num + 1) % 6;
	el. setAttribute("data-number", nextnum);
	
}*/

document.querySelector("#popup").onclick = function(){
	alert("Hello! You pressed the button!");
}

var MyImage = document.querySelector("#image");
MyImage.onclick = function(){
	var MySrc = MyImage.getAttribute('src');
	if(MySrc === "baba_0_1.png"){
		MyImage.setAttribute ('src',"baba_15_1.png");
	} else{
		MyImage.setAttribute ('src',"baba_0_1.png");
	}	
}

/////// Guessing Game ///////

let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
let guessCount = 1;
let resetButton;
//guessField.focus();

function checkGuess(){
	let userGuess = Number(guessField.value);
	if (guessCount === 1) {
		guesses.textContent = "Previous guesses: ";
	}
	guesses.textContent += userGuess + " ";
	
	if (userGuess === randomNumber) {
		lastResult.textContent = "You guessed Correct!";
		lastResult.style.backgroundColor = "green";
		lowOrHigh.textContent = "";
		setGameOver();
	}
	else if (guessCount === 10) {
		lastResult.textContent = "Game Over!";
		setGameOver();
	}
	else {
		lastResult.textContent = "wrong";
		lastResult.style.backgroundColor = "red";
		if (userGuess < randomNumber) {
			lowOrHigh.textContent = "Your last guess was too low!";
		}
		else if(userGuess > randomNumber) {
			lowOrHigh.textContent = "Your last guess was too high!";
		}
	}
	guessCount++;
	guessField.value = "";
	guessField.focus();
}
guessSubmit.addEventListener("click", checkGuess);

function setGameOver(){
	guessField.disabled = true;
	guessSubmit.disabled = true;
	resetButton = document.createElement("button");
	resetButton.textContent = "Start new game";
	document.body.appendChild(resetButton);
	resetButton.addEventListener("click", resetGame);
}
	
function resetGame() {
	guessCount = 1;
	
	const resetParas = document.querySelectorAll(".resultParas p");
	for (let i = 0; i < resetParas.length ; i++) {
		resetParas[i].textContent = "";
	}
	resetButton.parentNode.removeChild(resetButton);
	guessField.disabled = false;
	guessSubmit.disabled = false;
	guessField.value = "";
	guessField.focus();
	lastResult.style.backgroundColor = "white";
	randomNumber = Math.floor(Math.random() * 100) + 1;
}
	
/////// End of Guessing Game ///////

pages.addEventListener("change", PageChange);

function PageChange(){
	if (document.querySelector("#pages").value === "page2") {
	alert("it works");
	}
	else if (document.querySelector("#pages").value === "sudoku") {
		window.open("sudoku/sudoku.html", "_top");
		}
}

colorCode.addEventListener("change", valueUpdate);
rangeValue.addEventListener("input", valueUpdate);


function valueUpdate(){
	var h = document.querySelector("#rangeValue").value;
	var j = document.querySelector("#colorCode").value;
	//alert(h);

document.querySelector(".rangeValueArea").textContent = h;
document.querySelector(".colorCodeArea").textContent = j;
}

var updateBackgroundButton = document.getElementById("updateBackgroundColor");
updateBackgroundButton.onclick = function(){
	var j = document.querySelector("#colorCode").value;
	document.body.style.background = j;
}

autoUpdateBackgroundColor.addEventListener("clicked", testing);

function testing (){
	alert("hi i work")
}

var canv = document.getElementById("myCanvas");
ctx = canv.getContext("2d");

ctx.clearRect(0, 0, 200, 100);

ctx.strokeStyle = "blue";
ctx.fillStyle = "red";
ctx.fillRect(10, 20, 30, 40);
ctx.strokeRect(10, 20, 30, 40);

ctx.fillStyle = "rgb(200, 0, 0)";
ctx.fillRect(70, 80, 30, 30);
ctx.fillStyle = "rgba(0, 0, 200, 0.7)";
ctx.fillRect(85, 95, 30, 30); //(x, y, length x, length y)

ctx.beginPath();
ctx.moveTo(0, 20);
ctx.lineTo(20, 0);
ctx.lineTo(0,0);
ctx.closePath();
ctx.fill();
