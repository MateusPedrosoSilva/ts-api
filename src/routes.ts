import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  return response.status(201).send("Route working fine");
});

export { router };
