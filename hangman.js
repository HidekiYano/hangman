const botaoSelecionar = $('#botao-selecionar')

function sortearPalavra(lista) {
    return lista[Math.floor(Math.random() * lista.length)]
}

function limitarEntradaDeLetras(entrada, valor, comprimentoMax) {
    if(valor != undefined && valor.toString().length >= comprimentoMax) {
        entrada.preventDefault();
    }
}

function novoJogo(lista) {
    var numeroDeTentativas = 6
    var historico = ''

    var palavraSorteada = sortearPalavra(lista)
    var palavraSeparada = palavraSorteada.split('')
    
    var spanLetrasEscondidas = []
    var spanLetras = []

    for(let m = 0; m < palavraSeparada.length; m++) {
        if(palavraSeparada[m] == ' ') {
            spanLetrasEscondidas[m] = `<span id="span-${m}">-</span>`
        } else {
            spanLetrasEscondidas[m] = `<span id="span-${m}">_</span>`
        }
    }

    for(let n = 0; n < palavraSeparada.length; n++) {
        spanLetras[n] = palavraSeparada[n]
    }
    
    $('#jogo-da-forca').html(spanLetrasEscondidas)

    var entradaDeLetras = $('<input type="text" id="entrada-de-letras">')
    var labelEntradaDeLetras = $('<p>')
    var botaoEntradaDeLetras = $('<button id="botao-ok">OK</button>')
    var botaoNovaPalavra = $('<button id="nova-palavra">Nova palavra</button>')
    var labelTentativas = $(`<p id="label-tentativas-anteriores">Tentativas: ${historico}</p>`)
    var labelNumeroDeTentativas = (numeroDeTentativas == 1) ? $(`<p id="label-tentativas">Tentativa restante: ${numeroDeTentativas}</p>`) : $(`<p id="label-tentativas">Tentativas restantes: ${numeroDeTentativas}</p>`)
    
    $('#entrada').append(labelEntradaDeLetras).html('Digite uma letra: ')
    $('#entrada').append(entradaDeLetras)
    $('#entrada').append(botaoEntradaDeLetras)
    $('#entrada').append(botaoNovaPalavra)
    $('#entrada').append(labelTentativas)
    $('#entrada').append(labelNumeroDeTentativas)
    
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
        if('0123456789!@#$%¨&*()_+-=|,.;<>:/?'.includes($('#entrada-de-letras').val())) {
            alert('Entre com uma letra.')
        } else {
            var cont = 0
            
            for(let span = 0; span < spanLetras.length; span++) {
                if($(`#span-${span}`).text() != '_') {
                    cont += 1
                }
            }

            if(cont == spanLetras.length - 1) {
                alert('Parabéns, você acertou a palavra!')
                $('#entrada-de-letras').attr('disabled', true)
                $('#botao-ok').attr('disabled', true)
            }

            if(numeroDeTentativas == 0) {
                var palavraCorreta = ''

                for(let letra = 0; letra < spanLetras.length; letra++) {
                    palavraCorreta += spanLetras[letra]
                }

                alert("Suas tentativas acabaram. A palavra correta era: " + palavraCorreta)

                $('#entrada-de-letras').attr('disabled', true)
                $('#botao-ok').attr('disabled', true)
            } else {
                if($('#entrada-de-letras').val().length == 0) {
                    alert("Digite uma letra.")
                } else {
                    var acerto = false

                    for(let a = 0; a < spanLetras.length; a++) {
                        if($('#entrada-de-letras').val().toLowerCase().includes(spanLetras[a])) {
                            spanLetrasEscondidas[a] = `<span id="span-${a}">${spanLetras[a]} </span>`
                            $('#jogo-da-forca').html(spanLetrasEscondidas)
                            acerto = true
                        } 
                        
                        if(a == (spanLetras.length - 1) && acerto == false) {
                            numeroDeTentativas -= 1
                            $('#label-tentativas').html(numeroDeTentativas <= 1 ? `Tentativa restante: ${numeroDeTentativas}` : `Tentativas restantes: ${numeroDeTentativas}`)
                            if(numeroDeTentativas == 0) {
                                var palavraCorreta = ''

                                for(let letra = 0; letra < spanLetras.length; letra++) {
                                    palavraCorreta += spanLetras[letra]
                                }

                                alert("Suas tentativas acabaram. A palavra correta era: " + palavraCorreta)

                                $('#entrada-de-letras').attr('disabled', true)
                            }
                        }
                    }
                    
                    if(historico == '') {
                        historico += $('#entrada-de-letras').val().toUpperCase()
                    } else {
                        historico += ' - ' + $('#entrada-de-letras').val().toUpperCase()
                    }

                    $('#label-tentativas-anteriores').html(`Tentativas: ${historico}`)

                    $('#entrada-de-letras').val('')
                }
            }

        }
    })

    botaoNovaPalavra.bind('click', function() {
        novoJogo(lista)
    })
}

botaoSelecionar.bind('click', function() {
    if($('#tema-jogo').val() == 'animais') {
        fetch('./word_bank/animais.txt').then(response => response.text()).then(animal => {
            var lista = animal.split('\r\n')

            novoJogo(lista)
        })
    } else if($('#tema-jogo').val() == 'objetos') {
        fetch('./word_bank/objetos.txt').then(response => response.text()).then(objeto => {
            let lista = objeto.split('\r\n')

            novoJogo(lista)
        })
    } else if($('#tema-jogo').val() == 'cidades') {
        fetch('./word_bank/cidades.txt').then(response => response.text()).then(cidade => {
            let lista = cidade.split('\r\n')
            
            novoJogo(lista)
        })
    } else {
       alert('Selecione um tema para continuar.') 
    }
})




