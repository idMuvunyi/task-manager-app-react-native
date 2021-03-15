const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  }
)

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee
