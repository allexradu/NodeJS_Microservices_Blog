import Express from 'express';
import axios from "axios";
import {sleep} from "./utils/index.js";

const app = Express()
app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await sleep(10000);

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }


    res.send({});
})

app.listen(4003, () => {
    console.log('Listening on 4003')
})