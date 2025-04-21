using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace healthap.Migrations
{
    /// <inheritdoc />
    public partial class FixedCascadePathIssue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Providers_ProviderId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilty_Providers_ProviderId",
                table: "ProviderAvailabilty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProviderAvailabilty",
                table: "ProviderAvailabilty");

            migrationBuilder.RenameTable(
                name: "ProviderAvailabilty",
                newName: "ProviderAvailabilties");

            migrationBuilder.RenameIndex(
                name: "IX_ProviderAvailabilty_ProviderId",
                table: "ProviderAvailabilties",
                newName: "IX_ProviderAvailabilties_ProviderId");

            migrationBuilder.AddColumn<int>(
                name: "InstitutionId",
                table: "Providers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SpecialityName",
                table: "Providers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ProviderId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "PatientId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstitutionId",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ProviderId",
                table: "ProviderAvailabilties",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "ProviderAvailabilties",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProviderAvailabilties",
                table: "ProviderAvailabilties",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Institutions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    City = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    State = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Country = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FacilityType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PlaceId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    GoogleMapsUrl = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
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
                    table.PrimaryKey("PK_Institutions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProviderLocations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    ProviderId = table.Column<long>(type: "bigint", nullable: false),
                    Specialization = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_ProviderLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProviderLocations_AbpUsers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProviderLocations_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Specialities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialtyName = table.Column<int>(type: "int", nullable: false),
                    ProviderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InstitutionId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Specialities_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Specialities_Providers_ProviderId",
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
                name: "IX_Appointments_InstitutionId",
                table: "Appointments",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderLocations_InstitutionId",
                table: "ProviderLocations",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderLocations_ProviderId",
                table: "ProviderLocations",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Specialities_InstitutionId",
                table: "Specialities",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Specialities_ProviderId",
                table: "Specialities",
                column: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Institutions_InstitutionId",
                table: "Appointments",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Providers_ProviderId",
                table: "Appointments",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilties_Providers_ProviderId",
                table: "ProviderAvailabilties",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_Appointments_Institutions_InstitutionId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Providers_ProviderId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilties_Providers_ProviderId",
                table: "ProviderAvailabilties");

            migrationBuilder.DropForeignKey(
                name: "FK_Providers_Institutions_InstitutionId",
                table: "Providers");

            migrationBuilder.DropTable(
                name: "ProviderLocations");

            migrationBuilder.DropTable(
                name: "Specialities");

            migrationBuilder.DropTable(
                name: "Institutions");

            migrationBuilder.DropIndex(
                name: "IX_Providers_InstitutionId",
                table: "Providers");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_InstitutionId",
                table: "Appointments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProviderAvailabilties",
                table: "ProviderAvailabilties");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "SpecialityName",
                table: "Providers");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "ProviderAvailabilties");

            migrationBuilder.RenameTable(
                name: "ProviderAvailabilties",
                newName: "ProviderAvailabilty");

            migrationBuilder.RenameIndex(
                name: "IX_ProviderAvailabilties_ProviderId",
                table: "ProviderAvailabilty",
                newName: "IX_ProviderAvailabilty_ProviderId");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProviderId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "PatientId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProviderId",
                table: "ProviderAvailabilty",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProviderAvailabilty",
                table: "ProviderAvailabilty",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Patients_PatientId",
                table: "Appointments",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Providers_ProviderId",
                table: "Appointments",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilty_Providers_ProviderId",
                table: "ProviderAvailabilty",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id");
        }
    }
}
