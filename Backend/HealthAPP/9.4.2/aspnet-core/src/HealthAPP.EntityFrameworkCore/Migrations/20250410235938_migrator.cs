using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthAPP.Migrations
{
    /// <inheritdoc />
    public partial class migrator : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PreferredContactMethod",
                table: "Persons",
                newName: "PreferredContactMedthod");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PreferredContactMedthod",
                table: "Persons",
                newName: "PreferredContactMethod");
        }
    }
}
