import jwt from 'jsonwebtoken';

//admin authentication middleware
const authAdmin =  async (req, res, next) => {
    try {
        const {atoken} = req.header
        if (!atoken){
            return res.status(401).json({ success: false, message: "Not Authorized Log in Again" });
        }
        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET_KEY);

        if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        } 

        next();
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export default authAdmin