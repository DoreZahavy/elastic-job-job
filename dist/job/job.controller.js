import { logger } from "../services/logger.service.js";
import { jobService } from "./job.service.js";
export async function getJobById(req, res) {
    try {
        console.log('req.params.id', req.params.id);
        const job = await jobService.getById(req.params.id);
        console.log("🚀 ~ getJobById ~ job:", job);
        res.send(job);
    }
    catch (err) {
        logger.error('Failed to get job', err);
        res.status(400).send({ err: 'Failed to get job' });
    }
}
export async function getJobs(req, res) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        const jobs = await jobService.query();
        res.send(jobs);
    }
    catch (err) {
        logger.error('Failed to get jobs', err);
        res.status(400).send({ err: 'Failed to get jobs' });
    }
}
export async function addJob(req, res) {
    try {
        const job = req.body;
        const addedJob = await jobService.add(job);
        res.json(addedJob);
    }
    catch (err) {
        logger.error('Failed to add job', err);
        res.status(400).send({ err: 'Failed to add job' });
    }
}
export async function removeJob(req, res) {
    try {
        await jobService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    }
    catch (err) {
        logger.error('Failed to delete job', err);
        res.status(400).send({ err: 'Failed to delete job' });
    }
}
export async function updateJob(req, res) {
    try {
        const job = req.body;
        const savedJob = await jobService.update(job);
        res.send(savedJob);
    }
    catch (err) {
        logger.error('Failed to update job', err);
        res.status(400).send({ err: 'Failed to update job' });
    }
}
