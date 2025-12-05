import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HNDIT from '@/models/HNDIT';

// GET a single HND IT course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const hndit = await HNDIT.findById(params.id);

    if (!hndit) {
      return NextResponse.json(
        { error: 'HND IT course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ hndit }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PUT update a HND IT course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { subject, driveLink, semester } = await request.json();

    const updateData: any = {};
    if (subject) updateData.subject = subject;
    if (driveLink) updateData.driveLink = driveLink;
    if (semester) updateData.semester = semester;

    const hndit = await HNDIT.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!hndit) {
      return NextResponse.json(
        { error: 'HND IT course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ hndit }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE a HND IT course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const hndit = await HNDIT.findByIdAndDelete(params.id);

    if (!hndit) {
      return NextResponse.json(
        { error: 'HND IT course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'HND IT course deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


