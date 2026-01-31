import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  startDate: Date;
  dueDate: Date;
  assignedTo: string;
  tags?: string[];
  finishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  dueDateHistory?: Date[];
}

const taskSchema = new Schema<ITask>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      required: true,
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
      default: 'medium',
    },
    startDate: {
      type: Date,
      required: false,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: String,
      required: false,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    finishedAt: {
      type: Date,
    },
    dueDateHistory: {
      type: [Date],
      default: [],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);
