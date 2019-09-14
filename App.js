const express = require('express');
const app = express();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

var schema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    name: { type: String, default: "Anónimo" },
})

var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {

    Visitor.create({ name: req.query.name }, function(err) {
        if (err) return console.error(err);
    });

    res.send('<h1>El visitante fue almacenado con exito</h1>');
});

app.listen(3000, () => console.log('Listening on port 3000!'));