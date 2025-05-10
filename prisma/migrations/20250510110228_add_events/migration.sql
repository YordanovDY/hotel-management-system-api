-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
