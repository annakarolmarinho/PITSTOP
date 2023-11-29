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

create table quizPerguntas (
	idPergunta int primary key auto_increment,
	primeiraPergunta varchar(255),
	segundaPergunta varchar(255),
	terceiraPergunta varchar(255),
	quartaPergunta varchar(255),
	quintaPergunta varchar(255),
    sextaPergunta varchar(255),
    sétimaPergunta varchar(255),
    oitavaPergunta varchar(255),
    nonaPergunta varchar(255),
    décimaPergunta varchar(255)
);	

create table quizResultado (
	idResultado int primary key auto_increment,
	primeiraResposta varchar(255),
	segundaResposta varchar(255),
	terceiraResposta varchar(255),
	quartaRespota varchar(255),
    quintaResposta varchar(255),
    sextaResposta varchar(255),
    sétimaResposta varchar(255),
    oitavaResposta varchar(255),
    nonaResposta varchar(255),
    décimaResposta varchar(255),
	fkUsuario int,
	constraint fkUsuario foreign key (fkUsuario) references usuario (idUsuario),
	fkPergunta int,
	constraint fkPergunta foreign key (fkPergunta) references quizPerguntas (idPergunta)
);




insert into usuario (email, senha, nomeCompleto) values 
	('annaksilva@sptech.com', 'senha123', 'Anna Karolyna Marinho da Silva');

insert into formulario_user (nomeCompletoForm, genero, dtaNascimento, pilotoFavorito, equipeQueTorce, assistiuCorridaAoVivo, fkUsuarioForm) values
    ('Anna Marinho', 'Feminino', '1995-09-10', 'Sebastian Vettel', 'Aston Martin', true, 1);


insert into  quizPerguntas (primeiraPergunta, segundaPergunta, terceiraPergunta, quartaPergunta, quintaPergunta, sextaPergunta, sétimaPergunta, oitavaPergunta, nonaPergunta, décimaPergunta) values 
     ('Quem detém o recorde de mais títulos mundiais na Fórmula 1?',
     'Qual equipe de Fórmula 1 é conhecida como "Scuderia"?',
	 'Em que ano a primeira corrida de Fórmula 1 aconteceu?',
     'Quantas vezes Ayrton Senna foi campeão mundial de Fórmula 1?',
     'Qual circuito é conhecido como "Templo da Velocidade"?',
     'Qual piloto é conhecido como "O Profeta"?',
     'Quantas equipes competem na Fórmula 1 atualmente?',
     'Qual é a pista mais longa do calendário da Fórmula 1?',
     'Quem é o piloto mais jovem a vencer uma corrida de Fórmula 1?',
	 'Quantos pontos são concedidos ao piloto que faz a volta mais rápida na corrida?');

insert into quizResultado (primeiraResposta, segundaResposta, terceiraResposta, quartaRespota, quintaResposta, sextaResposta, sétimaResposta, oitavaResposta, nonaResposta, décimaResposta, fkUsuario, fkPergunta ) values
    ('Ayrton Senna','Mercedes', '1950', '3', 'Silverstone Circuit', 'Niki Lauda', '9', 'Yas Marina Circuit', 'Lewis Hamilton', '3 pontos', 1, 1);



select * from usuario;
select * from formulario_user;
select * from quizPerguntas;
select * from quizResultado;

    -- piloto favorito --
SELECT fu.pilotoFavorito as 'pilotoFavorito', COUNT(*) as total
        FROM PITSTOP.formulario_user fu 
        GROUP by fu.pilotoFavorito;
        
        
    -- genero --    
         SELECT genero, COUNT(*) as 'generoMaisEnviado'
    FROM formulario_user
    JOIN usuario ON idUsuario = fkUsuariof
    GROUP BY genero
    ORDER BY COUNT(*) DESC
    LIMIT 1;
    
    
    -- respostas --
     SELECT
            qr.idResultado,
            qr.resultado,
            qr.fkUsuario,
            u.nomeCompleto
        FROM PITSTOP.quizResultado qr 
        INNER JOIN usuario u
        ON qr.fkUsuario = u.idUsuario;