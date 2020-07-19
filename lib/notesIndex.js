const path = require('path');
const fs = require('fs');


function addNote(body, notesArray) {
    notesArray.push(body);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    );
    return addNote;
}

function idVerify(noteId, array) {
    array.forEach((note, index) => {
        if (note.id === noteId) {
            deleteNote(index, array);
        }
    })
}

function deleteNote(index, noteObject) {
    noteObject.splice(index, 1);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteObject
        }, null, 2)
    );
    return noteObject;
}

module.exports = {
    idVerify,
    addNote,
}