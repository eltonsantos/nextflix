import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "elton@elton.com" && credentials?.password === "123456") {
          return {
            id: "1",
            email: credentials.email,
            name: "User Example",
          }
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/api/auth/login',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };