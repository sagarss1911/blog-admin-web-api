'use strict';

let PlaceManager = require('../managers/place');


let getAllPlace = (req, res, next) => {
    return PlaceManager
        .getAllPlace(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let removePlace = (req, res, next) => {
    return PlaceManager
        .removePlace(req.params.place_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addPlace = (req, res, next) => {
    return PlaceManager
        .addPlace(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getPlace = (req, res, next) => {
    return PlaceManager
        .getPlace(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
module.exports = {
    getAllPlace: getAllPlace,
    removePlace: removePlace,
    addPlace: addPlace,
    getPlace: getPlace,
}