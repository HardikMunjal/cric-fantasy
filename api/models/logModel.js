const Log = require('../schemas/logSchema')


module.exports = logModels = {

    newLogEntry: async (name, callback) => {
        let data = {
            name
        }
        const log = new Log(data)
        try {
            await log.save()
            callback(undefined, log)
        } catch (error) {
            console.log(error)
        }
    },

    fetchLog: async (details, callback) => {
        try {
            let logs = await Log.aggregate(
                [
                    {
                        $match: {
                            created_on: {
                                $gte: new Date(details.startdate),
                                $lt: new Date(details.enddate)
                            }
                        }
                    },
                    {
                        $group: {
                            _id: "$name",
                            count: { $sum: 1 }
                        }
                    }
                ]
            )
            callback(undefined, logs)
        } catch (error) {
            console.log(error)
        }
    }
}