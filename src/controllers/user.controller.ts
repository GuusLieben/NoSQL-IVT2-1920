import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryNeo4j} from "../services/repository.neo4j";
import {RepositoryMongodb} from "../services/repository.mongodb";
import {logger} from "../app";

const friendRepository: RepositoryInterface = new RepositoryNeo4j();
const mongoRepository: RepositoryInterface = new RepositoryMongodb();

export async function getFriends(req: any, res: any) {
    logger.debug('> getFriends was called');
    const username = req.params.username;
    const result = await friendRepository.getFriends(username);
    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> getFriends went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> getFriends was successful');
    }
}

export async function createUser(req: any, res: any) {
    logger.debug('> createUser was called');
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const result = await mongoRepository.createUser(username, email, password);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> createUser went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> createUser was successful');
    }
}

export async function deleteUser(req: any, res: any) {
    logger.debug('> deleteUser was called');
    const username = req.params.username;
    const password = req.body.password;
    const result = await mongoRepository.deleteUser(username, password);

    if (result.error) {
        res.status(401).json({err: result.error});
        logger.color('red').debug('> deleteUser went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> deleteUser was successful');
    }
}

export async function getUser(req: any, res: any) {
    logger.debug('> getUser was called');
    const username = req.params.username;
    const result = await mongoRepository.getUser(username);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> getUser went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> getUser was successful');
    }
}

export async function updateUser(req: any, res: any) {
    logger.debug('> updateUser was called');
    const username = req.params.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const result = await mongoRepository.updateUser(username, oldPassword, newPassword);

    if (result.error) {
        res.status(401).json({err: result.error});
        logger.color('red').debug('> updateUser went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> updateUser was successful');
    }
}
