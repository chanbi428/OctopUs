-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: e106_final
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cave`
--

DROP TABLE IF EXISTS `cave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cave` (
  `idx` int(11) NOT NULL,
  `cave_id` int(11) NOT NULL,
  `room_id` varchar(40) NOT NULL,
  `person_num` int(11) DEFAULT 0,
  `person_list` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK_CAVE_IDX1_idx` (`room_id`),
  CONSTRAINT `FK_CAVE_IDX1` FOREIGN KEY (`room_id`) REFERENCES `gamer` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cave`
--

LOCK TABLES `cave` WRITE;
/*!40000 ALTER TABLE `cave` DISABLE KEYS */;
/*!40000 ALTER TABLE `cave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamer`
--

DROP TABLE IF EXISTS `gamer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gamer` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `room_id` varchar(40) NOT NULL,
  `game_team` varchar(20) DEFAULT NULL,
  `is_dead` tinyint(4) DEFAULT 0,
  `game_job` varchar(20) DEFAULT NULL,
  `is_victory` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `FK_GAEMR_IDX2_idx` (`room_id`),
  CONSTRAINT `FK_GAEMR_IDX2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_GAMER_IDX1` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamer`
--

LOCK TABLES `gamer` WRITE;
/*!40000 ALTER TABLE `gamer` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mini_fish`
--

DROP TABLE IF EXISTS `mini_fish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mini_fish` (
  `room_id` varchar(40) NOT NULL,
  `citizen` int(11) DEFAULT NULL,
  `mafia` int(11) DEFAULT NULL,
  KEY `FK_FISH_IDX1_idx` (`room_id`),
  CONSTRAINT `FK_FISH_IDX1` FOREIGN KEY (`room_id`) REFERENCES `gamer` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mini_fish`
--

LOCK TABLES `mini_fish` WRITE;
/*!40000 ALTER TABLE `mini_fish` DISABLE KEYS */;
/*!40000 ALTER TABLE `mini_fish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mini_shark`
--

DROP TABLE IF EXISTS `mini_shark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mini_shark` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `game_team` varchar(20) DEFAULT NULL,
  `room_id` varchar(40) DEFAULT NULL,
  `time` float DEFAULT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `FK_SHARK_IDX1_idx` (`room_id`),
  CONSTRAINT `FK_SHARK_IDX1` FOREIGN KEY (`room_id`) REFERENCES `gamer` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SHARK_IDX2` FOREIGN KEY (`user_name`) REFERENCES `gamer` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mini_shark`
--

LOCK TABLES `mini_shark` WRITE;
/*!40000 ALTER TABLE `mini_shark` DISABLE KEYS */;
/*!40000 ALTER TABLE `mini_shark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `night`
--

DROP TABLE IF EXISTS `night`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `night` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `room_id` varchar(40) NOT NULL,
  `nominee_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `FK_NIGHT_IDX2` (`room_id`),
  CONSTRAINT `FK_NIGHT_IDX1` FOREIGN KEY (`user_name`) REFERENCES `gamer` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NIGHT_IDX2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `night`
--

LOCK TABLES `night` WRITE;
/*!40000 ALTER TABLE `night` DISABLE KEYS */;
/*!40000 ALTER TABLE `night` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` varchar(40) NOT NULL,
  `room_chief` varchar(20) NOT NULL,
  `is_private` tinyint(4) NOT NULL DEFAULT 0,
  `room_name` varchar(20) NOT NULL,
  `person_limit` int(11) DEFAULT 8,
  `room_pw` varchar(20) DEFAULT NULL,
  `game_status` tinyint(4) NOT NULL DEFAULT 0,
  `person_num` int(11) NOT NULL DEFAULT 1,
  `game_time` int(11) NOT NULL DEFAULT 60,
  `user_list` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `room_id_UNIQUE` (`room_id`),
  UNIQUE KEY `room_name_UNIQUE` (`room_name`),
  UNIQUE KEY `room_chief_UNIQUE` (`room_chief`),
  CONSTRAINT `FK_ROOM_IDX1` FOREIGN KEY (`room_chief`) REFERENCES `user` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (94,'459057fc-8e9f-4952-9a5f-d09cbb18c873','a1',1,'오징어 파티',8,'1234',1,8,60,'a1,a2,a3,a4,a5,a6,a7,a8'),(95,'fe475add-3744-42df-9f9a-a4ca027bef08','b1',1,'놀면뭐하니? ',8,'1234',1,8,60,'b1,b2,b3,b4,b5,b6,b7,b8'),(97,'8ddc8df8-af95-47fd-9b02-d26f9bdda1b8','c1',0,'고수 전용 방',8,'',0,8,60,'c1,c2,c3,c4,c5,c6,c7,c8'),(98,'f91ba890-25e7-481b-ba77-a5b99030689b','d1',1,'아무나 오세요.',8,'1234',1,8,60,'d1,d2,d3,d4,d5,d6,d7,d8'),(99,'8cf29545-51b2-4ca6-97e0-8bf0c8224f64','e1',1,'초보 모여라~',8,'1234',1,8,60,'e1,e2,e3,e4,d5,d6,d7,d8');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL DEFAULT 'nickname',
  `user_pw` varchar(20) NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (68,'a1','1234'),(69,'a2','1234'),(70,'a3','1234'),(71,'a4','1234'),(72,'a5','1234'),(73,'a6','1234'),(74,'a7','1234'),(75,'a8','1234'),(77,'b1','1234'),(78,'b2','1234'),(79,'b3','1234'),(80,'b4','1234'),(81,'b5','1234'),(82,'b6','1234'),(83,'b7','1234'),(84,'b8','1234'),(85,'c1','1234'),(86,'c2','1234'),(87,'c3','1234'),(88,'c4','1234'),(89,'c5','1234'),(90,'c6','1234'),(91,'c7','1234'),(92,'c8','1234'),(96,'d1','1234'),(97,'d2','1234'),(98,'d3','1234'),(99,'d4','1234'),(100,'d5','1234'),(101,'d6','1234'),(102,'d7','1234'),(103,'d8','1234'),(104,'e1','1234'),(105,'e2','1234'),(106,'e3','1234'),(107,'e4','1234'),(108,'e5','1234'),(109,'e6','1234'),(110,'e7','1234'),(111,'e8','1234'),(112,'f1','1234'),(113,'f2','1234'),(114,'f3','1234'),(115,'f4','1234'),(116,'f5','1234'),(117,'f6','1234'),(118,'f7','1234'),(119,'f8','1234'),(120,'g1','1234'),(121,'g2','1234'),(122,'g3','1234'),(123,'g4','1234'),(124,'g5','1234'),(125,'g6','1234'),(126,'g7','1234'),(127,'g8','1234'),(128,'오하민','1234'),(129,'소리질러','1234'),(130,'재간둥스','1234'),(131,'문어숙회','1234'),(132,'오징어순대','1234'),(133,'닥터배사부','1234'),(134,'용용용용용','1234'),(135,'나마파아임','1234'),(136,'해삼말미잘','1234');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vote` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `room_id` varchar(40) NOT NULL,
  `vote` int(11) DEFAULT 0,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `FK_VOTE_IDX2` (`room_id`),
  CONSTRAINT `FK_VOTE_IDX1` FOREIGN KEY (`user_name`) REFERENCES `gamer` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_VOTE_IDX2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 19:05:56
