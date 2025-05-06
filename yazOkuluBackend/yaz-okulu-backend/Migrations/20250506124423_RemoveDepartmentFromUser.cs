using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YazOkuluAPI.Migrations
{
    public partial class RemoveDepartmentFromUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // department_id sütununu sil
            migrationBuilder.DropForeignKey(
                name: "FK_users_departments_department_id",
                table: "users");

            migrationBuilder.DropIndex(
                name: "IX_users_department_id",
                table: "users");

            migrationBuilder.DropColumn(
                name: "department_id",
                table: "users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // department_id sütununu geri ekle
            migrationBuilder.AddColumn<int>(
                name: "department_id",
                table: "users",
                type: "integer",
                nullable: true);

            // department_id için index ekle
            migrationBuilder.CreateIndex(
                name: "IX_users_department_id",
                table: "users",
                column: "department_id");

            // department_id ile ilişkisini tekrar kur
            migrationBuilder.AddForeignKey(
                name: "FK_users_departments_department_id",
                table: "users",
                column: "department_id",
                principalTable: "departments",
                principalColumn: "id");
        }
    }
}
