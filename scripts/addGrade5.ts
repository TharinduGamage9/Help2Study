// Load environment variables FIRST before any other imports
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read .env.local file directly
const envPath = resolve(process.cwd(), '.env.local');
const envFile = readFileSync(envPath, 'utf-8');
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length) {
    process.env[key.trim()] = values.join('=').trim();
  }
});

import mongoose from 'mongoose';
import Grade5 from '../models/Grade5';

interface Grade5Data {
  subject: string;
  driveLink: string;
}

const grade5Courses: Grade5Data[] = [
  { subject: 'ගණිතය (Mathematics)', driveLink: 'https://drive.google.com/drive/folders/1xzv3iwfPpitgQfS73HFTlyHe9yDLu1Yn?usp=drive_link' },
  { subject: 'පරිසරය (Environment)', driveLink: 'https://drive.google.com/drive/folders/1ZS0sLN0fNN9KNI7SJo8m5K9OEZlbvHRp?usp=drive_link' },
  { subject: 'සිංහල (Sinhala)', driveLink: 'https://drive.google.com/drive/folders/1Ebg33an0jpv9rkklDHA1bbuv7ne86_4S?usp=drive_link' },
  { subject: 'දෙමළ (Tamil)', driveLink: 'https://drive.google.com/drive/folders/11RD7aw3exAj-CsrUIyP3XeeIBmw7ZRSO?usp=drive_link' },
];

async function addGrade5() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all existing Grade 5 courses
    const deleteResult = await Grade5.deleteMany({});
    console.log(`\n🗑️  Deleted ${deleteResult.deletedCount} existing Grade 5 courses`);

    let added = 0;
    let skipped = 0;

    for (const courseData of grade5Courses) {
      try {
        const course = new Grade5({
          subject: courseData.subject,
          driveLink: courseData.driveLink,
        });

        await course.save();
        console.log(`✓ Added: ${courseData.subject}`);
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
    console.log(`Deleted: ${deleteResult.deletedCount} old courses`);
    console.log(`Added: ${added} Grade 5 courses`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Total: ${grade5Courses.length} courses`);
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addGrade5();


