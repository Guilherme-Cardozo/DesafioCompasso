var inputUsuario = $('.inputNomeUsuario');
var avatar = $(".estrela-avatar");

$('#pesquisar-repositoriosVisitados').on('click', function(e){

    $("#usuarioGithub").addClass("invisivel");
    $("#repositoriosGit").addClass("invisivel");
    
    e.preventDefault();

    reiniciaPesquisaRepositoriosVisitados();
    reiniciaPesquisaRepositorios();
               
    $.ajax({

        url: "https://api.github.com/users/" + inputUsuario.val() + "/starred"

    }).done(function(data) {

        $("#estrelasGit").hide().delay('1000').fadeIn(1000);
        $("#estrelasGit").removeClass("invisivel");

        $.each(data, function (key, item) {


            var retorno = {
                
             nome: item.owner.login,
             avatar: item.owner.avatar_url,
             usuario: item.name
            }

            adicionaRepositoriosVisitadosNaTabela(retorno);

            function adicionaRepositoriosVisitadosNaTabela(estrela) {
     
            var estrelaTr = montaTr(retorno);
        
            var tabela = document.querySelector("#tabela-estrelasGithub");
            tabela.appendChild(estrelaTr);
            
            }    

            function montaTr(estrela) {

                var estrelaTr = document.createElement("tr"); 
                estrelaTr.classList.add("estrelas");

                estrelaTr.appendChild(montaTd(retorno.nome, "estrela-repositorioVisitado"));
                estrelaTr.appendChild(montaTd('<img class="circle" src="'+ retorno.avatar +'">', "estrela-avatar")); 
                estrelaTr.appendChild(montaTd(retorno.usuario, "estrela-repositorioVisitado")); 
                 

                return estrelaTr;
            }

            function montaTd(dado, classe){ 
                
                var td = document.createElement("td");
                td.innerHTML = dado;
                td.classList.add(classe);

                return td;
            }

        });

       /*
        $('#form').each (function(){
            this.reset();
        });
        */

    }).fail(function() {

        bootbox.alert('Desculpe, mas não consegui encontrar nenhuma informação ):');
                    
    });
});

function reiniciaPesquisaRepositoriosVisitados() {


    $(".estrela-usuario").remove(); 
    $(".estrela-avatar").remove();
    $(".estrela-repositorioVisitado").remove(); 

}
