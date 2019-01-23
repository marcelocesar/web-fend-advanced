/**
 * Funções são funções de primeira classe
 */

// Funciona básicamente como um objeto, pode ter variáveis, outros metros, mas precisa do ().
// Pode ser armazenadas em variáveis.
// Pode ser retornadas em outra função.
// Pode ser passadas como argumento em outra função.

const myVaribleFunction = function (n1, n2) {
    return n1 + n2;
}

console.log(myVaribleFunction(2, 2)); //4

// Funções possui propriedades padrões como tamanho (length) e nome (name).

console.log(myVaribleFunction.length); //2
console.log(myVaribleFunction.name); //myVaribleFunction


// Funções podem retornar funções

function fnReturnAnotherFunction() {
    console.log('Função principal'); //troque console por alert no navegado

    return function () {
        console.log('Retornando outra função');
    };
}

console.log(fnReturnAnotherFunction());

const returnDaFuncao = fnReturnAnotherFunction();

console.log(returnDaFuncao());

// ou

console.log(fnReturnAnotherFunction()());

// Resumo
// Em JavaScript, funções são funções de primeira classe. Isso significa que podemos fazer com as funções exatamente tudo que podemos fazer com outros elementos do JavaScript, como strings, matrizes e números. Isso significa que as funções podem:

// Ser armazenadas em variáveis.
// Ser retornadas de uma função.
// Ser passadas como argumento em outra função.




/**
 * Funções de retorno de chamada - callback
 */

/* 
Uma função que assume outras como argumentos (e/ou retorna uma função, como vimos na última seção) é conhecida como uma função de ordem superior. Uma função passada como um argumento em outra função é chamada de função de retorno de chamada, ou callback.
*/

function soma(numero, callback) {
    return numero + callback;
}

function callback() {
    return 3;
}

console.log(soma(2, callback())); //5


// Outro exemplo

function each(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            console.log(array[i]);
        }
    }
}

function isPositive(n) {
    return n > 0;
};

each([-2, 7, 11, -4, -10], isPositive); // 7, 11


/**
 * Métodos array
 */

// forEach()

['maça', 'banana', 'uva'].forEach(function callback(currentValue, index, array) {
    console.log(`currentValue: ${currentValue}, index: ${index}, array: ${array}`);
});

function logIfOdd(n) {
    if (n % 2 !== 0) {
        console.log(n);
    }
}

logIfOdd(2);
// (nada é registrado)

logIfOdd(3);
// 3

[1, 5, 2, 4, 6, 3].forEach(function logIfOdd(n) {
    if (n % 2 !== 0) {
        console.log(n);
    }
});

//ou dessa forma mais simples

[1, 5, 2, 4, 6, 3].forEach(logIfOdd);

// map()

// map é parecido com o forEach, porém, o método map() retorna um novo array.

const names = ['Andrew', 'Richard', 'Veronika'];

const nameLengths = names.map(function (name) {
    return name.length;
});

console.log(nameLengths); // [6,7,8]

// É importante entender: o método map() retorna uma novo array, não modifica o array original.


/* Using map()
 *
 * Using the musicData array and map():
 *   - Return a string for each item in the array in the following format:
 *     <album-name> by <artist> sold <sales> copies
 *   - Store the returned data in a new albumSalesStrings variable
 *
 * Note:
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 *   - Do not format the sales number; leave it as a long string of digits
 */
const musicData = [{
        artist: 'Adele',
        name: '25',
        sales: 1731000
    },
    {
        artist: 'Drake',
        name: 'Views',
        sales: 1608000
    },
    {
        artist: 'Beyonce',
        name: 'Lemonade',
        sales: 1554000
    },
    {
        artist: 'Chris Stapleton',
        name: 'Traveller',
        sales: 1085000
    },
    {
        artist: 'Pentatonix',
        name: 'A Pentatonix Christmas',
        sales: 904000
    },
    {
        artist: 'Original Broadway Cast Recording',
        name: 'Hamilton: An American Musical',
        sales: 820000
    },
    {
        artist: 'Twenty One Pilots',
        name: 'Blurryface',
        sales: 738000
    },
    {
        artist: 'Prince',
        name: 'The Very Best of Prince',
        sales: 668000
    },
    {
        artist: 'Rihanna',
        name: 'Anti',
        sales: 603000
    },
    {
        artist: 'Justin Bieber',
        name: 'Purpose',
        sales: 554000
    }
];

