import Courses from './course.schema.mjs';

const COURSE = {
    videos: [
        {
            title: '',
            url: '',
            author: '',
            dateCreate: new Date(),
        },
    ],
    title: '',
    description: '',
    posts: [
        {
            title: '',
            url: '',
            author: '',
            dateCreate: new Date(),
        },
    ],
    view: 0,
    vote: 0,
};

// [get] /courses/ => trang home
const getAll = async (req, res) => {
    let fillter = { ...req.query };
    let courses = [];
    try {
        courses = await Courses.find(fillter);
        if (!courses) {
            res.status(500).json({
                success: false,
                message: 'Error function getAll Course',
                error: "can't return the courses",
            });
            return;
        }

        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function getAll Course',
            error,
        });
    }
};

// [get] /courses/:slug
const getCourseBySlug = async (req, res) => {
    let { slug } = req.params;
    let course = { ...COURSE };
    try {
        course = await Courses.find({ slug });
        if (!course) {
            res.status(500).json({
                success: false,
                message: 'Error function getCourseBySlug Course',
                error: "can't return the course",
            });
            return;
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function getAll Course',
            error,
        });
    }
};

// [post] /courses/store
const create = async (req, res) => {
    let data = { ...COURSE, ...req.body.data };
    try {
        if (!data.title || data.title === '')
            throw "can't find the course title from the client or value title equal none";
        if (!data.description || data.description === '')
            throw "can't find the course description from the client or value description equal none";

        let course = new Courses(data);
        if (!course) {
            res.status(500).json({
                success: false,
                message: 'Error function create Course',
                error: "can't not create Course",
            });
            return;
        }

        let courseSave = await course.save();
        res.status(200).json({ success: true, data: courseSave });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function create Course',
            error,
        });
    }
};

// [patch] /courses/:slug
const update = async (req, res) => {
    let { slug } = req.params;
    let { data } = req.body;
    try {
        if (!slug) throw 'slug update course not found';
        if (!data) throw 'data update course not found';

        // có nên kiểm tra dữ liệu của query và data ?

        let result = await Courses.update(
            { slug },
            {
                $set: { ...COURSE, ...data },
            }
        );
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function update Course',
                error: "can't not result update Course",
            });
            return;
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function update Course',
            error,
        });
    }
};

// [delete] /courses/:slug
const deleted = async (req, res) => {
    let { slug } = req.params;
    try {
        if (!slug) throw "can't not found slug the course want deleted";

        let result = await Courses.delete({ slug });
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function deleted Course',
                error: "can't not result deleted Course",
            });
            return;
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function deleted Course',
            error,
        });
    }
};

// [delete] /courses/:slug/force
const deletedForce = async (req, res) => {
    let { slug } = req.params;
    try {
        if (!slug) throw "can't not found slug the course want deleted force";

        let result = await Courses.findOneAndDelete({ slug }); // nếu dòng này bị lỗi thì nó sẽ nhảy xuống catch luôn hay nó sẽ gán undefine cho biến result
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function deletedForce Course',
                error: "can't not result deletedForce Course",
            });
            return;
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function deletedForce Course',
            error,
        });
    }
};

export { getAll, create, update, getCourseBySlug, deleted, deletedForce };
