var conexao = require ("./conexaoBanco");
var express= require('express');
var app = express();

var bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

//conexao ao banco de dados uma vez ao inicio
    conexao.connect(function(error){
     if(error){
        console.error("erro ao conectar ao banco de dados:", error);
        process.exit(); //encerrar o servidor caso a conexao falhe
     }
    });
 
app.get('/',function(req , res){
    res.sendFile(__dirname+ '/cadastro.html');
});

app.post('/', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
    
     //prevenindo SQL injection
     var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
     conexao.query(sql, [nomecompleto, email, senha], function(error, result){
        if(error) throw error;
       // res.send("estudante cadastro com sucesso!" + result.insertId);
     
       res.redirect('/estudantes');
     });
    
});


// leitura do banco de dados
app.get('/estudantes', function(req, res){
   
        var sql = "select * from estudante";
        conexao.query(sql, function(error, result){
            if(error) console.log(error);
         //   console.log(result);
         res.render(__dirname+"/estudantes", {estudante:result});
        });

    });


app.listen(7000);



// // console.log("banco de dados foi conectado!")

//     conexao.query("select * from estudante", function(error,result){
//         if(error) throw error;
//         //console.log(result);
//         console.log(result[0]);
//         console.log(result [0].nomecompleto);

//     });
// });

