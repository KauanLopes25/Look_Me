 CREATE DATABASE db_lookme;

USE db_lookme;

-- TABELAS SEM CHAVES ESTRANGEIRAS

CREATE TABLE tbl_porte (
    porte_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_porte VARCHAR(10) NOT NULL
);

CREATE TABLE tbl_raca (
    raca_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_raca VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_especie (
    especie_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_especie VARCHAR(10) NOT NULL
);

CREATE TABLE tbl_idade (
    idade_id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE tbl_sexo (
    sexo_id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(10) NOT NULL
);

CREATE TABLE tbl_usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
	foto_url VARCHAR(200),
	status_cadastro BOOLEAN NOT NULL,
    senha VARCHAR(200) NOT NULL
);

CREATE TABLE tbl_animal (
    animal_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    temperamento VARCHAR(500),
    informacoes_veterinarias VARCHAR(800),
    descricao VARCHAR(1000),
    adaptabilidade VARCHAR(500),
    foto_url VARCHAR(200) NOT NULL,
    status_adocao BOOLEAN NOT NULL,
    status_castracao BOOLEAN NOT NULL,
    status_cadastro BOOLEAN NOT NULL,
    porte_id INT NOT NULL,
    raca_id INT NOT NULL,
    especie_id INT NOT NULL,
    idade_id INT NOT NULL,
    sexo_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (porte_id) REFERENCES tbl_porte(porte_id),
    FOREIGN KEY (raca_id) REFERENCES tbl_raca(raca_id),
    FOREIGN KEY (especie_id) REFERENCES tbl_especie(especie_id),
    FOREIGN KEY (idade_id) REFERENCES tbl_idade(idade_id),
    FOREIGN KEY (sexo_id) REFERENCES tbl_sexo(sexo_id),
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(usuario_id) ON DELETE CASCADE
);

-- TABELAS COM FKs QUE DEPENDEM DE tbl_usuario E tbl_animal

CREATE TABLE tbl_endereco_usuario (
    endereco_usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(usuario_id) ON DELETE CASCADE
);

CREATE TABLE tbl_endereco_animal (
    endereco_animal_id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    uf VARCHAR(2),
    cep VARCHAR(9) NOT NULL,
    animal_id INT NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES tbl_animal(animal_id) ON DELETE CASCADE
);

ALTER TABLE tbl_endereco_usuario
ADD COLUMN regiao VARCHAR(20) NOT NULL;

ALTER TABLE tbl_endereco_animal
ADD COLUMN regiao VARCHAR(20) NOT NULL;


-- TABELAS RELACIONADAS A ADOÇÃO / FAVORITOS

CREATE TABLE tbl_pedido_adocao (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    status_pedido VARCHAR(20) NOT NULL,
    data_solicitacao DATE NOT NULL,
    usuario_id INT NOT NULL,
    animal_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES tbl_animal(animal_id) ON DELETE CASCADE
);

CREATE TABLE tbl_favoritos (
    favorito_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    animal_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES tbl_animal(animal_id) ON DELETE CASCADE
);

CREATE TABLE tbl_historico_adocao (
    historico_adocao_id INT AUTO_INCREMENT PRIMARY KEY,
    data_adocao DATE NOT NULL,
    usuario_id INT NOT NULL,
    animal_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES tbl_animal(animal_id) ON DELETE CASCADE
);

--  TABELA DE NOTIFICAÇÕES

CREATE TABLE tbl_notificacao (
    notificacao_id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem VARCHAR(500) NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    data_notificacao DATE NOT NULL,
    usuario_id INT NOT NULL,
    pedido_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (pedido_id) REFERENCES tbl_pedido_adocao(pedido_id) ON DELETE CASCADE
);

-- INSERTS TBL_PORTE

INSERT INTO tbl_porte (nome_porte) VALUES
('Pequeno'),
('Médio'),
('Grande');

-- INSERTS TBL_RACA

INSERT INTO tbl_raca (nome_raca) VALUES
('SRD'),
('Labrador'),
('Shih-tzu'),
('Persa'),
('Siamês');

-- INSERTS TBL_ESPECIE

INSERT INTO tbl_especie (nome_especie) VALUES
('Cão'),
('Gato');

-- INSERTS TBL_IDADE

INSERT INTO tbl_idade (descricao) VALUES
('Filhote'),
('Adulto'),
('Idoso');

-- INSERTS TBL_SEXO

INSERT INTO tbl_sexo (descricao) VALUES
('Macho'),
('Fêmea');

-- INSERTS TBL_USUARIO

INSERT INTO tbl_usuario (nome, data_nascimento, telefone, email, foto_url, senha, status_cadastro) VALUES
('Mariana Silva', '1990-05-20', '(11)90000-1000', 'mariana@gmail.com', 'mariana@gmail.com', 'senha123', TRUE),
('João Pereira', '1985-10-12', '(21)98888-2222', 'joao@gmail.com', 'mariana@gmail.com', '12345abc', TRUE),
('Luana Bomfim', '2007-03-14', '(71)97777-3333', 'luana@gmail.com', 'mariana@gmail.com', 'minhasenha', TRUE);

-- INSERTS TBL_ANIMAL

INSERT INTO tbl_animal (
    nome, temperamento, informacoes_veterinarias, descricao, adaptabilidade,
    foto_url, status_adocao, status_castracao, status_cadastro,
    porte_id, raca_id, especie_id, idade_id, sexo_id, usuario_id
) VALUES
-- 1) Cachorro pequeno, filhote, energético
('Bolt',
 'Muito ativo, brincalhão e sociável.',
 'Vermifugado e com 1ª dose de vacina.',
 'Filhote cheio de energia, ótimo para famílias e apartamentos.',
 'Adapta-se bem a espaços pequenos.',
 'https://site.com/fotos/bolt.jpg',
 FALSE,
 TRUE,
 TRUE,
 1,  -- porte pequeno
 2,  -- labrador
 1,  -- cão
 1,  -- filhote
 1,  -- macho
 1   -- usuário: Mariana
),

