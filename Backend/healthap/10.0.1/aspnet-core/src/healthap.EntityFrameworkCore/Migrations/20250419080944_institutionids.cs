using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace healthap.Migrations
{
    /// <inheritdoc />
    public partial class institutionids : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "Speciality",
                table: "Providers");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Providers",
                newName: "Specialty");

            migrationBuilder.AlterColumn<int>(
                name: "InstitutionId",
                table: "Providers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers");

            migrationBuilder.RenameColumn(
                name: "Specialty",
                table: "Providers",
                newName: "State");

            migrationBuilder.AlterColumn<int>(
                name: "InstitutionId",
                table: "Providers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Speciality",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");
        }
    }
}
