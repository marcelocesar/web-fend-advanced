/**
 * Function Constructor
 */

// Objeto literal
const obj = {};
console.log(obj === Object); //false
console.log(obj.constructor === Object); //true


// new Object()
const obj2 = new Object();
console.log(obj2 === Object); //false
console.log(obj2.constructor === Object); //true


// função construtora
function FrontEndDeveloper() {
    this.name = 'Marcelo Cesar';
}

const developer = new FrontEndDeveloper();
console.log(developer === Object); //false
console.log(developer.constructor === Object); //false

console.log(developer);

/* Quando vc cria um objeto utilizando função construtora, o prototype é diferente, tem menos opções quando se cria um objeto utilizando a forma literal.

testar no chrome toosl
*/

// Função construtora com parametros
function SoftwareDeveloper(name) {
    this.favoriteLanguage = 'JavaScript';
    this.name = name;
}

let instructor = new SoftwareDeveloper('Marcelo');

console.log(instructor);
// SoftwareDeveloper { favoriteLanguage: 'JavaScript', name: 'Marcelo' }

let teacher = new SoftwareDeveloper('Cesar');

console.log(teacher);
// SoftwareDeveloper { favoriteLanguage: 'JavaScript', name: 'Cesar' }

/*
- Re ser criada com letra maiscula
- Deve utilizar o this.
*/

/*

Now it's your turn to create a constructor function. Declare a
`Sandwich` constructor function that takes three parameters:

1. `bread` (string) - the type of bread for the sandwich (e.g. "Wheat")
2. `meat` (array) - the meats to put on the sandwich
   (e.g. `[]` for a vegetarian sandwich!)
3. `vegetables` (array) - the vegetables to include in the sandwich

*/

function Sandwich(bread, meat, vegetables) {
    this.bread = bread;
    this.meat = meat;
    this.vegetables = vegetables;
}


/**
 * Typeof e instanceof
 */


function Developer(name) {
    this.name = name;
}

let marcelo = new Developer('Marcelo')
console.log(typeof marcelo);
console.log(marcelo instanceof Object);


function Finch(name) {
    this.kingdom = 'Animalia';
    this.name = name;
}

function Sparrow(name) {
    this.kingdom = 'Animalia';
    this.name = name;
}

const atticus = new Finch('Atticus');
const jack = new Sparrow('Jack');

console.log(atticus instanceof Sparrow);

// false é retornado. Não apenas Sparrow não é função construtora do objeto atticus — o objeto Sparrow não está em nenhum lugar da cadeia de protótipos de atticus.



/*
Resumo
O sistema de classes do JavaScript é construído diretamente usando funções e objetos. Chamar uma função construtora com o operador new instancia um novo objeto. A mesma função construtora pode ser usada para criar objetos diferentes.
*/



/**
 * This
 */

function Cat(name) {
    this.name = name;
    this.sayName = function () {
        console.log(`Meow! My name is ${this.name}`);
    };
}

const bailey = new Cat('Bayley');

bailey.sayName();

//ao invocar uma função construtora com o operador new, this fica definida como o objeto instanciado!

const dog = {
    name: 'Fox',
    sayName: function () {
        console.log(`Meow! My name is ${this.name}`);
    },
    bark: function () {
        console.log('Woof!');
    },
    barkTwice: function () {
        this.bark();
        this.bark();
    }
}

dog.sayName();
dog.bark();
// Woof!

dog.barkTwice();
// Woof!
// Woof!

// - usando this, métodos podem ser acessados e manipular as propriedades de um objeto
// - this é um palavra reservada


function City(name, population) {
    this.name = name;
    this.population = population;

    this.identify = function () {
        console.log(`${this.name}'s population is ${this.population}.`);
    };
}

const sanFrancisco = new City('San Francisco', 870000);

// Qual é o valor de this?
// O objeto recém-criado, referenciado por sanFrancisco


/**
 * Como o this é definido
 */

/*
1 - chamar uma função construtora com a palavra-chave new define this como um objeto recém-criado
2 - chamar uma função que pertence a um objeto (ou seja, um método) define this como o próprio objeto
3 - chamar uma função por si só, vai definir this como window, que é o objeto global se o ambiente de base for o navegador.
4 - 
*/

