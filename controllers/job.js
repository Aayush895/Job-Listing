const job = require('../models/job')

const allJobs = async (req, res) => {
  try {
    const getAllJobs = await job.find()

    res.send({
      message: 'Successfully fetched all jobs.',
      jobs: getAllJobs,
    })
  } catch (error) {
    res.send({
      message: 'Error in fetching the jobs.',
    })
  }
}


module.exports = {allJobs}