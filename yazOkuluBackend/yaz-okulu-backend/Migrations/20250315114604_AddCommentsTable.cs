using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YazOkuluAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_courses_CourseId",
                table: "comments");

            migrationBuilder.DropForeignKey(
                name: "FK_comments_users_UserId",
                table: "comments");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "comments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "comments",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "comments",
                newName: "created_at");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "comments",
                newName: "course_id");

            migrationBuilder.RenameColumn(
                name: "CommentText",
                table: "comments",
                newName: "comment_text");

            migrationBuilder.RenameIndex(
                name: "IX_comments_UserId",
                table: "comments",
                newName: "IX_comments_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_comments_CourseId",
                table: "comments",
                newName: "IX_comments_course_id");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_courses_course_id",
                table: "comments",
                column: "course_id",
                principalTable: "courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_comments_users_user_id",
                table: "comments",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_comments_courses_course_id",
                table: "comments");

            migrationBuilder.DropForeignKey(
                name: "FK_comments_users_user_id",
                table: "comments");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "comments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "comments",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "comments",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "course_id",
                table: "comments",
                newName: "CourseId");

            migrationBuilder.RenameColumn(
                name: "comment_text",
                table: "comments",
                newName: "CommentText");

            migrationBuilder.RenameIndex(
                name: "IX_comments_user_id",
                table: "comments",
                newName: "IX_comments_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_comments_course_id",
                table: "comments",
                newName: "IX_comments_CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_comments_courses_CourseId",
                table: "comments",
                column: "CourseId",
                principalTable: "courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_comments_users_UserId",
                table: "comments",
                column: "UserId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
