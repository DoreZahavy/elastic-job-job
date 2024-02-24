import express from 'express';
import { addJob, getJobById, getJobs, removeJob, updateJob } from './job.controller.js';
const router = express.Router();
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', addJob);
router.put('/:id', updateJob);
router.delete('/:id', removeJob);
export const jobRoutes = router;
