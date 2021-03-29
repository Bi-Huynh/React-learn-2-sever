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
export const create = async (req, res, next) => {
    let todo = { ...req.body };
    try {
        await Todos.create(todo);
    } catch (error) {
        console.log('create new todo error: ', error);
    }
    console.log(todo);
};
