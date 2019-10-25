

document.querySelector(".selectAll").onclick = function (){
	if (document.querySelector(".selectall").input.checked){
		alert("test");
	}
}


document.querySelector(".pickLunch").onclick = function (){
	var checkList = document.querySelectorAll(".restaurant:checked");
		console.log(checkList);
	checkListArray = Array.from(checkList);
		console.log(checkListArray.length);
	var theMagicNumber = Math.floor(Math.random()*checkListArray.length);
		console.log(theMagicNumber);
	alert(checkListArray[theMagicNumber].value);
		console.log(checkListArray[theMagicNumber].value);
}