
document.querySelector(".selectAllOne").onclick = function selected (){
		//alert("hello");
	if (document.querySelector(".selectAllOne:checked")){
		//alert("hi");
		makeList();
		for (ab = 0; ab<11; ++ab){
			console.log(al[ab]);
			al[ab].checked = true;
		}
	}
	else if (document.querySelector(".selectAllOne")){
		makeList();
		for (ab = 0; ab<11; ++ab){
			console.log(al[ab]);
			al[ab].checked = false;
		}
	}
}

document.querySelector(".selectAllTwo").onclick = function selected (){
	if (document.querySelector(".selectAllTwo:checked")){
		makeList();
		for (ab = 11; ab<17; ++ab){
			console.log(al[ab]);
			al[ab].checked = true;
		}
	}
	else if (document.querySelector(".selectAllTwo")){
		makeList();
		for (ab = 11; ab<17; ++ab){
			console.log(al[ab]);
			al[ab].checked = false;
		}
	}
}

document.querySelector(".selectAllThree").onclick = function selected (){
	if (document.querySelector(".selectAllThree:checked")){
		makeList();
		for (ab = 17; ab<24; ++ab){
			console.log(al[ab]);
			al[ab].checked = true;
		}
	}
	else if (document.querySelector(".selectAllThree")){
		makeList();
		for (ab = 17; ab<24; ++ab){
			console.log(al[ab]);
			al[ab].checked = false;
		}
	}
}

document.querySelector(".selectAllFour").onclick = function selected (){
	if (document.querySelector(".selectAllFour:checked")){
		makeList();
		for (ab = 24; ab<26; ++ab){
			console.log(al[ab]);
			al[ab].checked = true;
		}
	}
	else if (document.querySelector(".selectAllFour")){
		makeList();
		for (ab = 24; ab<26; ++ab){
			console.log(al[ab]);
			al[ab].checked = false;
		}
	}
}




function makeList(){
		var li = document.querySelectorAll(".restaurant");
		//console.log(makeList);
		al = Array.from(li);
		return al;
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