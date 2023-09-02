import User from '@/models/user'
import { connectToDB } from '@/utils/database'
import { NextResponse } from 'next/server'

export async function POST (req) {
  try {
    const requestBody = await req.json()
    let { firstName, lastName, email, username } = requestBody
    email = email.toLowerCase()
    username =
      username || `${firstName}${lastName}${parseInt(Math.random() * 100000)}`
    await connectToDB()
    const createdUser = await User.create({
      ...requestBody,
      email,
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
