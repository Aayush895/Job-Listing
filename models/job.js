const mongoose = require('mongoose')
const { Schema } = mongoose

const jobSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    locationType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    refUserId: {
      type: mongoose.ObjectId,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
)

const Job = mongoose.model('Job', jobSchema)

module.exports = Job
