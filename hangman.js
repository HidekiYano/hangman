const botaoSelecionar = $('#botao-selecionar')

function sortearPalavra(lista) {
    return lista[Math.floor(Math.random() * lista.length)]
}

function limitarEntradaDeLetras(entrada, valor, comprimentoMax) {
    if (valor != undefined && valor.toString().length >= comprimentoMax) {
        entrada.preventDefault();
    }
}

botaoSelecionar.bind('click', function() {
    if($('#tema-jogo').val() == 'animais') {
        fetch('./word_bank/animais.txt').then(response => response.text()).then(animal => {
            var lista = animal.split('\r\n')

            var palavraSorteada = sortearPalavra(lista)

            var palavraSeparada = palavraSorteada.split('')
            
            var spanLetrasEscondidas = []
            var spanLetras = []

            for(let m = 0; m < palavraSeparada.length; m++) {
                spanLetrasEscondidas[m] = `<span>_ </span>`
            }

            for(let n = 0; n < palavraSeparada.length; n++) {
                spanLetras[n] = palavraSeparada[n]
            }

            $('#jogo-da-forca').append(spanLetrasEscondidas)
            
            var entradaDeLetras = $('<input type="text" id="entrada-de-letras">')
            var labelEntradaDeLetras = $('<p>')
            var botaoEntradaDeLetras = $('<button>OK</button>')
            
            $('#entrada').append(labelEntradaDeLetras).html('Digite uma letra: ')
            $('#entrada').append(entradaDeLetras)
            $('#entrada').append(botaoEntradaDeLetras)

            $('#entrada-de-letras').keydown(function(e) {
                if($('#entrada-de-letras').val().length >= 1) { 
                    $('#entrada-de-letras').val($('#entrada-de-letras').val().substr(0, 1));
                }
            });
                
            $('#entrada-de-letras').keyup(function(e) {
                if($('#entrada-de-letras').val().length >= 1) { 
                    $('#entrada-de-letras').val($('#entrada-de-letras').val().substr(0, 1));
                }
            });

            botaoEntradaDeLetras.bind('click', function() {
                for(let a = 0; a < spanLetras.length; a++) {
                    if($('#entrada-de-letras').val().toLowerCase().includes(spanLetras[a])) {
                        spanLetrasEscondidas[a] = `<span>${spanLetras[a]} </span>`
                        $('#jogo-da-forca').html(spanLetrasEscondidas)
                    }
                }

                $('#entrada-de-letras').val('')
            })
        })
    } else if($('#tema-jogo').val() == 'objetos') {
        fetch('./word_bank/objetos.txt').then(response => response.text()).then(objeto => {
            let lista = objeto.split('\r\n')

            sortearPalavra(lista)
        })
    } else if($('#tema-jogo').val() == 'cidades') {
        fetch('./word_bank/cidades.txt').then(response => response.text()).then(cidade => {
            let lista = cidade.split('\r\n')
            
            sortearPalavra(lista)
        })
    } else {
       alert('Selecione um tema para continuar.') 
    }
})




