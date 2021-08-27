const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    return !(token === undefined || token === null || token === "");
}

const setLoggedIn = (token) => {
    if (token === null || token == undefined || token === "") {
        localStorage.removeItem("username");
    }
    localStorage.setItem("token", token);
}

const setLoggedUserName = (username) => {
    localStorage.setItem("username", username);
}

const getLoggedUserName = () => {
    return localStorage.getItem("username");
}

module.exports = {
    isLoggedIn,
    setLoggedIn,
    setLoggedUserName,
    getLoggedUserName
}