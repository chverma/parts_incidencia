-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-04-2019 a las 08:29:58
-- Versión del servidor: 5.7.25-0ubuntu0.18.04.2
-- Versión de PHP: 7.2.15-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prova`
--
CREATE DATABASE IF NOT EXISTS `prova` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `prova`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `faltes`
--

CREATE TABLE `faltes` (
  `falta_id` int(11) NOT NULL,
  `descripcio` varchar(300) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `faltes`
--

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidence`
--

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
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `incidence`
--

INSERT INTO `incidence` (`incidence_id`, `grup`, `data`, `motiu`, `observacions`, `dia_com_pares`, `comentaris`, `prof_nom`, `prof_cog1`, `prof_cog2`, `al_nom`, `al_cog1`, `al_cog2`, `assignatura`, `created_at`) VALUES
(10, 'sdasd', '2019-04-09 18:47:00', 8, 'asd', '2019-04-02', 'asdad', 'asdad', 'add', 'asd', 'asdad', 'asdad', 'asdd', 'asdad', '2019-04-06 18:48:37'),
(11, 'sadad', '2019-04-08 19:05:00', 5, 'asdd', '2019-05-02', 'asdd', 'asdd', 'asdd', 'asdd', 'sadsd', 'asdd', 'asd', 'asdd', '2019-04-06 19:05:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2016-04-10 23:50:40'),
(2, 'Review code', 1, '2016-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
(5, 'Push to prod', 1, '2016-04-10 23:50:50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `faltes`
--
ALTER TABLE `faltes`
  ADD PRIMARY KEY (`falta_id`);

--
-- Indices de la tabla `incidence`
--
ALTER TABLE `incidence`
  ADD PRIMARY KEY (`incidence_id`),
  ADD KEY `motiu` (`motiu`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `faltes`
--
ALTER TABLE `faltes`
  MODIFY `falta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `incidence`
--
ALTER TABLE `incidence`
  MODIFY `incidence_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidence`
--
ALTER TABLE `incidence`
  ADD CONSTRAINT `incidence_ibfk_1` FOREIGN KEY (`motiu`) REFERENCES `faltes` (`falta_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
