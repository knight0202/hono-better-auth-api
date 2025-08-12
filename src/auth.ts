import { betterAuth } from "better-auth";
import {PrismaClient} from "@prisma/client";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {admin, genericOAuth, multiSession, openAPI} from "better-auth/plugins";

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
        /**
         * 관리자 기능 활성화
         */
        admin(),
        /**
         * 멀티 세션 활성화
         */
        multiSession(),
        /**
         * 커스텀 소셜 로그인 기능 (NAVER, KAKAO)
         */
        genericOAuth({
            config: [
                {
                    providerId: "kakao",
                    clientId: process.env.KAKAO_CLIENT_ID || "",
                    clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
                    discoveryUrl: "https://kauth.kakao.com/.well-known/openid-configuration",
                },
                {
                    providerId: "naver",
                    clientId: process.env.NAVER_CLIENT_ID || "",
                    clientSecret: process.env.NAVER_CLIENT_SECRET || "",
                    discoveryUrl: "https://nid.naver.com/.well-known/openid-configuration",
                }
            ]
        })
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        },
        apple: {
            clientId: process.env.APPLE_CLIENT_ID || "",
            clientSecret: process.env.APPLE_CLIENT_SECRET || ""
        },
    },
});
