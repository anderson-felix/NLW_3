import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1602813516930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "orphanage_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "ImageOrphanage",
            columnNames: ["orphanage_id"],
            referencedTableName: "orphanages",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE", //o onUpdate cascade vai atualizar todas imagens que tenha um mesmo registro, se eu não colocar essa opção ele vai atualizar o registro, mais os registros da imagem não, sendo que os registros da imagem referenciam ao seu registro principal(orfanato)
            onDelete: "CASCADE", // faz a mesma coisa que o onUpdate só que pra deletar
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images");
  }
}
