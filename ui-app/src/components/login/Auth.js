const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    return !(token === undefined || token === null || token === "");
}

const setLoggedIn = (token) => {
    if (token === null || token == undefined || token === "") {
        localStorage.removeItem("user");
    }
    localStorage.setItem("token", token);
}

const setLoggedInUser = (userId, username) => {
    localStorage.setItem("user", JSON.stringify({ username: username, userId: userId }));
}

const getLoggedUserName = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user).username;
    }
}

const getLoggedUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user).userId;
    }
}

module.exports = {
    isLoggedIn,
    setLoggedIn,
    setLoggedInUser,
    getLoggedUserId,
    getLoggedUserName
}