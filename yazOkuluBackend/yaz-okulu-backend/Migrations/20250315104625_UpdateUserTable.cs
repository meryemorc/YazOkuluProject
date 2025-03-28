using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YazOkuluAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_users_faculties_FacultyId",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "FacultyId",
                table: "users",
                newName: "DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_users_FacultyId",
                table: "users",
                newName: "IX_users_DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_users_departments_DepartmentId",
                table: "users",
                column: "DepartmentId",
                principalTable: "departments",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_users_departments_DepartmentId",
                table: "users");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                table: "users",
                newName: "FacultyId");

            migrationBuilder.RenameIndex(
                name: "IX_users_DepartmentId",
                table: "users",
                newName: "IX_users_FacultyId");

            migrationBuilder.AddForeignKey(
                name: "FK_users_faculties_FacultyId",
                table: "users",
                column: "FacultyId",
                principalTable: "faculties",
                principalColumn: "id");
        }
    }
}
