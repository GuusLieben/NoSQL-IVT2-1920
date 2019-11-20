import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryNeo4j} from "../services/repository.neo4j";
import {logger} from "../app";

const friendRepository: RepositoryInterface = new RepositoryNeo4j();

export default {
    createFriendship: async (req: any, res: any) => {

        logger.color('pink').debug('> createFriendship was called');
        const username1 = req.body.username1;
        const username2 = req.body.username2;

        const result = await friendRepository.createFriends(username1, username2);
        if (result.error) {
            res.status(500).json({err: result.error});
            logger.color('red').debug('> createFriendship was called');
        } else {
            res.status(200).json({result: result.result});
            logger.color('green').debug('> createFriendship was successful');
        }
    },

    deleteFriendship: async (req: any, res: any) => {
        logger.color('pink').debug('> deleteFriendship was called');
        const username1 = req.body.username1;
        const username2 = req.body.username2;

        const result = await friendRepository.deleteFriends(username1, username2);
        if (result.error) {
            res.status(500).json({err: result.error});
            logger.color('red').debug('> deleteFriendship was called');
        } else {
            res.status(200).json({result: result.result});
            logger.color('green').debug('> deleteFriendship was successful');
        }

    }


}



