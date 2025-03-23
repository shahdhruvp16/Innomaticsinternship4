import express from "express";
import { addDoctor, allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

// Route for adding a doctor with image upload
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }
    next();
}, addDoctor);

// Route for admin login
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin , allDoctors);


export default adminRouter;
