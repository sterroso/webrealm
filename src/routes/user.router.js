import { Router } from "express";
import * as UsersController from "../controllers/users.controller.js";

const router = Router();

router.get("/", UsersController.getAllUsers);

router.get("/:userId", UsersController.getUserById);

router.post("/", UsersController.createUser);

router.put("/:userId", UsersController.updateUser);

router.delete("/:userId", UsersController.deleteUser);

export default router;