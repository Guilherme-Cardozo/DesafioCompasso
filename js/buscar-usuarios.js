var inputUsuario = $('.inputNomeUsuario');
var nomeUsuario = $("#nomeUsuario");
var avatar = $("#img-avatar");
var followers = $("#followers-user");

$('#pesquisar-usuario').on('click', function(e){
    
    e.preventDefault();

    $("#repositoriosGit").addClass("invisivel");
    $("#estrelasGit").addClass("invisivel");

    reiniciaPesquisaRepositoriosVisitados();
    reiniciaPesquisaRepositorios();
    
               
    $.ajax({

        url: "https://api.github.com/users/" + inputUsuario.val()

    }).done(function(data) {

        $("#usuarioGithub" ).hide().delay('1000').fadeIn(1000);
        $("#usuarioGithub" ).removeClass("invisivel");

        /*
        $('#form').each (function(){
            this.reset();
        });
        */
        nomeUsuario.html(data.login);
        avatar.html('<img class="circle" src="'+ data.avatar_url +'">');
        followers.html(data.followers);
                    

    }).fail(function() {

        bootbox.alert('Desculpe, mas não consegui encontrar o usuário ):');
                    
    });

});



