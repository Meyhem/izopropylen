using Microsoft.EntityFrameworkCore.Migrations;

namespace Izopropylen.Data.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    Displayname = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountProjects",
                columns: table => new
                {
                    AccountId = table.Column<int>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false),
                    ProjectAccountRole = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountProjects", x => new { x.AccountId, x.ProjectId });
                    table.ForeignKey(
                        name: "FK_AccountProjects_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountProjects_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TranslationKeys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Key = table.Column<string>(nullable: true),
                    ProjectId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TranslationKeys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TranslationKeys_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TranslationValues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CultureCode = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    TranslationKeyId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TranslationValues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TranslationValues_TranslationKeys_TranslationKeyId",
                        column: x => x.TranslationKeyId,
                        principalTable: "TranslationKeys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountProjects_ProjectId",
                table: "AccountProjects",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_Username",
                table: "Accounts",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TranslationKeys_ProjectId",
                table: "TranslationKeys",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TranslationValues_TranslationKeyId",
                table: "TranslationValues",
                column: "TranslationKeyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountProjects");

            migrationBuilder.DropTable(
                name: "TranslationValues");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "TranslationKeys");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