const albumSalesStrings = musicData.map(album => {
    return `${album.name} by ${album.artist} sold ${album.sales} copies`
});

console.log(albumSalesStrings);


// filter()

// O método filter() de Array é parecido com o método map()


const nomes = ['Marcelo', 'Henrique', 'Cesar'];

const nomeFiltrados = nomes.filter(nome => {
    return nome.length < 6;
})

console.log(nomeFiltrados);


/* Using filter()
 *
 * Using the musicData array and filter():
 *   - Return only album objects where the album's name is
 *     10 characters long, 25 characters long, or anywhere in between
 *   - Store the returned data in a new `results` variable
 *
 * Note:
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 */

const results = musicData.filter(album => {
    return (album.name.length > 10 && album.name.length < 25);
});

console.log(results);

/*
Resumo
As funções JavaScript podem assumir diversos argumentos diferentes, incluindo strings, números, matrizes e objetos. Como as funções são funções de primeira classe, também podem ser passadas como argumento a uma determinada função. Funções que assumem outras como argumento são chamadas de funções de ordem superior. As funções passadas como argumento a outras funções são chamadas de funções de retorno de chamada.

Os retornos de chamada permitem passar funções sem precisar dar nome a elas (ou seja, funções anônimas), o que gera menos variáveis vagando por aí. Eles também permitem delegar a chamada de funções a outras funções. Os métodos Array, ou de matriz, como forEach(), map() e filter() aproveitam os retornos de chamada para executar funções nos elementos de uma matriz. Fique à vontade para dar uma olhada na lista de outros métodos array abaixo.
*/



/**
 * Escopo (scope)
 */

// Existem escopo de bloco e escopo de função. Eles determinam onde uma variável pode ser vista. Chama-se Escopo léxico.

/* Outro tipo de escopo, chamado de escopo de tempo de execução, ou seja, quando uma função é executada. O escopo de uma função tem:

- Os argumentos da função.
- Variáveis locais declaradas dentro da função.
- Variáveis do escopo de sua função-mãe.
- Variáveis globais.

*/


const a = 'a';

function pai() {
    const b = 'b';

    function filha() {
        const c = 'c';
    }
}

// A função filha tem acesso as variáveis: a, b e c;


const nome = 'Marcelo';

function apresentacao() {
    const profissao = 'Front-End Developer';

    function hello() {
        console.log(`Olá! Eu sou ${nome}, ${profissao}.`);
    }

    return hello();
}

apresentacao();


/* 
JavaScript tem escopo em função 

em JavaScript, as variáveis são tradicionalmente definidas no escopo de uma função, não no escopo de um bloco. Como entrar em uma função muda o escopo, todas as variáveis definidas nessa função não ficam disponíveis fora dela.
*/

var globalNumber = 5;

function globalIncrementer() {
    const localNumber = 10;

    globalNumber += 1;
    return globalNumber;
}

console.log(globalIncrementer()); //6

console.log(globalIncrementer()); //7

console.log(localNumber); // ReferenceError: localNumber não está definido

// Como JavaScript tem escopo em função, as funções têm acesso a todas as próprias variáveis e às variáveis globais externas a elas.


/*
Escopo em bloco

A sintaxe da ES6 permite usar mais escopo e declarar variáveis ao mesmo tempo com as palavras-chave let e const. Essas palavras-chave são usadas para declarar variáveis de escopo em bloco no JavaScript e eliminam bastante a necessidade de usar var.
*/


// Cadeia de escopos

function one() {
    console.log('one begin');
    two();

    function two() {
        console.log('two begin');
        three();

        function three() {
            console.log('three');
        }
        console.log('two end');
    }
    console.log('one end');
}

one();

// Quando a função one() é chamado, todas as outras funções aninhadas são chamadas também (todas até three())


/* 
O objeto global window
Lembre-se de que quando aplicativos JavaScript rodam em um ambiente host (por exemplo, um navegador), o host fornece um objeto window, também conhecido como o objeto global. Todas as variáveis globais declaradas são acessadas como propriedades desse objeto, que representa o nível mais externo da cadeia de escopos.
*/


// Sombreamento de variável
// Quando se cria duas variáveis com o mesmo nome. O JS não gera erro, ele ofusca a variável externa. Isso se chama 'sobreamento de variável' 

const symbol = 'R$';

function displayPrice(price) {
    const symbol = '$';
    console.log(symbol + price);
}

displayPrice('80');
// $80



/**
 * Fechamentos (Closure)
 */

// Funções mantêm seu escopo

