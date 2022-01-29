import Express from 'express';
import {randomBytes} from 'crypto';
import Cors from 'cors';
import axios from 'axios';


const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))
app.use(Cors());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] ?? [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content, status: 'pending'})
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    console.log(comments);

    res.status(201).send(comments);
})

app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);
    console.log(req.body);
    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})