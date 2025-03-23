import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API FOR ADDING DOCTORS
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: typeof address === "object" ? JSON.stringify(address) : address,
      available: true,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      if (!process.env.JWT_SECRET_KEY) {
        return res.status(500).json({ success: false, message: "JWT secret key is missing" });
      }
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });

      return res.json({ success: true, message: "Admin logged in successfully", token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API to get all doctors for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({ success: true, doctors });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export { addDoctor, loginAdmin, allDoctors };