const building = {
    floors: 5,
    addFloor: function () {
        this.floors += 1;
    }
};

building.addFloor();
// O valor de this é: building

function myFunction() {
    console.log("Qual é o valor de 'this'?");
}

myFunction();
// O valor do this é: window



/**
 * Definindo o nosso próprio `this`
 */


// Existem ainda duas formas de invocar funções: call() e apply(). Cada método pode ser invocado diretamente em uma função em si (afinal, as funções JavaScript são funções de primeira classe e podem ter propriedades e métodos). Com isso, a função receptora será invocada com um valor this especificado, além de todos os argumentos passados.



// call()
// --------------------------

// fun.call(thisArg[, arg1[, arg2[, ...]]]);

function soma(n1, n2) {
    return n1 + n2;
}

soma(5, 5); //10

//soma.call(window, 5, 5); 10

//é um método invocado diretamente em uma função Primeiro, passamos nele um único valor para ser definido como o valor de this, depois passamos todos os argumentos da função receptora, um por um, separados por vírgulas.



const mockingbird = {
    title: 'O Sol é Para Todos',
    describe: function () {
        console.log(`${this.title} é um romance clássico`);
    }
};

mockingbird.describe();

const pride = {
    title: 'Orgulho e Preconceito'
};

mockingbird.describe.call(pride);
// 'Orgulho e Preconceito é um romance clássico'

// call() é um método muito eficaz para quando se quer invocar uma função no escopo do primeiro argumento passado nele. Da mesma forma, podemos usar o método apply() para fazer a mesma coisa, embora com diferenças na forma com que os argumentos são passados. Vamos analisar!


// apply()
// --------------------------

// Assim como call(), o método apply() é chamado em uma função não só para invocá-la, mas também para associar a ela um valor específico de this. No entanto, em vez de passar argumentos um por um separados por vírgula, apply() coloca os argumentos da função em uma matriz. 

//exemplo call()
// soma.call(window, 5, 5)

//exemplo apply()
// soma.apply(window, [5,5]);

// fun.apply(thisArg, [argsArray])

// Apesar de a sintaxe desta função ser quase idêntica à de apply(), a principal diferença é que call() aceita uma lista de argumentos, enquanto apply() aceita um único array de argumentos.



/**
 * Escolhendo um método e não o outro
Tanto call() quanto apply() invocam uma função no escopo no primeiro argumento passado neles, ou seja, o objeto que será o valor de this. Então, como saber quando escolher call() ou apply()?

call() pode ser limitado se você não souber de antemão a quantidade de argumentos de que a função precisa. Nesse caso, apply() seria uma melhor opção, já que simplesmente usa uma matriz de argumentos e os segrega para passar junto com a função. Lembre-se de que a segregação tem um pequeno impacto no desempenho, mas não deve ser um problema.
 */


//1)

const carro = {
    modelo: 'ferrari'
}

function modeloCarro(nome) {
    console.log(`${nome}, seu carro é uma ${this.modelo}?`)
}

modeloCarro('fusca!'); //..

modeloCarro.call(carro);

modeloCarro.apply(carro, ["Marcelo"]);


//2)

const dave = {
    name: 'Dave'
};

function sayHello(message) {
    console.log(`${message}, ${this.name}. Você parece bem hoje.`);
}

sayHello.apply(dave, ['Hello']);


//3)

const Andrew = {
    name: 'Andrew',
    introduce: function () {
        console.log(`Hi, my name is ${this.name}!`);
    }
};

const Richard = {
    name: 'Richard',
    introduce: function () {
        console.log(`Hello there! I'm ${this.name}.`);
    }
};

Richard.introduce.call(Andrew); //'Hello there! I'm Andrew.'



//4)

const andrew = {
    name: 'Andrew'
};

function introduce(language) {
    console.log(`Meu nome é ${this.name} e minha linguagem de programação favorita é ${language}.`);
}

introduce.call(andrew, 'JavaScript'); //'Meu nome é Andrew e minha linguagem de programação favorita é JavaScript.'




