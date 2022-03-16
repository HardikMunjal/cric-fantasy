const express = require("express");
const Task = require("../schemas/taskSchema");

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    console.log(err.code);
    if (err.code === 11000) {
      res.status(409).json({
        status: "fail",
        message: "Task name already exists",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "error",
      });
    }
  }
};

exports.getTask = async (req, res) => {
  try {
    const search = req.query.search;

    const tasks = search
      ? await Task.find({
          taskname: new RegExp("^" + search, "i"),
        })
      : await Task.find();

    if (tasks.length == 0)
      res.status(404).json({
        status: "Not found",
        message: "Task with this name does not exist",
      });
    else
      res.status(200).json({
        status: "success",

        data: {
          tasks,
        },
      });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
