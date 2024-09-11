import errorHandler from '../middlewares/error.middleware.js';
import { Task } from '../models/tasks.model.js'

export const newTask = async (req, res, next) => {

    try {

        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        })

        res.status(201).json({
            success: true,
            message: "Task created!",
        })

    } catch (error) {

        next(error)

    }

}

export const getMyTask = async (req, res, next) => {

    try {

        const userID = req.user._id;

        const tasks = await Task.find({
            user: userID
        });

        res.status(200).json({
            success: true,
            tasks,
        })

    } catch (error) {

        next(error)

    }

}

export const updateTask = async (req, res, next) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) return next(new errorHandler("Task not found", 404))

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated!",
        })

    } catch (error) {

        next(error)

    }

}

export const deleteTask = async (req, res, next) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) return next(new errorHandler("Task not found", 404))

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted!",
        })

    } catch (error) {

        next(error)

    }

}
