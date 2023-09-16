import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // email: {
        //   label: 'Email',
        //   placeholder: 'Enter your email',
        //   type: 'email'
        // },
        // password: {
        //   label: 'Password',
        //   placeholder: 'Enter your Password',
        //   type: 'password'
        // }
      },
      authorize: async (credentials, req) => {
        try {
          const { password, email } = credentials
          await connectToDB()
          const user = await User.findOne({ email })
          if (!user) return null
          const isPasswordValid = bcrypt.compare(password, user.password)
          if (!isPasswordValid) return null
          return user
        } catch (error) {
          console.log(error)
          return null
        }
      }
    })
  ],
  session: 'jwt',
  pages: {
    signIn: '/'
  },
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
    signIn: async all => {
      try {
        let { profile, account, user } = all
        await connectToDB()
        if (account.type === 'credentials') {
          profile = user
        }
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
