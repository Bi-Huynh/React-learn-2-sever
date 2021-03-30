import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        content: { type: String, default: 'Todo no content' },
        complete: { type: Boolean, default: false },
        level: { type: Number, default: 4 },
    },
    { timestamps: true }
);

// thêm plugin ở đây
TodoSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deleteAt: true,
});

const Todos = mongoose.model('Todo', TodoSchema);

export default Todos;
