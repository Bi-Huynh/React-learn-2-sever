import Musics from './music.schema.mjs';

// [post] /musics/store
export const create = async (req, res) => {
    let { img: _img, mp3 } = req.files;
    let { nameSong, nameSinger } = req.body;

    // console.log({ _img, mp3, nameSong, nameSinger });

    try {
        if (!_img) throw 'file img is not found!';
        if (!mp3) throw 'file mp3 is not found!';
        if (!nameSong) throw 'name song is not found!';
        if (!nameSinger) throw 'name singer is not found!';

        let music = new Musics({
            nameSong,
            nameSinger,
            img: _img,
            song: mp3,
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

// [get] /musics/
export const getAll = async (req, res) => {
    try {
        let music = await Musics.find({});
        if (!music) throw 'not found music with id';
        res.status(200).json({ success: true, data: music });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
};
