const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//Models
require("./models/Event");
require("./models/User");

const app = express();
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
const userRoutes = require("./routes/userRoutes"); // 추가 가능

// 📌 라우터 사용
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes); // 유저 API 추가 가능

const PORT = process.env.PORT || 9000;
app.listen(PORT, () =>
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`)
);
