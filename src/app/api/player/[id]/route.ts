// app/api/player/[id]/route.ts

// Import necessary modules and functions for handling requests and database operations
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

// Define a Zod schema for validating the update request payload
const updateSchema = z.object({
  score: z.number().int(), // Score must be an integer
})

// Define an asynchronous function to handle PUT requests for updating a player's score
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } } // Destructure the player ID from request parameters
) {
  try {
    // Parse the incoming request body as JSON
    const body = await req.json()
    // Validate the parsed data against the defined Zod update schema
    const data = updateSchema.parse(body)

    // Update the player's score in the database with the validated data
    const updated = await prisma.player.update({
      where: { id: params.id },    // Find player by ID
      data: { score: data.score }, // Update the score
    })

    // Return the updated player as a JSON response
    return NextResponse.json(updated)
  } catch (error) {
    // If an error occurs during validation or database update, catch it
    // Return an error message as a JSON response with a status code of 400 (Bad Request)
    return NextResponse.json({ error: 'Invalid update' }, { status: 400 })
  }
}

// Define an asynchronous function to handle DELETE requests for removing a player
export async function DELETE(
  _: NextRequest, // Placeholder for the request; not used further
  { params }: { params: { id: string } } // Destructure the player ID from request parameters
) {
  try {
    // Delete the player from the database using the provided player ID
    await prisma.player.delete({
      where: { id: params.id },
    })
    // Return a success message as a JSON response
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    // If an error occurs during deletion, catch it
    // Return an error message as a JSON response with a status code of 500 (Internal Server Error)
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 })
  }
}
