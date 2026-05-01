const router = require("express").Router();
const c = require("../controllers/clinicalAssessmentController");

router.post("/", c.createAssessment);
router.get("/", c.getAssessments);
router.get("/:id", c.getAssessment);
router.put("/:id", c.updateAssessment);
router.delete("/:id", c.deleteAssessment);

module.exports = router;