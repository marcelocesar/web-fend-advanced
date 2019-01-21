

/**
 * Funções são funções de primeira classe
 */

// Funciona básicamente como um objeto, pode ter variáveis, outros metros, mas precisa do ().
// Pode ser armazenadas em variáveis.
// Pode ser retornadas em outra função.
// Pode ser passadas como argumento em outra função.

const myVaribleFunction = function(n1, n2){
    return n1 + n2;
}

console.log(myVaribleFunction(2,2)); //4

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