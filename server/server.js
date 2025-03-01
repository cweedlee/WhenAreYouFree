const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Models
require("./models/Event");
require("./models/User");
require("./models/Schedule");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB 연결 성공!"))
  .catch((err) => console.error("❌ MongoDB 연결 실패:", err));

// 📌 routes 폴더에 있는 파일을 불러오기
const eventRoutes = require("./routes/eventRoutes");
// const userRoutes = require("./routes/userRoutes");

// session start
app.use(async (req, res, next) => {
  console.log(`📢 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method !== "get") {
    const session = await mongoose.startSession();
    session.startTransaction();
    req.session = session;
    console.log("🔵 세션 시작");
  }
  next();
});

// routes
app.use("/api/events", eventRoutes);

// session end
app.use(async (req, res) => {
  if (req.session) {
    await req.session.commitTransaction();
    req.session.endSession();
    console.log("🔵 session closed OK");
  }
});

// error handler
app.use(async (err, req, res, next) => {
  if (req.session) {
    await req.session.abortTransaction();
    req.session.endSession();
    console.log("🔴 session closed notOK");
  }

  console.error(err);
  let status = +err?.message.slice(0, 3) || 500;
  res.status(status).json({ message: err?.message.slice(4) || err });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`)
);
