function getSignUp(req, res) {
    res.render('customer/auth/signup');
}

function signup(req, res){

}

function getLogin(req, res) {

}

module.exports = {
    getSignUp: getSignUp,
    getLogin: getLogin,
    signup:signup
}