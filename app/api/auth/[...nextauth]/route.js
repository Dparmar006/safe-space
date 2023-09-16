import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import authOptions from '../../../../utils/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
