import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-generator';

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        videos: [
            {
                title: { type: String, default: '' },
                url: { type: String, default: '' },
                author: { type: String, default: '' },
                dateCreate: { type: Date, default: new Date() },
            },
        ],
        title: { type: String, required: true },
        description: { type: String, required: true },
        posts: [
            {
                title: { type: String, default: '' },
                url: { type: String, default: '' },
                author: { type: String, default: '' },
                dateCreate: { type: Date, default: new Date() },
            },
        ],
        view: { type: Number, default: 0 },
        vote: { type: Number, default: 0 },
        slug: { type: String, slug: 'title', unquie: true },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deleteAt: true,
});

const Courses = mongoose.model('Course', CourseSchema);

export default Courses;
