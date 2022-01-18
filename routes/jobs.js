const express = require("express");
const authCheck = require("../middleware/checkAuth");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

const router = express.Router();
// All routes are protected with jwt token
router.get("/", authCheck, getAllJobs);
router.get("/:id", authCheck, getJobById);
router.post("/", authCheck, createJob);
router.put("/", authCheck, updateJob);
router.delete("/", authCheck, deleteJob);

module.exports = router;
