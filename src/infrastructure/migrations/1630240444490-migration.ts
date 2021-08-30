import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1630240444490 implements MigrationInterface {
    name = 'migration1630240444490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`userId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` ADD CONSTRAINT \`FK_dc34d382b493ade1f70e834c4d3\` FOREIGN KEY (\`customerId\`) REFERENCES \`ownstoretest\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` DROP FOREIGN KEY \`FK_dc34d382b493ade1f70e834c4d3\``);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` CHANGE \`customerId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ownstoretest\`.\`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`ownstoretest\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
