import express from "express";
import authRoutes from "./Routes/authRoute.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: "../client/src/assets/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(4040, () => {
  console.log("Connected!");
});