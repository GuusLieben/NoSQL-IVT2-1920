import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryMongodb} from "../services/repository.mongodb";
import {logger} from "../app";

const mongoRepository: RepositoryInterface = new RepositoryMongodb();

export async function createThread(req: any, res: any) {
    logger.debug('> createThread was called');
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    const result = await mongoRepository.createThread(username, title, content);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> createThread went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> createThread was successful');
    }
}

export async function deleteThread(req: any, res: any) {
    logger.debug('> deleteThread was called');
    const threadId = req.params.id;
    const result = await mongoRepository.deleteThread(threadId);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> deleteThread went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> deleteThread was successful');
    }
}

export async function getCommentsForThread(req: any, res: any) {
    logger.debug('> getCommentsForThread was called');
    const threadId = req.params.id;
    const result = await mongoRepository.getCommentsForThread(threadId);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> getCommentsForThread went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> getCommentsForThread was successful');
    }
}

export async function getThread(req: any, res: any) {
    logger.debug('> getThread was called');
    const threadId = req.params.id;
    const result = await mongoRepository.getThread(threadId);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> getThread went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> getThread was successful');
    }
}

export async function getThreads(req: any, res: any) {
    logger.debug('> getThreads was called');
    const result = await mongoRepository.getThreads();

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> getThreads went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> getThreads was successful');
    }
}

export async function updateThread(req: any, res: any) {
    logger.debug('> updateThread was called');
    const threadId = req.params.id;
    const content = req.body.content;
    if (req.body.title) {
        res.status(406).json({err: 'Title cannot be changed'});
        logger.color('red').debug('> updateThread not allowed to change the title ya dingus');
    } else {
        const result = await mongoRepository.updateThread(threadId, content);


        if (result.error) {
            res.status(500).json({err: result.error});
            logger.color('red').debug('> updateThread went wrong!');
        } else {
            res.status(200).json({result: result.result});
            logger.color('green').debug('> updateThread was successful');
        }
    }

}
