using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PaymentApi.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "PaymentMethodId",
                keyValue: new Guid("32b0eca9-54fa-4a0f-9a5f-eca0731961ef"));

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "PaymentMethodId",
                keyValue: new Guid("f82ccee9-d212-4571-9a47-d987138dc452"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("1cc46efb-9607-4301-b972-9808b3ed7054"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("f50814ca-3f54-4778-bd6c-ce913cac8284"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("f6f4ad85-005b-40e0-a91f-c1a4ef811a32"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("fae369e6-f297-4ed7-9e4d-4ec3d6208264"));

            migrationBuilder.InsertData(
                table: "PaymentMethod",
                columns: new[] { "PaymentMethodId", "IsVisible", "PaymentMethodName" },
                values: new object[,]
                {
                    { new Guid("8869aa7c-ee5f-41f7-8ae2-7633da4bfa2a"), true, "Thanh toán tại cửa hàng" },
                    { new Guid("edec6add-cbf9-45b9-a1c8-64dbfb30d86f"), true, "Thanh toán qua VNPay" }
                });

            migrationBuilder.InsertData(
                table: "PaymentStatus",
                columns: new[] { "PaymentStatusId", "IsVisible", "PaymentStatusName" },
                values: new object[,]
                {
                    { new Guid("23050412-1103-4b2d-8dee-94c2b3c44b50"), true, "Đã đặt cọc" },
                    { new Guid("7396dbfc-f78c-4ddf-b2ab-13f25a9960d8"), true, "Thanh toán thất bại" },
                    { new Guid("75f8be1f-ab41-4e38-93b5-67e5840a3ece"), true, "Chờ thanh toán" },
                    { new Guid("b408b67b-962a-4297-86da-9ac849c00a90"), true, "Đã thanh toán" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "PaymentMethodId",
                keyValue: new Guid("8869aa7c-ee5f-41f7-8ae2-7633da4bfa2a"));

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "PaymentMethodId",
                keyValue: new Guid("edec6add-cbf9-45b9-a1c8-64dbfb30d86f"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("23050412-1103-4b2d-8dee-94c2b3c44b50"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("7396dbfc-f78c-4ddf-b2ab-13f25a9960d8"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("75f8be1f-ab41-4e38-93b5-67e5840a3ece"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("b408b67b-962a-4297-86da-9ac849c00a90"));

            migrationBuilder.InsertData(
                table: "PaymentMethod",
                columns: new[] { "PaymentMethodId", "IsVisible", "PaymentMethodName" },
                values: new object[,]
                {
                    { new Guid("32b0eca9-54fa-4a0f-9a5f-eca0731961ef"), true, "Thanh toán qua VNPay" },
                    { new Guid("f82ccee9-d212-4571-9a47-d987138dc452"), true, "Thanh toán tại cửa hàng" }
                });

            migrationBuilder.InsertData(
                table: "PaymentStatus",
                columns: new[] { "PaymentStatusId", "IsVisible", "PaymentStatusName" },
                values: new object[,]
                {
                    { new Guid("1cc46efb-9607-4301-b972-9808b3ed7054"), true, "Đã đặt cọc" },
                    { new Guid("f50814ca-3f54-4778-bd6c-ce913cac8284"), true, "Chờ thanh toán" },
                    { new Guid("f6f4ad85-005b-40e0-a91f-c1a4ef811a32"), true, "Đã thanh toán" },
                    { new Guid("fae369e6-f297-4ed7-9e4d-4ec3d6208264"), true, "Thanh toán thất bại" }
                });
        }
    }
}
