import mongoose, { Document } from 'mongoose';
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
export declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, mongoose.DefaultSchemaOptions> & ITask & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITask>;
//# sourceMappingURL=Task.d.ts.map