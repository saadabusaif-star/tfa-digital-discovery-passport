CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(120) NOT NULL,
	`zone` enum('play','create','discover','connect') NOT NULL,
	`kind` enum('quiz','scenario','puzzle','hunt','timeline','reflection','creative','vote') NOT NULL,
	`summary` text NOT NULL,
	`instructions` text NOT NULL,
	`resourceUrl` varchar(512),
	`resourceLabel` varchar(160),
	`points` int NOT NULL DEFAULT 10,
	`badgeKey` varchar(64) NOT NULL,
	`badgeName` varchar(80) NOT NULL,
	`gradeHint` varchar(120) NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`displayOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`),
	CONSTRAINT `activities_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `completions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`participantId` int NOT NULL,
	`activityId` int NOT NULL,
	`responseText` text,
	`awardedPoints` int NOT NULL DEFAULT 0,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `completions_id` PRIMARY KEY(`id`),
	CONSTRAINT `completions_participant_activity_unique` UNIQUE(`participantId`,`activityId`)
);
--> statement-breakpoint
CREATE TABLE `event_settings` (
	`settingKey` varchar(80) NOT NULL,
	`settingValue` text NOT NULL,
	`label` varchar(160) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `event_settings_settingKey` PRIMARY KEY(`settingKey`)
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`displayName` varchar(80) NOT NULL,
	`gradeBand` enum('6-7','8-9','10-12') NOT NULL,
	`accessCode` varchar(16) NOT NULL,
	`avatarColor` varchar(24) NOT NULL DEFAULT 'gold',
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `participants_id` PRIMARY KEY(`id`),
	CONSTRAINT `participants_accessCode_unique` UNIQUE(`accessCode`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`participantId` int NOT NULL,
	`activityId` int,
	`kind` enum('pixel-art','meme','website-mockup','reflection','other') NOT NULL,
	`body` text,
	`fileUrl` varchar(512),
	`storageKey` varchar(512),
	`fileName` varchar(255),
	`mimeType` varchar(128),
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`adminNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`reviewedBy` int,
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`participantId` int NOT NULL,
	`promptKey` varchar(64) NOT NULL,
	`optionText` varchar(160) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`),
	CONSTRAINT `votes_participant_prompt_unique` UNIQUE(`participantId`,`promptKey`)
);
