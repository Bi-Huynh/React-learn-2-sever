import Musics from './music.schema.mjs';

// [post] /musics/store
export const create = async (req, res) => {
    let { img: _img, mp3 } = req.files;
    let { nameSong, nameSinger } = req.body;

    try {
        if (!_img) throw 'file img is not found!';
        if (!mp3) throw 'file mp3 is not found!';
        if (!nameSong) throw 'name song is not found!';
        if (!nameSinger) throw 'name singer is not found!';

        let music = new Musics({
            nameSong,
            nameSinger,
            img: {
                name: _img.name,
                data: _img.data, // không nên lưu trực tiếp vô vì khi lấy lên sẽ bị tràng bộ nhớ.
                contentType: _img.mimetype,
                size: _img.size,
                md5: _img.md5,
            },
            song: {
                name: mp3.name,
                data: mp3.data, // không nên lưu trực tiếp vô vì khi lấy lên sẽ bị tràng bộ nhớ.
                contentType: mp3.mimetype,
                size: mp3.size,
                md5: mp3.md5,
            },
        });

        let result = await music.save();
        if (!result) throw 'can not create music';
        res.status(200).json({
            success: true,
            data: 'save success the song',
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};

// [get] /musics/:id
export const getId = async (req, res) => {
    let _id = req.params.id;

    try {
        let music = await Musics.findById(_id);
        if (!music) throw 'not found music with id';
        res.status(200).json({ success: true, data: music });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
