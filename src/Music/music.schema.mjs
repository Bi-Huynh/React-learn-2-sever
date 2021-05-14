import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;

const MusicSchema = new Schema(
    {
        nameSong: { type: String, default: '' },
        nameSinger: { type: String, default: '' },
        img: { type: Object, required: true },
        song: { type: Object, required: true },
    },
    { timestamps: true }
);

// thêm plugin ở đây
MusicSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deleteAt: true,
});

// trong giao diện chỉ cần lấy music được lấy từ danh sách trả về .converImagePath là chạy được
MusicSchema.virtual('coverImagePath').get(function () {
    if (this.img.data != null && this.img.mimetype != null) {
        return `data:${
            this.img.mimetype
        };charset=utf-8;base64,${this.img.data.toString('base64')}`;
    }
}); // => không chạy được cái này ??? (khi nhận data từ server về client thì client không sử dụng được)

MusicSchema.virtual('coverSongPath').get(function () {
    if (this.song.data != null && this.song.mimetype != null) {
        return `data:${
            this.song.mimetype
        };charset=utf-8;base64,${this.song.data.toString('base64')}`;
    }
});

const Musics = mongoose.model('Music', MusicSchema);

export default Musics;
