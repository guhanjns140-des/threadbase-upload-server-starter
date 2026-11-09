import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../config/upload.js";

const router = Router();

router.post(
    "/upload",
    verifyToken,
    (req, res, next) => {
        upload.single("avatar")(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "Missing avatar file" });
        }

        const url = `/uploads/${req.file.filename}`;
        return res.status(201).json({ url });
    }
);

export default router;