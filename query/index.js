import Express from 'express';
import Cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}));
app.use(Cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    if (type === 'PostCreated') {
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002')
})
