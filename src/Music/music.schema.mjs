import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const MusicSchema = new Schema(
    {
        nameSong: { type: String, default: '' },
        nameSinger: { type: String, default: '' },
        img: {
            name: { type: String, default: '', trim: true },
            data: { type: Buffer, required: true },
            contentType: { type: String, default: '', trim: true },
            size: { type: Number, default: 0 },
            md5: { type: String, default: '' },
        },
        song: {
            name: { type: String, default: '', trim: true },
            data: { type: Buffer, required: true },
            contentType: { type: String, default: '', trim: true },
            size: { type: Number, default: 0 },
            md5: { type: String, default: '' },
        },
    },
    { timestamps: true }
);

// trong giao diện chỉ cần lấy music được lấy từ danh sách trả về .converImagePath là chạy được
MusicSchema.virtual('coverImagePath').get(function () {
    if (this.img.data != null && this.img.contentType != null) {
        return `data:${
            this.img.contentType
        };charset=utf-8;base64,${this.img.data.toString('base64')}`;
    }
});

MusicSchema.virtual('coverSongPath').get(function () {
    if (this.song.data != null && this.song.contentType != null) {
        return `data:${
            this.song.contentType
        };charset=utf-8;base64,${this.song.data.toString('base64')}`;
    }
});

// thêm plugin ở đây
MusicSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deleteAt: true,
});

const Musics = mongoose.model('Music', MusicSchema);

export default Musics;
