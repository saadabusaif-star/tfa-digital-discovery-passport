CREATE TABLE `class_groups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label` varchar(80) NOT NULL,
	`teacherSlot` varchar(32) NOT NULL,
	`eventSection` enum('boys','girls') NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `class_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `participants` ADD `classGroupId` int;