import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryMongodb} from "../services/repository.mongodb";
import {logger} from "../app";

const mongoRepository: RepositoryInterface = new RepositoryMongodb();

export async function postComment (req: any, res: any) {
    logger.debug('> postComment was called');
    const username = req.body.username;
    const content = req.body.content;
    const threadId = req.params.id;

    const result = await mongoRepository.postComment(username, content, threadId);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> postComment went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> postComment was successful');
    }
}
