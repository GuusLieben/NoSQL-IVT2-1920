import {User} from '../models/user';

export const queries = {
    createFriendsQuery: (user1: User, user2: User) => "MERGE (user1: User {name: '" + user1.name + "'}) MERGE (user2: User {name: '" + user2.name + "'}) MERGE (user1)-[:Friends]->(user2) MERGE (user2)-[:Friends]->(user1) RETURN user1, user2",
    createTestObject: "CREATE (n:Person {name:'TestUserThisIsATestUserTestFinalv2'}) RETURN n.name",
    deleteTestObject: "MATCH (n { name: 'TestUserThisIsATestUserTestFinalv2' }) DETACH DELETE n"
}
