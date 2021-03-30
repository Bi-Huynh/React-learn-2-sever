import Todos from './todo.schema.mjs';

// [get] /todos
export const getAll = async (req, res, next) => {
    let todos = [];
    try {
        todos = await Todos.find({});
    } catch (error) {
        console.log(new Error(error));
    } finally {
        res.json(todos);
    }
};

// [post] /todos/store
export const create = (req, res, next) => {
    let todo = { ...req.body };

    Todos.create(todo)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => console.log('create new todo error: ', error));
};

// [delete] /todos/:id
export const deleted = (req, res, next) => {
    let _id = req.params.id;
    Todos.deleteById(_id)
        .then((result) => {
            res.json(result.ok);
        })
        .catch((error) => {
            console.log('delete id error: ', error);
        });
};

// [delete] /todos/
export const deleteData = (req, res, next) => {
    let data = req.body;
    Todos.delete(data)
        .then((result) => {
            res.json(result.ok);
        })
        .catch((error) => {
            console.log('delete complete error: ', error);
        });
};

// [patch] /todos/
export const update = (req, res, next) => {
    let { query, data } = req.body;
    Todos.update(query, { $set: data })
        .then((result) => {
            res.json(result.ok);
        })
        .catch((error) => {
            console.log('delete complete error: ', error);
        });
    console.log(req.body);
};

// [get] /todos/
export const get = (req, res, next) => {
    let { query, data } = req.body;
    Todos.update(query, { $set: data })
        .then((result) => {
            res.json(result.ok);
        })
        .catch((error) => {
            console.log('delete complete error: ', error);
        });
    console.log(req.body);
};
