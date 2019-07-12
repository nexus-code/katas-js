/*
## Sistema Romano
Vamos a hacer un ejercicio clásico y es jugar con los números romanos y árabes.

Como refresco, vamos a ver sus símbolos y reglas.

#### Símbolos

 Romano | Árabe
--------|-------
 I | 1
 V | 5
 X | 10
 L | 50
 C | 100
 D | 500
 M | 1000

### Reglas

Sólo se contemplan números entre el 1 y el 3999

* Los símbolos I, X, C y M se pueden repetir hasta tres veces.
* Los símbolos V, L y D no pueden repetirse.
* Los símbolos I, X y C se suman si están a la derecha de otro mayor o igual.
* Los símbolos I, X y C se restan si están a la izquierda de otro mayor y solamente pueden anteponerse a los dos símbolos que le siguen en la sucesión.
* I se resta de V y X
* X se resta de L y C
* C se resta de D y M
* Los símbolos V, L y D no pueden colocarse a la izquierda de otro mayor.

### Ejercicios

* Crear una función para pasar de número romanos a árabes
* Crear una función para pasar de árabes a romanos
* Hacer un validador de números romanos
*/

'use strict';
const tests = require('./testing');


const conversion = [
  { decimal: 1000,roman: 'M' },
  { decimal: 900, roman: 'CM' },
  { decimal: 500, roman: 'D' },
  { decimal: 400, roman: 'CD' },
  { decimal: 100, roman: 'C' },
  { decimal: 90,  roman: 'XC' },
  { decimal: 50,  roman: 'L' },
  { decimal: 40,  roman: 'XL' },
  { decimal: 10,  roman: 'X' },
  { decimal: 9,   roman: 'IX' },
  { decimal: 5,   roman: 'V' },
  { decimal: 4,   roman: 'IV' },
  { decimal: 1,   roman: 'I' },
];

// Eval roman numerals by regular expresion
const romanRegExp = new RegExp('^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$');

function romanToDecimal(romanStr){

	let msg = 'Roman string to Decimal number: ';

	if (!romanRegExp.test(romanStr)){
		console.log(`\r\n${msg}  ${romanStr} is NOT a Roman numeral.`);
		return false;
	}


	// convert roman letter to integer on array
	let romanArray = Array.from(romanStr);

	// convert roman character to decimal number
	let intArray = romanArray.map(letter => parseInt(conversion.filter(val => val.roman == letter ).map(val => val.decimal)));

	let result = intArray.reduce(function(decimal, current, index, array){
	 	if (index == 0) {
	 		decimal = current;
	 	} else {
	 		// Sum current, except if previous is minor. In that case substract the previous value (array[index-1]) two times because it had been added in the previous pass
	 		decimal = current <= array[index-1] ? decimal + current : decimal - array[index-1] * 2 + current;
	 	}

	 	return decimal;
	 });

	console.log(`\r\n${msg}  ${romanStr} -> ${result}`);
}

function decimalToRoman(decimal){
  
	let msg = 'Decimal number to roman string: ';

	if (isNaN(decimal) || !Number.isInteger(decimal) || decimal > 3999 || decimal < 1) {
		
		console.log(`\r\n${msg}  ${decimal} is NOT a Decimal or valid number.`);
		return false;
	}

    let romanStr = '';
    let aux = decimal;

    // Subtracts the values of the Roman numerals from the original value, and concatenates the characters to the result
  	for (let i = 0; i < conversion.length; i++) {
	    

	    while (aux >= conversion[i].decimal) {
	    	romanStr += conversion[i].roman;
	        aux -= conversion[i].decimal;
  	    }

	    // Eliminates unnecessary iterations
	    if (aux == 0) break;
	 }

  console.log(`\r\n${msg}  ${decimal} -> ${romanStr}`);
}

function main(){


	tests.testingRomanToDecimal.forEach(element => romanToDecimal(element));
	tests.testingDecimalToRoman.forEach(element => decimalToRoman(element));
}

main();