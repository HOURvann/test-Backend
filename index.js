const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

// test route
app.get('/', (req, res) => {
    res.send('Server is running 🚀')
})

// API route
app.get('/api/v1/posts', (req, res) => {
    res.json([
        { id: 1, title: "Hello Backend" },
        { id: 2, title: "My API" }
    ])
})

// POST create new post
app.post('/api/v1/posts', (req, res) => {
    const newPost = req.body

    res.json({
        message: "Data received ✅",
        data: newPost
    })
})

let posts = [
    { id: 1, title: "Hello Backend" },
    { id: 2, title: "My API" }
]

// GET all
app.get('/api/v1/posts', (req, res) => {
    res.json(posts)
})

// POST create
app.post('/api/v1/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }
    posts.push(newPost)
    res.json(newPost)
})

// PUT update
app.put('/api/v1/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const post = posts.find(p => p.id === id)

    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }

    post.title = req.body.title
    res.json(post)
})

// DELETE
app.delete('/api/v1/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)

    posts = posts.filter(p => p.id !== id)

    res.json({ message: "Deleted successfully" })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})