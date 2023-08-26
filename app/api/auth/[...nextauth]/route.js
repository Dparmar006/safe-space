import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: async ({ session }) => {
      try {
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
