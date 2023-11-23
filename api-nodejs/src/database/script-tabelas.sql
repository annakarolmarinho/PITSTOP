-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

create database PITSTOP;
use PITSTOP;


create table usuario (
	idUsuario int primary key auto_increment,
	email varchar(255) not null,
	senha varchar(20) not null,
	nomeCompleto varchar(255) not null
);

create table formulario_user (
    idFormulario_user int primary key auto_increment,
    nomeCompletoForm varchar(255) not null,
    genero varchar (45),
    dtaNascimento date,
    pilotoFavorito varchar (255),
    equipeQueTorce varchar (255),
    assistiuCorridaAoVivo boolean,
    fkUsuarioForm int,
    constraint fkUsuarioForm foreign key (fkUsuarioForm) references usuario (idUsuario)
);
	

create table quizPerguntas
  (
   idPergunta int primary key auto_increment,
   perguntas JSON NOT NULL
  );



create table quizResultado 
    (
	idResultado INT PRIMARY KEY AUTO_INCREMENT,
    resultado JSON NOT NULL,
    fkUsuario int,
	constraint fkUsuario foreign key (fkUsuario) references usuario (idUsuario),
	fkPergunta int,
	constraint fkPergunta foreign key (fkPergunta) references quizPerguntas (idPergunta)
    );




insert into usuario (email, senha, nomeCompleto) values 
	('annaksilva@sptech.com', 'senha123', 'Anna Karolyna Marinho da Silva');

insert into formulario_user (nomeCompletoForm, genero, dtaNascimento, pilotoFavorito, equipeQueTorce, assistiuCorridaAoVivo, fkUsuarioForm) values
    ('Anna Marinho', 'Feminino', '1995-09-10', 'Sebastian Vettel', 'Aston Martin', true, 1);


insert into  quizPerguntas (perguntas) values 
     (JSON_ARRAY('Quem detém o recorde de mais títulos mundiais na Fórmula 1?',
     'Qual equipe de Fórmula 1 é conhecida como "Scuderia"?',
	 'Em que ano a primeira corrida de Fórmula 1 aconteceu?',
     'Quantas vezes Ayrton Senna foi campeão mundial de Fórmula 1?',
     'Qual circuito é conhecido como "Templo da Velocidade"?',
     'Qual piloto é conhecido como "O Profeta"?',
     'Quantas equipes competem na Fórmula 1 atualmente?',
     'Qual é a pista mais longa do calendário da Fórmula 1?',
     'Quem é o piloto mais jovem a vencer uma corrida de Fórmula 1?',
	 'Quantos pontos são concedidos ao piloto que faz a volta mais rápida na corrida?'));

insert into quizResultado (resultado, fkUsuario, fkPergunta) values
    (JSON_ARRAY('Ayrton Senna','Mercedes', '1950', '3', 'Silverstone Circuit', 'Niki Lauda', '9', 'Yas Marina Circuit', 'Lewis Hamilton', '3 pontos'), 1, 1);



select * from usuario;
select * from formulario_user;
select * from quizPerguntas;
select * from quizResultado;



