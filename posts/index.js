import Express from 'express'
import {randomBytes} from 'crypto';
import Cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))
app.use(Cors());


const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id, title
    }

    res.status(201).send(posts[id])
});

app.listen(4000, () => {
    console.log('Listening on 4000')
})