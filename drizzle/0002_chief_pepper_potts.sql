CREATE TABLE `profileDetails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section` varchar(64) NOT NULL,
	`label` varchar(160) NOT NULL,
	`content` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `profileDetails_id` PRIMARY KEY(`id`),
	CONSTRAINT `profileDetails_section_label_unique` UNIQUE(`section`,`label`)
);
