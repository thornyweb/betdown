import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mern-starter';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.disable('x-powered-by');
app.use(bodyParser.json(), cors())
app.use(require('../route/auth-router'));


app.all('*', (request, response) => {
  console.log('Returning a 404 from the catch-all route');
  return response.sendStatus(404);
});

// error middleware
// app.use(require('./error-middleware'));


export const start = () => {
  app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`)
  })
}

export const stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port: ${PORT}`)
  })
}