-- 2) Gata adulta, temperamento calmo
('Misty',
 'Calma, independente e carinhosa.',
 'Castrada e com vacinas atualizadas.',
 'Gata adulta que prefere ambientes tranquilos.',
 'Adapta-se bem a casas silenciosas.',
 'https://site.com/fotos/misty.jpg',
 FALSE,
 TRUE,
 TRUE,
 1,  -- porte pequeno
 4,  -- persa
 2,  -- gato
 2,  -- adulto
 2,  -- fêmea
 2   -- usuário: João
),

-- 3) Cachorro grande, idoso e dócil
('Thor',
 'Dócil, tranquilo e muito companheiro.',
 'Necessita acompanhamento veterinário semestral.',
 'Cachorro idoso, ideal para famílias calmas.',
 'Prefere locais maiores e rotina estável.',
 'https://site.com/fotos/thor.jpg',
 TRUE,
 FALSE,
 TRUE,
 3,  -- porte grande
 1,  -- vira-lata
 1,  -- cão
 3,  -- idoso
 1,  -- macho
 3   -- usuário: Luana
);

select * from tbl_animal;

-- INSERTS TBL_ENDERECO_USUARIO

INSERT INTO tbl_endereco_usuario (
    logradouro, numero, bairro, cidade, uf, cep, usuario_id, regiao
) VALUES
('Rua das Flores', '120', 'Centro', 'São Paulo', 'SP', '01010-000', 1, 'Sudeste'),
('Av. Atlântica', '450', 'Copacabana', 'Rio de Janeiro', 'RJ', '22021-001', 2, 'Sudeste'),
('Rua Bahia', '88', 'Pituba', 'Salvador', 'BA', '41830-160', 3, 'Nordeste');

-- INSERTS TBL_ENDERECO_ANIMAL

INSERT INTO tbl_endereco_animal (
    logradouro, numero, bairro, cidade, uf, cep, animal_id, regiao
) VALUES
('Rua das Acácias', '35', 'Jardins', 'São Paulo', 'SP', '01420-030', 1, 'Sudeste'),  -- Bolt
('Rua Aurora', '210', 'Lapa', 'São Paulo', 'SP', '01210-050', 2, 'Sudeste'),        -- Misty
('Estrada Velha', '900', 'Cajazeiras', 'Salvador', 'BA', '41330-000', 3, 'Nordeste'); -- Thor

-- INSERTS TBL_PEDIDO_ADOCAO

