using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BookingApi.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("10dac2d7-1cb1-4d82-839e-343072429624"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("632898b3-d675-4b4f-bf49-cf8c629ddb8c"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("888d34ef-e815-42f3-bccf-21f51981b1d3"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("8d314818-a01d-4d60-8b26-dc7d047693ae"));

            migrationBuilder.InsertData(
                table: "BookingStatuses",
                columns: new[] { "BookingStatusId", "BookingStatusName", "IsVisible" },
                values: new object[,]
                {
                    { new Guid("00487a5f-a338-4e75-b403-c539808eceb6"), "Đang xử lý", true },
                    { new Guid("1fe8229e-dcca-47fe-a82a-fd8ff149c304"), "Đã hoàn thành", true },
                    { new Guid("23a8e766-9b1a-4fee-8dd1-0c8f7586ec74"), "Đã xác nhận", true },
                    { new Guid("4806f379-e8bd-48ec-8b96-be5ce5bb4c5f"), "Đã hủy", true },
                    { new Guid("922f16ba-73bd-4895-90e3-97ba5f11671f"), "Đã đặt cọc", true }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("00487a5f-a338-4e75-b403-c539808eceb6"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("1fe8229e-dcca-47fe-a82a-fd8ff149c304"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("23a8e766-9b1a-4fee-8dd1-0c8f7586ec74"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("4806f379-e8bd-48ec-8b96-be5ce5bb4c5f"));

            migrationBuilder.DeleteData(
                table: "BookingStatuses",
                keyColumn: "BookingStatusId",
                keyValue: new Guid("922f16ba-73bd-4895-90e3-97ba5f11671f"));

            migrationBuilder.InsertData(
                table: "BookingStatuses",
                columns: new[] { "BookingStatusId", "BookingStatusName", "IsVisible" },
                values: new object[,]
                {
                    { new Guid("10dac2d7-1cb1-4d82-839e-343072429624"), "Đã hủy", true },
                    { new Guid("632898b3-d675-4b4f-bf49-cf8c629ddb8c"), "Đã xác nhận", true },
                    { new Guid("888d34ef-e815-42f3-bccf-21f51981b1d3"), "Đang xử lý", true },
                    { new Guid("8d314818-a01d-4d60-8b26-dc7d047693ae"), "Đã hoàn thành", true }
                });
        }
    }
}
