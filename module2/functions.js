/**
 * Arrow functions
 */

//es5
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function (name) {
    return name.toUpperCase();
});

const upperizedNames1 = ['Farrin', 'Kagure', 'Asser'].map(
    name => name.toUpperCase()
);


const names = ['Afghanistan', 'Aruba', 'Bahamas', 'Chile', 'Fiji', 'Gabon', 'Luxembourg', 'Nepal', 'Singapore', 'Uganda', 'Zimbabwe'];

const longNames = names.filter(name => name.length > 6);


// Usando arrow functions
// ----------------------

/* Funções regulares podem ser tanto declaração de funções como expressões de funções, no entanto, funções arrow são sempre expressões. Na verdade, o nome completo da função arrow é "arrow function expressions", e ela só pode ser utilizada onde uma expressão é válida. Isso inclui:

estar armazenada em uma variável,
ser passada como argumento de uma função,
e armazenada na propriedade de um objeto. */

// arrow é armazenada em uma variável.

const greet = name => `Hello ${name}!`;

greet('Asser'); //Hello Asser!

// name => `Hello ${name}!`;


// Parênteses e parâmetros da função arrow
// ---------------------------------------

// lista de parâmetros vazia exige parênteses
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();


// múltiplos parâmetros na lista, parênteses obrigatórios!
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');


// Sintaxe concisa e sintaxe block
// ---------------------------------------


// sintaxe concisa - quando retorna uma expressao, nao precisa de chaves
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
    name => name.toUpperCase()
);

// sintaxe block - precisa de chaves e utiliza return
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(name => {
    name = name.toUpperCase();
    return `${name} has ${name.length} characters in their name`;
});


/* AVISO: nem tudo são flores, e existem momentos em que as funções arrow não devem ser utilizadas.Então, antes de apagar da sua mente a maneira tradicional de se escrever uma função, fique atento aos seguintes detalhes:

Há um ponto de atenção com a palavra chave this nas funções arrow
veja mais detalhes na próxima aula!
funções arrow são apenas expressões
não existe declaração de função arrow */



// A palavra "this" e funções regulares
// ------------------------------------


// Um novo objeto
const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']); 

// Um objeto específico
const result = obj1.printName.call(obj2);

// O objeto de um contexto
data.teleport();

// O objeto global ou undefinet
teleport();

