import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
export async function POST (req) {
  try {
    const requestBody = await req.json()
    let { firstName, lastName, email, username, password } = requestBody
    await connectToDB()

    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        {
          message: 'User With this email already exists',
          data: createdUser
        },
        {
          status: 400
        }
      )
    }

    let encryptedPassword = await bcrypt.hash(password, 12)
    email = email.toLowerCase()
    username =
      username || `${firstName}${lastName}${parseInt(Math.random() * 100000)}`

    const createdUser = await User.create({
      ...requestBody,
      email,
      password: encryptedPassword,
      username
    })
    return NextResponse.json(
      {
        message: 'User registered successfully',
        data: createdUser
      },
      {
        status: 201
      }
    )
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      {
        message: 'Could not create new user.',
        data: null
      },
      {
        status: 500
      }
    )
  }
}
