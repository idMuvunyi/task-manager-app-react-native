const express = require('express')
const router = express.Router()

const Employee = require('../models/employee.models')

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find()
    res.json(employees)
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
})

module.exports = router
