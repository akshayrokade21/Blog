import express from 'express';
import { deleteUser, getallUser, getUserbyid, updateUser } from '../controllers/usercontroller.js';
import { adminAuth } from '../middlewares/adminAuth.js';


const router = express.Router()

router.get("/all", adminAuth, getallUser)
router.get("/:id", getUserbyid)
router.delete("/:id", adminAuth, deleteUser)
router.put("/:id", adminAuth, updateUser)

export default router;