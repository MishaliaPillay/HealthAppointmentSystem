using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthAPP.Migrations
{
    /// <inheritdoc />
    public partial class migrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PreferredContactMedthod",
                table: "Persons",
                newName: "PreferredContactMethod");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PreferredContactMethod",
                table: "Persons",
                newName: "PreferredContactMedthod");
        }
    }
}
