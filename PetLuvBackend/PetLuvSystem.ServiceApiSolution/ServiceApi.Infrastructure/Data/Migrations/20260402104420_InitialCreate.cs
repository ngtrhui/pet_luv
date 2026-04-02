using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ServiceApi.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ServiceTypes",
                keyColumn: "ServiceTypeId",
                keyValue: new Guid("14039a05-c713-4853-9331-4d4871cd78df"));

            migrationBuilder.DeleteData(
                table: "ServiceTypes",
                keyColumn: "ServiceTypeId",
                keyValue: new Guid("c74b751b-56cc-4f9e-92eb-d08032f7af3b"));

            migrationBuilder.DeleteData(
                table: "ServiceTypes",
                keyColumn: "ServiceTypeId",
                keyValue: new Guid("d734146d-3fa5-42cc-bb0b-621c186badb4"));

            migrationBuilder.InsertData(
                table: "ServiceTypes",
                columns: new[] { "ServiceTypeId", "IsVisible", "ServiceTypeDesc", "ServiceTypeName" },
                values: new object[,]
                {
                    { new Guid("4649046c-cc77-4aa1-b743-2837a60f88d7"), false, "Cung cấp các dịch vụ spa cho thú cưng trực tiếp tại cửa hàng", "Dịch vụ spa" },
                    { new Guid("7ced06cb-8862-41de-ad76-2f4ddf7a2387"), false, "Nếu bạn đang quá bận để giúp cún cưng của mình giải tỏa năng lượng, hãy để chúng tôi giúp bạn làm điều đó", "Dịch vụ dắt chó đi dạo" },
                    { new Guid("a773e087-0e21-4301-a5df-1273620688a5"), false, "Chúng tôi sẵn sàng trực tiếp đến nhà chăm sóc cho \"boss\" của bạn nếu bạn đang quá bận", "Dịch vụ spa tại nhà" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ServiceTypes",
                keyColumn: "ServiceTypeId",
                keyValue: new Guid("4649046c-cc77-4aa1-b743-2837a60f88d7"));

            migrationBuilder.DeleteData(
                table: "ServiceTypes",
                keyColumn: "ServiceTypeId",
                keyValue: new Guid("7ced06cb-8862-41de-ad76-2f4ddf7a2387"));

            migrationBuilder.DeleteData(
                table: "ServiceTypes",
                keyColumn: "ServiceTypeId",
                keyValue: new Guid("a773e087-0e21-4301-a5df-1273620688a5"));

            migrationBuilder.InsertData(
                table: "ServiceTypes",
                columns: new[] { "ServiceTypeId", "IsVisible", "ServiceTypeDesc", "ServiceTypeName" },
                values: new object[,]
                {
                    { new Guid("14039a05-c713-4853-9331-4d4871cd78df"), false, "Chúng tôi sẵn sàng trực tiếp đến nhà chăm sóc cho \"boss\" của bạn nếu bạn đang quá bận", "Dịch vụ spa tại nhà" },
                    { new Guid("c74b751b-56cc-4f9e-92eb-d08032f7af3b"), false, "Cung cấp các dịch vụ spa cho thú cưng trực tiếp tại cửa hàng", "Dịch vụ spa" },
                    { new Guid("d734146d-3fa5-42cc-bb0b-621c186badb4"), false, "Nếu bạn đang quá bận để giúp cún cưng của mình giải tỏa năng lượng, hãy để chúng tôi giúp bạn làm điều đó", "Dịch vụ dắt chó đi dạo" }
                });
        }
    }
}
