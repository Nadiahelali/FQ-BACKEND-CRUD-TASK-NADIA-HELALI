const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

const data = require('./data')

app.get('/',
    (req, res) => {
        let todos = [...data]

        if (req.query.status) {
            todos = todos.filter((todo) => todo.status === req.query.status)
        }

        res.status(200).json({
            message: 'todos',
            data: { todos }
        })
    })

app.get('/:id',
    (req, res) => {
        let todos = [...data]

        todos = todos.filter((todo) => todo.id === parseInt(req.params.id))

        res.status(200).json({
            message: 'todos',
            data: { todos }
        })
    })

app.post('/',
    (req, res) => {
        if(!req.body.todo) {
            res.status(400).json({
                message: 'required data missing'
            })
        }

        const todo = {
            id: data[data.length - 1].id + 1,
            todo: req.body.todo,
            status: 'pending'
        }

        data.push(todo)

        res.status(201).json({
            message: 'todo created succesfully',
            data: { todo }
        })
    })

app.delete('/:id',
    (req, res) => {
        const index = data.findIndex((todo) => todo.id === parseInt(req.params.id))

        if(index > -1) {
            data.splice(index, 1)
        }

        res.status(200).json({
            message: index === -1 ? 'todo not found' : 'todo deleted succesfully',
        })
    })

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})