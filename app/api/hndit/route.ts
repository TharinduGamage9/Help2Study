import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HNDIT from '@/models/HNDIT';

// GET all HND IT courses (with optional filtering by semester and subject)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const semester = searchParams.get('semester');
    const subject = searchParams.get('subject');

    const query: any = {};
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;

    const hnditCourses = await HNDIT.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ hnditCourses }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// POST create a new HND IT course (admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { subject, driveLink, semester } = await request.json();

    if (!subject || !driveLink || !semester) {
      return NextResponse.json(
        { error: 'Subject, drive link, and semester are required' },
        { status: 400 }
      );
    }

    if (!['1st Year 1st Semester', '1st Year 2nd Semester', '2nd Year 1st Semester', '2nd Year 2nd Semester'].includes(semester)) {
      return NextResponse.json(
        { error: 'Semester must be 1st Year 1st Semester, 1st Year 2nd Semester, 2nd Year 1st Semester, or 2nd Year 2nd Semester' },
        { status: 400 }
      );
    }

    const hndit = await HNDIT.create({
      subject,
      driveLink,
      semester,
    });

    return NextResponse.json({ hndit }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}



