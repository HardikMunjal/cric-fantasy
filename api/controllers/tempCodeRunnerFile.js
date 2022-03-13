if (tasks.length == 0)
      res.status(404).json({
        status: "Not found",
        message: "Task with this name does not exist",
      });
    else