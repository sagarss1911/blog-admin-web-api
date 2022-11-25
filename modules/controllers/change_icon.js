
'use strict';
let IconManager = require('../managers/change_icon');




let addIcon = (req, res, next) => {
    return IconManager
        .addIcon(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getIconById = (req, res, next) => {
    return IconManager
        .getIconById(req.params.icon_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let getIcon = (req, res, next) => {
    return IconManager
        .getIcon(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let getAllIcons = (req, res, next) => {
    return IconManager
        .getAllIcons(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
}

module.exports = {
    getAllIcons: getAllIcons,
    // removePlace: removePlace,
    addIcon: addIcon,
    getIcon: getIcon,
    getIconById: getIconById
}