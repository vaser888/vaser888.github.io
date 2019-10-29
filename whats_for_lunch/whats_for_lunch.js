
document.querySelector(".selectAllOne").onclick = function selected (){
		//alert("hello");
	if (document.querySelector(".selectAllOne:checked")){
		//alert("hi");
		var makeList = document.querySelectorAll(".restaurant");
		//console.log(makeList);
		al = Array.from(makeList);
		for (ab = 0; ab<9; ++ab){
			console.log(al[ab]);
			al[ab].checked = true;
		}
	}
	else if (document.querySelector(".selectAllOne")){
		var makeList = document.querySelectorAll(".restaurant:checked");
		//console.log(makeList);
		al = Array.from(makeList);
		for (ab = 0; ab<9; ++ab){
			console.log(al[ab]);
			al[ab].checked = false;
		}
	}
}





document.querySelector(".pickLunch").onclick = function pick (){
	var checkList = document.querySelectorAll(".restaurant:checked");
		console.log(checkList);
	checkListArray = Array.from(checkList);
		console.log(checkListArray.length);
	var theMagicNumber = Math.floor(Math.random()*checkListArray.length);
		console.log(theMagicNumber);
	alert(checkListArray[theMagicNumber].value);
		console.log(checkListArray[theMagicNumber].value);
}