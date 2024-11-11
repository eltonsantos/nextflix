import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'; 

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
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email
        }

      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
});

export { handler as GET, handler as POST };