import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryNeo4j} from "../services/repository.neo4j";
import {logger} from "../app";

const friendRepository: RepositoryInterface = new RepositoryNeo4j();

export default {
    getFriends: async (req: any, res: any) => {

        logger.color('pink').debug('> getFriends was called');
        const username = req.body.username;

        const result = await friendRepository.getFriends(username);
        if (result.error) {
            res.status(500).json({err: result.error});
            logger.color('red').debug('> getFriends went wrong!');
        } else {
            res.status(200).json({result: result.result});
            logger.color('green').debug('> getFriends was successful');
        }
    }
}
