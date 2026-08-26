CREATE TABLE `teacher_access_grants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`staffSection` enum('boys','girls','all') NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teacher_access_grants_id` PRIMARY KEY(`id`),
	CONSTRAINT `teacher_access_grants_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `participants` MODIFY COLUMN `eventSection` enum('boys','girls','unassigned') NOT NULL DEFAULT 'unassigned';