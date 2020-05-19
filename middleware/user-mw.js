module.exports = {
    isValidSignup,
    isValidLogin,
}

function isValidSignup(user) {
    return Boolean(user.username && user.password && user.department)
}

function isValidLogin(user) {
    return Boolean(user.username && user.password && typeof user.password === "string")
}