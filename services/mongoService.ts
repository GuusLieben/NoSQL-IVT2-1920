import { mongo, Schema, model } from 'mongoose';

const db = mongo.connect('mongodb://localhost:27017/studdit', (err: any, response: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ' + db, ' + ', response);
  }
});

const exampleSchema = new Schema({
    description: String
});

const exampleModel = model('exampleName', exampleSchema, 'exampleCollection')

export function setup() {
    // Enjoy
}
