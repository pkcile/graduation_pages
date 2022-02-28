
-- DMC dump 1.0.0
-- ------------------------------------------------------
    
-- ----------------------------
-- Table structure for signIn
-- ----------------------------
    
DROP TABLE IF EXISTS `signIn`;
      
CREATE TABLE `signIn` (
  `nth` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `geometry` geometry DEFAULT NULL,
  `poiname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `radius` int(11) NOT NULL DEFAULT '200',
  PRIMARY KEY (`nth`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 
      
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (1,'pkcile','23.132090','113.383425','默认POI名称','2022-02-28 21:25:12','2022-02-28 21:25:12','1111',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (2,'pkcile','0.000000','0.000000','默认POI名称','2022-02-28 21:26:11','2022-02-28 21:26:11','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (3,'pkcile','23.132089','113.383422','默认POI名称','2022-02-28 21:26:24','2022-02-28 21:26:24','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (4,'pkcile','23.132089','113.383422','默认POI名称','2022-02-28 21:26:36','2022-02-28 21:26:36','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (5,'pkcile','23.132089','113.383422','默认POI名称','2022-02-28 21:26:41','2022-02-28 21:26:41','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (6,'pkcile','23.132090','113.383425','默认POI名称','2022-02-28 21:27:17','2022-02-28 21:27:17','1111',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (7,'pkcile','23.132089','113.383422','默认POI名称','2022-02-28 21:27:28','2022-02-28 21:27:28','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (8,'pkcile','23.132089','113.383422','默认POI名称','2022-02-28 21:28:03','2022-02-28 21:28:03','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (9,'pkcile','23.132089','113.383422','默认POI名称','2022-02-28 21:28:10','2022-02-28 21:28:10','wpkfdkfjdksf',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (10,'pkcile','23.132090','113.383423','默认POI名称','2022-02-28 21:33:06','2022-02-28 21:33:06','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (11,'pkcile','23.132509','113.383653','默认POI名称','2022-02-28 21:58:03','2022-02-28 21:58:03','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (12,'pkcile','23.132509','113.383653','默认POI名称','2022-02-28 21:58:07','2022-02-28 21:58:07','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (13,'pkcile','23.132509','113.383653','默认POI名称','2022-02-28 21:58:12','2022-02-28 21:58:12','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (14,'pkcile','23.132509','113.383653','默认POI名称','2022-02-28 21:58:53','2022-02-28 21:58:53','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (15,'guest','0.000000','0.000000','默认POI名称','2022-02-28 22:00:34','2022-02-28 22:00:34','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (16,'guest','23.132126','113.383401','默认POI名称','2022-02-28 22:00:37','2022-02-28 22:00:37','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (17,'guest','23.132126','113.383401','默认POI名称','2022-02-28 22:00:40','2022-02-28 22:00:40','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (18,'guest','23.132072','113.383403','默认POI名称','2022-02-28 22:01:50','2022-02-28 22:01:50','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (19,'guest','23.132072','113.383403','默认POI名称','2022-02-28 22:01:54','2022-02-28 22:01:54','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (20,'guest','23.132072','113.383403','默认POI名称','2022-02-28 22:01:58','2022-02-28 22:01:58','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (21,'guest','23.132072','113.383403','默认POI名称','2022-02-28 22:02:01','2022-02-28 22:02:01','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (22,'guest','23.132072','113.383403','默认POI名称','2022-02-28 22:02:06','2022-02-28 22:02:06','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (23,'guest','23.132072','113.383403','默认POI名称','2022-02-28 22:02:10','2022-02-28 22:02:10','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (24,'pkcile','23.132109','113.383439','默认POI名称','2022-02-28 22:02:43','2022-02-28 22:02:43','',200);
INSERT INTO `signIn` (`nth`,`username`,`latitude`,`longitude`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (25,'pkcile','23.132109','113.383439','默认POI名称','2022-02-28 22:02:48','2022-02-28 22:02:48','',200);
INSERT INTO `signIn` (`nth`,`username`,`poiname`,`date`,`datestamp`,`comment`,`radius`) VALUES (26,'pkcile','默认POI名称','2022-02-28 22:05:34','2022-02-28 22:05:34','',200);
-- ----------------------------
-- Table structure for task
-- ----------------------------
    
DROP TABLE IF EXISTS `task`;
      
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，序列号',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `radius` int(11) NOT NULL COMMENT '默认单位米',
  `topic` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '任务标题',
  `content` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '任务内容',
  `edittime` datetime DEFAULT NULL COMMENT '可进行修改',
  `starttime` datetime NOT NULL COMMENT '开始时间',
  `endtime` datetime NOT NULL COMMENT '结束时间',
  `user_username` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '编辑用户',
  `placename` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '设置定位地点',
  `placegeometry` geometry DEFAULT NULL COMMENT '坐标位置可选',
  `assign` int(11) NOT NULL DEFAULT '0' COMMENT '是否关联过学生',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 
      
INSERT INTO `task` (`id`,`time`,`radius`,`topic`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (1,'2021-06-28 15:22:13',1000,'第一次测试标题','第一次测试内容','2021-06-28 15:06:00','2021-06-28 19:30:00','pkcile','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`topic`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (2,'2021-07-02 06:07:09',200,'第二次测试标题','第二次测试内容','2021-06-28 15:06:00','2021-06-28 19:30:00','','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`topic`,`content`,`edittime`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (4,'2021-07-02 15:00:00',200,'第三次测试标题','第三次测试内容','2021-07-02 03:00:00','2021-06-28 15:06:00','2021-06-28 19:30:00','test','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (17,'2021-07-02 04:21:15',200,'测试内容','2021-07-30 03:01:00','2021-07-30 06:01:00','pkcile','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (18,'2021-07-05 01:56:55',1000,'远距离测试','2021-07-05 01:56:00','2021-07-05 02:56:00','admin','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (19,'2021-07-05 02:06:15',1000,'远距离测试','2021-07-05 02:05:00','2021-07-05 03:05:00','test','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (20,'2021-07-05 02:12:01',1000,'努尔打卡测试','2021-07-05 01:50:00','2021-07-05 02:50:00','admin','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (21,'2021-07-05 02:15:55',1000,'王朋坤打卡测试，打卡迟到','2021-06-05 01:54:00','2021-07-05 00:54:00','admin','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (22,'2021-07-05 02:26:09',1000,'','2021-07-31 02:26:00','2021-07-28 02:26:00','admin','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (23,'2021-07-05 02:36:00',1000,'打卡','2021-07-05 02:35:00','2021-07-05 03:35:00','admin','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (24,'2021-07-05 08:31:39',300,'1栋测试','2021-07-05 08:31:00','2021-07-05 09:31:00','test','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (25,'2021-07-05 08:40:18',300,'王朋坤1栋打卡任务','2021-07-05 08:39:00','2021-07-05 09:39:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (26,'2021-07-05 08:43:15',1000,'迟到打卡测试','2021-07-04 08:42:00','2021-07-04 09:42:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (27,'2021-07-05 08:45:35',300,'不在范围测试','2021-07-05 08:45:00','2021-07-06 08:45:00','admin','14#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (28,'2021-07-05 08:47:41',300,'王朋坤够不到','2021-07-05 08:47:00','2021-07-05 09:47:00','admin','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (29,'2021-07-05 09:04:10',1000,'','2021-07-05 09:04:00','2021-07-05 09:05:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (30,'2021-07-05 09:04:38',1000,'','2021-07-05 09:04:00','2021-07-05 09:06:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (31,'2021-07-05 10:33:13',300,'发布','2021-07-05 10:32:00','2021-07-05 12:32:00','pkcile','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (32,'2021-07-05 10:33:57',300,'发布','2021-07-05 10:33:00','2021-07-07 10:33:00','pkcile','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (33,'2021-07-05 10:34:32',1000,'发布','2021-07-04 10:34:00','2021-07-06 10:34:00','pkcile','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (34,'2021-07-05 10:35:11',300,'','2021-07-05 10:34:00','2021-07-05 12:35:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (35,'2021-07-05 10:36:01',1000,'','2021-07-05 10:35:00','2021-07-09 14:35:00','admin','3#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (36,'2021-07-05 10:37:35',300,'测试','2021-07-05 10:37:00','2021-07-09 10:37:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (37,'2021-07-05 10:41:00',500,'测试','2021-07-05 10:40:00','2021-07-12 10:40:00','admin','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (38,'2021-07-05 10:56:06',500,'','2021-07-05 10:55:00','2021-07-05 11:56:00','nur','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (39,'2021-07-05 11:05:00',300,'','2021-07-05 11:04:00','2021-07-09 11:04:00','admin','3#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (40,'2021-07-05 11:20:06',300,'','2021-07-14 11:19:00','2021-07-09 11:19:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (41,'2021-07-05 11:21:00',1000,'','2021-07-05 11:20:00','2021-07-11 11:20:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (42,'2021-07-05 13:59:35',100,'testtask','2021-07-30 06:01:00','2021-08-30 06:01:00','admin','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (43,'2021-07-05 18:28:57',300,'测试','2021-07-05 18:06:00','2021-07-05 20:06:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (44,'2021-07-05 18:30:43',300,'测试','2021-07-05 18:21:00','2021-07-05 20:06:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (45,'2021-07-05 18:31:22',1000,'测试','2021-07-05 18:22:00','2021-07-05 21:22:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (46,'2021-07-05 19:59:12',300,'测试数据','2021-07-05 18:43:00','2021-07-07 18:43:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (47,'2021-07-05 20:02:31',1000,'好好学习测试打卡','2021-07-05 18:46:00','2021-07-05 23:46:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (48,'2021-07-05 20:08:00',300,'1栋打卡测试','2021-07-05 20:07:00','2021-07-07 23:07:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (49,'2021-07-05 20:12:47',300,'王朋坤1栋300米半径打卡测试','2021-07-05 20:12:00','2021-07-07 20:12:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (50,'2021-07-05 20:40:07',500,'','2021-12-05 20:40:00','2021-07-05 20:39:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (51,'2021-07-05 22:37:02',300,'','2021-07-05 22:36:00','2021-07-07 22:36:00','admin','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (52,'2021-07-07 19:47:54',1000,'','2021-07-07 19:47:00','2021-07-26 19:47:00','admin','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (53,'2021-07-22 18:52:19',500,'啦啊啦啦啦','2021-07-22 18:51:00','2021-07-23 18:51:00','admin','14#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (54,'2021-10-28 14:05:44',100,'1#','2021-07-05 08:42:29','2021-10-25 08:42:29','pkcile','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (55,'2021-10-29 17:35:11',10,'','2021-10-29 17:34:00','2021-10-29 17:34:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (56,'2021-10-29 17:37:05',10,'','2021-10-29 17:36:00','2021-10-29 17:36:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (57,'2021-10-29 17:38:10',10,'','2021-10-29 17:38:00','2021-10-29 17:38:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (58,'2021-10-29 20:20:38',10,'','2021-10-29 20:20:00','2021-10-29 20:20:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (59,'2021-10-29 20:22:20',10,'','2021-10-29 20:21:00','2021-10-29 20:21:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (60,'2021-10-29 20:22:27',10,'','2021-10-29 20:22:00','2021-10-29 20:22:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (61,'2021-10-29 20:24:44',10,'','2021-10-29 20:23:00','2021-10-29 20:23:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (62,'2021-10-29 20:29:43',10,'','2021-10-29 20:29:00','2021-10-29 20:29:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (63,'2021-10-29 20:34:01',10,'','2021-10-29 20:33:00','2021-10-29 20:33:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (64,'2021-10-29 20:34:44',10,'','2021-10-29 20:34:00','2021-10-29 20:34:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (65,'2021-10-29 20:35:42',10,'','2021-10-29 20:35:00','2021-10-29 20:35:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (66,'2021-10-29 20:36:19',10,'','2021-10-29 20:36:00','2021-10-29 20:36:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (67,'2021-10-29 20:38:54',10,'','2021-10-29 20:38:00','2021-10-29 20:38:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (68,'2021-10-29 20:43:17',10,'','2021-10-31 20:41:00','2021-10-29 20:41:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (69,'2021-10-29 20:48:58',10,'','2021-10-29 20:48:00','2021-10-29 20:48:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (70,'2021-10-29 20:49:39',10,'','2021-10-29 20:49:00','2021-10-29 20:49:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (71,'2021-10-31 16:59:44',10,'','2021-10-31 16:59:00','2021-10-31 16:59:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (72,'2021-10-31 17:04:47',10,'','2021-10-24 07:04:00','2021-10-31 17:04:00','pkcile','超真楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (73,'2021-10-31 17:07:51',1000,'','2021-10-31 17:07:00','2021-10-31 23:07:00','pkcile','12#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (74,'2021-11-01 01:31:46',10,'','2021-11-01 01:31:00','2021-11-01 01:31:00','guest','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (75,'2021-11-01 09:49:04',190,'','2021-11-01 09:48:00','2021-11-03 09:48:00','pkcile','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (76,'2021-11-01 10:16:49',100,'','2021-11-01 10:14:00','2021-11-07 10:14:00','pkcile','方荫楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (77,'2021-11-01 10:37:13',10,'','2021-11-01 10:37:00','2021-11-01 10:37:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (78,'2021-11-01 22:57:11',10,'','2021-11-01 22:57:00','2021-11-01 22:57:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (79,'2021-11-01 22:57:22',10,'','2021-11-01 22:57:00','2021-11-01 22:57:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (80,'2021-11-01 23:06:59',1000,'','2021-11-01 23:06:00','2021-11-01 23:06:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (81,'2021-11-01 23:09:50',10,'','2021-11-01 23:09:00','2021-11-01 23:09:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (82,'2021-11-01 23:31:30',10,'','2021-11-01 23:31:00','2021-11-01 23:31:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (83,'2021-11-02 15:38:59',10,'','2021-11-02 15:38:00','2021-11-02 15:38:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (84,'2021-11-02 16:33:08',10,'','2021-11-02 16:33:00','2021-11-02 16:33:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (85,'2021-11-02 18:30:58',10,'','2021-11-02 18:30:00','2021-11-02 18:30:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (86,'2021-11-02 21:55:09',70,'','2021-11-10 21:53:00','2021-11-02 21:54:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (87,'2021-11-02 21:55:23',10,'','2021-11-02 21:55:00','2021-11-02 21:55:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (88,'2021-11-02 22:01:16',510,'','2021-11-02 22:01:00','2021-11-02 22:01:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (89,'2021-11-04 09:01:48',10,'','2021-11-04 09:01:00','2021-11-04 09:01:00','guest','16#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (90,'2021-11-04 09:05:30',10,'','2021-11-04 09:05:00','2021-11-04 09:05:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (91,'2021-11-04 09:11:27',10,'','2021-11-04 09:10:00','2021-11-04 09:10:00','guest','名达楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (92,'2021-11-04 10:10:59',10,'','2021-11-04 10:10:00','2021-11-04 10:10:00','pkcile','国际教育学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (93,'2021-11-04 10:21:46',10,'','2021-11-04 10:21:00','2021-11-04 10:21:00','guest','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (94,'2021-11-04 10:22:30',10,'','2021-11-04 10:22:00','2021-11-04 10:22:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (95,'2021-11-04 10:24:45',10,'','2021-11-04 10:24:00','2021-11-04 10:24:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (96,'2021-11-04 10:26:16',10,'','2021-11-04 10:24:00','2021-11-04 10:24:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (97,'2021-11-04 10:28:26',10,'','2021-11-04 10:28:00','2021-11-04 10:28:00','guest','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (98,'2021-11-04 10:29:31',10,'','2021-11-04 10:29:00','2021-11-04 10:29:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (99,'2021-11-04 10:56:42',10,'','2021-11-04 10:56:00','2021-11-04 10:56:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (100,'2021-11-04 10:58:44',10,'','2021-11-04 10:58:00','2021-11-04 10:58:00','pkcile','国际教育学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (101,'2021-11-04 11:01:23',10,'','2021-11-04 11:01:00','2021-11-04 11:01:00','pkcile','超真楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (102,'2021-11-04 11:02:59',10,'','2021-11-04 11:02:00','2021-11-04 11:02:00','pkcile','国际教育学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (103,'2021-11-04 12:53:40',10,'','2021-11-04 12:53:00','2021-11-04 12:53:00','pkcile','超真楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (104,'2021-11-04 13:07:35',10,'','2021-11-04 13:07:00','2021-11-04 13:07:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (105,'2021-11-04 19:45:45',10,'','2021-11-04 19:45:00','2021-11-04 19:45:00','pkcile','超真楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (106,'2021-11-05 19:35:47',1000000,'','2021-11-05 19:35:00','2021-11-05 23:35:00','guest','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (107,'2021-11-06 18:55:55',10,'','2021-11-06 18:55:00','2021-11-30 18:55:00','pkcile','超真楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (108,'2021-11-07 15:19:02',10,'','2021-11-07 15:18:00','2021-11-07 15:18:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (109,'2021-11-11 11:23:31',10,'','2021-11-11 11:23:00','2021-11-17 11:23:00','pkcile','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (110,'2021-11-11 11:24:11',110,'','2021-11-11 11:24:00','2021-11-11 11:24:00','pkcile','1#',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (111,'2021-11-13 18:43:32',550,'','2021-11-13 18:43:00','2021-11-13 18:43:00','pkcile','国际教育学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (112,'2021-11-14 16:38:36',10,'','2021-11-14 16:38:00','2021-11-14 16:38:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (113,'2021-11-23 15:50:15',1000000,'','2021-11-23 15:49:00','2021-11-23 15:49:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (114,'2021-11-24 22:31:36',10,'','2021-11-24 22:31:00','2021-11-24 22:31:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (115,'2021-12-07 21:39:40',1000000,'11111111','2021-12-07 21:38:00','2021-12-15 21:38:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (116,'2021-12-13 18:51:27',1000000,'11111','2021-12-13 18:50:00','2021-12-13 18:50:00','pkcile','先骕楼',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (117,'2021-12-19 12:32:26',10,'','2021-12-19 12:32:00','2021-12-19 12:32:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (118,'2022-01-04 17:35:47',1000000,'1111111','2022-01-04 17:35:00','2022-01-04 17:35:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (119,'2022-01-17 20:53:10',1000000,'努尔打卡','2022-01-17 20:52:00','2022-01-17 20:52:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (120,'2022-01-27 17:10:39',10,'','2022-01-27 17:10:00','2022-01-27 17:10:00','pkcile','国际教育学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (121,'2022-02-24 00:06:58',10,'','2022-02-24 00:06:00','2022-02-24 00:06:00','pkcile','瑶湖体育馆',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (122,'2022-02-28 07:12:21',10,'','2022-02-28 07:12:00','2022-02-28 07:12:00','pkcile','城建学院',0);
INSERT INTO `task` (`id`,`time`,`radius`,`content`,`starttime`,`endtime`,`user_username`,`placename`,`assign`) VALUES (123,'2022-02-28 21:12:24',10,'','2022-02-28 21:12:00','2022-02-28 21:12:00','pkcile','瑶湖体育馆',0);
-- ----------------------------
-- Table structure for task_user
-- ----------------------------
    
DROP TABLE IF EXISTS `task_user`;
      
CREATE TABLE `task_user` (
  `user_username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `task_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '打卡状态',
  `edittime` datetime DEFAULT NULL,
  `comment` varchar(1000) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`user_username`,`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 
      
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('12345',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',51,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('666',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('aabbcc',119,-1,'2022-01-17 20:55:14','aabbcc王朋坤测试努尔打卡打卡情况');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbcc',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbcc',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbcc',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('aabbccdd',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('guest',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('hhxx',47,1,'2021-07-05 18:49:16','好好学习测试打卡');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('hhxx',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',18,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('nur',20,1,'2021-07-05 01:53:48','努尔打卡测试，测试应该成功');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('nur',26,2,'2021-07-05 08:45:08','努尔迟到打卡测试');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',46,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('nur',48,1,'2021-07-05 20:12:15','努尔1栋打卡');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('nur',49,-1,'2021-10-27 18:09:20','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('nur',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',18,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',20,1,'2021-10-31 18:32:37','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',21,-1,'2021-10-27 18:03:46','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',24,1,'2021-07-05 08:35:33','王朋坤1栋打卡测试');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',25,1,'2021-07-05 08:42:29','王朋坤准备1栋打卡');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',27,1,'2021-07-05 08:47:43','王朋坤在一栋够不到');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',28,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',40,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',52,-1,'2021-10-30 00:02:29','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',71,-2,'2021-10-31 17:08:09','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',73,-1,'2021-10-31 23:30:18','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',74,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',75,-2,'2021-11-01 10:15:06','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',76,1,'2021-11-01 22:31:44','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',80,-1,'2021-11-02 18:48:42','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',87,-2,'2021-11-02 22:01:29','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',88,-2,'2021-11-04 10:46:54','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',104,-2,'2021-11-04 15:46:08','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',106,-1,'2021-11-06 18:52:44','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',108,-2,'2021-11-08 18:21:29','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',109,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',110,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',112,-2,'2021-11-23 15:46:46','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',113,-1,'2021-11-23 15:51:33','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',114,-2,'2021-11-28 18:47:01','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',115,1,'2021-12-13 18:51:29','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',116,-1,'2021-12-18 14:09:36','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',117,-2,'2021-12-27 12:01:07','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',120,-2,'2022-02-23 23:52:47','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('pkcile',121,-2,'2022-02-27 15:10:37','');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('pkcile',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('psycho',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('test',1,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('test',19,1,'2021-07-05 02:08:13','测试用户，正常打卡测试');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('test',20,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('test',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('test',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('test2',1,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('天天向上',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张三',20,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张三',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张三',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',20,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('张飞',123,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('李四',20,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('李四',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('李四',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('王五',20,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('王五',22,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('王五',30,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('王朋坤',41,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`edittime`,`comment`) VALUES ('铭哥',30,1,'2021-07-05 09:06:30','个der');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',71,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',73,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',75,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',76,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',79,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',80,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',87,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',88,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',101,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',102,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',104,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',106,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',107,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',108,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',111,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',112,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',113,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',114,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',115,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',116,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',117,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',118,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',119,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',120,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',121,0,'');
INSERT INTO `task_user` (`user_username`,`task_id`,`status`,`comment`) VALUES ('铭哥',123,0,'');
-- ----------------------------
-- Table structure for tasks
-- ----------------------------
    
DROP TABLE IF EXISTS `tasks`;
      
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 
      

-- ----------------------------
-- Table structure for user
-- ----------------------------
    
DROP TABLE IF EXISTS `user`;
      
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '学生' COMMENT '身份',
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1234' COMMENT '密码',
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '姓名',
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '昵称',
  `nth` varchar(13) COLLATE utf8_unicode_ci NOT NULL COMMENT '学号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 
      
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (2,'游客','1234','游客','guest','12345678');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (13,'管理员','1234','管理员','admin','1234');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (40,'学生','1234','努尔','nur','201824803030');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (41,'学生','1234','王朋坤','pkcile','201824803050');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (45,'学生','1234','张飞','张飞','201824803063');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (46,'学生','xiaoming123','舒衍铭     ','铭哥','201824803010');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (49,'学生','1234','颜清昭','hhxx','201824803051');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (50,'学生','1234','刘嘉乐','天天向上','201824803052');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (51,'学生','1234','何美飞','666','201824803001');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (57,'学生','1234','张子蘅','psycho','201824803033');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (59,'学生','1234','符妙婷','aabbccdd','201824803048');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (60,'学生','1234','王朋坤','12345','201824803050');
INSERT INTO `user` (`id`,`role`,`password`,`name`,`username`,`nth`) VALUES (61,'学生','1234','努尔艾合麦提江·太来提','aabbcc','201824803030');
-- ----------------------------
-- Table structure for user_register
-- ----------------------------
    
DROP TABLE IF EXISTS `user_register`;
      
CREATE TABLE `user_register` (
  `user_nth` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1234',
  `user_username` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '昵称',
  `user_register_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_nth`,`user_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; 
      
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('1234','1234','admin','2021-06-24 10:47:52');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('2018248','1234','aaa','2021-07-04 16:05:27');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803001','1234','666','2021-07-05 22:36:37');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803010','xiaoming123','铭哥','2021-07-05 09:02:54');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803030','1234','aabbcc','2022-01-17 20:52:26');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803030','1234','nur','2021-07-05 02:10:10');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803033','1234','psycho','2021-10-27 17:14:58');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803048','1234','aabbccdd','2021-10-31 23:11:10');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('20182480305','1234','aabbcc1','2021-10-27 16:44:31');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803050','1234','12345','2021-11-02 15:45:18');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803050','1234','pkcile','2021-07-05 02:10:24');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803050','1234','王朋坤','2021-07-05 11:18:27');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803051','1234','hhxx','2021-07-05 20:01:03');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('201824803052','1234','天天向上','2021-07-05 20:16:49');
INSERT INTO `user_register` (`user_nth`,`user_password`,`user_username`,`user_register_time`) VALUES ('aaaaaaa','1234','aabbccc','2022-02-27 15:16:15');
-- ----------------------------
-- Table structure for pets
-- ----------------------------
    
DROP TABLE IF EXISTS `pets`;
      
CREATE TABLE `pets` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `birth` varchar(10) NOT NULL,
  `createdAt` bigint(20) NOT NULL,
  `updatedAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 
      
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('d-1645773304866','Odie',0,'2008-08-08',1645773304866,1645773304866,0);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('d-1645773318776','Odie',0,'2008-08-08',1645773318776,1645773318776,0);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('d-1645773816483','Odie',0,'2008-08-08',1645773816483,1645773816483,0);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773304866','Gaffey',1,'2007-07-07',1645773304866,1645773816982,2);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773318776','Gaffey',1,'2007-07-07',1645773318776,1645773817064,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773548238','Gaffey',1,'2007-07-07',1645773548238,1645773817143,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773549716','Gaffey',1,'2007-07-07',1645773549716,1645773817225,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773594285','Gaffey',1,'2007-07-07',1645773594285,1645773817267,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773597629','Gaffey',1,'2007-07-07',1645773597629,1645773817309,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773598082','Gaffey',1,'2007-07-07',1645773598082,1645773817351,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773598497','Gaffey',1,'2007-07-07',1645773598497,1645773817392,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773598664','Gaffey',1,'2007-07-07',1645773598664,1645773817432,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773598824','Gaffey',1,'2007-07-07',1645773598824,1645773817473,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773598993','Gaffey',1,'2007-07-07',1645773598993,1645773817513,1);
INSERT INTO `pets` (`id`,`name`,`gender`,`birth`,`createdAt`,`updatedAt`,`version`) VALUES ('g-1645773816483','Gaffey',0,'2007-07-07',1645773816483,1645773816483,0);