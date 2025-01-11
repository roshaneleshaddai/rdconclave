import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = 'mongodb+srv://roshan:roshan16@cluster0.hml76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

const connectToDatabase = async () => {
  if (!client.isConnected) await client.connect();
  return client.db('rdconclave');
};

// Named export for POST method
export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body (App Router requires this)
    const { name, email, phone, college, event, file } = body;

    // Validate required fields
    if (!name || !email || !phone || !college || !event || !file) {
      return NextResponse.json({ message: 'All fields and file (Base64) are required.' }, { status: 400 });
    }

    // Connect to the database
    const database = await connectToDatabase();
    const collection = database.collection('registrations');

    const found=await collection.findOne({email:email});
    if(found){
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }
    const formData = {
      name,
      email,
      phone,
      college,
      event,
      file: {
        data: file, // Base64 file data
      },
      createdAt: new Date(),
      completed: false,
    };

    // Save the data to MongoDB
    const result = await collection.insertOne(formData);

    if (result.acknowledged) {
      return NextResponse.json({ message: 'Registration and file upload successful!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Registration failed. Please try again.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ message: 'An error occurred. Please try again.' }, { status: 500 });
  }
}
