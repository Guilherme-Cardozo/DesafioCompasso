var inputUsuario = $('.inputNomeUsuario');

$('#pesquisar-repositorios').on('click', function(e){
    
    e.preventDefault();
    
    $("#usuarioGithub").addClass("invisivel");
    $("#estrelasGit").addClass("invisivel");

    reiniciaPesquisaRepositorios();
    reiniciaPesquisaRepositoriosVisitados();
               
    $.ajax({

        url: "https://api.github.com/users/" + inputUsuario.val() + "/repos"

    }).done(function(data) {

        $("#repositoriosGit" ).hide().fadeIn(1000);
        $("#repositoriosGit" ).removeClass("invisivel");

        $.each(data, function (key, item) {


            var retorno = {
                
             id: item.id,
             nome: item.name

            }

            adicionaRepositorioNaTabela(retorno);
            function adicionaRepositorioNaTabela(repositorio) {
     
            var repositorioTr = montaTr(retorno);
        
            var tabela = document.querySelector("#tabela-repositoriosGithub");
            tabela.appendChild(repositorioTr);
            
            }    


            function montaTr(repositorio) {

                var repositorioTr = document.createElement("tr"); 
                repositorioTr.classList.add("repositorios");

                repositorioTr.appendChild(montaTd(retorno.id, "repositorio-id")); 
                repositorioTr.appendChild(montaTd(retorno.nome, "repositorio-nome")); 
                return repositorioTr;
            }

            function montaTd(dado, classe){ 
                
                var td = document.createElement("td");
                td.textContent = dado;
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

        bootbox.alert('Desculpe, mas não consegui encontrar o repositório ):');
                    
    });

});

function reiniciaPesquisaRepositorios() {

   $(".repositorio-id").remove(); 
   $(".repositorio-nome").remove();
}
