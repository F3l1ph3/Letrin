/* Variaveis Globais */
let tela1             = document.querySelector(".tela1");
let tela2             = document.querySelector(".tela2");
let tela3             = document.querySelector(".tela3");
let tela4             = document.querySelector(".tela4");
let btoIniciar        = document.querySelector("#btoIniciar");
let btoAdicionar      = document.querySelector("#btoAdicionar");
let btoMenu           = document.querySelector(".menu");
let btoNovaPalavra    = document.querySelector(".novaPalavra"); 
let vitoria           = document.querySelector(".telaVitoria");
let derrota           = document.querySelector(".telaDerrota");
let btoRemover        = document.querySelector("#btoRemover");
let inputArea         = document.querySelector("#adiciona");
let showArea          = document.querySelector("#exibe");
let erro1             = document.querySelector(".erro1");
let erro2             = document.querySelector(".erro2");
let btoFechar         = document.querySelector(".btoFecharTela2 i");
let btoFecharAvisos   = document.querySelector(".btnCloseAvisos i");
let key               = document.querySelectorAll(".teclado .fileira button");
let bgIcons           = document.querySelectorAll(".icons-bg .row div");
let barraDeVidas      = document.querySelectorAll(".life-bar i");
let canvas            = document.getElementById("canvas");
let ctx               = canvas.getContext("2d");
let standarWordsArray = ["CORAÇAO", "AMEIXA", "MOTOCICLETA", "MEDALHISTA",
                         "VIOLONCELO", "MARSUPIAL", "CONGLOMERADO", "ESTAÇAO", 
                         "OUTONO", "TRANSLAÇAO", "JUPITER", "GALAXIA",
                         "MELANCIA", "ORNITORRINCO", "ESQUELETO", "CATACUMBA",
                         "ARQUIPELAGO", "TAMANDUA", "ESTROGONOFE", "CONTEMPLAR"];
let wordsArray        = [];
let wordsNoRepeat     = [];
let wordEmpty         = [];
let randomWord        = [];
let letrasDigitadas   = [];
let temLetra          = false;
let temLetraDigitada  = false;
let contaVidas        = 7;
let contaPontos       = 0;
let letraDigitada;


//BTO Iniciar
btoIniciar.addEventListener("click", () => {

    //Manipulação de telas
    tela1.style.display = 'none';
    tela2.style.display = 'block';
    tela3.style.display = 'none';
    
    wordsNoRepeat       = [];
    
    //Seleciona uma palavra
    if(wordsArray[0] == null){
        randomWord = standarWordsArray[parseInt(Math.random()*20)];
        for(let i = 0; i < standarWordsArray.length; i++){
            wordsNoRepeat[i] = standarWordsArray[i];
        }

    }else{

        randomWord = wordsArray[parseInt(Math.random()*wordsArray.length)];
        for(let i = 0; i < wordsArray.length; i++){
            wordsNoRepeat[i] = wordsArray[i];
        }
    }
    for(let c = 0; c < randomWord.length; c++){
        wordEmpty[c] = "_";
    }

    wordEmpty = wordEmpty.join(" ");

    //Desenha palavra no canvas
    ctx.clearRect(0, 0, 500, 150);
    ctx.font = "40px Righteous";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(wordEmpty, 250, 85);

});

//BTO Adicionar
btoAdicionar.addEventListener("click", () => {

    let temPalavra   = false;
    let temCaractere = false;
    let conferePalavra;

    conferePalavra = inputArea.value.toUpperCase();

    //Caixa vazia ou mais de 12 letras
    if(conferePalavra == "" || conferePalavra.length > 12 || conferePalavra.length < 3){
        temCaractere = true;

    }else{
        //Caracteres especiais
        for(let i = 0; i < conferePalavra.length; i++){
            if((conferePalavra[i].charCodeAt() > 90 || conferePalavra[i].charCodeAt() < 65) && conferePalavra[i] != "Ç"){
                temCaractere = true;
                break;
            }
        }
    }

    //Primeira palavra
    if(temCaractere == false){
        if(wordsArray.length == 0){
            wordsArray.push(inputArea.value.toUpperCase().replace(/\n/g, "").replace(/ /g, ""));
            showArea.value  = wordsArray;
            
        }else{
            //Verifica se a palavra ja existe no vetor de palavras
            for(let c = 0, tam = wordsArray.length; c < tam; c++){
                if(inputArea.value.toUpperCase() == wordsArray[c]){
                    //Tela de aviso - erro 2
                    tela4.style.display = "block";
                    erro2.style.display = "block";
                    temPalavra = true;
                    break;
                }      
            }
    
            //Adiciona a palavra caso nao exista no vetor de palavras
            if(temPalavra == false){
                wordsArray.push(inputArea.value.toUpperCase().replace(/\n/g, "").replace(/ /g, ""));
                showArea.value = wordsArray;
            }
        }
    }else{
        tela4.style.display = "block";
        erro1.style.display = "block";
    }
    
    //reseta e seleciona o campo de input
    inputArea.value = "";
    inputArea.select();

});

