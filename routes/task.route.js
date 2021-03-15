const express = require('express')
const Task = require('../models/task.models')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: 'asc' })
    res.json({ tasks })
  } catch (error) {
    console.error(error)
    res.status(400).json('error:' + error)
  }
})

router.post('/add', (req, res) => {
  const username = req.body.username
  const description = req.body.description
  const duration = Number(req.body.duration)
  const date = req.body.date

  const newTask = new Task({ username, description, duration, date })

  newTask
    .save()
    .then(() => res.json('Task added !'))
    .catch((err) => res.status(400).json('Error : ' + err))
})

router.post('/update/:id', (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.username = req.body.username
      task.description = req.body.description
      task.duration = Number(req.body.duration)
      task.date = Date.parse(req.body.date)

      task
        .save()
        .then(() => res.json('Task Updated !'))
        .catch((err) => res.status(400).json('Error : ' + err))
    })
    .catch((err) => res.status(400).json('Error : ' + err))
})

module.exports = router
