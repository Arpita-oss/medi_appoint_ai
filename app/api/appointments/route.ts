import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
  }

  try {
    const rawBody = await req.json()
    console.log("Raw incoming data:", rawBody) // Debug log
    
    // Handle both Vapi nested format and flat format
    const body = rawBody.steps?.collect ? {
      date: rawBody.steps.collect.date,
      time: rawBody.steps.collect.time,
      doctor_name: rawBody.steps.collect.doctor_name,
      patient_name: rawBody.steps.collect.patient_name || "Walk-in Patient", // Process patient name
      phone: rawBody.steps.collect.phone || "+0000000000"
    } : rawBody
    
    // Fallback values for demo
    const processedData = {
      date: body.date || new Date().toISOString().split('T')[0], // Today's date
      time: body.time || "12:00 PM",
      doctor_name: body.doctor_name || "Dr. General",
      patient_name: body.patient_name || "Walk-in Patient", // Use Walk-in Patient as default
      phone: body.phone || "+1234567890",
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Validation (now with fallbacks)
    const requiredFields = ['patient_name','date', 'time', 'doctor_name']
    const missingFields = requiredFields.filter(field => !processedData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          warning: `Missing fields replaced with defaults: ${missingFields.join(', ')}`,
          data: processedData
        },
        { status: 200, headers } // Still 200 for demo purposes
      )
    }
    
    // Database insert
    const client = await db
    const result = await client.db()
      .collection('appointments')
      .insertOne(processedData)
    
    return NextResponse.json({
      success: true,
      id: result.insertedId,
      ...processedData
    }, { headers })
    
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        error: "Internal error",
        demoData: { // Fallback response
          date: "2023-01-01",
          time: "09:00 AM",
          doctor_name: "Dr. Fallback",
          patient_name: "Demo Patient", // Include patient name in fallback
          status: "demo"
        }
      },
      { status: 500, headers }
    )
  }
}

export async function GET() {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  }

  try {
    const client = await db
    const appointments = await client.db()
      .collection('appointments')
      .find()
      .sort({ createdAt: -1 }) // Newest first
      .toArray()
    
    return NextResponse.json(appointments, { headers })
  } catch (error) {
    return NextResponse.json(
      {
        demoData: [
          {
            _id: "demo123",
            date: "2023-07-15",
            time: "2:00 PM",
            doctor_name: "Dr. Demo",
            patient_name: "Walk-in Patient", // Include patient name in demo data
            status: "pending"
          }
        ]
      },
      { status: 200, headers } // Still return 200 for demo
    )
  }
}