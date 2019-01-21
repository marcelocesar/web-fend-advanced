/**
 * 1. Objetos
 */

// Objetos é um conjunto de pares chave/valor associados. Criamos um objeto com chaves (ou seja, { e }).

const myObject = {};

// Propriedades com pares de chave:valor.
const car = {
    color: 'red',
    year: 1992,
    isPreOwned: true
};

//Objetos são desordenados.
const anotheCar = {
    isPreOwned: true,
    color: 'red',
    year: 1992
};

// Lendo objetos.
const greetings = {
    hello: [{
        english: 'hi',
        french: 'bonjour',
        portuguese: 'oi'
    }],
    goodbye: [{
        english: 'bye',
        french: 'au revoir',
        portuguese: 'tchau'
    }]
};

console.log(greetings.hello[0].portuguese);
console.log(greetings['hello'][0]['portuguese']);

// Resumo
// Em JavaScript, um objeto é um conjunto não ordenado de propriedades. 
// Cada propriedade é composta de um par chave/valor e pode referenciar um primitivo 
// (como strings, números, booleanos etc.) ou outro objeto. Diferentemente dos elementos de uma matriz, 
// que são acessados por um índice numérico, as propriedades dos objetos são acessadas pelo nome de chave, 
// usando notação de colchetes ou notação de ponto. 


/**
 * 2. Criando objetos
 */

// usando notação literal:
const pessoal = {};

// usando a função construtora Object():
const animal = new Object();

//Recomendado utilizar a notação literal


/** 
 * Modificando propriedades
 */

const dog = {
    name: "Marley",
    age: 2,
    bark: () => console.log('Auauau!'),
    greet: (name) => console.log(`${name} auuuuu...!`)
}

dog.age += 1;
console.log(dog.age);

dog.name = "Bob"
console.log(dog.name);
console.log(dog.greet('Fox'));


// Adicionando propriedades

const orc = {};
orc.strength = 40;
orc.dexterity = 28;
console.log(orc);

orc['magic'] = 15;
console.log(orc);

orc.attack = () => {
    console.log(`Damage is 68!!!!`);
}

console.log(orc.attack());


// Removendo propriedades

delete orc.magic;

console.log(orc);


/**
 * Passando argumentos
 */

// Argumento primitivo int

function changeToEight(n) {
    n = 8;
}

let n = 7;
changeToEight(n);
console.log(n);

// Argumento objeto

let obj = {
    color: 'red'
};

function setToBlue(object) {
    object.color = 'blue';
}

setToBlue(obj);
console.log(obj.color); //blue

// Como isso aconteceu? Bom, como os objetos no JavaScript são passados por referência, 
// se fizermos mudanças nessa referência, estaremos modificando o objeto original diretamente!

// Além disso, a mesma regra se aplica quando reatribuímos um objeto a uma nova variável e mudamos 
// essa cópia. Repetindo: como os objetos são passados por referência, o objeto original também é alterado.

const developers = {
    marcelo: 3,
    cesar: 5
};

const developersCopy = developers;

console.log(developersCopy.cesar); // 5

developersCopy.cesar = 333;

console.log(developersCopy.cesar); // 333

console.log(developers.cesar); // 333

//Como os objetos são passados por referência, fazer mudanças à cópia 
//(developersCopy) produz efeito direto no objeto original.

/**
 * Comparando objetos
 */

const marcelo = {
    name: 'marcelo',
    age: 35,
    job: () => {
        console.log('Front-End Developer!');
    }
};

const cesar = {
    name: 'marcelo',
    age: 35,
    job: () => {
        console.log('Front-End Developer!');
    }
};

console.log(marcelo === cesar); //false - objetos iguais, porém, referência diferentes

const jesus = marcelo;

console.log(marcelo === jesus); //true - objetos iguais e referência iguais.


/*
Resumo
Objetos são comumente criados com notação literal e podem conter propriedades que apontam para 
funções chamadas de métodos. Os métodos são acessados da mesma forma que outras propriedades de 
objetos e podem ser invocados da mesma forma que as funções, a diferença é que eles têm acesso 
automaticamente às outras propriedades do objeto-pai.

Por padrão, objetos são mutáveis (com algumas exceções), então os dados dentro deles podem ser alterados. 
Novas propriedades podem ser adicionadas, e as propriedades que já existem podem ser modificadas 
simplesmente especificando o nome da propriedade e atribuindo (ou reatribuindo) um valor. Além disso, 
propriedades e métodos de um objeto podem ser excluídos também com o operador delete, que modifica o objeto diretamente.
*/



/**
 * Funções x métodos
 */

function sayHello() {
    console.log('Olá!');
}

const dev = {
    name: 'Marcelo'
};

const developer = {
    name: 'Marcelo',
    sayHello: () => console.log('Olá mundo!'), // arrow function es6
    favoriteLanguage: (language) => {
        console.log(`Minha linguagem favorita é ${language}`);
    }
};

// Chamada de métodos e passando argumentos
console.log(developer.sayHello());
console.log(developer['favoriteLanguage']('JavaScript'));


// Invocando uma função num array
const myArray = [function alerter() {
    console.log('Função do array!!!');
}];

myArray[0]();

//Um método pode acessar o objeto em que foi chamado, usando o lexical this