function remember(number) {
    return function () {
        return number;
    }
}

const returnedFunction = remember(5);

console.log(returnedFunction()); // registra o número 5

/*
Quando o interpretador JavaScript acessa remember, ele cria um novo escopo de execução que aponta de volta ao escopo de execução anterior. Esse novo escopo contém uma referência ao parâmetro number (um Number imutável com o valor 5). Quando o interpretador chega na função interna (uma expressão de função), aplica um vínculo com o escopo de execução atual.

Esse processo de uma função reter acesso ao escopo é chamado de fechamento, ou closure. Nesse exemplo, a função interna fecha em number. Um fechamento pode capturar quantos parâmetros e variáveis precisar.

o ambiente léxico` se refere ao código como foi escrito no arquivo JavaScript. Concluindo, um fechamento é:

a própria função o código (mas, mais importante, a cadeia de escopos de) em que a função foi declarada
*/

// Criando um fechamento


function carro() {
    const modelo = "Ferrari"
    const cor = "Vermelho";
    const ano = "2019";

    function caracteristicas() {
        return `Meu carro ${modelo} ${cor} ${ano}.`;
    }

    return caracteristicas;
}

const novoCarro = carro();
console.log(novoCarro()); // "Meu carro Ferrari Vermelho 2019."

/*
A função caracteristicas está disponível para o escopo externo. E só função aninhada tem acesso a variáveis externas a ela: modelo, cor, ano.


Resumo: Closure captura informaçoes (variáveis, métodos) declaradas dentro de uma funcão localmente e torna isso acessível ao escopo externo.
*/

function expandArray() {
    const myArray = [1, 1, 1];

    return function () {
        myArray.push(1);
        return myArray;
    }
}


/* 
Coleta de lixo

O JavaScript gerencia memória com coleta de lixo automática. Isso significa que, quando os dados não são mais referíveis (ou seja, não há mais referências a esses dados no código executável), eles são coletados como lixo e serão destruídos em algum momento. Assim, os recursos que os dados consumiam são liberados (ou seja, memória do computador), tornando-os disponíveis para reutilizar.
*/

// coleta de lixo no contexto dos fechamentos

function myCounter() {
    let count = 0;

    return function () {
        count += 1;
        return count;
    };
}

/*
A existência da função aninhada impede a variável count de ser coletada, portanto, count continua disponível para acesso futuro. Afinal, uma função (e seu escopo) não acabam quando a função é retornada. Lembre-se de que, em JavaScript, funções mantêm acesso ao escopo em que foram criadas! 
*/


/**
 * Expressões de função invocada imediatamente (IIFE)
 */


// Declarações de função x expressões de função

// declaração de função

function returnHello() {
    return 'Oi!';
}

// expressão de função retorna um valor

// anônima
const myFunction = function () {
    return 'Oi!';
};

// nomeada
const otherFunction = function returnHello() {
    return 'Oi!';
};


/*
    Expressões de função invocada imediatamente: Estrutura e sintaxe

    IIFE - Immediately Invoked Function Expression

    São invacadas no mesmo instante!
*/

(function hello() {
    console.log('hello!');
})();

// Passando argumentos

(function hello(nome) {
    console.log(`hello ${nome}!`);
})("Marcelo");



// IIFE e escopo privado

/*
Um dos principais usos das IIFEs é criar escopo privado. Lembre-se de que, em JavaScript, variáveis tradicionalmente têm escopo em função. Sabendo disso, podemos aproveitar o comportamento dos fechamentos para impedir que variáveis ou métodos sejam acessados!
*/

const myFunction = (
    function () {
        const hi = 'Oi!';
        return function () {
            console.log(hi);
        }
    }
)();

//Com isso, myFunction consegue manter um estado mutável privado que não pode ser acessado por fora da função! E tem mais: como a função expressa é chamada imediatamente, a IIFE organiza o código para não poluirmos o escopo global.

// Outra forma de escrever IIFE

(function sayHi() {
    alert('Olá!');
}());

//IIFEs, escopo privado e manipulação de eventos

(function(n){
    delete n;
    return n;
  })(2);


// Essa talvez tenha sido complicada! A chave dessa pergunta é o resultado de se usar o operador delete. O operador delete, na verdade, só tem efeito nas propriedades de um objeto. Ele não é usado para desalocar recursos diretamente (ou seja, liberar memória) e não gera efeito em variáveis e nomes de função.

// Sendo assim, o número passado nessa expressão de função invocada imediatamente, 2, é retornado.