import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { type: String, default: '' },
        userName: { type: String, default: '' },
        password: { type: String, default: '' },
        courses: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courses',
        },
    },
    { timestamps: true }
);

UserSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deleteAt: true,
});

const Users = mongoose.model('User', UserSchema);

export default Users;
