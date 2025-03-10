function setImagePath(req, res, next) {

    // path assoluto dell'img
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies/`;

    next()
}



module.exports = setImagePath;