// Retornos de chamada e this
// --------------------------

function invokeTwice(cb) {
    cb();
    cb();
}

const bird = {
    age: 5,
    growOneYear: function () {
        this.age += 1;
    }
};

//bird.growOneYear();

console.log(bird.age); //6

// ao chamar a funcção invokeTwice() passando bird.growOneYear como parametro, pela lógica, deveria acrescentar duas vezes o ano.

invokeTwice(bird.growOneYear);

console.log(bird.age); //6

// bird.age continua sendo 6

/* 
Lembre-se! 

Se uma função construtora é chamada com o operador new => this é definida como o objeto recém-criado! 
Se um método é invocado em um objeto => this é definida como o próprio objeto. 
E se uma função é simplesmente invocada => this é definida como o objeto global: window.
*/

// Invocar uma função this será o objeto global windows
invokeTwice(function () {
    bird.growOneYear();
});

console.log(bird.age); // 7


// Com essa abordagem, invocar invokeTwice() continua definindo o valor de this como window. Porém, isso não surte efeito no fechamento. Dentro da função anônima, o método growOneYear() ainda será chamado diretamente no objeto dog. Com isso, o valor da propriedade age de dog muda de 5 para 7.

// Como esse é um padrão bem comum, o JavaScript fornece uma abordagem alternativa e mais simples: o método bind().


// Método bind()
// --------------------------

// - permite uso para definir um valor para this.
// - retorna uma nova função

const myBird = bird.growOneYear.bind(bird);

invokeTwice(myBird);

console.log(bird.age); // 7

// Por trás dos panos, bind() retorna uma nova função que pode ser chamada como uma função normal (por exemplo, myFunction()) mas, por dentro, um método é invocado no estilo dos métodos (por exemplo, myObject.myMethod()). Isso tem nos ajudado quando vemos possíveis problemas de escopo com this ao passar funções de retorno de chamada.

// outro exemplo

const driver = {
    name: 'Danica',
    displayName: function () {
        console.log(`Name: ${this.name}`);
    }
};

const car = {
    name: 'Fusion'
};

driver.displayName.bind(car); // Name: Fusion


/*
Resumo
O JavaScript oferece três métodos que nos permitem definir o valor de this para uma determinada função:

call() invoca a função e tem os argumentos passados individualmente, separados por vírgula. apply() é similar a call(): ele invoca a função da mesma forma, mas os argumentos são passados na forma de matriz.

bind() retorna uma nova função com this vinculado a um objeto específico, o que nos permite chamá-lo como uma função.
*/



/**
 * Herança de protótipos
 */


function Gato() {
    this.vidas = 9;

    this.meow = function () {
        console.log(`Meow! My name is ${this.name}`);
    };
}

const cat1 = new Gato();
const cat2 = new Gato();

cat1.name = 'Bafo';
cat2.name = 'Nina';


cat1.meow();
cat2.meow();

/* Para economizar memória e manter tudo simples, podemos adicionar métodos à propriedade prototype da função construtora. O protótipo (prototype) é só um objeto, e todos os objetos criados por uma função construtora mantêm uma referência ao protótipo (prototype). Esses objetos podem até usar as propriedades do prototype como se fossem deles! */


/* Lembre-se de que toda função tem uma propriedade prototype, quando invocada como um construtor usando o operador new, ela cria e retorna um novo objeto. Esse objeto é vinculado ao prototype do seu construtor, e esse vínculo permite acessar as propriedades e métodos de prototype. */

// (A)

function Dalmatian1(name) {
    this.name = name;

    this.bark = function () {
        console.log(`${this.name} barks!`);
    };
}

function Dalmatian2(name) {
    this.name = name;
}

Dalmatian2.prototype.bark = function () {
    console.log(`${this.name} barks!`);
};

/* Embora as duas abordagens funcionem bem (ou seja, todas as instâncias criadas pela função construtora poderá invocar um método bark()), a segunda abordagem é mais indicada. Adicionar métodos ao protótipo gera uma economia de memória, já que mais objetos Dalmatian são instanciados. Além da maior eficiência, não precisamos atualizar todos os objetos individualmente caso queiramos mudar um método. */


