const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
const {
    notes
} = require('./db/db.json')
const {
    addNote,
    idVerify,
} = require('./lib/notesindex')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.static('public'))

// User Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
 
// Notes page to save/delete/add notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

// add note and apply id based on length of array (just like in module) 
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString()
    const newNote = addNote(req.body, notes)

    res.json(newNote)
})

// sends user to Check ID, after which will call the deleteNote function 
app.delete('/api/notes/:id', (req, res) => {
    notesID = req.params.id
    idVerify(notesID, notes)
    res.json({
        message: 'success',
        data: req.body
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})