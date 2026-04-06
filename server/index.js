import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/db.js' 
import express from 'express'
import cookieParser from "cookie-parser";
import apiRoutes from './routes/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'
const app = express()

app.use(express.json())
app.use(cookieParser())
//routes
app.use("/api/v1",apiRoutes)

//error handling
app.use(errorMiddleware);

//server running
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();