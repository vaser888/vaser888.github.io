window.onload = function(event){
	document.getElementById("resistorType").value= "0";
}

resistorType.addEventListener("change", displaySelections);

firstBand.addEventListener("change", updateValueFourBands);
secondBand.addEventListener("change", updateValueFourBands);
thirdBand.addEventListener("change", updateValueFourBands);
forthBand.addEventListener("change", updateValueFourBands);

function displaySelections(){
	var al = document.querySelector("#resistorType").value
	var off_4 = document.getElementById("fourBandResistor").className = "BandResistor_Hidden";
	var off_5 = document.getElementById("fiveBandResistor").className = "BandResistor_Hidden";
	var off_6 = document.getElementById("sixBandResistor").className = "BandResistor_Hidden";
	if (al === "0"){
		off_4;
		off_5;
		off_6;
	}
	else if (al === "4"){
		off_5;
		off_6;
		document.getElementById("fourBandResistor").className = "BandResistor_Visible"; 
	}
	else if (al === "5"){
		off_4;
		off_6;
		document.getElementById("fiveBandResistor").className = "BandResistor_Visible";
	}
	else if (al === "6"){
		off_5;
		off_6;
		document.getElementById("sixBandResistor").className = "BandResistor_Visible";
	}
}

function updateValueFourBands() {
	var fir = document.querySelector("#firstBand").value;
	var sec = document.querySelector("#secondBand").value;
	var thr = document.querySelector("#thirdBand").value;
	var fou = document.querySelector("#forthBand").value;
	
	var ohmResult = (fir + sec) *thr ;
	var kohmResult = ohmResult/1000;
	var mohmResult = kohmResult/1000;
	var per = fou * 100;
	var rangeValue = ohmResult * fou;
	var lowRangeOhmResult = ohmResult - rangeValue;
	var highRangeOhmResult = ohmResult + rangeValue;
	var lowRangeKOhmResult = lowRangeOhmResult/1000;
	var highRangeKOhmResult = highRangeOhmResult/1000;
	
	document.querySelector(".resistorResult").textContent = "Result = " + ohmResult +" ohms " +  per + "% , " + kohmResult + "k ohms " + per + "% , " + mohmResult + "M ohms " + per + "%";
	document.querySelector(".resistorRangeResult").textContent = "Range = " + lowRangeOhmResult + " ohms - " + highRangeOhmResult + " ohms , "+ lowRangeKOhmResult + "k ohms - " + highRangeKOhmResult + "k ohms";
}

