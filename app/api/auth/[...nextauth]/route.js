import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          placeholder: 'Enter your email',
          type: 'email'
        },
        password: {
          label: 'Password',
          placeholder: 'Enter your Password',
          type: 'password'
        }
      },
      authorize: async (credentials, req) => {
        const { password, email } = credentials
        console.log({ password, email })
      }
    })
  ],

  callbacks: {
    session: async ({ session }) => {
      try {
        await connectToDB()
        const sessionUser = await User.findOne({
          email: session.user.email
        })
        session.user.id = sessionUser._id.toString()
        return session
      } catch (error) {
        console.log(error)
        return null
      }
    },
    signIn: async ({ profile }) => {
      try {
        await connectToDB()
        const userExists = await User.findOne({ email: profile.email })

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(' ', '').toLowerCase(),
            image: profile.picture
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
