import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1630239387490 implements MigrationInterface {
    name = 'migration1630239387490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`emailVerified\` \`emailVerified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`lastLogin\` \`lastLogin\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`gender\` \`gender\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`nonPromoRewardPoints\` \`nonPromoRewardPoints\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`promoRewardPoints\` \`promoRewardPoints\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`dateOfBirth\` \`dateOfBirth\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`number\` \`number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`complement\` \`complement\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`postalCode\` \`postalCode\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`postalCode\` \`postalCode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`complement\` \`complement\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`number\` \`number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`dateOfBirth\` \`dateOfBirth\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`promoRewardPoints\` \`promoRewardPoints\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`nonPromoRewardPoints\` \`nonPromoRewardPoints\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`gender\` \`gender\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` ADD \`createdAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`isActive\` \`isActive\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`lastLogin\` \`lastLogin\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` CHANGE \`emailVerified\` \`emailVerified\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` DROP COLUMN \`updatedAt\``);
    }

}
