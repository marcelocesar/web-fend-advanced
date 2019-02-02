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


/**
/* A palavra "this" e arrow function
/**

/* Em funções regulares, o valor de this é configurado baseado em como a função é chamada. Em funções arrow, o valor de this é baseado no contexto em que a função se encontra. Em outras palavras, o valor de this no interior de uma função arrow é o mesmo que seu valor fora da função.

Vejamos outro exemplo de this em funções regulares e, depois, vamos checar como as funções arrow funcionam.*/

// constructor
function IceCream() {
    this.scoops = 0;
  }
  
  // adds scoop to ice cream
  IceCream.prototype.addScoop = function() {
    setTimeout(function() {
      this.scoops++;
      console.log('scoop added!');
    }, 500);
  };
  
  const dessert = new IceCream();
  dessert.addScoop();  //'scoop added!
  
  //Depois de executar o código acima, você pode pensar que dessert.scoops seria 1 depois de meio segundo. Mas, infelizmente, não é:
  
  console.log(dessert.scoops); //0
  
  // Por que?
  
  // setTimeOut() é chamada sem a palavra reservada new, sem o método call(), sem apply() e sem um objeto contexto. Isso significa que o valor de this dentro da função é o objeto global e não o objeto dessert.
  
  console.log(scoops); //NaN
  
  // Uma maneira de resolver isso é utilizar CLOSURE. Crie um const self ou _this passando com parametro o this.
  
  
  // adds scoop to ice cream
  IceCream.prototype.addScoop = function() {
    const _this = this; // sets `this` to the `_this` variable
    setTimeout(function() {
      _this.scoops++; // references the `_this` variable
      console.log('scoop added!');
    }, 0.5);
  };
  
  const dessert1 = new IceCream();
  dessert1.addScoop();
  
  console.log(dessert1.scoops); // 1
  
  // Atenção - É exatamente o que as arrow functions fazem, então, vamos substituir a função passada como parâmetro para setTimeout() por uma arrow function:
  
  // constructor
  function Sorvete() {
    this.scoops = 0;
  }
  
  // adds scoop to ice cream
  Sorvete.prototype.addScoop = function() {
    setTimeout(() => { // an arrow function is passed to setTimeout
      this.scoops++;
      console.log('scoop added!');
    }, 0.5);
  };
  
  const baunilha = new Sorvete();
  baunilha.addScoop();
  
  // Como as arrow function herdam this do escopo onde estão contidas, esse código funciona!
  
  console.log(baunilha.scoops); // 1
  
  /* 
  Quando addScoop() é chamado, o valor de this dentro de addScoop() faz referência a dessert. Como uma função arrow é passada como parâmetro para setTimeout(), o contexto onde ela está inserida é utilizado para determinar o valor de this. Como this, fora da função arrow, faz referência ao objeto dessert, o valor de this dentro da arrow também fará referência a dessert.
  */
  
  // E se o método addScoop() for alterado para uma arrow function?
  
  Sorvete.prototype.addScoop = () => { // addScoop is now an arrow function
    setTimeout(() => {
      this.scoops++;
      console.log('scoop added!');
    }, 0.5);
  };
  
  const morango = new Sorvete();
  morango.addScoop();
  
  console.log(morango.scoops); // 0
  
  /*
  Arrow function herdam o valor de this do contexto onde estão inseridas. Fora do escopo do método addScoop(), o valor de this é o objeto global; portanto, se addScoop() é uma arrow function, o valor de this em seu contexto interno é o objeto global.
  */
  
  
  
  /**
  / Parametros default
  **/
  
  //ES5
  function greet(name, greeting) {
    name = (typeof name !== 'undefined') ?  name : 'Student';
    greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';
  
    return `${greeting} ${name}!`;
  }
  
  greet(); // Welcome Student!
  greet('James'); // Welcome James!
  greet('Richard', 'Howdy'); // Howdy Richard!
  
  //ES6+
  function hello(name = 'Student', greeting = 'Welcome') {
    return `${greeting} ${name}!`;
  }
  
  hello(); // Welcome Student!
  hello('James'); // Welcome James!
  hello('Richard', 'Howdy'); // Howdy Richard!
  
  
  /**
  / Default e destructuring
  **/
  
  /* Defaults e array destructuring
  ----------------------------------*/
  
  function createGrid([width = 5, height = 5]) {
    return `Generates a ${width} x ${height} grid`;
  }
  
  createGrid([]); // Generates a 5 x 5 grid
  createGrid([2]); // Generates a 2 x 5 grid
  createGrid([2, 3]); // Generates a 2 x 3 grid
  createGrid([undefined, 3]); // Generates a 5 x 3 grid
  
  /*
  A função createGrid() espera uma array como parâmetro e utiliza destructuring para extrair o primeiro item da array e passá-lo no lugar da variável width, e faz o mesmo com a segundo item da array, passando-o no lugar do parâmetro height. Se a array estiver vazia ou só possuir um dos dois itens, os parâmetros default assumem e passam seu valor no lugar das variáveis que estiverem faltando.
  */
  
  createGrid(); // Gera um erro => Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
  
  // createGrid() espera um array como parametro. Para resolver esse problema podemos definir um valor default []
  
  function createGrid([width = 5, height = 5] = []) {
    return `Generating a grid of ${width} by ${height}`;
  }
  
  createGrid(); //  5 x 5 grid
  
  
  // exmplo com strings
  
  function houseDescriptor([houseColor = 'green', shutterColors = ['red']]) {
    return `I have a ${houseColor} house with ${shutterColors.join(' and ')} shutters`;
  }
  
  houseDescriptor(['green', ['white', 'gray', 'pink']]); //"I have a green house with white and gray and pink shutters"
  
  houseDescriptor(['green']); // "I have a green house with red shutters"
  
  
  
  /* Defaults e objetos destructuring
  ----------------------------------*/
  
  function createSundae({scoops = 1, toppings = ['Hot Fudge']}) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
  }
  
  createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
  createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
  createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
  createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
  
  
  // Assim como array se chamar a function sem parametro dará erro
  
  createSundae(); // throws an error
  
  
  // solução...
  
  function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
    const scoopText = scoops === 1 ? 'scoop' : 'scoops';
    return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
  }
  
  createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.
  
  
  // Outro exemplo
  
  function houseDescriptor({houseColor = 'green', shutterColors = ['red']} = {}) {
    return `I have a ${houseColor} house with ${shutterColors.join(' and ')} shutters`;
  }
  
  houseDescriptor({houseColor: 'red', shutterColors: ['white', 'gray', 'pink']});
  
  houseDescriptor({houseColor: 'red'});
  
  houseDescriptor();
  
  houseDescriptor({shutterColors: ['orange', 'blue']});
  
  houseDescriptor({});
  
  
  /* Array defaults x objeto defaults
  ----------------------------------*/
  
  // Objetos defaults possuem se comparados a array defaults é a maneira com a qual são tratadas as opções ignoradas.
  
  function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
  
  /*
  ...com a função createSundae() usando objetos defaults com destructuring, se você quiser usar o valor padrão de scoops mas modificar o parâmetro toppings, então tudo o que você precisa fazer é passar um objeto que só tenha a propriedade toppings:
  */
  
  createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
  
  // agora com array
  
  function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
  
  // Com a função escrita dessa forma, se você quiser utilizar o valor default de scoops, mas modificar a variável toppings, terá que chamar a função de uma maneira um tanto quanto... estranha:
  
  createSundae([undefined, toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']]);
  
  /*
  Como as arrays são baseadas em posição, nós precisaríamos passar undefined e "ignorar" o primeiro argumento (e aceitar o valor default), para só então chegar ao segundo argumento. A não ser que você tenha uma razão muito forte para usar array defaults com array destructuring, recomendamos que utilize objetos defaults com objetos destructuring!
  */
  
  
  /* Ex1
  Crie uma função buildHouse() que aceite um objeto como parâmetro default. O objeto deverá criar os seguintes valores padrão para suas propriedades:
  -floors = 1
  -color = 'red'
  -walls = 'brick'
  
  Se nenhum argumento ou objeto vazio for passado como parâmetro, a função deverá retornar o seguinte:
  Your house has 1 floor(s) with red brick walls.
  
  */
  
  function buildHouse({floors = 1, color = 'red', walls = 'brick'} = {}) {
    return `Your house has ${floors} floor(s) with ${color} ${walls} walls.`;
  }
  
  
  console.log(buildHouse()); // Your house has 1 floor(s) with red brick walls.
  console.log(buildHouse({})); // Your house has 1 floor(s) with red brick walls.
  console.log(buildHouse({floors: 3, color: 'yellow'})); // Your house has 3 floor(s) with yellow brick walls.
  