/**
/ Classes em JavaScript
**/

class Dessert {
    constructor(calories = 250) {
        this.calories = calories;
    }
}

class IceCream extends Dessert {
    constructor(flavor, calories, toppings = []) {
        super(calories);
        this.flavor = flavor;
        this.toppings = toppings;
    }
    addTopping(topping) {
        this.toppings.push(topping);
    }
}


/*
Observe as palavras reservadas: class (antes de Dessert e IceCream), extends, método super() é chamado dentro do método constructor();
  
Existem diversas palavras reservadas novas e sintaxe para brincar quando estamos criando classes em JavaScript, porém, antes de mergulharmos nas questões específicas sobre como escrever as classes em JavaScript, queremos apontar uma parte bastante confusa da linguagem JS quando comparada a linguagens baseadas em classes.
  
*/


/* Revião de classes no ES5
----------------------------*/

// Sabendo que as classes no ES6 são apenas uma miragem e escondem o fato de que, por debaixo dos panos, ocorre herança via prototypes , vamos dar uma olhada rápida em como criar classes com código ES5

function Plane(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
}

// methods "inherited" by all instances
Plane.prototype.startEngines = function () {
    console.log('starting engines...');
    this.enginesActive = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();

/*
Observações importantes:
  
a função construtora é chamada com a palavra reservada new
por convenção, o nome da função construtora começa com letra maiúscula
a função construtora controla os dados que serão atribuidos ao objeto que será criado
métodos herdados são colocados no objeto prototype da função construtora.
Tenha isso em mente enquanto estudamos como as classes funcionam no ES6, pois, por debaixo dos panos, elas fazem exatamente isso.
*/


/* Classes no ES6
------------------*/


class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}


/* Class é apenas uma função
--------------------------------*/

class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}

typeof Plane; // function


//Você notou que não há nenhuma vírgula entre os métodos definidos na classe? Vírgulas não são utilizadas para separar propriedades ou métodos em uma classe. Se você adicioná-las, receberá um SyntaxError do tipo unexpected token.



/* Métodos estáticos
---------------------*/


// Para criar um método estático, coloca-se a palavra reservada static antes do nome do método. Veja o método badWeather() no código a seguir.

class Plane {
    constructor(numEngines) {
        this.numEngines = numEngines;
        this.enginesActive = false;
    }

    static badWeather(planes) {
        for (let plane of planes) {
            plane.enginesActive = false;
        }
    }

    startEngines() {
        console.log('starting engines…');
        this.enginesActive = true;
    }
}

// Podemos chamar o método dessa forma 

Plane.badWeather([plane1, plane2, plane3]);

/*
Benefícios das classes
  
Menor configuração
Utilizando a nova sintaxe, você precisará escrever muito menos código para criar a função construtora.
Clareza na definição da função construtora
No interior da definição da classe, você pode declarar explicitamente a função construtora.
Tudo fica mais organizado
Todo o código necessário para o funcionamento da classe fica contido no interior da declaração da própria classe, em vez de ter que declarar a função construtora em um lugar e depois adicionar os métodos ao objeto prototype um a um!
  
Cuidados para tomar ao utilizar classes
  
class não é magia
A palavra reservada class traz consigo muitos conceitos utilizados por outras linguagens. Essa palavra reservada não adiciona a funcionalidade de forma mágica ao JavaScript
class é apenas uma camada mais superficial sobre a herança via prototype
Nós já dissemos isso várias vezes antes, mas, por debaixo dos panos, uma classe JavaScript apenas usa herança via prototype.
Usar classes demanda o uso de new
Quando criamos uma nova instância de uma classe JavaScript, a palavra reservada new deve ser utilizada.
  
*/

class Toy { }

const myToy1 = Toy(); // throws an error

const myToy2 = new Toy(); // this works!




/**
 * Super e extends 
 */


/* subclasses com ES6
--------------------- */

class Tree {
    constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
        this.size = size;
        this.leaves = leaves;
        this.leafColor = null;
    }

    changeSeason(season) {
        this.leafColor = this.leaves[season];
        if (season === 'spring') {
            this.size += 1;
        }
    }
}

class Maple extends Tree {
    constructor(syrupQty = 15, size, leaves) {
        super(size, leaves);
        this.syrupQty = syrupQty;
    }

    changeSeason(season) {
        super.changeSeason(season);
        if (season === 'spring') {
            this.syrupQty += 1;
        }
    }

    gatherSyrup() {
        this.syrupQty -= 3;
    }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');



/* 
A subclasse Maple estende (extends) a classe Tree. Utiliza a palavra reservada super() é acionada tanto no construtor, quanto no método changeSeason() da subclasse Maple. 
*/


// Comparando com as subclasses do ES5

function Tree(size, leaves) {
    this.size = (typeof size === "undefined") ? 10 : size;
    const defaultLeaves = {
        spring: 'green',
        summer: 'green',
        fall: 'orange',
        winter: null
    };
    this.leaves = (typeof leaves === "undefined") ? defaultLeaves : leaves;
    this.leafColor;
}

Tree.prototype.changeSeason = function (season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
        this.size += 1;
    }
}

function Maple(syrupQty, size, leaves) {
    Tree.call(this, size, leaves);
    this.syrupQty = (typeof syrupQty === "undefined") ? 15 : syrupQty;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function (season) {
    Tree.prototype.changeSeason.call(this, season);
    if (season === 'spring') {
        this.syrupQty += 1;
    }
}

Maple.prototype.gatherSyrup = function () {
    this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');



/**
 * Trabalhando com subclasses JavaScript
 */


 /* 
 Trabalhar com classes no ES6 é muito melhor, menos código e fica tudo claro
 
 Lembre-se que, por debaixo dos panos, as mesmas conexões são feitas entre as funções e os prototypes.
 
 */


/* super deve ser chamado de this. Numa função construtora de uma subclasse, antes da palavra reservada this poder ser utilizada, uma chamada para a super classe deve ser feita.
 */

class Apple {}

class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` antes `super` lançará um erro!
    super(energy); 
  }
}


/* 

Ex1 

Crie uma subclasse Bicycle que estende a classe Vehicle. 
A subclasse Bicycle deve sobrescrever a função construtora de Bicycle alterando os valores padrão de wheels de 4 para 2 e horn de 'beep beep' para 'honk honk'.

*/


class Vehicle {
	constructor(color = 'blue', wheels = 4, horn = 'beep beep') {
		this.color = color;
		this.wheels = wheels;
		this.horn = horn;
	}

	honkHorn() {
		console.log(this.horn);
	}
}

// solução
class Bicycle extends Vehicle {
    
    constructor(color = 'blue', wheels = 2, horn = 'honk honk') {
		super(color, wheels, horn);
	}
}

/* tests
const myVehicle = new Vehicle();
myVehicle.honkHorn(); // beep beep
const myBike = new Bicycle();
myBike.honkHorn(); // honk honk
*/




