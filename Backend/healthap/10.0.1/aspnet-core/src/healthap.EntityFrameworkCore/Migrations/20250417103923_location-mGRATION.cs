using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace healthap.Migrations
{
    /// <inheritdoc />
    public partial class locationmGRATION : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProviderLocations_AbpUsers_ProviderId",
                table: "ProviderLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ProviderLocations_Institutions_LocationId",
                table: "ProviderLocations");

            migrationBuilder.DropIndex(
                name: "IX_ProviderLocations_LocationId",
                table: "ProviderLocations");

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

            migrationBuilder.AddColumn<int>(
                name: "InstitutionId",
                table: "Providers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Specialization",
                table: "ProviderLocations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstitutionId",
                table: "ProviderLocations",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstitutionId",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Speciality",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpecialtyName = table.Column<int>(type: "int", nullable: false),
                    ProviderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InstitutionId = table.Column<int>(type: "int", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speciality", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speciality_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Speciality_Providers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Providers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Providers_InstitutionId",
                table: "Providers",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderLocations_InstitutionId",
                table: "ProviderLocations",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_InstitutionId",
                table: "Appointments",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Speciality_InstitutionId",
                table: "Speciality",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Speciality_ProviderId",
                table: "Speciality",
                column: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Institutions_InstitutionId",
                table: "Appointments",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderLocations_AbpUsers_ProviderId",
                table: "ProviderLocations",
                column: "ProviderId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderLocations_Institutions_InstitutionId",
                table: "ProviderLocations",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Institutions_InstitutionId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_ProviderLocations_AbpUsers_ProviderId",
                table: "ProviderLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_ProviderLocations_Institutions_InstitutionId",
                table: "ProviderLocations");

            migrationBuilder.DropForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers");

            migrationBuilder.DropTable(
                name: "Speciality");

            migrationBuilder.DropIndex(
                name: "IX_Providers_InstitutionId",
                table: "Providers");

            migrationBuilder.DropIndex(
                name: "IX_ProviderLocations_InstitutionId",
                table: "ProviderLocations");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_InstitutionId",
                table: "Appointments");

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
                name: "InstitutionId",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "State",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "ProviderLocations");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "Appointments");

            migrationBuilder.AlterColumn<string>(
                name: "Specialization",
                table: "ProviderLocations",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProviderLocations_LocationId",
                table: "ProviderLocations",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderLocations_AbpUsers_ProviderId",
                table: "ProviderLocations",
                column: "ProviderId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderLocations_Institutions_LocationId",
                table: "ProviderLocations",
                column: "LocationId",
                principalTable: "Institutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
