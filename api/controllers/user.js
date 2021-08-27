const login = (request, response) => {
    response.send({
        token: "123456"
    });
};

module.exports = {
    login
}