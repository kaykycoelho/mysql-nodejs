--criar banco de dados

CREATE DATABASE escola;

-- criar tabela com colunas

CREATE TABLE estudante  (
id INT(10) AUTO_INCREMENT PRIMARY KEY,
nomecompleto VARCHAR(60) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
senha VARCHAR(50) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- inserir dados no banco de dados via código SQL(CREATE)
INSERT INTO estudante (nomecompleto, email, senha)
VALUES ("ana claudia  cunha", "ana.cscunha1@senacsp.edu.br", "123"),
("luis santana", "luis@gmail.com", "456"),
("ruan miranda", "ruanmiranda@gmail.com", "789");


-- selecionando todos os dados da tabela estudande (READ)
SELECT * FROM estudante;

-- selecionando uma coluna na tabela estudante
SELECT email FROM estudante;

-- selecionando mais de uma coluna na tabela estudande 
SELECT nomecompleto, email FROM estudante;