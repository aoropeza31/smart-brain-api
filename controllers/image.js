const { json } = require('body-parser');
const clarifai = require ('clarifai');
const { response } = require('express');
const app = new Clarifai.App({
    apiKey: 'd82883f5a1064eb09f00dbeb3b84cd47'
   });

const handleApiCall =  (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            response.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}
const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.export = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}