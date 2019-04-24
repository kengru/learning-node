const fs = require("fs");

const deleteFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) {
      throw err;
    }
  });
};

const checkFile = filePath => {
  fs.exists(filePath, err => {
    if (err) {
      throw err;
    }
  });
};

exports.deleteFile = deleteFile;
exports.checkFile = checkFile;
