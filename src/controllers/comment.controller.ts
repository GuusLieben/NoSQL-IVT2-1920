import {RepositoryInterface} from "../services/repository.interface";
import {RepositoryMongodb} from "../services/repository.mongodb";
import {logger} from "../app";

const mongoRepository: RepositoryInterface = new RepositoryMongodb();

// Export functions

export async function postComment(req: any, res: any) {
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

export async function getComment(req: any, res: any) {
    logger.debug('> getComment was called')
    const commentId = req.params.id;
    const result = await mongoRepository.getComment(commentId);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> getComment went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> getComment was successful');
    }
}

export async function deleteComment(req: any, res: any) {
    logger.debug('> getComment was called')
    const commentId = req.params.id;
    const result = await mongoRepository.deleteComment(commentId);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> deleteComment went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> deleteComment was successful');
    }
}

export async function upvoteComment(req: any, res: any) {
    logger.debug('upvoteComment was called')
    const id = req.params.id;
    const username = req.body.username;
    const result = await mongoRepository.upvote(id, username);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> upvoteComment went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> upvoteComment was successful');
    }
}

export async function downvoteComment(req: any, res: any) {
    logger.debug('downvoteComment was called')
    const id = req.params.id;
    const username = req.body.username;
    const result = await mongoRepository.downvote(id, username);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> downvoteComment went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> downvoteComment was successful');
    }
}

export async function postCommentOnComment(req: any, res: any) {
    logger.debug('> postCommentOnComment was called')
    const threadId = req.params.id;
    const username = req.body.username;
    const content = req.body.content;
    const result = await mongoRepository.postCommentOnComment(threadId, username, content);

    if (result.error) {
        res.status(500).json({err: result.error});
        logger.color('red').debug('> postCommentOnComment went wrong!');
    } else {
        res.status(200).json({result: result.result});
        logger.color('green').debug('> postCommentOnComment was successful');
    }
}
