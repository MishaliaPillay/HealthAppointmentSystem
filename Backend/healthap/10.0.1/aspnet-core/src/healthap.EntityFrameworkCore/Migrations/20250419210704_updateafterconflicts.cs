using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace healthap.Migrations
{
    /// <inheritdoc />
    public partial class updateafterconflicts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilities_AbpUsers_ProviderId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilities_Institutions_InstitutionId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropTable(
                name: "ProviderAvailabilty");

            migrationBuilder.DropIndex(
                name: "IX_ProviderAvailabilities_InstitutionId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropColumn(
                name: "Specialization",
                table: "ProviderAvailabilities");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "ProviderAvailabilities",
                newName: "IsAvailable");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Specialities",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProviderId",
                table: "ProviderAvailabilities",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "ProviderAvailabilities",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "EndTime",
                table: "ProviderAvailabilities",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "StartTime",
                table: "ProviderAvailabilities",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilities_Providers_ProviderId",
                table: "ProviderAvailabilities",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProviderAvailabilities_Providers_ProviderId",
                table: "ProviderAvailabilities");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "ProviderAvailabilities");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "ProviderAvailabilities");

            migrationBuilder.RenameColumn(
                name: "IsAvailable",
                table: "ProviderAvailabilities",
                newName: "IsActive");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Specialities",
                type: "int",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "ProviderId",
                table: "ProviderAvailabilities",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ProviderAvailabilities",
                type: "int",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "InstitutionId",
                table: "ProviderAvailabilities",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "ProviderAvailabilities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Specialization",
                table: "ProviderAvailabilities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProviderAvailabilty",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProviderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProviderAvailabilty", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProviderAvailabilty_Providers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "Providers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProviderAvailabilities_InstitutionId",
                table: "ProviderAvailabilities",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderAvailabilty_ProviderId",
                table: "ProviderAvailabilty",
                column: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilities_AbpUsers_ProviderId",
                table: "ProviderAvailabilities",
                column: "ProviderId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProviderAvailabilities_Institutions_InstitutionId",
                table: "ProviderAvailabilities",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");
        }
    }
}
