-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(32) NULL,
    `user_phone` CHAR(11) NOT NULL,
    `user_gender` ENUM('여성', '남성') NOT NULL,
    `birth_data` DATE NOT NULL,
    `address` TEXT NOT NULL,
    `role` ENUM('일반 사용자', '가게 운영자') NOT NULL,
    `point` INTEGER NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `preferences` JSON NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `food_category_id` BIGINT NOT NULL AUTO_INCREMENT,
    `food_category_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`food_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_food_category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `food_category_id` BIGINT NOT NULL,
    `id2` BIGINT NOT NULL,

    INDEX `food_category_id`(`food_category_id`),
    INDEX `id2`(`id2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_food_category` ADD CONSTRAINT `user_food_category_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`food_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_food_category` ADD CONSTRAINT `user_food_category_id2_fkey` FOREIGN KEY (`id2`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
