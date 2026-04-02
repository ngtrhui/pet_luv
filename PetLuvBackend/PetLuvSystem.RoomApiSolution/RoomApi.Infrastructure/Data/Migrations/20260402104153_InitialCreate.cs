using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RoomApi.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("320b9a5c-9d10-4bb3-995c-0748afed26be") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6") });

            migrationBuilder.DeleteData(
                table: "RoomAccessories",
                keyColumn: "RoomAccessoryId",
                keyValue: new Guid("315877c2-c057-4f35-80b0-1af37b84529d"));

            migrationBuilder.DeleteData(
                table: "RoomAccessories",
                keyColumn: "RoomAccessoryId",
                keyValue: new Guid("46d6e8c3-4c53-4b2a-80c6-0f9138b49e7d"));

            migrationBuilder.DeleteData(
                table: "RoomAccessories",
                keyColumn: "RoomAccessoryId",
                keyValue: new Guid("56ce2368-f739-465b-ba7d-7f81a98309c0"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("dd027e4c-06d4-409d-8d3c-58d9d55261fe"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("320b9a5c-9d10-4bb3-995c-0748afed26be"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6"));

            migrationBuilder.DeleteData(
                table: "RoomTypes",
                keyColumn: "RoomTypeId",
                keyValue: new Guid("059bc604-cb72-46fa-b1a1-2540c041093a"));

            migrationBuilder.DeleteData(
                table: "RoomTypes",
                keyColumn: "RoomTypeId",
                keyValue: new Guid("2c5147ae-5d4a-40e3-a3a3-4c7028c2169b"));

            migrationBuilder.DeleteData(
                table: "RoomTypes",
                keyColumn: "RoomTypeId",
                keyValue: new Guid("54d7e43b-ebd8-428d-8df1-825be9141de8"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "101.jpg",
                column: "RoomId",
                value: new Guid("9cbe5159-058d-4021-95f0-66a3deb96226"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "202.jpg",
                column: "RoomId",
                value: new Guid("bd0d3a46-dfd5-4a76-bd29-dd5aec099207"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "303.jpg",
                column: "RoomId",
                value: new Guid("442a2f8f-d71d-4426-99bd-091799147c7c"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "404.jpg",
                column: "RoomId",
                value: new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "505.jpg",
                column: "RoomId",
                value: new Guid("a1210a7c-a138-4e72-bdbc-9eaaffd11192"));

            migrationBuilder.InsertData(
                table: "RoomTypes",
                columns: new[] { "RoomTypeId", "IsVisible", "RoomTypeDesc", "RoomTypeName" },
                values: new object[,]
                {
                    { new Guid("0c391bbe-fff6-4578-ba12-ab3497927553"), true, "Dành cho nhiều thú cưng cùng ở", "Phòng Gia Đình" },
                    { new Guid("25f4b852-e34e-435d-88f9-7207e8d00149"), true, "Phòng rộng rãi, tiện nghi cao cấp", "Phòng VIP" },
                    { new Guid("9115f1c9-5d04-4199-9ba1-b507d5b14866"), true, "Phòng cơ bản cho thú cưng nhỏ", "Phòng Tiêu Chuẩn" }
                });

            migrationBuilder.InsertData(
                table: "RoomAccessories",
                columns: new[] { "RoomAccessoryId", "IsVisible", "RoomAccessoryDesc", "RoomAccessoryImagePath", "RoomAccessoryName", "RoomTypeId", "ServiceId" },
                values: new object[,]
                {
                    { new Guid("41fe86ff-efa4-4686-938c-3060e74206bc"), true, "Cho mèo chơi và tập thể dục", "cayleo.jpg", "Cây leo", new Guid("25f4b852-e34e-435d-88f9-7207e8d00149"), new Guid("280dad45-5bcf-4ff8-942b-43407af1b8d1") },
                    { new Guid("6050f700-f906-4366-b140-be301d6f2d15"), true, "Quan sát thú cưng từ xa", "camera.jpg", "Camera", new Guid("25f4b852-e34e-435d-88f9-7207e8d00149"), new Guid("7fae2056-1267-4372-b59c-d40287de8aad") },
                    { new Guid("992ff21f-ab7f-47c8-9477-ba3a5c5dc10b"), true, "Khay vệ sinh cho mèo", "khaycat.jpg", "Khay cát", new Guid("0c391bbe-fff6-4578-ba12-ab3497927553"), new Guid("4709e073-15e2-46a6-90a4-4a89f19b6415") }
                });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "RoomId", "IsVisible", "PricePerDay", "PricePerHour", "RoomDesc", "RoomName", "RoomTypeId" },
                values: new object[,]
                {
                    { new Guid("442a2f8f-d71d-4426-99bd-091799147c7c"), true, 450000m, 70000m, "Phòng gia đình, cho mèo", "Phòng 303", new Guid("0c391bbe-fff6-4578-ba12-ab3497927553") },
                    { new Guid("9cbe5159-058d-4021-95f0-66a3deb96226"), true, 300000m, 50000m, "Phòng nhỏ, phù hợp chó con", "Phòng 101", new Guid("9115f1c9-5d04-4199-9ba1-b507d5b14866") },
                    { new Guid("bd0d3a46-dfd5-4a76-bd29-dd5aec099207"), true, 500000m, 80000m, "Phòng VIP cho mèo quý tộc", "Phòng 202", new Guid("25f4b852-e34e-435d-88f9-7207e8d00149") },
                    { new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac"), true, 600000m, 90000m, "Phòng nhỏ cho mèo", "Phòng 404", new Guid("9115f1c9-5d04-4199-9ba1-b507d5b14866") }
                });

            migrationBuilder.InsertData(
                table: "AgreeableBreeds",
                columns: new[] { "BreedId", "RoomId" },
                values: new object[,]
                {
                    { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("442a2f8f-d71d-4426-99bd-091799147c7c") },
                    { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("442a2f8f-d71d-4426-99bd-091799147c7c") },
                    { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("bd0d3a46-dfd5-4a76-bd29-dd5aec099207") },
                    { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac") },
                    { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("442a2f8f-d71d-4426-99bd-091799147c7c") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("442a2f8f-d71d-4426-99bd-091799147c7c") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("bd0d3a46-dfd5-4a76-bd29-dd5aec099207") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac") });

            migrationBuilder.DeleteData(
                table: "AgreeableBreeds",
                keyColumns: new[] { "BreedId", "RoomId" },
                keyValues: new object[] { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac") });

            migrationBuilder.DeleteData(
                table: "RoomAccessories",
                keyColumn: "RoomAccessoryId",
                keyValue: new Guid("41fe86ff-efa4-4686-938c-3060e74206bc"));

            migrationBuilder.DeleteData(
                table: "RoomAccessories",
                keyColumn: "RoomAccessoryId",
                keyValue: new Guid("6050f700-f906-4366-b140-be301d6f2d15"));

            migrationBuilder.DeleteData(
                table: "RoomAccessories",
                keyColumn: "RoomAccessoryId",
                keyValue: new Guid("992ff21f-ab7f-47c8-9477-ba3a5c5dc10b"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("9cbe5159-058d-4021-95f0-66a3deb96226"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("442a2f8f-d71d-4426-99bd-091799147c7c"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("bd0d3a46-dfd5-4a76-bd29-dd5aec099207"));

            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "RoomId",
                keyValue: new Guid("c8c2fec0-924e-42cf-95e1-5a56c74566ac"));

            migrationBuilder.DeleteData(
                table: "RoomTypes",
                keyColumn: "RoomTypeId",
                keyValue: new Guid("0c391bbe-fff6-4578-ba12-ab3497927553"));

            migrationBuilder.DeleteData(
                table: "RoomTypes",
                keyColumn: "RoomTypeId",
                keyValue: new Guid("25f4b852-e34e-435d-88f9-7207e8d00149"));

            migrationBuilder.DeleteData(
                table: "RoomTypes",
                keyColumn: "RoomTypeId",
                keyValue: new Guid("9115f1c9-5d04-4199-9ba1-b507d5b14866"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "101.jpg",
                column: "RoomId",
                value: new Guid("dd027e4c-06d4-409d-8d3c-58d9d55261fe"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "202.jpg",
                column: "RoomId",
                value: new Guid("320b9a5c-9d10-4bb3-995c-0748afed26be"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "303.jpg",
                column: "RoomId",
                value: new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "404.jpg",
                column: "RoomId",
                value: new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054"));

            migrationBuilder.UpdateData(
                table: "RoomImages",
                keyColumn: "RoomImagePath",
                keyValue: "505.jpg",
                column: "RoomId",
                value: new Guid("add075db-a9a0-4107-8dec-d4090b43a305"));

            migrationBuilder.InsertData(
                table: "RoomTypes",
                columns: new[] { "RoomTypeId", "IsVisible", "RoomTypeDesc", "RoomTypeName" },
                values: new object[,]
                {
                    { new Guid("059bc604-cb72-46fa-b1a1-2540c041093a"), true, "Phòng rộng rãi, tiện nghi cao cấp", "Phòng VIP" },
                    { new Guid("2c5147ae-5d4a-40e3-a3a3-4c7028c2169b"), true, "Dành cho nhiều thú cưng cùng ở", "Phòng Gia Đình" },
                    { new Guid("54d7e43b-ebd8-428d-8df1-825be9141de8"), true, "Phòng cơ bản cho thú cưng nhỏ", "Phòng Tiêu Chuẩn" }
                });

            migrationBuilder.InsertData(
                table: "RoomAccessories",
                columns: new[] { "RoomAccessoryId", "IsVisible", "RoomAccessoryDesc", "RoomAccessoryImagePath", "RoomAccessoryName", "RoomTypeId", "ServiceId" },
                values: new object[,]
                {
                    { new Guid("315877c2-c057-4f35-80b0-1af37b84529d"), true, "Khay vệ sinh cho mèo", "khaycat.jpg", "Khay cát", new Guid("2c5147ae-5d4a-40e3-a3a3-4c7028c2169b"), new Guid("fb42c512-3dd6-4fce-8a97-a683522ad691") },
                    { new Guid("46d6e8c3-4c53-4b2a-80c6-0f9138b49e7d"), true, "Cho mèo chơi và tập thể dục", "cayleo.jpg", "Cây leo", new Guid("059bc604-cb72-46fa-b1a1-2540c041093a"), new Guid("3591729e-3199-4bce-95e4-c502b8907e8c") },
                    { new Guid("56ce2368-f739-465b-ba7d-7f81a98309c0"), true, "Quan sát thú cưng từ xa", "camera.jpg", "Camera", new Guid("059bc604-cb72-46fa-b1a1-2540c041093a"), new Guid("92432a57-5845-42a8-bdf2-c5c8c84c43a9") }
                });

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "RoomId", "IsVisible", "PricePerDay", "PricePerHour", "RoomDesc", "RoomName", "RoomTypeId" },
                values: new object[,]
                {
                    { new Guid("320b9a5c-9d10-4bb3-995c-0748afed26be"), true, 500000m, 80000m, "Phòng VIP cho mèo quý tộc", "Phòng 202", new Guid("059bc604-cb72-46fa-b1a1-2540c041093a") },
                    { new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054"), true, 600000m, 90000m, "Phòng nhỏ cho mèo", "Phòng 404", new Guid("54d7e43b-ebd8-428d-8df1-825be9141de8") },
                    { new Guid("dd027e4c-06d4-409d-8d3c-58d9d55261fe"), true, 300000m, 50000m, "Phòng nhỏ, phù hợp chó con", "Phòng 101", new Guid("54d7e43b-ebd8-428d-8df1-825be9141de8") },
                    { new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6"), true, 450000m, 70000m, "Phòng gia đình, cho mèo", "Phòng 303", new Guid("2c5147ae-5d4a-40e3-a3a3-4c7028c2169b") }
                });

            migrationBuilder.InsertData(
                table: "AgreeableBreeds",
                columns: new[] { "BreedId", "RoomId" },
                values: new object[,]
                {
                    { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("320b9a5c-9d10-4bb3-995c-0748afed26be") },
                    { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054") },
                    { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("60bc2bbd-1ac1-48b5-a45e-47b0bbbbd054") },
                    { new Guid("aaae8a7b-abd1-4169-0383-08dd6a9d0b8b"), new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6") },
                    { new Guid("f5614fe7-b506-4379-d3fa-08dd53047a20"), new Guid("fef78c40-202a-482c-a9fd-0cf9e5756bb6") }
                });
        }
    }
}
