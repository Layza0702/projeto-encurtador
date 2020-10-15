var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bp = require('body-parser');

//obtém o objeto express e salva 
var app = express();

//registra a biblioteca 'cors' no express
app.use(cors());
app.use(bp.json());

//Cria o servidor e torna acessível na porta 3000
app.listen(3000, () => {
  console.log('Server OK');
});

//Obter o objeto de conexão a base de dados encurtador
var con =
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'encurtador'
  });

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('BD encurtador conectado!');
  }
});

// Obtém todos as urls cadastradas de um usuário, dado seu usuario_id
app.get('/url/:usuario_id/', (req, res) => {
  const usuario_id = req.params.usuario_id;
  const login = req.params.login;
  con.query('SELECT * FROM url WHERE usuario_id = ?',
    [usuario_id], (erro, resultado) => {
      if (erro) { console.log(erro); }
      return res.send(resultado);
    });
});

//Vê se o usuário está cadastrado, dado seu login e senha
app.post('/login',
  (req, res) => {
    var u = req.body;
    con.query('SELECT * FROM usuario WHERE login = ? and senha = ?',
      [u.login, u.senha],
      (erro, resultado) => {
        if (erro) {
          console.log(erro);
          res.status(500);
          return res.send({msg: 'Erro inesperado no Backend'});
        }
        console.log('resultado', resultado)

        if (resultado.length === 0) {
          res.status(404);
          return res.send({msg: 'Usuário não encontrado... Tente novamente.'});
        }
        return res.send(resultado[0]);
      });
  });

// Cadastra uma URL válida, dado o id do usuário
app.post('/url',
  (req, res) => {

    var ur = req.body;
    console.error("Teste cadastrar url", ur);
    var q1 = 'SELECT * FROM url WHERE usuario_id = ?';
    con.query(q1,
      ur.usuario_id,
      (erro, resultado) => {
        if (erro) { console.log(erro); }
         else {
          var insert =
            'INSERT INTO url (usuario_id, url_original, url_encurtada, url_data) ' +
            'VALUES (?, ?, ?, ?)';

          con.query(insert,
            [ur.usuario_id, ur.url_original, ur.url_encurtada, ur.url_data],
            (erro, resultado) => {
              if (erro) { console.log(erro); }
              res.send({
                res: true,
                msg: 'Url cadastrada!',
              });
            });
            console.log('cadastrada url');
        }
      });
  });


// Detela uma URL, dada a URL_encurtada