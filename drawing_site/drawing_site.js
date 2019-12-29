window.onload = function(event){
	updateColorBox();
	valueUpdateRed();
	valueUpdateGreen();
	valueUpdateBlue();
	valueUpdateOpacity();
	valueUpdateBrushSize();
	valueUpdateBrushSelect();
}

/////// Sliders ///////
 
rColor.addEventListener("input", valueUpdateRed);
function valueUpdateRed(){
	var h = document.querySelector("#rColor").value;
	var hHex = Number(h).toString(16);
	document.querySelector("#rColorValue").textContent = "R " + h.padStart(3, "0") + " / #" + hHex.padStart(2, "0");
	updateColorBox();
}

gColor.addEventListener("input", valueUpdateGreen);
function valueUpdateGreen(){
	var h = document.querySelector("#gColor").value;
	var hHex = Number(h).toString(16);
	document.querySelector("#gColorValue").textContent = "G " + h.padStart(3, "0") + " / #" + hHex.padStart(2, "0");
	updateColorBox();
}

bColor.addEventListener("input", valueUpdateBlue);
function valueUpdateBlue(){
	var h = document.querySelector("#bColor").value;
	var hHex = Number(h).toString(16);
	document.querySelector("#bColorValue").textContent = "B " + h.padStart(3, "0") + " / #" + hHex.padStart(2, "0");
	updateColorBox();
}

opacity.addEventListener("input", valueUpdateOpacity);
function valueUpdateOpacity(){
	var h = document.querySelector("#opacity").value;
	document.querySelector("#opacityValue").textContent =  h + "%";
	updateColorBox();
}

brushSize.addEventListener("input", valueUpdateBrushSize);
function valueUpdateBrushSize(){
	var h = document.querySelector("#brushSize").value;
	brushWidth = document.querySelector("#brushSize").value; 
	document.querySelector("#brushSizeValue").textContent ="size: " + h;	
	return(brushWidth);
}

/////// Buttons ///////
document.querySelector("#clearCanvas").onclick = function clearCanvas(){
	ctx.clearRect(0, 0, 500, 500);
}


/////// selections ///////

brushSelect.addEventListener("input", valueUpdateBrushSelect);
function valueUpdateBrushSelect(){
	brush = document.querySelector(".brushSelect:checked").value;
	return(brush);	
}

function draw(ctx, x1, y1, x2, y2){
	if (brush === "1"){
		ctx.strokeStyle = color;
		ctx.lineWidth = brushWidth;
		ctx.lineCap = "round";
		//ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2,y2);
		//ctx.stroke();
	}
	if (brush === "2"){
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x1, y1, brushWidth/2, 0, 2 * Math.PI);
		ctx.fill();
	}
	if (brush === "3"){
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.rect(x1 - (brushWidth/2), y1 - (brushWidth/2), brushWidth, brushWidth);
		ctx.fill();
	}
	if (brush === "4"){
		alert("not coded yet")
	}
}

/////// stroke color selector ///////

function updateColorBox(){
	checkColorBoxColor();
	var canv = document.getElementById("colorBox");
	ctx2 = canv.getContext("2d");
	ctx2.clearRect(0, 0, 100, 100);
	ctx2.fillStyle = color;
	ctx2.fillRect(0, 0, 100, 100);
}

function checkColorBoxColor(){
	var r = document.querySelector("#rColor").value;
	var g = document.querySelector("#gColor").value;
	var b = document.querySelector("#bColor").value;
	var o = document.querySelector("#opacity").value / 100;
	color = "rgba("+r+", "+g+", "+b+", "+o+")"
	return(color);
}

/////// drawing code ///////

let isDrawing = false;
let x = 0;
let y = 0;

const drawingCanvas = document.getElementById("drawingCanvas");
const ctx = drawingCanvas.getContext("2d");

drawingCanvas.addEventListener("mousedown", press);
function press(){
	x = event.pageX - this.offsetLeft;
	y = event.pageY - this.offsetTop;
	//drawLine(ctx, x, y, event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
	drawDot(ctx, x, y, event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
	isDrawing = true;
	draw(ctx, x, y, event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
}

function drawDot(ctx, x1, y1, x2, y2){
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;
	ctx.moveTo(x1, y1);
	ctx.lineTo((x2-1),(y2-1));
	//ctx.stroke()
	ctx.closePath();
}
	


drawingCanvas.addEventListener("mousemove", move);
function move(){
	if (isDrawing === true){
		draw(ctx, x, y, event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
		//drawLine(ctx, x, y, event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
		x = event.pageX - this.offsetLeft;
		y = event.pageY - this.offsetTop;
	}
}

drawingCanvas.addEventListener("mouseup", e=>{
	if (isDrawing === true){
		//ctx.stroke();
		ctx.closePath();
		x = 0;
		y = 0;
		isDrawing = false;
	}
});
	
/*
function drawLine(ctx, x1, y1, x2, y2){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x1, y1, 10, 0, 2 * Math.PI);
	ctx.fill();
	console.log("hello");
	//var img = document.getElementById("colorBox");
	//ctx.drawImage(img, (x1-50), (y2-50));
	//console.log(x1,y1,x2,y2)
}
*/

function drawLine(ctx, x1, y1, x2, y2){
	ctx.strokeStyle = color;
	ctx.lineWidth = brushWidth;
	ctx.lineJoin = "round";
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();	
	//console.log(x1,y1,x2,y2);
}

