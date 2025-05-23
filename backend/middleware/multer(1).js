const multer = require('multer');
const path = require('path');

//configure where to save uploaded files temporarly 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads/');//to save files in the 'uploads' folder
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`); //unique filename  
    },
});

//Allow only image files 
const fileFilter = (req,file,cb)=>{
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if(mimetype && extname){
        cb(null, true);//Accept the file
    } else{
        cb(new Error('only images are allowed'));//Reject the file
    }
};

//Initialize Multer 
const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:5*1024*1024}, //limit file size to 5MB
});

module.exports = upload;