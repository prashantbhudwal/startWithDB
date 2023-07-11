-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'NONUSER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" DEFAULT 'USER';
