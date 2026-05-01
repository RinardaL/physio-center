const router = require("express").Router();
const c = require("../controllers/equipmentController");

router.post("/", c.createEquipment);
router.get("/", c.getEquipment);
router.get("/:id", c.getEquipmentById);
router.put("/:id", c.updateEquipment);
router.delete("/:id", c.deleteEquipment);

module.exports = router;