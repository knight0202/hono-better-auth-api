import { betterAuth } from "better-auth";
import {PrismaClient} from "@prisma/client";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {openAPI} from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        /**
         * Open API 활성화
         * api/auth/reference 접속시 문서 확인 가능
         */
        openAPI(),
    ]
});
