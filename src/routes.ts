import { Router } from "express";
import { createUserController } from "./usecases/createUser";

const router = Router();

router.get("/user", (request, response) => {
  // return response.status(201).send("Route working fine");
  return createUserController.handle(request, response);
});

export { router };
