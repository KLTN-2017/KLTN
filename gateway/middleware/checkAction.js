// const client = require('../testRedis')
const { data } = require('./actionRoute.json')
const {host_role_permission} = require('../config/index')
const axios = require('axios')
module.exports = async function (req, res, next) {
    const listLink = req.originalUrl.split('/')
    const endUrl = listLink[listLink.length - 1]
    let action = ''
    for (let i = 0; i < data.length; i++){
        let method = data[i].method;
        let url = endUrl
          ? data[i].link.replace("*", endUrl)
            : data[i].link;
        if (req.method == method && req.originalUrl == url) {
            action = data[i].action
        }
    }
    // console.log(action, req.originalUrl,req.method, '------------------------------', req.role);
    if (action == '') next()
    else {
        const listRoleOfUser = await axios.get(
          `${host_role_permission}/permission-of-role/${req.role}`
        );
        const listAction = listRoleOfUser.data.map((per) => per.permission);
        if (listAction.includes(action)) next();
        else res.status(401).json({error: `Permission denined to link: ${req.originalUrl} you must have action ${action }`})
        // next()
    }
};
