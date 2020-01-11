var fs = require('fs');

module.exports = function (app){

fs.readFile('db/db.json',(err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    console.log(notes)

    
    app.get('/api/notes', function(req, res){
        res.json(notes)
    })

    app.post('/api/notes', function(req, res){
        var note = req.body;
        if(notes.length === 0){
            note.id = 1;
        } else {
            var lastID = notes[notes.length -1].id;
            note.id = lastID + 1;
        }
        notes.push(note);

        fs.writeFile('db/db.json', JSON.stringify(notes),(err, data) =>{
            if(err) throw err;
            res.json(note)
        })
    })
    
    app.delete('/api/notes/:id', function(req, res){
        var id = req.params.id;
        console.log(id);
        for(var i = 0; i < notes.length; i++){
            if(notes[i].id == id){
                notes.splice(i,1);
            }
        }

        fs.writeFile('db/db.json', JSON.stringify(notes), (err, data) =>{
            if(err) throw err;
            res.json(notes);
        })
        
    })

})
}