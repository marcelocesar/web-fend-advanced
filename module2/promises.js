/**
 * Promises
 */

/* 
 Uma promise em JavaScript é criada com a nova função construtora de Promise - new Promise(). Uma promise permitirá que você inicie algum trabalho que será realizado de forma assíncrona e libera você para executar outros trabalhos. Quando você cria uma promise, precisa entregar o código que será executado de forma assíncrona. Você entrega este código como parâmetro da função construtora
 */

new Promise(function() {
	window.setTimeout(function createSundae(flavor = 'chocolate') {
		const sundae = {};
		// request ice cream
		// get cone
		// warm up ice cream scoop
		// scoop generous portion into cone!
	}, Math.random() * 2000);
});


// resolve() => quando uma requisição é concluída com sucesso

new Promise(function (resolve, reject) {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
        resolve(sundae);
    }, Math.random() * 2000);
});

// reject() => quando uma requisição é concluída com erro

mySundae = new Promise(function (resolve, reject) {
    window.setTimeout(function createSundae(flavor = 'chocolate') {
        const sundae = {};
        // request ice cream
        // get cone
        // warm up ice cream scoop
        // scoop generous portion into cone!
        if ( false ) {
            reject(`Sorry, we're out of that flavor :-(`);
        }
        resolve(sundae);
    }, Math.random() * 2000);
});


// Promises retornam imediatamente

const myPromiseObj = new Promise(function (resolve, reject) {
    // sundae creation code
});


/* 
Esse objeto possui um método .then(), que pode ser utilizado para nos informar se a requisição realizada na promise foi concluída com sucesso ou falhou. O método .then() recebe duas funções:

- uma função para executar caso a requisição tenha sido concluída com sucesso
- uma função para executar caso a requisição tenha falhado
*/

mySundae.then(function(sundae) {
    console.log(`Time to eat my delicious ${sundae}`);
}, function(msg) {
    console.log(msg);
    self.goCry(); // not a real method
});

