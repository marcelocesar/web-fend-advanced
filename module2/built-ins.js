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



/**
 * Sets
 */

/* 
Na matemática, um set (conjunto, na tradução literal) é uma coleção de items diferentes entre si. 

ex1: {2, 4, 5, 6} é um set porque cada número é único e aparece uma só vez.

No entanto,

ex2: {1, 1, 2, 4} NÃO é um set, pois contém itens duplicados (o 1 está lá mais de uma vez!).
*/


// Em JS podemos nos beneficiar de algo semelhante ao usar um array

const nums = [2, 4, 5, 6];


// Pórem, arrays não forçam os items a serem únicos.

nums.push(2);
console.log(nums); // [2, 4, 5, 6, 2]

// e agora nums não é mais um set no sentido matemático da palavra.


/* Sets no ES6+
-------------------- */

/* 
 Funciona de maneira similar ao array, as diferenças são:
 - Sets não possuem índices - você não faz referência a items do set com base em suas posições no set
 - items em um set não podem ser acessados individualmente.

 Um set é um objeto que permite armazenar items únicos. Você pode adicionar items a um set, remover items de um set e iterar por um set. Esses items podem ser tanto valores primitivos como objetos complexos.

*/


// Como criar um Set

const games = new Set();
console.log(games); // Set {}

// Passar array como parametro

const videoGames = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(videoGames);

// Perceba que 'Super Mario Bros.' foi passado duas vezes, mas o set só apresenta um

const set1 = new Set([1, 'Super Mario Bros.', true, false, '1']);
console.log(set1);



/* Modificadores Sets
------------------------ */
// Como adicionar ou deletar item com os métodos .add() e .delete()

const jogos = new Set(['God of War 4', 'Resident Evil 7', 'Call of Duty']);

console.log(jogos);

jogos.add('Resident Evil 2: Remaker');
jogos.add('Black Ops 4');
jogos.delete('Resident Evil 7');

console.log(jogos);


// DICA: se você tentar .add() (adicionar) um item duplicado a um set, não receberá um erro, mas o item não será adicionado ao set. Além disso, caso tente .delete() (remover) um item que não esteja em um set, você não receberá um erro, e o set permanecerá inalterado. Ambos os métodos retornam true se um item for adicionado ou removido com sucesso do set e false se isso não ocorrer.


// propriedade size
console.log(jogos.size);

// método has()
console.log(jogos.has('Resident Evil 2: Remaker'));

// recuperando valores com values() ou keys()
console.log(jogos.values());
console.log(jogos.keys());



/* Set Iterator */

const iteratorJogos = jogos.values();

console.log(iteratorJogos.next()); 
console.log(iteratorJogos.next());
console.log(iteratorJogos.next());
console.log(iteratorJogos.next());


// for of 

for (const jogo of jogos) {
  console.log(jogo);
}


// Ex1

/*
 * Programming Quiz: Using Sets (3-1)
 *
 * Create a Set object and store it in a variable named `myFavoriteFlavors`. Add the following strings to the set:
 *     - chocolate chip
 *     - cookies and cream
 *     - strawberry
 *     - vanilla
 *
 * Then use the `.delete()` method to remove "strawberry" from the set.
 */


const myFavoriteFlavors = new Set();
myFavoriteFlavors.add('chocolate chip');
myFavoriteFlavors.add('cookies and cream');
myFavoriteFlavors.add('strawberry');
myFavoriteFlavors.add('vanilla');
myFavoriteFlavors.delete('strawberry');



/**
 * WeakSets
 */

 /* 
 Um WeakSet é como um set normal, mas com algumas diferenças-chave:

um WeakSet só pode conter objetos
um WeakSet não é um iterable, o que significa que não é possível iterar por seus itens
um WeakSet não possui o método .clear()
 */



let jogo1 = { nome: 'Resident Evil', genero:'Horror', desenvolvedor: 'capcom' };
let jogo2 = { nome: 'Tomb Raider', genero:'Ação e aventura', desenvolvedor: 'Eidos Montréal,' };
let jogo3 = { nome: 'God of War 4', genero:'Ação e aventura', desenvolvedor: 'SIE Santa Monica Studio' };


const meusJogos = new WeakSet([jogo1, jogo2, jogo3]);

console.log(meusJogos);

// meusJogos.add('Marcelo'); //TypeError: Invalid value used in weak set

/* 

Garbage collection

No JavaScript, a memória é alocada quando novos valores são criados, e é automaticamente liberada quando esses valores não são necessários. Esse processo de liberação de memória após o desuso é conhecido como garbage collection.

Os WeakSets se aproveitam do garbage collection ao trabalhar exclusivamente com objetos. Se você alterar o valor de um objeto para `null, então estará, basicamente, removendo o objeto. Quando o garbage collector do JavaScript rodar, a memória ocupada por esse objeto anteriormente será liberada para uso posterior em seu programa.

*/

jogo2 = null;

console.log(meusJogos);


/*
 * Programming Quiz: Using Sets (3-2)
 *
 * Create the following variables:
 *     - uniqueFlavors and set it to a new WeakSet object
 *     - flavor1 and set it equal to `{ flavor: 'chocolate' }`
 *     - flavor2 and set it equal to an object with property 'flavor' and value of your choice!
 *
 * Use the `.add()` method to add the objects `flavor1` and `flavor2` to `uniqueFlavors`
 * Use the `.add()` method to add the `flavor1` object (again!) to the `uniqueFlavors` set
 */



const uniqueFlavors = new WeakSet();
const flavor1 = { flavor: 'chocolate' };
const flavor2 = { flavor: 'vanilla' };

uniqueFlavors.add(flavor1);
uniqueFlavors.add(flavor2);
uniqueFlavors.add(flavor1);

console.log(uniqueFlavors);

 