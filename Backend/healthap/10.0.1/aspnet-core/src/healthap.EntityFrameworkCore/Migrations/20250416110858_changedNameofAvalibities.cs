using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace healthap.Migrations
{
    /// <inheritdoc />
    public partial class changedNameofAvalibities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilities_Providers_ProviderId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProviderAvailabilities",
                table: "ProviderAvailabilities");

            migrationBuilder.RenameTable(
                name: "ProviderAvailabilities",
                newName: "ProviderAvailabilty");

            migrationBuilder.RenameIndex(
                name: "IX_ProviderAvailabilities_ProviderId",
                table: "ProviderAvailabilty",
                newName: "IX_ProviderAvailabilty_ProviderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProviderAvailabilty",
                table: "ProviderAvailabilty",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilty_Providers_ProviderId",
                table: "ProviderAvailabilty",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilty_Providers_ProviderId",
                table: "ProviderAvailabilty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProviderAvailabilty",
                table: "ProviderAvailabilty");

            migrationBuilder.RenameTable(
                name: "ProviderAvailabilty",
                newName: "ProviderAvailabilities");

            migrationBuilder.RenameIndex(
                name: "IX_ProviderAvailabilty_ProviderId",
                table: "ProviderAvailabilities",
                newName: "IX_ProviderAvailabilities_ProviderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProviderAvailabilities",
                table: "ProviderAvailabilities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilities_Providers_ProviderId",
                table: "ProviderAvailabilities",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id");
        }
    }
}
