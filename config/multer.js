const multer=require('multer');


var storage=multer.memoryStorage();

module.exports.Upload=multer({storage:storage})


