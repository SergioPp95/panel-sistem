const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const fileLocation = path.resolve(__dirname, "../../public/images/users")
        cb(null, fileLocation)
    },
    filename: function (req, file, cb) {
        let imageName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const mult = multer({ storage: storage })

module.exports = mult