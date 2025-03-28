using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YazOkuluAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCourseEnrollmentsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_course_enrollments_courses_CourseId",
                table: "course_enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_course_enrollments_users_UserId",
                table: "course_enrollments");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "course_enrollments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "course_enrollments",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "EnrollmentDate",
                table: "course_enrollments",
                newName: "enrollment_date");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "course_enrollments",
                newName: "course_id");

            migrationBuilder.RenameIndex(
                name: "IX_course_enrollments_UserId",
                table: "course_enrollments",
                newName: "IX_course_enrollments_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_course_enrollments_CourseId",
                table: "course_enrollments",
                newName: "IX_course_enrollments_course_id");

            migrationBuilder.AddForeignKey(
                name: "FK_course_enrollments_courses_course_id",
                table: "course_enrollments",
                column: "course_id",
                principalTable: "courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_course_enrollments_users_user_id",
                table: "course_enrollments",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_course_enrollments_courses_course_id",
                table: "course_enrollments");

            migrationBuilder.DropForeignKey(
                name: "FK_course_enrollments_users_user_id",
                table: "course_enrollments");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "course_enrollments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "course_enrollments",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "enrollment_date",
                table: "course_enrollments",
                newName: "EnrollmentDate");

            migrationBuilder.RenameColumn(
                name: "course_id",
                table: "course_enrollments",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_course_enrollments_user_id",
                table: "course_enrollments",
                newName: "IX_course_enrollments_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_course_enrollments_course_id",
                table: "course_enrollments",
                newName: "IX_course_enrollments_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_course_enrollments_courses_CourseId",
                table: "course_enrollments",
                column: "CourseId",
                principalTable: "courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_course_enrollments_users_UserId",
                table: "course_enrollments",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
