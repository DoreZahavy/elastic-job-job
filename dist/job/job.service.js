import { dbService } from '../services/db.service.js';
import { logger } from '../services/logger.service.js';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;
export const jobService = {
    add,
    getById,
    update,
    remove,
    query,
};
async function query(filterBy = {}) {
    const criteria = _buildCriteria(); // filterBy
    try {
        const collection = await dbService.getCollection('job');
        return await collection.find(criteria).toArray();
    }
    catch (err) {
        logger.error('cannot find jobs', err);
        throw err;
    }
}
async function getById(jobId) {
    try {
        const collection = await dbService.getCollection('job');
        return await collection.findOne({ _id: new ObjectId(jobId) });
    }
    catch (err) {
        logger.error(`while finding job by id: ${jobId}`, err);
        throw err;
    }
}
async function remove(jobId) {
    try {
        const collection = await dbService.getCollection('job');
        await collection.deleteOne({ _id: new ObjectId(jobId) });
    }
    catch (err) {
        logger.error(`cannot remove job ${jobId}`, err);
        throw err;
    }
}
async function update(job) {
    try {
        // peek only updatable properties
        const jobToSave = {
            ...job,
            _id: new ObjectId(job._id), // needed for the returned obj
        };
        // const jobToSave = job
        // job._id = new ObjectId(job._id)
        const collection = await dbService.getCollection('job');
        await collection.updateOne({ _id: jobToSave._id }, { $set: jobToSave });
        return jobToSave;
    }
    catch (err) {
        logger.error(`cannot update job ${job._id}`, err);
        throw err;
    }
}
async function add(job) {
    try {
        // peek only updatable fields!
        const jobToAdd = {
            ...job
        };
        const collection = await dbService.getCollection('job');
        await collection.insertOne(jobToAdd);
        return jobToAdd;
    }
    catch (err) {
        logger.error('cannot add job', err);
        throw err;
    }
}
function _buildCriteria() {
    const criteria = {};
    // if (filterBy.txt) {
    //     const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    //     criteria.$or = [
    //         {
    //             email: txtCriteria
    //         },
    //         {
    //             fullname: txtCriteria
    //         }
    //     ]
    // }
    // if (filterBy.minBalance) {
    //     criteria.score = { $gte: filterBy.minBalance }
    // }
    return criteria;
}