//BTO Remover
btoRemover.addEventListener("click", () => {

    //Remove a ultima palavra dos vetores
    wordsArray.pop();
    wordsNoRepeat.pop();
    showArea.value = wordsArray;

});

//BTO Fechar tela 2
btoFechar.addEventListener("click", ()=>{
    //Manipulação de telas
    tela1.style.display = 'block';
    tela2.style.display = 'none';

             /*Reset*/
    wordEmpty         = [];
    randomWord        = [];
    letrasDigitadas   = [];
    temLetra          = false;
    temLetraDigitada  = false;
    contaVidas        = 7;
    contaPontos       = 0;
    inputArea.value   = "";

    //Botoes do teclado
    for(let c = 0; c < key.length; c++){
        key[c].setAttribute('class', 'fileira');
    }
    //Barra de vida
    for(let i = 0; i < 7; i++){
        barraDeVidas[i].style.display = 'block';
    }

    //Vetores de palavras
    if(wordsArray[0] != null){
        for(let i = 0; i < wordsArray.length; i++){
            wordsNoRepeat[i] = wordsArray[i];
        }
    }else{
        for(let i = 0; i < standarWordsArray.length; i++){
            wordsNoRepeat[i] = standarWordsArray[i];
        }
    }
});

//BTO Fechar tela 4
btoFecharAvisos.addEventListener("click", () =>{
    tela4.style.display = "none";
    erro1.style.display = "none";
    erro2.style.display = "none";
});


//Teclado
for(let c = 0; c < 26; c++){
    key[c].addEventListener("click", () =>{
        //Letra do teclado
        letraDigitada = key[c].textContent;

        //verifica se a letra ja foi digitada
        for(let l = 0; l < letrasDigitadas.length; l++){
            if(letraDigitada == letrasDigitadas[l])
                temLetraDigitada = true;
        }

        if(temLetraDigitada == false){
            //Preset
            wordEmpty     = wordEmpty.replace(/ /g, "");
            wordEmpty     = Array.from(wordEmpty);
            letrasDigitadas.push(letraDigitada);
            
            //Verificando letra na palavra
            for(let i = 0; i <randomWord.length; i++){  
                if(letraDigitada == randomWord[i] ){
                    wordEmpty[i] = letraDigitada;
                    temLetra = true;
                    contaPontos++;
                //Caso do "Ç"
                }else if(letraDigitada == "C" && randomWord[i] == "Ç"){
                    wordEmpty[i] = "Ç";
                    temLetra = true;
                    contaPontos++;
                }
            }
            //Diminui o contador de vidas
            if(!temLetra){
                contaVidas--;

                //Muda cor do teclado - errado
                key[c].setAttribute('class', 'errado');

                //Anima fundo quando erra
                for(let a = 0; a < bgIcons.length; a++){
                    //Delay na animação - efeito cascata
                    setTimeout(()=>{
                        if(bgIcons[a].classList.contains('anima-errado2')){
                            bgIcons[a].setAttribute('class', 'anima-errado');
                        }else{
                            bgIcons[a].setAttribute('class', 'anima-errado2');
                        }
                    }, a*100);    
                }
            }else{
                //Muda cor do teclado - certo
                key[c].setAttribute('class', 'certo');

                //Anima fundo quando acerta
                for(let a = 0; a < bgIcons.length; a++){
                    //Delay na animação - efeito cascata
                    setTimeout(()=>{
                        if(bgIcons[a].classList.contains('anima-certo2')){
                            bgIcons[a].setAttribute('class', 'anima-certo');
                        }else{
                            bgIcons[a].setAttribute('class', 'anima-certo2');
                        }
                    }, a*100);
                }
            }
            
            //Reset
            temLetra = false;
            wordEmpty = wordEmpty.join(" ");

            //Canvas
            //Atualiza palavra na tela
            ctx.clearRect(0, 0, 500, 150);
            ctx.font = "40px Righteous";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(wordEmpty, 250, 85);

            //Tela de derrota
            if(contaVidas <= 0){
                tela3.style.display = 'block';
                derrota.style.display = 'block';
                vitoria.style.display = 'none';
                contaVidas = 0;
            }
            
            //Tela de vitória
            if(contaPontos == randomWord.length && contaVidas > 0){
                setTimeout(() =>{
                        
                    tela3.style.display = 'block';
                    vitoria.style.display = 'block';
                    derrota.style.display = 'none';
                    
                    //Remover palavra quando acerta
                    for(let i = 0; i < wordsNoRepeat.length; i++){
                        if(randomWord == wordsNoRepeat[i]){
                            wordsNoRepeat.splice(i,1);
                        }
                    }

                    //Zera barra de vida - ajustar animação
                    contaVidas = 0;
                    for(let i = contaVidas; i < 7; i++){
                        barraDeVidas[i].style.display = 'none';
                    }

                }, 300);
            }
    
            //Ajusta visualmente a barra de vidas
            for(let i = contaVidas; i < 7; i++){
                barraDeVidas[i].style.display = 'none';
            }
        }
        //Reset
        temLetraDigitada = false;
        
    }); 
}