// Substituindo o objeto prototype
// -------------------------------

function Hamster() {
    this.hasFur = true;
}

let waffle = new Hamster();
let pancake = new Hamster();

Hamster.prototype.eat = function () {
    console.log('Chomp chomp chomp!');
};

waffle.eat();
// 'Chomp chomp chomp!'

pancake.eat();
// 'Chomp chomp chomp!'



//  substituindo o objeto prototype de Hamster por algo diferente:

Hamster.prototype = {
    isHungry: false,
    color: 'brown'
};

console.log(waffle.color);
// undefined

waffle.eat();
// 'Chomp chomp chomp!'

console.log(pancake.isHungry);
// undefined



// Como podemos ver, todos os objetos Hamster novos criados a partir dai vao utilizar o prototype atualizado.

const muffin = new Hamster();

//muffin.eat();
// TypeError: muffin.eat não é uma função

console.log(muffin.isHungry);
// false

console.log(muffin.color);
// 'brown'



// Checando as propriedades de um objeto
// -------------------------------------

// No Chrome Dev Toosl

const myArray = [1, 2, 3];
myArray.join(' ');
console.dir(myArray);

// Analise a propriedade: __proto__

// Método hasOwnProperty()
// -----------------------
// permite encontrar a origem de uma propriedade

function Phone() {
    this.operatingSystem = 'Android';
}

Phone.prototype.screenSize = 6;

// ---------

const myPhone = new Phone();

const own = myPhone.hasOwnProperty('operatingSystem');

console.log(own); // true

// ---------

const inherited = myPhone.hasOwnProperty('screenSize');

console.log(inherited); // false



// Método isPrototypeOf()
// ----------------------
// verifica se um objeto existe na cadeia de protótipos de outro objeto

const rodent = {
    favoriteFood: 'cheese',
    hasTail: true
};

function Mouse() {
    this.favoriteFood = 'cheese';
}

Mouse.prototype = rodent;

const ralph = new Mouse();

const result = rodent.isPrototypeOf(ralph)

console.log(result);
// true


// Método Object.getPrototypeOf()
// -----------------------------

const myPrototype = Object.getPrototypeOf(ralph);

console.log(myPrototype);
// { favoriteFood: "cheese", hasTail: true}


// A propriedade constructor
// --------------------------

function Longboard() {
    this.material = 'bamboo';
}

const board = new Longboard();

console.log(board.constructor);

// function Longboard() {
//   this.material = 'bamboo';
// }

const rodent1 = {
    teeth: 'incisors',
    hasTail: true
};

console.log(rodent1.constructor);
// function Object() { [native code] }


/* 
Resumo
----
Em JavaScript, herança é quando um objeto se baseia em outro objeto. A herança nos permite reutilizar código que já existe, fazendo objetos assumirem propriedades de outros objetos.

Quando uma função é chamada como um construtor usando o operador new, a função cria e retorna um novo objeto. Esse objeto é vinculado secretamente ao prototype do seu construtor, que é apenas outro objeto. Usando esse vínculo secreto, um objeto pode acessar as propriedades e métodos do prototype como se fossem dele. Se o JavaScript não encontrar uma determinada propriedade dentro de um objeto, ele continuará procurando na cadeia de protótipos, eventualmente chegando em Object() (nível mais alto), se necessário.

Analisamos também alguns métodos e propriedades que podem ser usadas para verificar a origem e as referências de objeto e seus protótipos. São elas:

hasOwnProperty() isPrototypeOf() Object.getPrototypeOf() .constructor
*/




/**
 * Herança de protótipo: Subclasses
 */

const animal = {
    age: 5,
    weight: 2,
    eat() {
        console.log('eat');
    },
    sleep() {
        console.log('sleep');
    }
}

function Cat222() {
    this.lives = 9,
        this.meow = function () {
            console.log('meow!');
        }
}

Cat222.prototype = animal;

const myCat = new Cat222();

console.log(myCat);
console.log(myCat.age);
console.log(myCat.weight);


