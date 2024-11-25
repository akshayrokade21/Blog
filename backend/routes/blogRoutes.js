import express from 'express';
import { createBlog, deleteBlog, getallBlog, getBlogbyid, getBlogbyuserid, updateBlog } from '../controllers/blogController.js';
import multer from 'multer';
import path from 'path';


const router = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('thumbnail'), createBlog)
router.delete('/delete/:id', deleteBlog)
router.put('/update/:id', upload.single('thumbnail'), updateBlog)
router.get('/all', getallBlog)
router.get('/:id', getBlogbyid)
router.get('/user/:userid', getBlogbyuserid)

export default router;