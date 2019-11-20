import {User} from '../models/user';

export const queries = {
    createTestObject: "CREATE (n:Person {name:'TestUserThisIsATestUserTestFinalv2'}) RETURN n.name",
    deleteTestObject: "MATCH (n { name: 'TestUserThisIsATestUserTestFinalv2' }) DETACH DELETE n",
    deleteAllFriendlessNodes: "MATCH (user) WHERE NOT (user)-[:Friends]-() DELETE user",

    createFriends: (user1: User, user2: User) => "MERGE (user1: User {name: '" + user1.name + "'}) MERGE (user2: User {name: '" + user2.name + "'}) MERGE (user1)-[:Friends]->(user2) MERGE (user2)-[:Friends]->(user1) RETURN user1, user2",
    getFriends: (username: String) => "MATCH (:User {name: '" + username + "' })-->(user) RETURN user.name",
    deleteFriendsRelationship: (user1: User, user2: User) => "MATCH (user1 {name: '" + user1.name + "'})-[r1:Friends]->(user2) MATCH (user2 {name: '" + user2.name + "'})-[r2:Friends]->(user1) DELETE r1, r2",
    deleteFriendlessNodes: (user1: User, user2: User) => "MATCH(user:User) WHERE (user.name = '" + user1.name + "' OR user.name = '" + user2.name + "') AND NOT (user)-[:Friends]-() DELETE user"
}
