/*

Testing consts for kata 2

*/

exports.testingRomanToDecimal = [
			'I',
			'MDIX',
			'MCCXIX',
			'CCLXVIII',
			'CCsLXVIII',
			'CCLXIX',
			'XLIX',
			'CVII',
			'MDCCIX',
			'CMXC',
			'MMMCMXCIX',
			' ',		// error valor vacío
			'', 		// error valor vacío
			'iX fd f', // error carácter inválido
			'cxl',	// error minúsculas
			'CCL3VIII', // error carácter inválido
			'IVI',	// error inclumple reglas
			'IVL', 	// error inclumple reglas
			'IXMD',  // error por orden incorrecto
			'XM',	// error inclumple reglas
			'XXXX' 	// error inclumple reglas
		];


exports.testingDecimalToRoman = [
			'',
			'4',
			'I',
			0,
			1,
			49,
			697,
			2429,
			3998,
			4000
		];