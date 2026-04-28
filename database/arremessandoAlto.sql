CREATE DATABASE IF NOT EXISTS arremessandoAlto;
USE arremessandoAlto;

CREATE TABLE Objetivos (
    id_objetivos INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(255),
    tempo_treino_desejado TIME NOT NULL,
    p_cent_de_arremesso_desejada DECIMAL(5,2) NOT NULL,
    p_cent_de_arremesso_atual DECIMAL(5,2),
    obj_alcancado BOOLEAN,
    status ENUM('pendente','concluido') DEFAULT 'pendente'
);

CREATE TABLE Dispositivos (
    id_dispositivos INT PRIMARY KEY AUTO_INCREMENT,
    sensor_vibracao BOOLEAN DEFAULT FALSE,
    sensor_mov BOOLEAN DEFAULT FALSE
);

CREATE TABLE Aulas (
    id_aula INT PRIMARY KEY AUTO_INCREMENT,
    semana INT NOT NULL,
    dia INT NOT NULL,
    numero_aula INT NOT NULL,
    titulo VARCHAR(100),                      
    explicacao VARCHAR(1000),                  
    pratica BOOLEAN DEFAULT FALSE,
    youtube_id VARCHAR(20) DEFAULT NULL         
                                                
);

CREATE TABLE ProgressoAula (
    id_prog_aula INT PRIMARY KEY AUTO_INCREMENT,
    semana_ult_aula INT DEFAULT 1,
    dia_ult_aula INT DEFAULT 1,
    ult_aula_realizada INT DEFAULT 0
);

CREATE TABLE TabelaBasquete (
    id_tabelabasquete INT PRIMARY KEY AUTO_INCREMENT,
    posicao_alt DECIMAL(5,2),
    posicao_larg DECIMAL(5,2),
    tam_aro FLOAT,
    id_dispositivos INT,
    FOREIGN KEY (id_dispositivos) REFERENCES Dispositivos(id_dispositivos)
);

CREATE TABLE Posicoes (
    id_posicao INT PRIMARY KEY AUTO_INCREMENT,
    posicao ENUM('armador', 'ala-armador', 'ala', 'ala-pivo', 'pivo')
);

CREATE TABLE ExperienciaBasquete (
    id_exp_basq INT PRIMARY KEY AUTO_INCREMENT,
    exp_basq ENUM('iniciante', 'intermediario', 'experiente', 'profissional')
);

CREATE TABLE Jogador (
    id_jogador INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    id_posicao INT,
    id_exp_basq INT,
    id_prog_aula INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_prog_aula) REFERENCES ProgressoAula(id_prog_aula),
    FOREIGN KEY (id_posicao) REFERENCES Posicoes(id_posicao),
    FOREIGN KEY (id_exp_basq) REFERENCES ExperienciaBasquete(id_exp_basq)
);

CREATE TABLE RegistroAproveitamento (
    id_reg_aprov INT PRIMARY KEY AUTO_INCREMENT,
    tentativas INT DEFAULT 0,
    acertos INT DEFAULT 0,
    aproveitamento DECIMAL(5,2) DEFAULT 0,
    tempo TIME,
    id_tabelabasquete INT,
    id_jogador INT,
    id_aula INT,
    FOREIGN KEY (id_jogador) REFERENCES Jogador(id_jogador) ON DELETE CASCADE,
    FOREIGN KEY (id_tabelabasquete) REFERENCES TabelaBasquete(id_tabelabasquete),
    FOREIGN KEY (id_aula) REFERENCES Aulas(id_aula)
);

CREATE TABLE RegistroObj (
    id_registro_obj INT PRIMARY KEY AUTO_INCREMENT,
    id_jogador INT,
    id_objetivos INT,
    data_reobj TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente','concluido') DEFAULT 'pendente',
    FOREIGN KEY (id_jogador) REFERENCES Jogador(id_jogador) ON DELETE CASCADE,
    FOREIGN KEY (id_objetivos) REFERENCES Objetivos(id_objetivos)
);


INSERT INTO Posicoes (posicao) VALUES
  ('armador'), ('ala-armador'), ('ala'), ('ala-pivo'), ('pivo');

