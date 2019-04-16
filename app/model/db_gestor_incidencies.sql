SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `prova` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `prova`;

CREATE TABLE `administrators` (
  `admin_id` int(11) NOT NULL,
  `email` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `faltes` (
  `falta_id` int(11) NOT NULL,
  `descripcio` varchar(300) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO `faltes` (`falta_id`, `descripcio`) VALUES
(0, 'Cometre actes greus d\'indisciplina, injúria i ofensa. (a, h, k)'),
(1, 'Fer una agressió física o moral greu a qualsevol membre de la comunitat educativa. (b, c, i)'),
(2, 'Realitzar assetjament escolar. (d)'),
(3, 'Suplantar la personalitat en actes de la vida docent. (e)'),
(4, 'Falsificar, deteriorar o sostraure documentació acadèmica. (f)'),
(5, 'Causar danys en materials o dependències del centre escolar. (g, o)'),
(6, 'Introduir o consumir substàncies nocives i introduir objectes perillosos. (j)'),
(7, 'Incitar o estimular a cometre una falta que afecte greument la convivència en el centre. (l)'),
(8, 'Negar-se reiteradament a complir les mesures correctores o disciplinàries. (m, n)'),
(9, 'Actes atemptatoris respecte al projecte educatiu així com al caràcter del centre. (p)');

CREATE TABLE `incidence` (
  `incidence_id` int(11) NOT NULL,
  `grup` varchar(25) NOT NULL,
  `data` datetime NOT NULL,
  `motiu` int(11) NOT NULL,
  `observacions` varchar(400) DEFAULT NULL,
  `dia_com_pares` date DEFAULT NULL,
  `comentaris` varchar(400) DEFAULT NULL,
  `prof_nom` varchar(100) NOT NULL,
  `prof_cog1` varchar(100) NOT NULL,
  `prof_cog2` varchar(100) NOT NULL,
  `al_nom` varchar(100) NOT NULL,
  `al_cog1` varchar(100) NOT NULL,
  `al_cog2` varchar(100) NOT NULL,
  `assignatura` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `incidence` (`incidence_id`, `grup`, `data`, `motiu`, `observacions`, `dia_com_pares`, `comentaris`, `prof_nom`, `prof_cog1`, `prof_cog2`, `al_nom`, `al_cog1`, `al_cog2`, `assignatura`, `created_at`, `email`) VALUES
(10, 'sdasd', '2019-04-09 18:47:00', 8, 'asd', '2019-04-02', 'asdad', 'asdad', 'add', 'asd', 'asdad', 'asdad', 'asdd', 'asdad', '2019-04-06 18:48:37', ''),
(11, 'sadad', '2019-04-08 19:05:00', 5, 'asdd', '2019-05-02', 'asdd', 'asdd', 'asdd', 'asdd', 'sadsd', 'asdd', 'asd', 'asdd', '2019-04-06 19:05:24', '');

CREATE TABLE `propostes` (
  `proposal_id` int(11) NOT NULL,
  `descripcio` varchar(300) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO `propostes` (`proposal_id`, `descripcio`) VALUES
(0, '1) Realització de tasques educadores, en horari no lectiu, per un període d\'entre cinc i quinze dies lectius. (h, m, n)'),
(1, '2) Suspensió del dret a participar en les activitats extraescolars durant els trenta dies següents a la imposició de la mesura disciplinària. (h, m, n)'),
(2, '3) Canvi de grup de l\'alumne/a per un període d\'entre cinc i quinze dies lectius. (h, m, n)'),
(3, '4) Suspensió del dret d\'assistència a determinades classes per un període d\'entre sis i quinze dies lectius, efectuant els treballs encomanats per part del professorat que li imparteix docència. (h, m, n)'),
(4, '5) Suspensió del dret d\'assistència al centre educatiu durant un període comprés entre sis i trenta dies lectius.');

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2016-04-10 23:50:40'),
(2, 'Review code', 1, '2016-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
(5, 'Push to prod', 1, '2016-04-10 23:50:50');


ALTER TABLE `administrators`
  ADD PRIMARY KEY (`admin_id`);

ALTER TABLE `faltes`
  ADD PRIMARY KEY (`falta_id`);

ALTER TABLE `incidence`
  ADD PRIMARY KEY (`incidence_id`),
  ADD KEY `motiu` (`motiu`);

ALTER TABLE `propostes`
  ADD PRIMARY KEY (`proposal_id`);

ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `administrators`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `faltes`
  MODIFY `falta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `incidence`
  MODIFY `incidence_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `propostes`
  MODIFY `proposal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


ALTER TABLE `incidence`
  ADD CONSTRAINT `incidence_ibfk_1` FOREIGN KEY (`motiu`) REFERENCES `faltes` (`falta_id`);

ALTER TABLE `incidence`
  ADD CONSTRAINT `incidence_ibfk_2` FOREIGN KEY (`proposal_id`) REFERENCES `propostes` (`proposal_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