const geometric = {
    tipo: 'quadrado',
    get: function () {
        console.log(`Minha figura geométrica é ${this.tipo}`) //lexical 'this' não funciona com arrow function
    },
    get2() {
        console.log(`Minha figura geométrica é ${this.tipo}`) //lexical 'this' não funciona com arrow function
    }
}

console.log(geometric.get());
console.log(geometric.get2());

/*
Resumo
Um método é uma propriedade de função de um objeto. Ele é acessado da mesma forma que as demais propriedades 
do objeto (ou seja, usando notação de ponto ou de colchetes) e é invocado exatamente como uma função comum 
externa aos objetos (ou seja, adicionando parêntesis ao fim da expressão).

Como um objeto é um conjunto de dados e de formas de operar esses dados, um método pode acessar o objeto 
em que foi chamado usando a palavra-chave especial this. O valor de this é determinado quando um método 
é invocado, e seu valor é o objeto em que o método foi chamado. Como this é uma palavra reservada em 
JavaScript, seu valor não pode ser usado como um identificador.
*/


/**
 *  Atenção com os globais
 */

const chameleon = {
    eyes: 2,
    lookAround() {
        console.log(`Vejo você com os meus ${this.eyes} olhos!`); //o valor de this é o próprio objeto chameleon
    }
};

console.log(chameleon.lookAround());

// (o que a expressão acima gera?)
function whoThis() {
    this.trickyish = true
}

console.log(whoThis())

/* 
this e invocação
Como a função é invocada determina o valor de this dentro da função. 

Como .lookAround() é invocado como método, o valor de this dentro de .lookAround() é tudo que está à esquerda do ponto na invocação.

O objeto chameleon está à esquerda do ponto. Portanto, dentro do método .lookAround(), this vai referenciar o objeto chameleon.

Quando não existe ponto à esquerda e uma função comum é invocada, o valor de this é o objeto global window.

window.whoThis();

O objeto window
Se você não ainda não trabalhou com o objeto window, ele é fornecido pelo ambiente do navegador 
e pode ser acessado globalmente pelo seu código JavaScript usando o identificador window. 
Esse objeto não é parte da especificação JavaScript (ou seja, ECMAScript), na verdade, foi desenvolvida pela W3C.

Esse objeto window tem acesso a inúmeras informações sobre a página, incluindo:

O URL da página (window.location;) A posição vertical de rolagem da página (window.scrollY') 
Rolagem para um novo local (window.scroll(0, window.scrollY + 200); rolando 200 pixels para 
baixo em relação ao local atual) Abertura de uma nova página da web (window.open("https://www.udacity.com/");)

*/

// Variáveis globais são propriedades de window

var meuNome = 'Marcelo';

console.log(window.meuNome === meuNome); //true


/* Globais e var, let e const
As palavras-chave var, let e const são usadas para declarar variáveis em JavaScript. var existe desde o 
início da linguagem, e let e const são adições bem mais novas (adicionadas na ES6).
Apenas declarar variáveis com a palavra-chave var as adiciona ao objeto window. Se você declarar uma 
variável fora de uma função com let ou const, ela não será adicionada ao objeto window como uma propriedade.
*/

let currentlyEating = 'ice cream';

console.log(window.currentlyEating === currentlyEating); // false!


// Funções e métodos globais em window

function learnSomethingNew() {
    window.open('https://www.udacity.com/');
}

window.learnSomethingNew === learnSomethingNew;


/**
 * Evite globais
 */

/*
Alto acoplamento
Alto acoplamento é uma frase que os desenvolvedores usam para identificar códigos que 
são muito dependentes dos detalhes uns dos outros. A palavra acoplamento significa união de dois itens. 
No alto acoplamento, códigos são unidos de forma que alterar um acidentalmente altera o funcionamento de outro:
*/

var instructor = 'Richard';

function richardSaysHi() {
    console.log(`${instructor} says 'hi!''`);
}



/*
Colisões de nome
Uma colisão de nome ocorre quando duas (ou mais) funções dependem de uma variável com o mesmo nome. 
Um grande problema disso é que ambas as funções vão tentar atualizar ou definir a variável, mas essas mudanças 
se neutralizam entre si. Vamos ver um exemplo de colisão de nome com o código de manipulação do DOM abaixo:
*/

let counter = 1;

function addDivToHeader () {
  const newDiv = document.createElement('div');
  newDiv.textContent = 'div number ' + counter;

  counter = counter + 1;

  const headerSection = document.querySelector('header');
  headerSection.appendChild(newDiv)
}

function addDivToFooter() {
  const newDiv = document.createElement('div');
  newDiv.textContent = 'div number ' + counter;

  counter = counter + 1;

  const headerSection = document.querySelector('footer');
  headerSection.appendChild(newDiv)
}

/*
Ambas funcões criam um elemento <div> e aumentam a variável counter. Isso causa vários problemas porque as duas funções
utilizam a mesma variável.
*/


/*
Resumo
O objeto window é fornecido pelo navegador e não faz parte da linguagem nem da especificação JavaScript. Toda declaração de variável global (ou seja, as que usam var) ou de função global são adicionadas como propriedades a esse objeto window. O uso excessivo de variáveis globais não é uma boa prática e pode causar problemas inesperados a um código perfeitamente escrito.

Independentemente de você trabalhar com o objeto window ou com outro criado por você, lembre-se de que os objetos são compostos de pares de chave/valor.
*/
