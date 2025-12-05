// Load environment variables FIRST before any other imports
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Read .env.local file directly
const envPath = resolve(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  try {
    const envFile = readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const [key, ...values] = line.split('=');
      if (key && values.length) {
        const trimmedKey = key.trim();
        const trimmedValue = values.join('=').trim();
        if (trimmedKey && trimmedValue && !process.env[trimmedKey]) {
          process.env[trimmedKey] = trimmedValue;
        }
      }
    });
    console.log('✓ Environment variables loaded from .env.local');
  } catch (error) {
    console.warn('⚠ Could not read .env.local file:', error);
  }
} else {
  console.warn('⚠ .env.local file not found, using system environment variables');
}

import mongoose from 'mongoose';
import Note from '../models/Note';

interface ALNoteData {
  subject: string;
  driveLink: string;
  level: 'AL';
  category: string;
}

const alNotes: ALNoteData[] = [
  // Media - කලා විෂය ධාරාව (Arts Stream)
  { subject: 'Media', driveLink: 'https://drive.google.com/drive/folders/1OoBk93u1NmMoeX1q6AK5fKqh3lopCHPa', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Media', driveLink: 'https://drive.google.com/drive/folders/1GiDkzRW1FcZeY895WJpZN8a61At2JMoF?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  
  // Home Science - කලා විෂය ධාරාව (Arts Stream)
  { subject: 'Home Science', driveLink: 'https://drive.google.com/file/d/1hHQDeHsUQlkY5mpoHVGwkrRkimGn8r5F/view?usp=drivesdk', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Home Science', driveLink: 'https://drive.google.com/file/d/1601yqkiyTimiSgzje5EdnTV1r095Kbbg/view', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  
  // Accounting - වාණිජ විෂය ධාරාව (Commerce Stream)
  { subject: 'Accounting', driveLink: 'https://drive.google.com/drive/folders/1gYi4nVTyiF4qbDKlaVfrwM67_I5APbd7', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Accounting', driveLink: 'https://drive.google.com/drive/folders/1tngYjYv3ITBUeAmq4seq_6AC9Z0WJRx-?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'Accounting Pass Papers', driveLink: 'https://drive.google.com/drive/folders/1AXn32x_5VV0m1JjbhxwblQSKEnI_ARiE', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // Geography - කලා විෂය ධාරාව (Arts Stream)
  { subject: 'Geography', driveLink: 'https://drive.google.com/drive/folders/198Z48q-hl9n4H-Ej18ORerWnvNoHK4ox', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Geography', driveLink: 'https://drive.google.com/drive/folders/116b3y63ZZXncT2HT7uV-7o4Oc3YNPl_-', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Geography', driveLink: 'https://drive.google.com/drive/folders/1YoTR3Y63J46xgC_eBJQ3btMMg_LlOAsy?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  
  // ICT - වාණිජ විෂය ධාරාව (Commerce Stream)
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/1-VrKpVEeCT1DDuy0c3FRC5vaSaTluAyN?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/15z1-KLgSI---hfqo08O_GIaQu1qgJGe7', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/1_l8Qr2p3DktLO4Encg74uk_TKDM5iByB', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' }, // Password = sub@kavidx
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/1HepTix5xAkIq30mOzYozFHgwHZ3s6OQd', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/1Piqc_QyvfDOmJNndjFzcL147_Fd-UcHL', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/15KZmbxiUZ2r4tbKSddVRAhh6AnpTM_E6', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ICT Short Notes', driveLink: 'https://drive.google.com/drive/folders/1mwZTEiM7NhNo5XJsotSWoFcWvQK7n0Pm', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // Stat - වාණිජ විෂය ධාරාව (Commerce Stream)
  { subject: 'Stat', driveLink: 'https://drive.google.com/drive/folders/1tngYjYv3ITBUeAmq4seq_6AC9Z0WJRx-?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // Business Studies - වාණිජ විෂය ධාරාව (Commerce Stream)
  { subject: 'Business Studies', driveLink: 'https://drive.google.com/drive/folders/1A9FyCh1DpPvRlyQrpbQFdMn2N7qTwckZ', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // Econ - වාණිජ විෂය ධාරාව (Commerce Stream)
  { subject: 'Econ', driveLink: 'https://drive.google.com/drive/folders/1XyyuXbpnAGIzAAF0PNMAzKOIy41r5cVS', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // Languages - කලා විෂය ධාරාව (Languages)
  { subject: 'Japanese', driveLink: 'https://drive.google.com/drive/folders/1Piqc_QyvfDOmJNndjFzcL147_Fd-UcHL', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Japanese', driveLink: 'https://drive.google.com/drive/folders/10gFiRBZe_OiUtR9nzDR28WvYkXPx4Rry?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Korean', driveLink: 'https://drive.google.com/drive/folders/1e2w52bcOMQ-StMf0EJZaDs9q3lRUYjkg?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Hindi', driveLink: 'https://drive.google.com/drive/folders/1mbBF-CQiAzgjoW82rE3VN8UqoRNAoxC-?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'Sinhala', driveLink: 'https://drive.google.com/drive/folders/10v36oT_2Vw7Tmud-_sVf0SYouNdouaU0?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  
  // Technology Stream - තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)
  { subject: 'ET', driveLink: 'https://drive.google.com/drive/folders/1CqiLw8a4wVSWlLO8C69NfDit2wWMa3eT?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'ICT', driveLink: 'https://drive.google.com/drive/folders/1mPdYHQHH4LO_eWINv9vEUkfdPZ2bxe5v?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'SFT', driveLink: 'https://drive.google.com/drive/folders/1TkZzT34I5XaVne_no8ZnMSPSOvbNofIx?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  
  // Science/Maths - විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream) - NoteKokka Collection
  { subject: 'සංයුක්ත ගණිතය (Combined Maths)', driveLink: 'https://drive.google.com/drive/folders/1Cm3wD7ziKPmNo5SxNQU1ZFeyP7eMbIWC?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'රසායන විද්‍යාව (Chemistry)', driveLink: 'https://drive.google.com/drive/folders/1Zmy_K5NFCx5DU2F3AkG551xxLwinxXz2?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'භෞතික විද්‍යාව (Physics)', driveLink: 'https://drive.google.com/drive/folders/1zh1lvoQr1XMZpfa6BGJ7-bSso3ZEZvpy?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'ජීව විද්‍යාව (Biology)', driveLink: 'https://drive.google.com/drive/folders/1zxE8FG7l0-n62Le0eU6tmfNoR0PCfDks?usp=drive_link', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  { subject: 'Biology Resource Books', driveLink: 'https://drive.google.com/file/d/14hPdgc67OrM6X57ONexej200EWdvDYFx/view', level: 'AL', category: 'විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)' },
  
  // Technology - තාක්ෂණ (Technology) - NoteKokka Collection
  { subject: 'තාක්ෂණවේදය සඳහා විද්‍යාව (SFT)', driveLink: 'https://drive.google.com/drive/folders/1seCLKh2WOuMj6ITjjIx31xo7EHbUii_9?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'ඉංජිනේරු තාක්ෂණවේදය (ET)', driveLink: 'https://drive.google.com/drive/folders/1amE5IYRi_jE0BgGzDkTezYZuBd7ZACpV?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'ජෛව පද්ධති තාක්ෂණවේදය (BST)', driveLink: 'https://drive.google.com/drive/folders/1yoGexkM9eQslFzUDb5EddorZw-SqlC-w?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  { subject: 'තොරතුරු තාක්ෂණය (ICT)', driveLink: 'https://drive.google.com/drive/folders/1_rmapxLUZ9ENnD8jni8zKkmiRB2ukxoK?usp=drive_link', level: 'AL', category: 'තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)' },
  
  // Commerce - වාණිජ (Commerce) - NoteKokka Collection
  { subject: 'ව්‍යාපාර අධ්‍යයනය (Business Studies)', driveLink: 'https://drive.google.com/drive/folders/11F_mLPWZrKf1rvS8OviRBW3BAWW3adSB?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ආර්ථික විද්‍යාව (Economics)', driveLink: 'https://drive.google.com/drive/folders/1HbwfySGFb9i21HkpEmAxBhigXt60zcUV?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  { subject: 'ගිණුම්කරණය (Accounting)', driveLink: 'https://drive.google.com/drive/folders/1-O1FT1xIzwFL2ZCMis49wVyFKQC3-oP6?usp=drive_link', level: 'AL', category: 'වාණිජ විෂය ධාරාව (Commerce Stream)' },
  
  // Arts - කලා (Arts) - NoteKokka Collection
  { subject: 'බුද්ධ ධර්මය (Buddhism)', driveLink: 'https://drive.google.com/drive/folders/1pIqNAqtdLFcdK_1GgSM6ns50ie1gKsix?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'සිංහල (Sinhala)', driveLink: 'https://drive.google.com/drive/folders/1ikjSX6pid7x0D1MivCgPz1HZmDHRurMp?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'ඉතිහාසය (Sri Lanka History)', driveLink: 'https://drive.google.com/drive/folders/1sr240HlZeGvaXCFkifZZaFrTPeBguAnJ?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'ඉන්දීය ඉතිහාසය (Indian History)', driveLink: 'https://drive.google.com/drive/folders/1rhAe9-otFJmjjOrPiB7UJGCcEhxLcEDv?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'භූගෝල විද්‍යාව (Geography)', driveLink: 'https://drive.google.com/drive/folders/1FSNAdMb6kU7pk4vPGkG1lzsYyJFW5jaK?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'මාධ්‍ය අධ්‍යයනය (Media)', driveLink: 'https://drive.google.com/drive/folders/1aiWtejG7bIwcYvwnMx-yJeLuq4o4XPHp', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'Logic', driveLink: 'https://drive.google.com/drive/folders/1lc7XdfpIPF2E-H-AZGkjKqeYgtTuvLTn?usp=sharing', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'සංඛ්‍යායන (Statistics)', driveLink: 'https://drive.google.com/drive/folders/1OhuHL_aZGL6H19sDHl4gVC7Kmqelud_O?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'සංගීතය (Music)', driveLink: 'https://drive.google.com/drive/folders/1b7qWzH19HBtcT5tk5NsWz8xOYMoyzf5M?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'නර්තනය (Dance)', driveLink: 'https://drive.google.com/drive/folders/194l24EKiCHjv5bMZ0ST1BuEvHzuxJTA_?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'කෘෂිකර්මය (Agriculture)', driveLink: 'https://drive.google.com/drive/folders/1nnq8OuBBDITeIWrfQQ5CQSSFIiffMIB5?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'ඉංග්‍රීසි (English)', driveLink: 'https://drive.google.com/drive/folders/1O5-pm2Um9R9P7-hwS6Ub6IugT6cIOvoT?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Arts Stream)' },
  { subject: 'ජපන් (Japanese - Updated/N5)', driveLink: 'https://drive.google.com/drive/folders/1CgGxebdb5AO2BghT2Rz37gphruaus0X4?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'ජපන් (Japanese - Updated/N5)', driveLink: 'https://drive.google.com/drive/folders/1T7HoZG7G19toPgGeT1xoMzaObJnFd8h7?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'දෙමළ (Tamil)', driveLink: 'https://drive.google.com/drive/folders/1t1JfU0OsBcoYiLn2H9sG7XtkFo2Yhgmp?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
  { subject: 'හින්දි (Hindi)', driveLink: 'https://drive.google.com/drive/folders/1O-g9-zzAKYjl2VAOu7Ap6hhgS703qzE1?usp=drive_link', level: 'AL', category: 'කලා විෂය ධාරාව (Languages)' },
];

async function addALNotes() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log('✓ Connected to MongoDB successfully');

    // Delete all existing AL notes first
    console.log('\nDeleting existing AL notes...');
    const deleteResult = await Note.deleteMany({ level: 'AL' });
    console.log(`✓ Deleted ${deleteResult.deletedCount} existing AL notes`);

    let added = 0;
    let skipped = 0;
    let errors = 0;

    console.log(`\nAdding ${alNotes.length} new AL notes...\n`);

    for (let i = 0; i < alNotes.length; i++) {
      const noteData = alNotes[i];
      try {
        const note = new Note({
          subject: noteData.subject,
          driveLink: noteData.driveLink,
          level: noteData.level,
          category: noteData.category,
        });

        await note.save();
        console.log(`[${i + 1}/${alNotes.length}] ✓ Added: ${noteData.subject}`);
        added++;
      } catch (error: any) {
        if (error.code === 11000) {
          console.log(`[${i + 1}/${alNotes.length}] ⚠ Skipping duplicate: ${noteData.subject}`);
          skipped++;
        } else {
          console.error(`[${i + 1}/${alNotes.length}] ✗ Error adding ${noteData.subject}:`, error.message);
          errors++;
        }
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('=== SUMMARY ===');
    console.log('='.repeat(50));
    console.log(`Deleted: ${deleteResult.deletedCount} old AL notes`);
    console.log(`Added: ${added} AL notes`);
    console.log(`Skipped: ${skipped} duplicates`);
    console.log(`Errors: ${errors}`);
    console.log(`Total processed: ${alNotes.length} notes`);
    console.log('='.repeat(50));
    
    // Verify the data was saved
    const count = await Note.countDocuments({ level: 'AL' });
    console.log(`\n✓ Total AL notes in database: ${count}`);
    
    await mongoose.disconnect();
    console.log('\n✓ Disconnected from MongoDB');
    process.exit(0);
  } catch (error: any) {
    console.error('\n✗ Fatal Error:', error.message);
    console.error(error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

addALNotes();