INSERT INTO ExperienciaBasquete (exp_basq) VALUES
  ('iniciante'), ('intermediario'), ('experiente'), ('profissional');

-- Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ → youtube_id = 'dQw4w9WgXcQ'

INSERT INTO Aulas (semana, dia, numero_aula, titulo, explicacao, pratica, youtube_id) VALUES
  (1, 1, 1, 'Posição base', 'Aprenda a posição fundamental para um bom arremesso: pés na largura dos ombros, joelhos levemente flexionados e peso equilibrado.', FALSE, NULL),
  (1, 2, 2, 'Pegada na bola', 'A bola deve ser segurada com a ponta dos dedos, não com a palma. O dedo indicador aponta para o centro da bola.', FALSE, NULL),
  (1, 3, 3, 'Prática posição base', 'Pratique a posição base e a pegada com arremessos curtos a 1 metro da tabela.', TRUE, NULL),
  (2, 1, 4, 'Movimento do braço', 'O cotovelo deve estar alinhado com o joelho e o pé. O movimento começa das pernas e sobe até o pulso.', FALSE, NULL),
  (2, 2, 5, 'Follow-through', 'O follow-through é o gesto final do arremesso: o pulso "cai" para frente como se você estivesse colocando a mão dentro da cesta.', FALSE, NULL),
  (2, 3, 6, 'Prática arremesso livre', 'Pratique arremessos da linha de lance livre com foco no follow-through correto.', TRUE, NULL);

-- ─── PROCEDURES ──────────────────────────────────────────────────────────────

DELIMITER $$

CREATE PROCEDURE AdicionarAula(
    IN p_semana INT,
    IN p_dia INT,
    IN p_numero_aula INT,
    IN p_titulo VARCHAR(100),
    IN p_explicacao VARCHAR(1000),
    IN p_pratica BOOLEAN,
    IN p_youtube_id VARCHAR(20)
)
BEGIN
    INSERT INTO Aulas (semana, dia, numero_aula, titulo, explicacao, pratica, youtube_id)
    VALUES (p_semana, p_dia, p_numero_aula, p_titulo, p_explicacao, p_pratica, p_youtube_id);
END$$

CREATE PROCEDURE AdicionarJogador(
    IN p_email VARCHAR(50),
    IN p_senha VARCHAR(255),
    IN p_nome VARCHAR(100),
    IN p_data_nascimento DATE,
    IN p_id_posicao INT,
    IN p_id_exp_basq INT,
    IN p_id_prog_aula INT
)
BEGIN
    INSERT INTO Jogador (email, senha, nome, data_nascimento, id_posicao, id_exp_basq, id_prog_aula)
    VALUES (p_email, p_senha, p_nome, p_data_nascimento, p_id_posicao, p_id_exp_basq, p_id_prog_aula);
END$$

CREATE PROCEDURE ExcluirJogador(IN p_id_jogador INT)
BEGIN
    DELETE FROM Jogador WHERE id_jogador = p_id_jogador;
END$$

CREATE PROCEDURE ListarJogadoresPorPosicao(IN p_posicao_nome VARCHAR(50))
BEGIN
    SELECT Jogador.nome, Posicoes.posicao
    FROM Jogador
    INNER JOIN Posicoes ON Jogador.id_posicao = Posicoes.id_posicao
    WHERE Posicoes.posicao = p_posicao_nome;
END$$

CREATE PROCEDURE AdicionarRegistroObjetivo(
    IN p_id_jogador INT,
    IN p_id_objetivo INT
)
BEGIN
    INSERT INTO RegistroObj (id_jogador, id_objetivos)
    VALUES (p_id_jogador, p_id_objetivo);
END$$

CREATE PROCEDURE MelhorAproveitamentoJogadores()
BEGIN
    SELECT Jogador.nome, MAX(RegistroAproveitamento.aproveitamento) AS aproveitamento
    FROM Jogador
    INNER JOIN RegistroAproveitamento ON Jogador.id_jogador = RegistroAproveitamento.id_jogador
    GROUP BY Jogador.id_jogador
    ORDER BY aproveitamento DESC
    LIMIT 5;
