import express from "express";
import cors from "cors";
import authrouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authrouter);
app.use("/users", userRouter);

export default app;
