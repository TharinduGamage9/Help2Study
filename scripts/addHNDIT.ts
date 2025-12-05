import mongoose from 'mongoose';
import HNDIT from '../models/HNDIT';

// Load environment variables
import { readFileSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env.local');
try {
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  console.log('.env.local not found, using environment variables');
}

interface HNDITData {
  subject: string;
  driveLink: string;
  semester: '1st Year 1st Semester' | '1st Year 2nd Semester' | '2nd Year 1st Semester' | '2nd Year 2nd Semester';
}

const hnditCourses: HNDITData[] = [
  // 1st Year 1st Semester - from provided link
  {
    subject: '1st Year 1st Semester - All Notes',
    driveLink: 'https://drive.google.com/drive/folders/1Xuj2c2eO1MXgZGWe2r-3GnHbPD-TiNp2',
    semester: '1st Year 1st Semester',
  },
  // 2nd Year 1st Semester - from provided link
  {
    subject: '2nd Year 1st Semester - All Notes',
    driveLink: 'https://drive.google.com/drive/folders/1Ul-jIJI5Ud3cizMW3Daw-JbbGyQ5EciG',
    semester: '2nd Year 1st Semester',
  },
  // 2nd Year 2nd Semester - from provided link
  {
    subject: '2nd Year 2nd Semester - All Notes',
    driveLink: 'https://drive.google.com/drive/folders/1oRRCdMUBRX8u0qSDyQwEwRUCeBrlmejn',
    semester: '2nd Year 2nd Semester',
  },
];

async function addHNDIT() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let added = 0;
    let skipped = 0;

    for (const courseData of hnditCourses) {
      try {
        // Check if this exact combination already exists
        const existing = await HNDIT.findOne({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
          semester: courseData.semester,
        });

        if (existing) {
          console.log(`Skipping duplicate: ${courseData.subject} (${courseData.semester})`);
          skipped++;
          continue;
        }

        const course = new HNDIT({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
          semester: courseData.semester,
        });

        await course.save();
        console.log(`✓ Added: ${courseData.subject} (${courseData.semester})`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`Skipping duplicate: ${courseData.subject}`);
          skipped++;
        } else {
          console.error(`Error adding ${courseData.subject}:`, error.message);
        }
      }
    }

    console.log('\n=== Summary ===');
    console.log(`Added: ${added} HND IT courses`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${hnditCourses.length} courses`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addHNDIT();


