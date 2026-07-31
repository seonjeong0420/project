import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import categoryRouter from "./routes/category.route";
import transactionRouter from "./routes/transaction.route";
import dashboardRouter from "./routes/dashboard.route";
import chartRouter from "./routes/chart.route";
import analysisRouter from "./routes/analysis.route";

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
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);
app.use("/dashboard", dashboardRouter);
app.use("/charts", chartRouter);
app.use("/analysis", analysisRouter);

export default app;
