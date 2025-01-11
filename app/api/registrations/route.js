import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId directly
import { NextResponse } from "next/server";

const uri = 'mongodb+srv://roshan:roshan16@cluster0.hml76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

const connectToDatabase = async () => {
  if (!client.isConnected) await client.connect();
  return client.db('rdconclave');
};

// Named export for GET method
export async function GET() {
  try {
    // Connect to the database
    const database = await connectToDatabase();
    const collection = database.collection('registrations');

    // Fetch all registrations
    const registrations = await collection.find().toArray();

    return NextResponse.json({ registrations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ message: 'Failed to fetch registrations' }, { status: 500 });
  }
}

// Named export for PATCH method to mark registration as complete
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, completed } = body;

    if (!id || completed === undefined) { // Ensure "completed" is explicitly checked
      return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
    }

    // Connect to the database
    const database = await connectToDatabase();
    const collection = database.collection('registrations');

    // Update the registration
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Correct use of ObjectId
      { $set: { completed } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ message: 'Registration updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Registration not found or unchanged' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating registration:', error);
    return NextResponse.json({ message: 'Failed to update registration' }, { status: 500 });
  }
}
