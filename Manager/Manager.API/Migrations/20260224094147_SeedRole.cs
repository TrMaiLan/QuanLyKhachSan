using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Manager.API.Migrations
{
    /// <inheritdoc />
    public partial class SeedRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3c926fbf-82dd-4291-8d56-f5e27eaf7672", null, "Admin", "ADMIN" },
                    { "bbdd5e7d-3f89-497b-a84f-2a5eddf3432a", null, "Manager", "MANAGER" },
                    { "dd452e5b-ec08-4bca-ad04-a66246daea97", null, "Guest", "GUEST" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c926fbf-82dd-4291-8d56-f5e27eaf7672");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bbdd5e7d-3f89-497b-a84f-2a5eddf3432a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dd452e5b-ec08-4bca-ad04-a66246daea97");
        }
    }
}
