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

