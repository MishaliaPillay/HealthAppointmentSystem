using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace healthap.Migrations
{
    /// <inheritdoc />
    public partial class MappingOutTheRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProviderLocation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProviderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LocationId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProviderLocation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProviderLocation_Location_LocationId1",
                        column: x => x.LocationId1,
                        principalTable: "Location",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProviderLocation_Providers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Providers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Speciality",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpecialtyName = table.Column<int>(type: "int", nullable: false),
                    ProviderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speciality", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speciality_Providers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Providers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_LocationId",
                table: "Appointments",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderLocation_LocationId1",
                table: "ProviderLocation",
                column: "LocationId1");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderLocation_ProviderId",
                table: "ProviderLocation",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Speciality_ProviderId",
                table: "Speciality",
                column: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Location_LocationId",
                table: "Appointments",
                column: "LocationId",
                principalTable: "Location",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Location_LocationId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "ProviderLocation");

            migrationBuilder.DropTable(
                name: "Speciality");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_LocationId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "Appointments");
        }
    }
}
