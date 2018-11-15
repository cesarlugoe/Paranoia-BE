const mongoose = require('mongoose');

function isLoggedIn (req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    const err = new Error('Unauthorized');
    err.status = 403;
    err.statusMessage = 'Unauthorized';
    next(err);
  }
}

function objectIdValid (req, res, next) {
  let objectId = req.params._id;
  objectId = mongoose.Types.ObjectId.isValid(objectId);
  if (!objectId) { return res.status(404).json({ code: 'not found' }) }
  next();
}


module.exports = {
  isLoggedIn,
  objectIdValid,
}