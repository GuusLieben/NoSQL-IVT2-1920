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

// export async function createUser(req: any, res: any) {
//         logger.debug('> createUser was called');
//         const email = req.body.email;
//         const username = req.body.username;
//         const password = req.body.password;
//         const result = await mongoRepository.createUser(username, email, password);
//
//     if (result.error) {
//         res.status(500).json({err: result.error});
//         logger.color('red').debug('> getFriends went wrong!');
//     } else {
//         res.status(200).json({result: result.result});
//         logger.color('green').debug('> getFriends was successful');
//     }
//     }
// }
