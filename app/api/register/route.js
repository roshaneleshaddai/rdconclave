import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = 'mongodb+srv://roshan:roshan16@cluster0.hml76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
const client = new MongoClient(uri);

const connectToDatabase = async () => {
  if (!client.isConnected) await client.connect();
  return client.db('rdconclave');
};

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { name, email, phone, college ,event} = await req.json();

    // Basic validation
    if (!name || !email || !phone || !college || !event) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const database = await connectToDatabase();
    const collection = database.collection('registrations');

    const formData = { name, email, phone, college,event, createdAt: new Date() };
    const result = await collection.insertOne(formData);

    if (result.acknowledged) {
      return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Registration failed. Please try again.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json({ message: 'An error occurred. Please try again.' }, { status: 500 });
  }
}
