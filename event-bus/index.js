import Express from "express";
import axios from "axios";
import Cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended: true}))
app.use(Cors());

app.post('/events', (req, res) => {
    const event = req.body;

    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);

    res.send({status: 'OK'});
});

app.listen(4005, () => {
    console.log('Listening on 4005')
});

