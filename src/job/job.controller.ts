
import { Request, Response } from "express";
import { logger } from "../services/logger.service.js";
import {  jobService } from "./job.service.js";
import { Job } from "../models/job.model.js";


export async function getJobById(req: Request, res: Response) {
    try {
        const job = await jobService.getById(req.params.id)
        res.send(job)
    } catch (err) {
        logger.error('Failed to get job', err)
        res.status(400).send({ err: 'Failed to get job' })
    }
}

export async function getJobs(req: Request, res: Response) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        const jobs = await jobService.query()
        res.send(jobs)
    } catch (err) {
        logger.error('Failed to get jobs', err)
        res.status(400).send({ err: 'Failed to get jobs' })
    }
}

export async function addJob(req: Request, res: Response) {

    try {
        const job :Job = req.body
        const addedJob = await jobService.add(job)
        res.json(addedJob)
    } catch (err) {
        logger.error('Failed to add job', err)
        res.status(400).send({ err: 'Failed to add job' })
    }
}

export async function removeJob(req: Request, res: Response) {
    try {
        await jobService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete job', err)
        res.status(400).send({ err: 'Failed to delete job' })
    }
}

export async function updateJob(req: Request, res: Response) {
    try {
        const job :Job = req.body
        const savedJob = await jobService.update(job)
        res.send(savedJob)
    } catch (err) {
        logger.error('Failed to update job', err)
        res.status(400).send({ err: 'Failed to update job' })
    }
}