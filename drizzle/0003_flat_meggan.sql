ALTER TABLE `users` MODIFY COLUMN `role` enum('user','teacher','admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `participants` ADD `eventSection` enum('boys','girls','unassigned') NOT NULL DEFAULT 'unassigned';--> statement-breakpoint
ALTER TABLE `users` ADD `staffSection` enum('boys','girls','all') DEFAULT 'all' NOT NULL;
