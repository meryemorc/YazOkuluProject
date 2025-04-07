using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YazOkuluAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddYgFacultyFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "whatsapp_link",
                table: "yatay_gecis_faculties");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "whatsapp_link",
                table: "yatay_gecis_faculties",
                type: "text",
                nullable: true);
        }
    }
}
