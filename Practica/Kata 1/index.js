/*
## FooBarQuix

Nos dan un número entre el 1 y 100, y tenemos que devolver por orden lo siguiente:

1 Si el número es divisible por 3, escribiremos “Foo” en lugar del número
2 Si el número es divisible por 5, añadimos “Bar”
3 Si el número es divisible por 7, añadimos “Quix”.
4 Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición.

### Ejemplos: 

* 1  -> 1
* 2  -> 2
* 3  -> FooFoo (divisible por 3, contiene 3)
* 4  -> 4
* 5  -> BarBar (divisible por 5, contains 5)
* 6  -> Foo (divisible por 3)
* 7  -> QuixQuix (divisible por 7, contiene 7)
* 8  -> 8
* 9  -> Foo
* 10 -> Bar
* 13 -> Foo 
* 15 -> FooBarBar (divisible por 3, divisible por 5, contiene 5)
* 21 -> FooQuix
* 33 -> FooFooFoo (divisible por 3, contiene 3)
* 51 -> FooBar
* 53 -> BarFoo
* 75 -> FooBarQuixBar(divisible por 3, divisible por 5, contiene un 7, contiene un 5)
*/
'use strict';

function divisibleby (value, divisor, msg){
	// Premisas 1 a 3: Si value es divisible por divisor sustituir por msg

	return value % divisor === 0 ? msg : '';
}

function translate (value){
	// Premisa 4: Por cada dígito 3,5 o 7, añadiremos “Foo”, “Bar”, “Quix” respectivamente y en orden de aparición

	let valueArray = Array.from(value.toString());

	let result = valueArray.map(eachLetter => {

	  	switch (eachLetter){
	  		case '3':
	  			return 'Foo';
	  		case '5':
	  			return 'Bar';
	  		case '7':
	  			return 'Quix';
	  		default:
	  			return '';
	  	};
	});

	return result.join('');
}

function fooBarQuix (value){

	let result = divisibleby(value, 3, 'Foo');
	result += divisibleby(value, 5, 'Bar');
	result += divisibleby(value, 7, 'Quix');
	result += translate(value);

	return result.length == 0 ? value.toString() : result;
}



function main (max){

	for (let i = 1; i <= max; i++)
		console.log('\r' + i + ' -> ' + fooBarQuix(i));
}


main(200);