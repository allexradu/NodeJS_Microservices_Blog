import Express from 'express';
import {randomBytes} from 'crypto';
import Cors from 'cors';


const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))
app.use(Cors());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] ?? [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content})
    commentsByPostId[req.params.id] = comments;
    console.log(comments);

    res.status(201).send(comments);
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})