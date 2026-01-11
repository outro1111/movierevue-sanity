import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { SanityAdapter } from "next-auth-sanity"
import { createClient } from "next-sanity"

// Sanity 클라이언트 생성 (쓰기 권한 토큰 포함)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // 중요! 쓰기 토큰
});

// 2. NextAuth 핸들러 설정
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: SanityAdapter(client), // SanityAdapter 연결
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // maxAge 설정을 생략하면 'Session Cookie'가 되어 브라우저 종료 시 삭제됩니다.
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // 세션에 유저 ID를 포함시키기 위한 설정(리뷰 작성시 필요)
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      // console.log('토큰', token)
      // console.log('세션', session)
      return session
    },
  },
});

export { handler as GET, handler as POST };