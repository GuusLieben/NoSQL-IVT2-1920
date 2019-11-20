import {User} from '../models/user';

export const queries = {
    createTestObject: "CREATE (n:Person {name:'TestUserThisIsATestUserTestFinalv2'}) RETURN n.name",
    deleteTestObject: "MATCH (n { name: 'TestUserThisIsATestUserTestFinalv2' }) DETACH DELETE n",
    deleteAllFriendlessNodes: "MATCH (user) WHERE NOT (user)-[:Friends]-() DELETE user",

    createFriends: (username1: string, username2: string) => "MERGE (user1: User {name: '" + username1 + "'}) MERGE (user2: User {name: '" + username2 + "'}) MERGE (user1)-[:Friends]->(user2) MERGE (user2)-[:Friends]->(user1) RETURN user1, user2",
    getFriends: (username: string) => "MATCH (:User {name: '" + username + "' })-->(user) RETURN user.name",
    deleteFriendsRelationship: (username1: string, username2: string) => "MATCH (user1 {name: '" + username1 + "'})-[r1:Friends]->(user2) MATCH (user2 {name: '" + username2 + "'})-[r2:Friends]->(user1) DELETE r1, r2",
    deleteFriendlessNodes: (username1: string, username2: string) => "MATCH(user:User) WHERE (user.name = '" + username1 + "' OR user.name = '" + username2 + "') AND NOT (user)-[:Friends]-() DELETE user"
}
