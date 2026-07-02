CREATE TABLE `activity_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`action` varchar(50) NOT NULL,
	`entityType` varchar(50) NOT NULL,
	`entityId` varchar(100),
	`entityTitle` varchar(255),
	`performedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL DEFAULT '',
	`publishedDate` varchar(20) DEFAULT '',
	`readTime` varchar(20) DEFAULT '',
	`excerpt` text DEFAULT (''),
	`content` text DEFAULT (''),
	`coverImage` text DEFAULT (''),
	`tags` json DEFAULT ('[]'),
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) DEFAULT '',
	`phone` varchar(50) DEFAULT '',
	`linkedin` varchar(255) DEFAULT '',
	`github` varchar(255) DEFAULT '',
	`instagram` varchar(255) DEFAULT '',
	`kakao` varchar(255) DEFAULT '',
	`kakaoLabel` varchar(100) DEFAULT '',
	`address` text DEFAULT (''),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL DEFAULT '',
	`nameEn` varchar(100) NOT NULL DEFAULT '',
	`title` varchar(255) NOT NULL DEFAULT '',
	`bio` text DEFAULT (''),
	`profileImage` text DEFAULT (''),
	`career` json DEFAULT ('[]'),
	`skills` json DEFAULT ('[]'),
	`education` json DEFAULT ('[]'),
	`certifications` json DEFAULT ('[]'),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL DEFAULT '',
	`client` varchar(255) NOT NULL DEFAULT '',
	`role` text NOT NULL DEFAULT (''),
	`scope` json DEFAULT ('[]'),
	`year` varchar(20) NOT NULL DEFAULT '',
	`description` text NOT NULL DEFAULT (''),
	`tagline` varchar(255) NOT NULL DEFAULT '',
	`coverImage` text DEFAULT (''),
	`context` text DEFAULT (''),
	`challenge` text DEFAULT (''),
	`approach` text DEFAULT (''),
	`execution` json DEFAULT ('[]'),
	`results` json DEFAULT ('[]'),
	`reflection` text DEFAULT (''),
	`tags` json DEFAULT ('[]'),
	`images` json DEFAULT ('[]'),
	`pdfUrl` text DEFAULT (''),
	`pptUrl` text DEFAULT (''),
	`externalUrl` text DEFAULT (''),
	`featured` boolean NOT NULL DEFAULT false,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `seo_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(50) NOT NULL,
	`title` varchar(255) DEFAULT '',
	`description` text DEFAULT (''),
	`slug` varchar(255) DEFAULT '',
	`canonical` text DEFAULT (''),
	`ogImage` text DEFAULT (''),
	`robots` varchar(100) DEFAULT 'index, follow',
	`includeInSitemap` boolean NOT NULL DEFAULT true,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `seo_settings_page_unique` UNIQUE(`page`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`siteName` varchar(100) DEFAULT 'RAPBAE',
	`siteTagline` varchar(255) DEFAULT '',
	`logoUrl` text DEFAULT (''),
	`faviconUrl` text DEFAULT (''),
	`primaryColor` varchar(20) DEFAULT '#111111',
	`secondaryColor` varchar(20) DEFAULT '#f7f5f2',
	`fontDisplay` varchar(100) DEFAULT 'Noto Serif KR',
	`fontBody` varchar(100) DEFAULT 'Noto Sans KR',
	`footerText` text DEFAULT (''),
	`navItems` json DEFAULT ('[]'),
	`heroTitle` text DEFAULT (''),
	`heroSubtitle` text DEFAULT (''),
	`heroCtaPrimary` varchar(100) DEFAULT '',
	`heroCtaSecondary` varchar(100) DEFAULT '',
	`heroBgImage` text DEFAULT (''),
	`keyMetrics` json DEFAULT ('[]'),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `media_assets` MODIFY COLUMN `category` enum('case-study','brand-note','profile','site','other') NOT NULL DEFAULT 'other';