END$$

CREATE PROCEDURE AtualizarExperienciaJogador(
    IN p_id_jogador INT,
    IN p_novo_grau_experiencia VARCHAR(20)
)
BEGIN
    UPDATE Jogador
    SET id_exp_basq = (
        SELECT id_exp_basq FROM ExperienciaBasquete
        WHERE exp_basq = p_novo_grau_experiencia
        LIMIT 1
    )
    WHERE id_jogador = p_id_jogador;
END$$

CREATE PROCEDURE ListarJogadoresComObjetivosPendentes()
BEGIN
    SELECT Jogador.nome, Objetivos.descricao, RegistroObj.status
    FROM Jogador
    INNER JOIN RegistroObj ON Jogador.id_jogador = RegistroObj.id_jogador
    INNER JOIN Objetivos ON RegistroObj.id_objetivos = Objetivos.id_objetivos
    WHERE RegistroObj.status = 'pendente';
END$$

CREATE PROCEDURE CalcularMediaAproveitamentoJogadores(IN p_id_aula INT)
BEGIN
    SELECT Jogador.nome, AVG(RegistroAproveitamento.aproveitamento) AS media_aproveitamento
    FROM Jogador
    INNER JOIN RegistroAproveitamento ON Jogador.id_jogador = RegistroAproveitamento.id_jogador
    WHERE RegistroAproveitamento.id_aula = p_id_aula
    GROUP BY Jogador.id_jogador;
END$$

CREATE PROCEDURE AlterarAula(
    IN p_id_aula INT,
    IN p_titulo VARCHAR(100),
    IN p_explicacao VARCHAR(1000),
    IN p_youtube_id VARCHAR(20)
)
BEGIN
    UPDATE Aulas
    SET titulo = p_titulo,
        explicacao = p_explicacao,
        youtube_id = p_youtube_id
    WHERE id_aula = p_id_aula;
END$$

CREATE PROCEDURE AtualizarDadosJogador(
    IN p_id_jogador INT,
    IN p_nome VARCHAR(100),
    IN p_email VARCHAR(50),
    IN p_data_nascimento DATE
)
BEGIN
    UPDATE Jogador
    SET nome = p_nome,
        email = p_email,
        data_nascimento = p_data_nascimento
    WHERE id_jogador = p_id_jogador;
END$$

CREATE PROCEDURE ListarAulasNaoPraticadasPorJogador(IN p_id_jogador INT)
BEGIN
    SELECT Aulas.numero_aula, Aulas.titulo, Aulas.explicacao, Aulas.pratica
    FROM Aulas
    LEFT JOIN RegistroAproveitamento
        ON Aulas.id_aula = RegistroAproveitamento.id_aula
        AND RegistroAproveitamento.id_jogador = p_id_jogador
    WHERE RegistroAproveitamento.id_aula IS NULL;
END$$

CREATE PROCEDURE ListarObjetivosJogador(IN p_jogador_id INT)
BEGIN
    SELECT Objetivos.descricao, Objetivos.tempo_treino_desejado
    FROM Objetivos
    INNER JOIN RegistroObj ON Objetivos.id_objetivos = RegistroObj.id_objetivos
    WHERE RegistroObj.id_jogador = p_jogador_id;
END$$

CREATE PROCEDURE ListarProgressoJogador(IN p_jogador_id INT)
BEGIN
    SELECT
        ProgressoAula.semana_ult_aula,
        ProgressoAula.dia_ult_aula,
        ProgressoAula.ult_aula_realizada
    FROM Jogador
    INNER JOIN ProgressoAula ON Jogador.id_prog_aula = ProgressoAula.id_prog_aula
    WHERE Jogador.id_jogador = p_jogador_id;
END$$

CREATE PROCEDURE ResetarAproveitamentoJogador(IN p_jogadorId INT)
BEGIN
    UPDATE RegistroAproveitamento
    SET tentativas = 0, acertos = 0, aproveitamento = 0
    WHERE id_jogador = p_jogadorId;
END$$

DELIMITER ;