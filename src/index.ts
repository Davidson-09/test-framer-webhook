import * as express from 'express';
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook endpoint
app.post('/webhook', (req: Request, res: Response) => {
    const formData = req.body;
    console.log('Received form data:', formData);
    
    // Process the form data here
    
    res.status(200).json({ message: 'Webhook received successfully', data: formData });
});

app.get('/', (req, res) => {
    function getRandomBoolean() {
        return Math.random() < 0.5;
    }

    console.log('the ram', getRandomBoolean())

    res.status(200).send(JSON.stringify(getRandomBoolean()));
});

app.listen(PORT, () => {
    console.log(`Webhook server is running on port ${PORT}`);
});