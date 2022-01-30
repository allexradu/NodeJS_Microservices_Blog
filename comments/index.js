import Express from 'express';
import {randomBytes} from 'crypto';
import cors from 'cors';
import axios from 'axios';


const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))
app.use(cors());

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

    await axios.post('http://event-bus-srv:4005/events', {
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

app.post('/events', async (req, res) => {
    console.log('Event Received: ', req.body.type);
    const {type, data} = req.body;

    if (type === 'CommentModerated') {
        console.log('received comment moderated')
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id
        });

        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }

    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on 4001')
})