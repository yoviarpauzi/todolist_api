import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../route/public-api.js";
import { userRouter, contactRouter, addressRouter } from "../route/api.js";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);
web.use(contactRouter);
web.use(addressRouter);

web.use(errorMiddleware);
