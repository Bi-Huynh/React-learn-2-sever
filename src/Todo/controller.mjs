import Todos from './todo.schema.mjs';

// [get] /todos
const getAll = async (req, res) => {
    let fillter = { ...req.query };
    let todos = [];
    try {
        todos = await Todos.find(fillter).sort({ createdAt: -1 });
        if (!todos) {
            res.stauts(500).json({
                success: false,
                message: 'Error function getAll Todos',
                error: "can't return result get Todos",
            });
            return;
        }
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.stauts(500).json({
            success: false,
            message: 'Error function getAll Todos',
            error,
        });
    }
};

// [post] /todos/store
const create = async (req, res) => {
    let todo = { ...req.body };

    try {
        if (!todo.content || todo.content === '')
            throw "content todo don't undefine or empty";

        let result = await Todos.create(todo);
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function create Course',
                error: `can't create new todo`,
            });
            return;
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function create Course',
            error,
        });
    }
};

// [delete] /todos/:id
const deleted = async (req, res) => {
    let { id: _id } = req.params;

    try {
        if (!_id || _id === '') throw "id todo don't undefine or empty";

        let result = await Todos.deleteById(_id);
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function deleted Course',
                error: `can't deleted todo`,
            });
            return;
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function create Course',
            error,
        });
    }
};

// [delete] /todos/
const deleteData = async (req, res) => {
    let data = { ...req.body };

    try {
        let result = await Todos.delete(data);
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function deleteData Course',
                error: `can't deleteData todo`,
            });
            return;
        }

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error function deleteData Course',
            error,
        });
    }
};

// [patch] /todos/
const update = async (req, res) => {
    let { query, data } = req.body;

    try {
        let result = await Todos.updata(query, { $set: data });
        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error function update Course',
                error: `result update todo undefind`,
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

export { getAll, create, deleted, deleteData, update };
