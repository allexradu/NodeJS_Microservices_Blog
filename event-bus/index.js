import Express from 'express';
import axios from 'axios';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    axios.post('http://localhost:4003/events', event);

    res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Listening on 4005')
});

