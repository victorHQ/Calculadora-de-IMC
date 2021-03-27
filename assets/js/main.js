//Captura evento de submit do formulário
const form = document.querySelector('#form'); 

form.addEventListener('submit', function (event) {
    event.preventDefault(); //Impede que o navegador recarregue a página

    const inputPeso = event.target.querySelector('#peso');
    const inputAltura = event.target.querySelector('#altura'); //Pegando os dados dos inputs

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value); //Convertendo para number para fazer verificação

    /* ===== Verificação =====*/
    if (!peso) {
        setResultado('Peso Inválido!', false);
        return;
    }

    if (!altura) {
        setResultado('Altura Inválida!', false);
        return;
    }

    //Calculo e nivel
    const imc = getImc(peso, altura);
    const levelImc = getLevelImc(imc);

    //Resultado
    const msg = `Seu IMC é ${imc} (${levelImc}).`;

    setResultado(msg, true);
});

function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function getLevelImc(imc) {
    const level = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
        'Obesidade Grau 1', 'Obesidade Grau 2', 'Obesidade Grau 3'
    ];

    if (imc >= 39.9) return level[5];
    if (imc >= 34.9) return level[4];
    if (imc >= 29.9) return level[3];
    if (imc >= 24.9) return level[2];
    if (imc >= 18.5) return level[1];
    if (imc < 18.5) return level[0];
}

//Cria um paragrafo para o resultado
function createP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = createP();

    //Verifica se P é valido e adiciona as classes
    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    //Atribui a msg no p e coloca na div resultado
    p.innerHTML = msg;
    resultado.appendChild(p);
}