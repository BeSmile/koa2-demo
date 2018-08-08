function bodyparser(code, msg, data) {
    let body = {
        code,
        msg,
    }
    if(data) {
        body = {
            ...body,
            data,
        }
    }
    return body;
}

module.exports = bodyparser;