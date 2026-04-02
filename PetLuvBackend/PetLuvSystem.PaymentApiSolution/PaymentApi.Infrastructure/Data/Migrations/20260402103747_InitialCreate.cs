using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PaymentApi.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { new Guid("75e66a65-3f45-4c14-8bbc-7fd7dc26f69c"), true, "Thanh toán qua VNPay" },
                    { new Guid("80fbd3e2-e19e-4573-963a-ff027aaee804"), true, "Thanh toán tại cửa hàng" }
                });

            migrationBuilder.InsertData(
                table: "PaymentStatus",
                columns: new[] { "PaymentStatusId", "IsVisible", "PaymentStatusName" },
                values: new object[,]
                {
                    { new Guid("06b25d24-4539-47ea-a288-1deb5869c543"), true, "Thanh toán thất bại" },
                    { new Guid("078de6ba-46d6-47fa-bd9d-aed1eafa3edf"), true, "Đã đặt cọc" },
                    { new Guid("c99bddfa-614b-4821-b7ab-ae95bbe67529"), true, "Đã thanh toán" },
                    { new Guid("f24898c6-0e60-4bd9-95d6-1f59530d7cc3"), true, "Chờ thanh toán" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "PaymentMethodId",
                keyValue: new Guid("75e66a65-3f45-4c14-8bbc-7fd7dc26f69c"));

            migrationBuilder.DeleteData(
                table: "PaymentMethod",
                keyColumn: "PaymentMethodId",
                keyValue: new Guid("80fbd3e2-e19e-4573-963a-ff027aaee804"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("06b25d24-4539-47ea-a288-1deb5869c543"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("078de6ba-46d6-47fa-bd9d-aed1eafa3edf"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("c99bddfa-614b-4821-b7ab-ae95bbe67529"));

            migrationBuilder.DeleteData(
                table: "PaymentStatus",
                keyColumn: "PaymentStatusId",
                keyValue: new Guid("f24898c6-0e60-4bd9-95d6-1f59530d7cc3"));

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
    }
}
