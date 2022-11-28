let contributors = require('../managers/contributors');


let addContribuor = (req, res, next) => {
       return contributors
              .addContributor(req.body)
              .then(data => {
                     let result = {
                            status: 200,
                            data: data
                     }
                     return res.json(result);
              })
              .catch(next);
}

let getContributtors = (req, res, next) => {

       return contributors
              .getContributtors()
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
       addContribuor,
       getContributtors

}