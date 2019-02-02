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
		let next = () => {
			// método next()
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

const nums = [ 2, 4, 5, 6 ];

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

const videoGames = new Set([ 'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.' ]);
console.log(videoGames);

// Perceba que 'Super Mario Bros.' foi passado duas vezes, mas o set só apresenta um

const set1 = new Set([ 1, 'Super Mario Bros.', true, false, '1' ]);
console.log(set1);

/* Modificadores Sets
------------------------ */
// Como adicionar ou deletar item com os métodos .add() e .delete()

const jogos = new Set([ 'God of War 4', 'Resident Evil 7', 'Call of Duty' ]);

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

let jogo1 = { nome: 'Resident Evil', genero: 'Horror', desenvolvedor: 'capcom' };
let jogo2 = { nome: 'Tomb Raider', genero: 'Ação e aventura', desenvolvedor: 'Eidos Montréal,' };
let jogo3 = { nome: 'God of War 4', genero: 'Ação e aventura', desenvolvedor: 'SIE Santa Monica Studio' };

const meusJogos = new WeakSet([ jogo1, jogo2, jogo3 ]);

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

/**
 * Maps
 */

// Se sets e arrays possuem similaridades, então maps e objetos também são similares. pois maps armazenam pares de chave-valor de forma similar à maneira que objetos contêm propriedades com nomes e valores.

const consoles = new Map();
console.log('----------------');
console.log(consoles);

// set(key, value)

consoles.set('playstation 4', {
	marca: 'Sony',
	capacidade: '1 TB',
	recursos: [ 'Suporta Blu-ray', 'Controlado por movimentos' ]
});
consoles.set('xboxone', {
	marca: 'Microsoft',
	capacidade: '1 TB',
	recursos: [ 'Suporta Blu-ray', 'Controlado por movimentos' ]
});
consoles.set('switch', {
	marca: 'Nintendo',
	capacidade: '1 TB',
	recursos: [ 'remote play', 'Controlado por movimentos' ]
});

console.log('----------------');
console.log(consoles);

// delete(key)

consoles.delete('switch');

//consoles.clear()
console.log('----------------');
console.log(consoles);

/* 
DICA: se você utilizar o método .set() para adicionar um par chave-valor a um map que já utiliza a mesma chave, você não receberá um erro, mas o par chave-valor sobrescreverá o par já existente no map. Se você tentar usar o método .delete() para excluir um par chave-valor que não está no map, também não receberá um erro e o map permanecerá inalterado.
*/

// has()
console.log('----------------');
console.log(consoles.has('switch'));

// get()
console.log('----------------');
console.log(consoles.get('switch'));

/* Maps iterators
------------------*/

/* 
Existem 3 formas:

- Acesse cada chave ou valor usando o iterator padrão do map
- Itere por cada par chave-valor utilizando o novo loop for...of
- Itere por cada par chave-valor utilizando o método .forEach() do map
*/

// iterator (com keys() ou values())

let iteratosConsoles = consoles.keys();

console.log('----------------');
console.log(iteratosConsoles.next());
console.log(iteratosConsoles.next());
console.log(iteratosConsoles.next());

// for of
console.log('----------------');
for (const con of consoles) {
	console.log(con);
}

/*
 * Using array destructuring, fix the following code to print the keys and values of the `members` Map to the console.
 */

const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

console.log('----------------');
for (const member of members) {
	// array destructuring
	console.log(([ key, value ] = member));
}

// .foreach
console.log('----------------');
members.forEach((value, key) => console.log(value, key));

console.log('--------------------------------');

/**
 * WeakMaps
 */

/* 
 Um WeakMap como um map normal, com algumas pequenas diferenças:

 - um WeakMap só pode conter objetos como chaves,
 - um WeakMap não é um iterable, o que significa que não é possível executar um loop para varrer seu conteúdo e
 - um WeakMap não possui um método .clear().
 */

const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver’s Travels', author: 'Jonathan Swift' };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);
library.set(book3, true);

console.log(library);

// library.set('The Grapes of Wrath', false); // Lançará um erro: Invalid value used as weak map key

// Garbage collection: Quando o garbage collector do JavaScript rodar, a memória ocupada por esse objeto anteriormente será liberada para ser usada posteriormente em seu programa.

//book1 = null;
console.log(library);

/**
 * Proxies
 */

/* Para criar um objeto proxy, usamos o construtor proxy - new Proxy();. O construtor de proxy recebe dois parâmetros:

o objeto do qual ele será o proxy
um objeto contendo uma lista de métodos que serão utilizados para tratar o acesso aos dados do primeiro objeto.
O segundo objeto é chamado de handler. */

const richard = { status: 'looking for work' };
const agent = new Proxy(richard, {});

console.log(agent.status);

// get() é utilizada para "interceptar" chamadas a propriedades:

const richard1 = { status: 'looking for work' };
const handler1 = {
	get(target, propName) {
		console.log(target); // the `richard` object, not `handler` and not `agent`
		console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
	}
};
const agent1 = new Proxy(richard1, handler1);
console.log(agent1.status); // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)

// Acessando o objeto-alvo de dentro do proxy

const richard2 = { status: 'looking for work' };
const handler2 = {
	get(target, propName) {
		console.log(target);
		console.log(propName);
		return target[propName];
	}
};
const agent2 = new Proxy(richard2, handler2);
console.log(agent2.status); // (1)logs the richard object, (2)logs the property being accessed, (3)returns the text in richard.status

// Obtendo a informação de return do proxy diretamente

const richard3 = { status: 'looking for work' };
const handler3 = {
	get(target, propName) {
		return `He's following many leads, so you should offer a contract as soon as possible!`;
	}
};
const agent3 = new Proxy(richard3, handler3);
console.log(agent3.status); // returns the text `He's following many leads, so you should offer a contract as soon as possible!`

/* 
Com esse código, o proxy nem checará o objeto-alvo, ele apenas interceptará a chamada da propriedade, respondendo diretamente à mensagem de retorno.

Dessa forma, a armadilha get assume o controle sempre que uma propriedade é acessada no proxy. Se quisermos interceptar chamadas para modificar propriedades, então a armadilha set deverá ser utilizada.
*/

/* set() - é utilizada para interceptar o código que modificará uma propriedade. Ela recebe:

- o objeto-alvo do proxy
- a propriedade que está sendo alterada
- o novo valor para o proxy
-------------------------- */

const richard4 = { status: 'looking for work' };
const handler4 = {
	set(target, propName, value) {
		if (propName === 'payRate') {
			// if the pay is being set, take 15% as commission
			value = value * 0.85;
		}
		target[propName] = value;
	}
};
const agent4 = new Proxy(richard4, handler4);
agent4.payRate = 1000; // set the actor's pay to $1,000
console.log(agent4.payRate); // $850 the actor's actual pay

/* 
Outras armadilhas

get - permite que o proxy controle chamadas para acesso à propriedades
set - permite que o proxy controle alterações de valor da propriedade
apply - permite que o proxy controle quando o objeto-alvo é invocado (o objeto-alvo é uma função)
has - permite que o proxy controle o uso do operador in
deleteProperty - permite que o proxy controle quando uma propriedade é deletada
ownKeys - permite que o proxy controle quando todas as chaves são requisitadas
construct - permite que o proxy controle quando o proxy é utilizado com a palavra-chave new, como um construtor
defineProperty - permite que o proxy controle quando defineProperty é utilizado para criar uma nova propriedade no objeto
getOwnPropertyDescriptor - permite que o proxy controle a recuperação da descrição da propriedade
preventExtenions - permite que o proxy controle chamadas ao Object.preventExtensions() no objeto proxy
isExtensible - permite que o proxy controle chamadas ao Object.isExtensible no objeto proxy
getPrototypeOf - permite que o proxy controle chamadas ao Object.getPrototypeOf no objeto proxy
setPrototypeOf - permite que o proxy controle chamadas ao Object.setPrototypeOf no objeto proxy

*/

/* Proxies x ES5 getter/setter
------------------------------- */

var obj = {
	_age: 5,
	_height: 4,
	get age() {
		console.log(`getting the "age" property`);
		console.log(this._age);
	},
	get height() {
		console.log(`getting the "height" property`);
		console.log(this._height);
	}
};

/* 
Observe, no código acima, que temos que configurar get age() e get height() quando inicializamos o objeto. Executando o código, obtemos o seguinte resultado:
*/

obj.age; // logs 'getting the "age" property' & 5
obj.height; // logs 'getting the "height" property' & 4

/* 
Mas veja o que acontece quando adicionamos uma nova propriedade ao objeto:
*/

obj.weight = 120; // set a new property on the object
obj.weight; // logs just 120

// Com os proxies da ES6, nós não precisamos saber as propriedades do objeto com antecedência:

const proxyObj = new Proxy(
	{ age: 5, height: 4 },
	{
		get(targetObj, property) {
			console.log(`getting the ${property} property`);
			console.log(targetObj[property]);
		}
	}
);

proxyObj.age; // logs 'getting the age property' & 5
proxyObj.height; // logs 'getting the height property' & 4

// Tudo igual ao código ES5 até aqui, mas veja o que acontece quando adicionamos uma nova propriedade:

proxyObj.weight = 120; // set a new property on the object
proxyObj.weight; // logs 'getting the weight property' & 120

/**
 * Generators
 */

function getEmployee() {
	console.log('the function has started');

	const names = [ 'Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard' ];

	for (const name of names) {
		console.log(name);
	}

	console.log('the function has ended');
}

getEmployee();

/* 
Sempre que uma função é invocada, o mecanismo JavaScript inicia no topo da função e executa cada linha de código até chegar à parte inferior. Não existe maneira de parar a execução da função no meio e retornar depois para o mesmo ponto onde paramos. Esse comportamento "execute-até-o-fim".
*/

// Funções pausáveis
function* getEmployee2() {
	console.log('the function has started');

	const names = [ 'Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard' ];

	for (const name of names) {
		console.log(name);
	}

	console.log('the function has ended');
}

// Observe o asterisco**** logo após a palavra function

getEmployee2();

// this is the response I get in Chrome:
//getEmployee2 {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}

// genarators em funções

function* name1() {}
function* name2() {}
function* name3() {}

/* Generators e iterators
------------------------- */

const generatorIterator = getEmployee();
generatorIterator.next();

/*
the function has started
Amanda
Diego
Farrin
James
Kagure
Kavita
Orit
Richard
the function has ended
*/

// A palavra-chave 'yield'

function* getEmployee3() {
	console.log('the function has started');

	const names = [ 'Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard' ];

	for (const name of names) {
		console.log(name);
		yield;
	}

	console.log('the function has ended');
}

const generatorIterator3 = getEmployee3();
generatorIterator3.next();

/* 
the function has started
Amanda 
*/

// Enviando dados pra dentro ou fora de um generator

function* displayResponse() {
	const response = yield;
	console.log(`Your response is "${response}"!`);
}

const iterator = displayResponse();

iterator.next(); // starts running the generator function
iterator.next('Hello Udacity Student'); // send data into the generator
// the line above logs to the console: Your response is "Hello Udacity Student"!

function* getEmployee() {
	const names = [ 'Amanda', 'Diego', 'Farrin', 'James', 'Kagure', 'Kavita', 'Orit', 'Richard' ];
	const facts = [];

	for (const name of names) {
		// yield *out* each name AND store the returned data into the facts array
		facts.push(yield name);
	}

	return facts;
}

const generatorIterator = getEmployee();

// get the first name out of the generator
let name = generatorIterator.next().value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is cool!`).value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is awesome!`).value;

// pass data in *and* get the next name
name = generatorIterator.next(`${name} is stupendous!`).value;

// you get the idea
name = generatorIterator.next(`${name} is rad!`).value;
name = generatorIterator.next(`${name} is impressive!`).value;
name = generatorIterator.next(`${name} is stunning!`).value;
name = generatorIterator.next(`${name} is awe-inspiring!`).value;

// pass the last data in, generator ends and returns the array
const positions = generatorIterator.next(`${name} is magnificent!`).value;

// displays each name with description on its own line
positions.join('\n');

/* 
A primeira chamada de .next() passa dados. Mas os dados não são armazenados em nenhum lugar. A última chamada .next() deve ter algum dado já que está tendo o yield da última chamada de toppings.push().
*/

/*
Generators são um novo tipo poderoso de função, que é capaz de pausar sua execução ao mesmo tempo em que mantém seu próprio estado. Os generators são ótimos para iterar por listas, tratando seus items um por um. Você também pode utilizá-los para tratar callbacks aninhados. 
*/