INSERT INTO tbl_pedido_adocao (
    data_solicitacao, status_pedido, animal_id, usuario_id
) VALUES
('2025-11-20', 'PENDENTE', 1, 2),  -- João pediu adoção do Bolt
('2025-11-21', 'APROVADO', 2, 1),  -- Mariana adotou a Misty
('2025-11-21', 'RECUSADO', 3, 2);  -- João tentou adotar o Thor

-- INSERTS TBL_FAVORITOS

INSERT INTO tbl_favoritos (usuario_id, animal_id) VALUES
(2, 2),  -- João favoritou Misty
(1, 1),  -- Mariana favoritou Bolt
(3, 1),  -- Luana favoritou Bolt
(3, 2),  -- Luana favoritou Misty
(3, 3);  -- Luana favoritou Thor

-- INSERTS TBL_HISTORICO_ADOCAO

INSERT INTO tbl_historico_adocao (data_adocao, usuario_id, animal_id) VALUES
('2025-11-21', 1, 2);  -- Mariana adotou a Misty

-- INSERTS TBL_NOTIFICACAO 

INSERT INTO tbl_notificacao (
    mensagem, titulo, data_notificacao, usuario_id, pedido_id
) VALUES
-- Pedido 1: João pediu o Bolt (Mariana é dona)
('Você recebeu um novo pedido de adoção para o Bolt.', 
 'Novo Pedido', '2025-11-20', 1, 1),

-- Pedido 2: Mariana pediu a Misty (João é dono)
('Você recebeu um novo pedido de adoção para a Misty.', 
 'Novo Pedido', '2025-11-21', 2, 2),

-- Pedido 2 aprovado (notificação para Mariana)
('Seu pedido de adoção da Misty foi aprovado!', 
 'Pedido Aprovado', '2025-11-21', 1, 2),

-- Pedido 3 recusado (João pediu Thor)
('Seu pedido de adoção do Thor foi recusado.', 
 'Pedido Recusado', '2025-11-21', 2, 3);

-- CRIANDO PROCEDURE DE ATUALIZAÇÃO DE STATUS DE ADOÇÃO NA TBL_ANIMAL

DELIMITER $$
CREATE PROCEDURE atualizar_stts_adocao( IN a_id INT)
BEGIN
    UPDATE tbl_animal SET status_adocao = TRUE WHERE animal_id = a_id;
END $$
DELIMITER ;

CALL atualizar_stts_adocao(2);

-- CRIANDO PROCEDURE DE INSERÇÃO DE UM NOVO ITEM NA TBL_HISTORICO

DELIMITER $$
CREATE PROCEDURE registrar_historico( IN a_id INT, user_id INT, data_adocao DATE)
BEGIN
   INSERT INTO tbl_historico_adocao (animal_id, usuario_id, data_adocao) VALUES
( a_id, user_id, data_adocao);
END $$
DELIMITER ;

CALL registrar_historico(1, 3, CURDATE());

-- CRIANDO TRIGGER QUE CHAMA AS 2 PROCEDURES EM CASO DE PEDIDO APROVADO

 DELIMITER $$
CREATE TRIGGER trg_pedido_aceito 
AFTER UPDATE ON tbl_pedido_adocao 
FOR EACH ROW
BEGIN
	-- Só entra se o status do pedido for APROVADO
    IF UPPER(NEW.status_pedido) = 'APROVADO' THEN
		CALL atualizar_stts_adocao(NEW.animal_id);
		CALL registrar_historico(
			NEW.animal_id,
			NEW.usuario_id,
			CURDATE()
		);    
    END IF;
END $$
DELIMITER ;

-- select com join para os dados de animais
 CREATE VIEW view_info_animal AS 
    SELECT a.*,
    p.nome_porte      AS porte,
    r.nome_raca       AS raca,
    e.nome_especie    AS especie,
    i.descricao       AS idade,
    s.descricao       AS sexo,
    u.nome            AS protetor
	FROM tbl_animal a
	JOIN tbl_porte p  
	ON a.porte_id = p.porte_id
	JOIN tbl_raca r
	ON a.raca_id = r.raca_id
    JOIN tbl_especie e
	ON a.especie_id = e.especie_id
    JOIN tbl_idade i
	ON a.idade_id = i.idade_id
    JOIN tbl_sexo s
	ON a.sexo_id = s.sexo_id
    JOIN tbl_usuario u
	ON a.usuario_id = u.usuario_id;

SELECT * FROM view_info_animal;