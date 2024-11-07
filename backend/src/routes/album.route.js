import Router from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("album route with get method");
});
export default router;
