const Task = require('../schemas/activitiesSchema')


module.exports = activitiesModel = {

    newTaskEntry: async (name, callback) => {
        let data = {
            name
        }
        const activity = new Task(data)
        try {
            await log.save()
            callback(undefined, activity)
        } catch (error) {
            console.log(error)
        }
    },

    fetchTask: async (details, callback) => {
        try {
            let tasks = await Task.aggregate(
                [
                    {
                        $match: {
                            createdate: {
                                $gte: new Date(details.startdate),
                                $lt: new Date(details.enddate)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$task",
                            count: { $sum: 1 }
                        }
                    }
                ]
            )
            callback(undefined, tasks)
        } catch (error) {
            console.log(error)
        }
    }
}
