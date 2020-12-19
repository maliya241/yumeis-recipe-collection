
var multiplier = Number(document.getElementById("serving_size_multiplier").value);
var number_of_ingredients = document.getElementsByClassName("measurement").length;
var fraction_ingredient_measurements = [];
var decimal_ingredient_measurements = [];
var ingredient_measurement_units = [];

//read in the ingredient measurements
for (i = 0; i < number_of_ingredients; i++) {
	//read in measurement string
	fraction_ingredient_measurements[i] = document.getElementsByClassName("measurement")[i].innerHTML; 
	
	//read in measure unit string
	ingredient_measurement_units[i] = document.getElementsByClassName("measure_unit")[i].innerHTML; 
	
	//Nested array. For six element nested arrays, 0 == whole number, 1 == " ", 2 == numerator, 3 == "/", 4 == first denominator, 5 == second digit denominator; For five element nested arrays, 0 == whole number, 1 == " ", 2 == numerator, 3 == "/", 4 == denominator; For three element nested arrays, 0 == numerator, 1 == "/" 2 == denominator
	fraction_ingredient_measurements[i] = fraction_ingredient_measurements[i].split(""); 
	
	//Convert string fractions to decimal numbers
	if (fraction_ingredient_measurements[i].length == 6) {
		decimal_ingredient_measurements[i] = Number(fraction_ingredient_measurements[i][0]) + Number(fraction_ingredient_measurements[i][2]) / Number(fraction_ingredient_measurements[i][4]+fraction_ingredient_measurements[i][5]);
	} else if (fraction_ingredient_measurements[i].length == 5) {
		decimal_ingredient_measurements[i] = Number(fraction_ingredient_measurements[i][0]) + Number(fraction_ingredient_measurements[i][2]) / Number(fraction_ingredient_measurements[i][4]);
	} else if (fraction_ingredient_measurements[i].length == 3) {
		decimal_ingredient_measurements[i] = Number(fraction_ingredient_measurements[i][0]) / Number(fraction_ingredient_measurements[i][2]);
	} else {
		decimal_ingredient_measurements[i] = Number(fraction_ingredient_measurements[i][0]);
	}
}

function decrement_multipler() {
	if (multiplier > 1) {
		multiplier--;
	} else {
		multiplier = 1;
	}
	after_multiplier_change();
}

function increment_multipler() {
	multiplier++;
	after_multiplier_change();			
}

function after_multiplier_change() {
	//display the changed multiplier
	document.getElementById("serving_size_multiplier").value = multiplier;
	
	var multiplied_decimal_ingredients = [];
	
	for (i = 0; i < number_of_ingredients; i++) { 
		//decimal ingredient measurements multiplied by the multiplier and stored in multiplied_decimal_ingredients array
		multiplied_decimal_ingredients[i] = decimal_ingredient_measurements[i] * multiplier;
		//displays the multiplied decimal ingredient measurements
		document.getElementsByClassName("measurement")[i].innerHTML = multiplied_decimal_ingredients[i];
		
		//changes singular to plural and vice versa
		if (Number(multiplied_decimal_ingredients[i]) > Number(1) && ingredient_measurement_units[i].match(/s$/g) != "s") {
			//singular to plural
			if (ingredient_measurement_units[i].endsWith("x")) {
				ingredient_measurement_units[i] = ingredient_measurement_units[i] + "es";
			} else {
				ingredient_measurement_units[i] = ingredient_measurement_units[i] + "s";
			}
		} else if (Number(multiplied_decimal_ingredients[i]) <= Number(1) && ingredient_measurement_units[i].match(/s$/g) == "s") {
			//plural to singular
			if (ingredient_measurement_units[i].endsWith("es")) {
				ingredient_measurement_units[i] = ingredient_measurement_units[i].slice(0, (ingredient_measurement_units[i].length-2));
			} else {
				ingredient_measurement_units[i] = ingredient_measurement_units[i].slice(0, (ingredient_measurement_units[i].length-1));
			}
		}
		//displays the measurement unit
		document.getElementsByClassName("measure_unit")[i].innerHTML = ingredient_measurement_units[i];				
	}
}