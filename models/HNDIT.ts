import mongoose, { Schema, Document } from 'mongoose';

export interface IHNDIT extends Document {
  subject: string;
  driveLink: string;
  semester: '1st Year 1st Semester' | '1st Year 2nd Semester' | '2nd Year 1st Semester' | '2nd Year 2nd Semester';
  createdAt: Date;
  updatedAt: Date;
}

const HNDITSchema: Schema = new Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    driveLink: {
      type: String,
      required: [true, 'Drive link is required'],
      trim: true,
    },
    semester: {
      type: String,
      enum: ['1st Year 1st Semester', '1st Year 2nd Semester', '2nd Year 1st Semester', '2nd Year 2nd Semester'],
      required: [true, 'Semester is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HNDIT || mongoose.model<IHNDIT>('HNDIT', HNDITSchema);

