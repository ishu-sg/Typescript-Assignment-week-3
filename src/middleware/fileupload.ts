import multer from 'multer'
import path from 'path'


const storage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+".pdf");
    }
  }),
}).single("file");


export {storage};