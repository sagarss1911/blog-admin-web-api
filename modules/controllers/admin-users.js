let manager = require('../managers/admin-users')


let login = (req, res, next) => {

    return manager
        .login(req.body)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}

let createUser = async (req, res, next) => {

    return manager
        .createUser(req.user, req.body)
        .then((data) => {
            let result = {
                status: 200,
                data: data,
            };
            return res.json(result);
        })
        .catch(next);
};


let getUsersData = (req, res, next) => {

    return manager
        .getUsersData(req.user, req.body)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}

let editUser = (req, res, next) => {
    console.log(req.params.id);
    return manager
        .editUser(req.params.id, req.body)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}

let deleteUser = (req, res, next) => {

    return manager
        .deleteUser(req.params.id)
        .then(data => {
            return res.json({
                status: 200,
                data: data
            });
        })
        .catch(next);
}


module.exports = {
    createUser,
    getUsersData,
    editUser,
    deleteUser,
    login
}