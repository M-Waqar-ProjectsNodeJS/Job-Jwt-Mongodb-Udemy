const Job = require("../models/job");
const { ResultNotFoundError } = require("../errors");

const getAllJobs = async (req, res, next) => {
  const joblist = await Job.find({});
  res.status(200).json({
    joblist,
    data: req.tokenData,
  });
};
const getJobById = async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.status(200).json({
      job,
    });
  } else {
    throw new ResultNotFoundError("no job found.");
  }
};
const createJob = async (req, res, next) => {
  const job = await Job.create({
    company: req.body.company,
    position: req.body.position,
    status: req.body.status,
  });
  res.status(200).json({
    message: "job created.",
    job,
  });
};
const updateJob = async (req, res, next) => {
  const job = await Job.findById(req.body.id);
  if (job) {
    job.position = req.body.position;
    job.status = req.body.status || "declined";
    await job.save();
    res.status(200).json({
      message: "job updated.",
      job,
    });
  } else {
    throw new ResultNotFoundError("no job found.");
  }
};
const deleteJob = async (req, res, next) => {
  const job = await Job.findById(req.body.id);
  if (job) {
    await job.delete();
    res.status(200).json({
      message: "job deleted.",
    });
  } else {
    throw new ResultNotFoundError("no job found.");
  }
};
module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
