import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = express.Router();
const contactRouter = express.Router();
const addressRouter = express.Router();

userRouter.use(authMiddleware);
contactRouter.use(authMiddleware);
addressRouter.use(authMiddleware);

// Users
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Contact
contactRouter.post("/api/contacts", contactController.create);
contactRouter.get("/api/contacts/:id", contactController.get);
contactRouter.put("/api/contacts/:id", contactController.update);
contactRouter.delete("/api/contacts/:id", contactController.remove);
contactRouter.get("/api/contacts", contactController.search);

// Address
addressRouter.post(
  "/api/contacts/:contactId/addresses",
  addressController.create
);
addressRouter.put(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.update
);
addressRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.get
);
addressRouter.get("/api/contacts/:contactId/addresses", addressController.list);
addressRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  addressController.remove
);

export { userRouter, contactRouter, addressRouter };
