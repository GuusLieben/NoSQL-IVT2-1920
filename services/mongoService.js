import mongo from 'mongoose';
const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;

const db = mongo.connect('mongodb://localhost:27017/studdit', (err, response) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ' + db, ' + ', response);
  }
});

const exampleSchema = Schema({
    ownerId: ObjectId,
    description: String
});

const exampleModel = mongo.model('exampleName', exampleSchema, 'exampleCollection')

export function setup() {
    // Enjoy
}
