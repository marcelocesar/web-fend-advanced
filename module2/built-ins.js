/**
 * Symbol
 *
 * Um symbol é uma estrutura de dados única e imutável muito utilizada para identificar as propriedades de um objeto.
 */

const sym1 = Symbol('apple');
console.log(sym1); // Symbol(apple)

const sym2 = Symbol('banana');
const sym3 = Symbol('banana');

console.log(sym2 === sym3); // false. A descrição é utilizada apenas para descrever o symbol.

let bowl = {
	apple: {
		color: 'red',
		weight: 136.078
	},
	banana: {
		color: 'yellow',
		weight: 183.15
	},
	orange: {
		color: 'orange',
		weight: 170.097
	}
};

console.log(bowl);

// E se adicionarmos outro objeto Banana na tigela?

bowl = {
	apple: {
		color: 'red',
		weight: 136.078
	},
	banana: {
		color: 'yellow',
		weight: 183.15
	},
	orange: {
		color: 'orange',
		weight: 170.097
	},
	banana: {
		color: 'yellow',
		weight: 176.845
	}
};

console.log(bowl);

// Perceba que o primeiro objeto banana foi sobreescrito pelo o segundo objeto adicionado

// Como resolvemos esse problema? Com Symbols!

bowl = {
	[Symbol('apple')]: {
		color: 'red',
		weight: 136.078
	},
	[Symbol('banana')]: {
		color: 'yellow',
		weight: 183.15
	},
	[Symbol('orange')]: {
		color: 'orange',
		weight: 170.097
	},
	[Symbol('banana')]: {
		color: 'yellow',
		weight: 176.845
	}
};

console.log(bowl);

// Alteramos as propriedades de Bowl com Symbols, com isso, cada Symbol é unico e o primeiro objeto banana não será sobreescrito.



/**
 * Iterator e Iterable
 *
 * (Iteração e protocolo iterable) Esses protocolos não são built-ins, ou seja, não são padrão da linguagem, mas ajuda a entender o novo conceito de iteração no ES6.
 */

/* Iterable
--------------- */
// O protocolo iterable é utilizado para definir e personalizar o comportamento de iteração de objetos. Isso significa que, no ES6, você agora tem a flexibilidade de especificar uma maneira de iterar por meio dos valores em um objeto. Para alguns objetos, esse comportamento é nativo na linguagem, como em strings e arrays.

const digits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
for (const digit of digits) {
	console.log(digit);
}

// Como funciona: o objeto deve implementar a interface iterable. Para um objeto ser um iterable, ele deve possuir um método padrão chamado iterator [Symbol.iterator].

/* Iterator
--------------- */
// O protocolo iterator é utilizado para definir uma maneira padrão para que um objeto produza uma sequência de valores. Isso significa que você agora possui um processo para definir como um objeto irá iterar. Isso é feito pela implementação do método .next().

const myDigits = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
const arrayIterator = myDigits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());

/* 
{ value: 0, done: false }
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: 5, done: false }
{ value: 6, done: false }
{ value: 7, done: false }
{ value: 8, done: false }
{ value: 9, done: false }
{ value: undefined, done: true } */

// Ex1

/*
 * Programming Quiz: Make An Iterable Object
 *
 * Turn the `james` object into an iterable object.
 *
 * Each call to iterator.next should log out an object with the following info:
 *   - key: the key from the `james` object
 *   - value: the value of the key from the `james` object
 *   - done: true or false if there are more keys/values
 *
 * For clarification, look at the example console.logs at the bottom of the code.
 *
 * Hints:
 *   - Use `Object.keys()` to store the object's properties in an array.
 *   - Each call to `iterator.next()` should use this array to know which property to return.
 *   - You can access the original object using `this`.
 *   - To access the values of the original object, use `this` and the key from the `Object.keys()` array.
 */

const james = {
	name: 'James',
	height: `5'10"`,
	weight: 185
};

// const iterator = james[Symbol.iterator]();
//
// console.log(iterator.next().value); // 'James'
// console.log(iterator.next().value); // `5'10`
// console.log(iterator.next().value); // 185

/* solução
--------------*/
const marcelo = {
	name: 'Marcelo',
	height: `1,70`,
	weight: 230,
	[Symbol.iterator]() {
		// implementação da interce itarator

		let keys = Object.keys(this); // pegando as keys
		let i = 0; // iniciando iterator ou count
		let next = () => { // método next()
			const key = keys[i++];
			const value = this[key];
			const done = i >= keys.length;
			return { key, value, done };
		};

		return {
			// closure
			next: next
		};
	}
};


let iterator = marcelo[Symbol.iterator]();

console.log('----------------'); // { next: [Function: next] }
console.log(iterator); // Marcelo
console.log(iterator.next().value); // Marcelo
console.log(iterator.next()); // { key: 'height', value: '1,70', done: false }
console.log(iterator.next()); // { key: 'weight', value: 230, done: true }
console.log(iterator.next());



