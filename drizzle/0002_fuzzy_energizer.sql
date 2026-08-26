CREATE TABLE `quiz_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionToken` varchar(40) NOT NULL,
	`participantId` int NOT NULL,
	`activityId` int NOT NULL,
	`questionIdsJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `quiz_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `quiz_sessions_sessionToken_unique` UNIQUE(`sessionToken`),
	CONSTRAINT `quiz_sessions_participant_activity_unique` UNIQUE(`participantId`,`activityId`)
);