// Vinculo secreto

const bear = {
    claws: true,
    diet: 'carnivore'
};

function PolarBear() {
    // ...
}

//Herança
PolarBear.prototype = bear;

const snowball = new PolarBear();

snowball.color = 'white';
snowball.favoriteDrink = 'cola';

console.log(snowball.claws);
// true

console.log(snowball.diet);
// 'carnivore'

/* Já que claws e diet existem como propriedades no objeto prototype, elas são procuradas porque os objetos estão secretamente vinculados à propriedade prototype do construtor. */


// Não é aconselhável reatribuir a propriedade __proto__ nem usá-la nos códigos que você escrever. 


function Car5(color, year) {
    this.color = color;
    this.year = year;
}

Car5.prototype.drive = function () {
    console.log('Vroom vroom!');
};

const meuCarro = new Car5('silver', 1988);

meuCarro.drive() // Vroom vroom!


/* 
Por tras dos panos 

1 - O mecanismo do JavaScript procura por por uma propriedade chamada 'driver' dentro do objeto 'car'
2 - O mecanismo do JavaScript não encontra 'drive' dentro do objeto 'car'
3 - O mecanismo do JavaScript acessa, então, a propriedade 'car.__proto__'
4 - Como a propriedade 'car.__proto__' aponta para 'Car.prototype', o mecanismo do JavaScript procura por 'drive' no protótipo.
5 - Como 'Car.prototype.drive' é uma propriedade definida, isso é retornado.
6 - Por fim, como 'drive' é chamada como um método em 'car', o valor de 'this' é definido como 'car'

*/


// Object.create()
// -------------------
// Na verdade, existe uma forma de criar o protótipo de um objeto por conta própria, que é usando Object.create(). E, o melhor de tudo é que essa abordagem nos permite gerenciar herança sem alterar o protótipo! Object.create() assume um único objeto como argumento e retorna um novo objeto com a propriedade __proto__ definida como o argumento que foi passado. A partir daí, é só definir o objeto retornado como o protótipo da função construtora do objeto-filho. 

const mammal = {
    vertebrate: true,
    earBones: 3
};

const rabbit = Object.create(mammal);

console.log(rabbit);

// {}

// Porém, agora rabbit deve ser secretamente vinculado a mammal. Ou seja, sua propriedade __proto__ deve apontar para mammal:

console.log(rabbit.__proto__ === mammal);

// true - Great!

// Com isso, rabbit pode acessar as propriedades de mammal como se fossem suas!

console.log(rabbit.vertebrate);
// true

console.log(rabbit.earBones);
// 3


function Parent() {
    // ...
}

function Child() {
    // ...
}

Child.prototype = Object.create(Parent.prototype);

const child = new Child();

child instanceof Parent; //true


/* 
Object.create

- Retorna um novo objeto, cuja propriedade __proto__ é definida para o objeto passado para Object.create()
- Usando Object.create(), podemos ter objetos herdados de qualquer objeto que quisermos (ou seja, não somente prototype)
- Object.create() nos permite implementar uma herança de protótipo sem alterar o protótipo */


/* 
Resumo
Herança em JavaScript se resume a criar essa cadeia! Isso nos permite criar subclasses, ou seja, criar um objeto-filho que herda a maioria ou todas as propriedades e métodos do objeto-pai. Aí, podemos implementar os métodos e propriedades únicos do objeto-filho que quisermos individualmente, mas ainda mantendo os dados e a funcionalidade do seu objeto-pai.

Objetos (instâncias) são secretamente vinculadas ao objeto de protótipo da função construtora por meio da propriedade __proto__ dessa instância. Você nunca deve usar __proto__ nos códigos que escrever. Usar __proto__ no código, ou até herdar só o protótipo diretamente gera efeitos colaterais bem ruins. Para gerenciar a herança no JavaScript com eficiência, uma abordagem eficaz é evitar transformar o protótipo completamente.

Object.create() nos permite fazer exatamente isso: pegar um objeto-pai e retornar um novo objeto com sua propriedade __proto__ definida como esse objeto-pai.
*/



