//Variaveis para guardar altura, largura, vidas e tempo
var altura, largura, vidas = 1, tempo = 15

//Pega tudo depois da interrogação que está no endereço da pagina
var nivel = window.location.search

var criaMosquitoTempo = 1500

//Retira o caracte e substitui. Então retira o '?' e substitui por ''
nivel = nivel.replace('?','')

if(nivel === 'normal'){
	//1,5 segundos
	criaMosquitoTempo = 1500
}else if(nivel == 'dificil'){
	//1 segundos
	criaMosquitoTempo = 1000
}else if(nivel === 'muitodificil'){
	//0,7 segundos
	criaMosquitoTempo = 750
}



//Determina a largura de altura da tela do jogo
function ajustaTamanhoPalcoJogo(){
	//Pega a altura da pagina
	altura = window.innerHeight

	//Pega a largura da pagina
	largura =window.innerWidth
	console.log(largura, altura)
}

//Pega tamanho da tela
ajustaTamanhoPalcoJogo()

//Classe que executa a cada um tempo uma função
// setInterval(<acao>,1000)
//tempo em milisegundos
var cronometro = setInterval(function(){

	tempo--
	if(tempo < 0){
		//Limpa o interval da memoria e então ela não é mais executada no tempo determinado
		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'
	}else{
		//innerHTML = é o valor que vai entre as tags HTML
		document.getElementById('cronometro').innerHTML = tempo
	}

},1000)

//Realiza a posição randomica da imagem mosquito
function posicaoRandomica(){
	//remove mosquito anterior se existir
	//se tiver um elemento retornado então é true e remove
	if(document.getElementById('mosquito')){

		document.getElementById('mosquito').remove()
		//Depois de remover então é perdido uma vida, então é modificado o caração cheio para vazio
		if(vidas>3){
			window.location.href = 'fim_de_jogo.html'
		}else{
			document.getElementById('v'+vidas).src = "imagens/coracao_vazio.png"
			vidas++
		}
	}
	

	//Pega aleatorio um valor da dimensão x e y
	//Math.random() = gera valores aleatorios entre 0 e 1 então é multiplicado pela largura e altupa paraformar valores aleatorios de dimenção
	//Math.floor = arredonda para baixo um numero assim tirando as casas decimais
	//Diminui 90px para que ele não fique pela metade na borda da terra
	//Math.abs() = retira o sinal do numero, se for negativo então fica positivo
	var posicaoX = Math.abs(Math.floor(Math.random() * largura) - 90)
	var posicaoY = Math.abs(Math.floor(Math.random() * altura) - 90 )

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	//document.createElement = cria elementos html
	var mosquito = document.createElement('img')

	//Acessa o atriburo src e faz receber a localização da imagem
	mosquito.src = 'imagens/mosquito.png'
	//Acessa o atriburo className e faz receber a classe mosquito e o lado dele (Junda duas classe para deixar mais dinamico o jogo)
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	//Adiciona uma posição x
	mosquito.style.left = posicaoX + 'px'
	//Adiciona uma posição y
	mosquito.style.top = posicaoY + 'px'
	//Deixa a posição absolupara para que fique em qualquer posição que quiser
	mosquito.style.position = 'absolute'
	//Adiciona um id para que fique um mosquito na tela
	mosquito.id = 'mosquito'
	//Adiciona um evento
	mosquito.onclick = function(){
		//remove ele mesmo
		//o this faz referencia a ele mesmo
		this.remove()
	}

	//document.body.appendChild = adicionando um filho para o body.
	document.body.appendChild(mosquito)

	//chama a função de muda o tamanho do mosquito
}

//função de muda o tamanho do mosquito
function tamanhoAleatorio(){
	//Math.random() = gera valores aleatorios entre 0 e 1 então é multiplicado pela largura e altupa paraformar valores aleatorios de dimenção
	//Math.floor = arredonda para baixo um numero assim tirando as casas decimais
	var classe = Math.floor(Math.random()*3)
	
	switch(classe){
		case 0:
			return 'mosquito1'
			
		case 1:
			return 'mosquito2'
			
		case 2:
			return 'mosquito3'
			
		default:
			console.log("Erro na classe tamanhoAleatorio()")
	}
}

function ladoAleatorio(){
	var classe = Math.floor(Math.random()*2)

	switch(classe){
		case 0:
			return 'ladoA'
			
		case 1:
			return 'ladoB'
			
		default:
			console.log("Erro na classe ladoAleatorio()")
	}
}