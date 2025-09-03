var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require( 'method-override');
var conexao = require ("./conexaoBanco");



var app = express();



 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
 
 
//Conexão ao banco de dados uma vez no início

conexao.connect(function(error){

if (error){

    console.error("Erro ao conectar ao banco de dados:", error);

    process.exit(); //encerrar o servidor caso a conexão falhe

}

});
 
 
app.get('/', function(req, res){

  res.sendFile(__dirname+'/cadastro.html');

});
 
app.post('/', function(req, res){

   var nomecompleto = req.body.nomecompleto;

   var email = req.body.email;

   var senha = req.body.senha;
 
    //prevenindo SQL Injection

    var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";

    conexao.query(sql, [nomecompleto, email, senha], function(error, result){

        if(error) throw error;
 
      //  res.send("Estudante cadastro com sucesso! " + result.insertId);
 
      res.redirect('/estudantes');

    });
 
 
    });
 
 
//Leitura do banco de dados

app.get('/estudantes', function(req, res){
 
    var sql = "select * from estudante";

    conexao.query(sql, function(error, result){

        if(error) console.log(error);

       // console.log(result);

       res.render('estudantes', {estudante:result});

        });

    });
 
 
//Rota de Delete

app.delete('/delete-estudante', function(req, res){
const id = req.body.id;

conexao.query('DELETE FROM estudante WHERE id = ?', [id], (err) => {
if(err) {
  console.error(err);
  return res.status(500).send('erro ao deletar estudante');
}
res.redirect('/estudantes');
});
});
 
//Rota update

app.get('/update-estudante', function(req, res){
 const id = req.query.id;


 conexao.query('SELECT * FROM estudante WHERE id = ?', [id], (err, result) => {
  if (err) return res.status(500).send('erro ao buscar estudante');
  res.render('alterarestudantes', { estudante: result[0] });
 });
  

});
 
app.put('/update-estudante', function(req, res){
  const {id, nomecompleto, email, senha} = req.body;

  conexao.query('UPDATE estudante SET nomecompleto=?, email=?, senha=? WHERE id=?',
    [nomecompleto,email,senha,id], (err) => {
     if (err) return res.status(500).send('erro ao atulizar estudante');
     res.redirect('/estudantes');
    }
  );

});
 
app.listen(7000);
 
/*
 
 
//console.log("O banco de dados foi conectado!");
 
conexao.query("select * from estudante", function(error, result){

if(error) throw error;

//console.log(result);

console.log(result[0]);

console.log(result[0].nomecompleto);

});
 
 
*/
 