CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

BEGIN TRANSACTION;

CREATE TABLE "Activities" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Activities" PRIMARY KEY,
    "Title" TEXT NULL,
    "Date" TEXT NOT NULL,
    "Description" TEXT NULL,
    "Category" TEXT NULL,
    "City" TEXT NULL,
    "Venue" TEXT NULL
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211202142038_initialCreate', '6.0.0');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "AspNetRoles" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_AspNetRoles" PRIMARY KEY,
    "Name" TEXT NULL,
    "NormalizedName" TEXT NULL,
    "ConcurrencyStamp" TEXT NULL
);

CREATE TABLE "AspNetUsers" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_AspNetUsers" PRIMARY KEY,
    "DisplayName" TEXT NULL,
    "Bio" TEXT NULL,
    "UserName" TEXT NULL,
    "NormalizedUserName" TEXT NULL,
    "Email" TEXT NULL,
    "NormalizedEmail" TEXT NULL,
    "EmailConfirmed" INTEGER NOT NULL,
    "PasswordHash" TEXT NULL,
    "SecurityStamp" TEXT NULL,
    "ConcurrencyStamp" TEXT NULL,
    "PhoneNumber" TEXT NULL,
    "PhoneNumberConfirmed" INTEGER NOT NULL,
    "TwoFactorEnabled" INTEGER NOT NULL,
    "LockoutEnd" TEXT NULL,
    "LockoutEnabled" INTEGER NOT NULL,
    "AccessFailedCount" INTEGER NOT NULL
);

CREATE TABLE "AspNetRoleClaims" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY AUTOINCREMENT,
    "RoleId" TEXT NOT NULL,
    "ClaimType" TEXT NULL,
    "ClaimValue" TEXT NULL,
    CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserClaims" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY AUTOINCREMENT,
    "UserId" TEXT NOT NULL,
    "ClaimType" TEXT NULL,
    "ClaimValue" TEXT NULL,
    CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserLogins" (
    "LoginProvider" TEXT NOT NULL,
    "ProviderKey" TEXT NOT NULL,
    "ProviderDisplayName" TEXT NULL,
    "UserId" TEXT NOT NULL,
    CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey"),
    CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserRoles" (
    "UserId" TEXT NOT NULL,
    "RoleId" TEXT NOT NULL,
    CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId"),
    CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES "AspNetRoles" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE TABLE "AspNetUserTokens" (
    "UserId" TEXT NOT NULL,
    "LoginProvider" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Value" TEXT NULL,
    CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name"),
    CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "AspNetRoleClaims" ("RoleId");

CREATE UNIQUE INDEX "RoleNameIndex" ON "AspNetRoles" ("NormalizedName");

CREATE INDEX "IX_AspNetUserClaims_UserId" ON "AspNetUserClaims" ("UserId");

CREATE INDEX "IX_AspNetUserLogins_UserId" ON "AspNetUserLogins" ("UserId");

CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "AspNetUserRoles" ("RoleId");

CREATE INDEX "EmailIndex" ON "AspNetUsers" ("NormalizedEmail");

CREATE UNIQUE INDEX "UserNameIndex" ON "AspNetUsers" ("NormalizedUserName");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211214161722_IdentityAdded', '6.0.0');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "ActivityAttendees" (
    "AppUserId" TEXT NOT NULL,
    "ActivityId" TEXT NOT NULL,
    "IsHost" INTEGER NOT NULL,
    CONSTRAINT "PK_ActivityAttendees" PRIMARY KEY ("AppUserId", "ActivityId"),
    CONSTRAINT "FK_ActivityAttendees_Activities_ActivityId" FOREIGN KEY ("ActivityId") REFERENCES "Activities" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_ActivityAttendees_AspNetUsers_AppUserId" FOREIGN KEY ("AppUserId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_ActivityAttendees_ActivityId" ON "ActivityAttendees" ("ActivityId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211215134141_ActivityAttendee', '6.0.0');

COMMIT;

BEGIN TRANSACTION;

ALTER TABLE "Activities" ADD "IsCancelled" INTEGER NOT NULL DEFAULT 0;

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211217131017_AddCancelProperty', '6.0.0');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Photos" (
    "Id" TEXT NOT NULL CONSTRAINT "PK_Photos" PRIMARY KEY,
    "Url" TEXT NULL,
    "IsMain" INTEGER NOT NULL,
    "AppUserId" TEXT NULL,
    CONSTRAINT "FK_Photos_AspNetUsers_AppUserId" FOREIGN KEY ("AppUserId") REFERENCES "AspNetUsers" ("Id")
);

CREATE INDEX "IX_Photos_AppUserId" ON "Photos" ("AppUserId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211220105743_PhotoEntityAdded', '6.0.0');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "Comments" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Comments" PRIMARY KEY AUTOINCREMENT,
    "Body" TEXT NULL,
    "AuthorId" TEXT NULL,
    "ActivityId" TEXT NULL,
    "CreatedAt" TEXT NOT NULL,
    CONSTRAINT "FK_Comments_Activities_ActivityId" FOREIGN KEY ("ActivityId") REFERENCES "Activities" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_Comments_AspNetUsers_AuthorId" FOREIGN KEY ("AuthorId") REFERENCES "AspNetUsers" ("Id")
);

CREATE INDEX "IX_Comments_ActivityId" ON "Comments" ("ActivityId");

CREATE INDEX "IX_Comments_AuthorId" ON "Comments" ("AuthorId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211225165238_CommentEntityAdded', '6.0.0');

COMMIT;

BEGIN TRANSACTION;

CREATE TABLE "UserFollowings" (
    "ObserverId" TEXT NOT NULL,
    "TargetId" TEXT NOT NULL,
    CONSTRAINT "PK_UserFollowings" PRIMARY KEY ("ObserverId", "TargetId"),
    CONSTRAINT "FK_UserFollowings_AspNetUsers_ObserverId" FOREIGN KEY ("ObserverId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE,
    CONSTRAINT "FK_UserFollowings_AspNetUsers_TargetId" FOREIGN KEY ("TargetId") REFERENCES "AspNetUsers" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_UserFollowings_TargetId" ON "UserFollowings" ("TargetId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20211226111312_FollowingEntityAdded', '6.0.0');

COMMIT;

