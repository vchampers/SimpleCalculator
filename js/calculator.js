var display = document.getElementById("display");
var calculator = document.getElementById("calculator");
var results = "";

function cal(results) {
	while(results.indexOf('^') > -1) {
		for(var i = 0; i < results.length; i++) {
			if(results.charAt(i) == '^') {
				var n1 = i - 1;
				var n2 = i + 1;
				var op1, op2;
				if(results.charAt(n1) == ')') {
					var num = 1;
					while(num != 0) {
						n1--;
						if(results.charAt(n1) == ')') num++;
						else if(results.charAt(n1) == '(') num--;
						if(n1 < 0) break;
					}
					if(n1 - 9 >= 0 && results.substring(n1 - 9, n1) == "Math.sqrt") {
						n1 -= 9;
						op1 = cal(results.substring(n1, i - 1));
					} else if(n1 - 8 >= 0 && results.substring(n1 - 8, n1) == "Math.pow") {
						n1 -= 8;
						op1 = cal(results.substring(n1 - 8, i - 1));
					} else {
						n1++;
						op1 = cal(results.substring(n1, i - 1));
					}
				}
				if(results.charAt(n2) == '(') {
					var num = 1;
					while(num != 0) {
						n2++;
						if(results.charAt(n2) == '(') num++;
						else if(results.charAt(n2) == ')') num--;
						if(n2 >= results.length) break;
					}
					op2 = cal(results.substring(i + 2, n2));
				}
				if(isNaN(results.charAt(n1)) == false) {
					while(isNaN(results.charAt(n1)) == false || results.charAt(n1) == '.') {
						n1--;
						if(n1 < 0) break;
					}
					n1++;
					if(n1 - 1 >= 0 && results.charAt(n1 - 1) == '√') {
						op1 = "Math.sqrt(" + results.substring(n1, i) + ")";
						n1--;
					} else op1 = results.substring(n1, i);
				}
				if(isNaN(results.charAt(n2)) == false || results.charAt(n2) == "√") {
					if(results.charAt(n2) == "√") n2++;
					while(isNaN(results.charAt(n2)) == false || results.charAt(n2) == '.') {
						n2++;
						if(n2 >= results.length) break;
					}
					n2--;
					op2 = results.substring(i + 1, n2 + 1);
				}
				results = results.substring(0, n1) + "Math.pow(" + op1 + "," + op2 + ")" + results.substring(n2 + 1);
				i = results.indexOf('M');
			}
		}
	}
	while(results.indexOf('√') > -1) {
		for(var i = 0; i < results.length; i++) {
			if(results.charAt(i) == '√') {
				var n = i + 1;
				var op;
				if(results.charAt(n) == '(') {
					var num = 1;
					while(num != 0) {
						n++;
						if(results.charAt(n) == '(') num++;
						else if(results.charAt(n) == ')') num--;
						if(n >= results.length) break;
					}
					op = cal(results.substring(i + 2, n));
				}
				if(isNaN(results.charAt(n)) == false) {
					while(isNaN(results.charAt(n)) == false || results.charAt(n) == '.') {
						n++;
						if(n >= results.length) break;
					}
					n--;
					op = results.substring(i + 1, n + 1);
				}
				results = results.substring(0, i) + "Math.sqrt(" + op + ")" + results.substring(n + 1);
				//alert(results);
				i = results.indexOf('M');
			}
		}
	}
	try {
		results = eval(results);
	} catch(err) {
		results = "Error!";
	}
	return results;
}

function keyinput(e) {
	var theEvent = window.event || e;
	var ch = String.fromCharCode(theEvent.charCode);
	if(theEvent.charCode == 13) dist('=');
	else dist(ch);
}

function mouseinput(e) {
	var theEvent = window.event || e;
    var srcElement = theEvent.srcElement;
    if (!srcElement) {
       srcElement = theEvent.target;
    }
    if(srcElement.id != "display"){
    	var ch = srcElement.innerText;
		dist(ch);
    }	
}

function dist(ch) {
	if(ch.length > 3) {
		return;
	} else if(ch == 'C') {
		results = "";
		display.innerText = "0";
	} else if(ch == 'DEL') {
		results = results.substring(0, results.length - 1);
		display.innerText = (results.length > 0) ? results : "0";
	} else if(ch == '+/-') {
		if(results.charAt(0) == '-') {
			results = results.substring(1);
			display.innerText = results;
		} else {
			results = '-' + results;
			display.innerText = results;
		}
	} else if(ch == '=') {
		if(results == ""){
			return;
		}
		results = cal(results);
		if(results == "Infinity" || isNaN(results) || results == "Error"){
			display.innerText = "Error!";
			results = '';
		}
		else {
			display.innerText = results;
			results = '';
		}
		
	} else {
		if(results.length > 120) {
			alert("too long!");
			return;
		}
		results += ch;
		display.innerText = results;
	}
}
calculator.addEventListener("click", mouseinput);
window.addEventListener("keypress", keyinput);