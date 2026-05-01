const router = require("express").Router();
const c = require("../controllers/exerciseController");

router.post("/", c.createExercise);
router.get("/", c.getExercises);
router.get("/:id", c.getExercise);
router.put("/:id", c.updateExercise);
router.delete("/:id", c.deleteExercise);

module.exports = router;