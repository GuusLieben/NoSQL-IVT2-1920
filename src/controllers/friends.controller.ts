import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryNeo4j} from "../services/repository.neo4j";
import {logger} from "../app";

const friendRepository: RepositoryInterface = new RepositoryNeo4j();

export default {
    createFriendship: async (req: any, res: any) => {

        logger.color('pink').log('createFriendsip was called');
        const username1 = req.body.username1;
        const username2 = req.body.username2;

        const result = await friendRepository.createFriends(username1, username2);
        if (result.error) {
            res.status(500).json({err: result.error});
        } else {
            res.status(200).json({result: result.result});
        }
    },

    deleteFriendship: async (req: any, res: any) => {

    }


}



