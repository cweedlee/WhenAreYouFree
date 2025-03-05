const { MongoClient } = require("mongodb");
const { eventNames } = require("./models/User");
const { default: mongoose } = require("mongoose");

const uri =
  "mongodb+srv://siwon9213:3in9vzh2ls99035d8y86489@clusterwruf.i0iem.mongodb.net/"; // MongoDB 연결 URL
const dbName = "test"; // 초기화할 데이터베이스 이름

async function initializeDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // 컬렉션 생성 및 초기 데이터 삽입
    delete mongoose.connection.models["User"];
    delete mongoose.connection.models["Event"];
    delete mongoose.connection.models["Schedule"];

    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await client.close();
  }
}

initializeDB();