//BTO Menu
btoMenu.addEventListener("click", ()=>{

    //Manipulação de telas
    tela1.style.display = 'block';
    tela2.style.display = 'none';
    tela3.style.display = 'none';

            /*Reset*/
    wordEmpty         = [];
    randomWord        = [];
    letrasDigitadas   = [];
    temLetra          = false;
    temLetraDigitada  = false;
    contaVidas        = 7;
    contaPontos       = 0;

    // Botões do teclado 
    for(let c = 0; c < key.length; c++){
        key[c].setAttribute('class', 'fileira');
    }

    // Barra de vida 
    for(let i = 0; i < 7; i++){
        barraDeVidas[i].style.display = 'block';
    }

    // Vetores com as palavras
    if(wordsArray[0] != null){
        for(let i = 0; i < wordsArray.length; i++){
            wordsNoRepeat[i] = wordsArray[i];
        }
    }else{
        for(let i = 0; i < standarWordsArray.length; i++){
            wordsNoRepeat[i] = standarWordsArray[i];
        }
    }

});

//BTO Nova Palavra
btoNovaPalavra.addEventListener("click", () =>{

    //Manipulação de telas
    tela3.style.display = 'none';
    
            /* Reset */
    randomWord        = "";
    wordEmpty         = [];
    letrasDigitadas   = [];
    temLetra          = false;
    temLetraDigitada  = false;
    contaVidas        = 7;
    contaPontos       = 0;

    //Reseta vetor de palavras no fim da sequencia
    if(wordsNoRepeat[0] == null){
        if(wordsArray[0] != null){
            for(let i = 0; i < wordsArray.length; i++){
                wordsNoRepeat[i] = wordsArray[i];
            }
        }else{
            for(let i = 0; i < standarWordsArray.length; i++){
                wordsNoRepeat[i] = standarWordsArray[i];
            }
        }
    }

    //Nova palavra
    if(wordsArray[0] == null){
        randomWord = wordsNoRepeat[parseInt(Math.random()*20)];
    }else{
        randomWord = wordsNoRepeat[parseInt(Math.random()*wordsNoRepeat.length)];
    }
    for(let c = 0; c < randomWord.length; c++){
        wordEmpty[c] = "_";
    }
    wordEmpty = wordEmpty.join(" ");
    
    //Reset teclado
    for(let c = 0; c < key.length; c++){
        key[c].setAttribute('class', 'fileira');
    }
    for(let i = 0; i < 7; i++){
        barraDeVidas[i].style.display = 'block';
    }

    //Canvas
    //Desenha palavra
    ctx.clearRect(0, 0, 500, 150);
    ctx.font = "40px Righteous";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(wordEmpty, 250, 85);

});