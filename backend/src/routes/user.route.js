import Router from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("User route with get method");
});

router.post("/");

router.get("/");
router.get("/");

export default router;
