-- CreateTable
CREATE TABLE "InvalidToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "InvalidToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InvalidToken" ADD CONSTRAINT "InvalidToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
