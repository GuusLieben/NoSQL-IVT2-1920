import {mongo} from 'mongoose';
import {app} from '../app';
import environment from "../environment";

export const port = process.env.PORT || environment.app.port ||  5000;
export let db: any;

app.on('databaseConnected', () => {
    app.listen(port, () => console.log('Application started on port ' + port));
});

export function init() {
    db = mongo.connect(environment.mongo.connectionString, (err: any, response: any) => {
        if (err) {
            console.log('An error occurred while connecting to MongoDb :\n' + err);
        } else {
            app.emit('databaseConnected')
            console.log('Connected to MongoDb on : ' + response.s.url);
        }
    });
}
