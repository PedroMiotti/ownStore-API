import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1629981677905 implements MigrationInterface {
    name = 'migration1629981677905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ownstoretest\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL, \`password\` varchar(255) NOT NULL, \`lastLogin\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL, \`isAdmin\` tinyint NOT NULL, \`isStaff\` tinyint NOT NULL, \`createdAt\` varchar(255) NOT NULL, \`gender\` int NOT NULL, \`nonPromoRewardPoints\` int NOT NULL, \`promoRewardPoints\` int NOT NULL, \`dateOfBirth\` varchar(255) NOT NULL, \`defaultBillingAddressId\` int NULL, \`defaultShippingAddressId\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_86ad807d2e828f0368c3d05639\` (\`defaultBillingAddressId\`), UNIQUE INDEX \`REL_04e65cc7e9b7c9732e05a73873\` (\`defaultShippingAddressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ownstoretest\`.\`address\` (\`id\` int NOT NULL AUTO_INCREMENT, \`streetName\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`neighborhood\` varchar(255) NOT NULL, \`complement\` varchar(255) NOT NULL, \`postalCode\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` ADD CONSTRAINT \`FK_86ad807d2e828f0368c3d056395\` FOREIGN KEY (\`defaultBillingAddressId\`) REFERENCES \`ownstoretest\`.\`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` ADD CONSTRAINT \`FK_04e65cc7e9b7c9732e05a738735\` FOREIGN KEY (\`defaultShippingAddressId\`) REFERENCES \`ownstoretest\`.\`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`ownstoretest\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` DROP FOREIGN KEY \`FK_04e65cc7e9b7c9732e05a738735\``);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`user\` DROP FOREIGN KEY \`FK_86ad807d2e828f0368c3d056395\``);
        await queryRunner.query(`DROP TABLE \`ownstoretest\`.\`address\``);
        await queryRunner.query(`DROP INDEX \`REL_04e65cc7e9b7c9732e05a73873\` ON \`ownstoretest\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`REL_86ad807d2e828f0368c3d05639\` ON \`ownstoretest\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`ownstoretest\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`ownstoretest\`.\`user\``);
    }

}
