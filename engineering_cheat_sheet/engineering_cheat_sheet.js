window.onload = function(event){
	document.getElementById("resistorType").value= "0";
}

resistorType.addEventListener("change", displaySelections);

firstBandBox.addEventListener("change", calculateValueOfBands);
secondBandBox.addEventListener("change", calculateValueOfBands);
thirdBandBox.addEventListener("change", calculateValueOfBands);
multiplierBandBox.addEventListener("change", calculateValueOfBands);
toloranceBandBox.addEventListener("change", calculateValueOfBands);

function displaySelections(){
	var al = document.querySelector("#resistorType").value
	var off_4 = document.getElementById("resistorBands").className = "bandResistor_Hidden";
	if (al === "0"){
		off_4;
	}
	else if (al === "4"){
		document.getElementById("resistorBands").className = "bandResistor_Visible"; 
		document.getElementById("thirdBandBox").className = "bandResistor_Hidden";
		document.getElementById("tempBandBox").className = "bandResistor_Hidden";
		document.getElementById("multiplierBandTitleChange").textContent = "3rd Band (Multiplier)";
		document.getElementById("toloranceBandTitleChange").textContent = "4th Band (Tolorance)";
	}
	else if (al === "5"){
		document.getElementById("resistorBands").className = "bandResistor_Visible"; 
		document.getElementById("thirdBandBox").className = "bandResistor_Visible";
		document.getElementById("tempBandBox").className = "bandResistor_Hidden";
		document.getElementById("multiplierBandTitleChange").textContent = "4th Band (Multiplier)";
		document.getElementById("toloranceBandTitleChange").textContent = "5th Band (Tolorance)";
	}
	else if (al === "6"){
		document.getElementById("resistorBands").className = "bandResistor_Visible"; 
		document.getElementById("thirdBandBox").className = "bandResistor_Visible";
		document.getElementById("tempBandBox").className = "bandResistor_Visible";
	}
}

function calculateValueOfBands() {
	var fir = document.querySelector("#firstBandBox").value;
	var sec = document.querySelector("#secondBandBox").value;
	var thr = document.querySelector("#thirdBandBox").value;
	var fou = document.querySelector("#multiplierBandBox").value;
	var fiv = document.querySelector("#toloranceBandBox").value;
	
	
	var al = document.querySelector("#resistorType").value
		if (al === "4") {
			var ohmResult = (fir + sec) * fou;
		}
		if (al === "5" || al === "6"){
			var ohmResult = (fir + sec + thr) * fou;
		}
	
	var kohmResult = ohmResult/1000;
	var mohmResult = kohmResult/1000;
	var per = fiv * 100;
	var rangeValue = ohmResult * fiv;
	var lowRangeOhmResult = ohmResult - rangeValue;
	var highRangeOhmResult = ohmResult + rangeValue;
	var lowRangeKOhmResult = lowRangeOhmResult/1000;
	var highRangeKOhmResult = highRangeOhmResult/1000;
	var lowRangeMOhmResult = lowRangeKOhmResult/1000;
	var highRangeMOhmResult = highRangeKOhmResult/1000;
	
	document.querySelector(".resistorResultOne").textContent = "Ohms Result = " + ohmResult +" \u2126 \u00b1 " +  per + "%";
	document.querySelector(".resistorResultTwo").textContent = "k Ohms Result = " + kohmResult + " k\u2126 +/- " + per + "%"; 
	document.querySelector(".resistorResultThree").textContent = "M Ohms Result = " + mohmResult + "M ohms " + per + "%";
	
	document.querySelector(".resistorRangeResultOne").textContent = "Ohms Range = " + lowRangeOhmResult + " ohms - " + highRangeOhmResult + " ohms";
	document.querySelector(".resistorRangeResultTwo").textContent = "k Ohms Range = " + lowRangeKOhmResult + "k ohms - " + highRangeKOhmResult + "k ohms";
	document.querySelector(".resistorRangeResultThree").textContent = "M Ohms Range = " + lowRangeMOhmResult + "M ohms - " + highRangeMOhmResult + "M ohms";
}

