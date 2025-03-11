import * as express from 'express';
import { Request, Response } from 'express'
import * as bodyParser from 'body-parser';
import * as cors from 'cors'
require('dotenv').config();
import * as Airtable from 'airtable'

console.log('the key', process.env.AIRTABLE_KEY)

Airtable.configure({ apiKey: process.env.AIRTABLE_KEY, endpointUrl: 'https://api.airtable.com' });
const venueHouseBase = Airtable.base('app0bMO8gPe4LCRL0');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "https://vibrant-clicks-492859.framer.app" }));

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

app.get('/api/usercanupload/essential/:email', async (req, res) => {
    const email = req.params.email;
    // check the plan the particular email is subscribed to
    try {
        const maxPosts = 1
        let postCount = 0
        await venueHouseBase('Venue House').select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage(async function (err:any, records:any) {
            if (err) {
                throw new Error(err)
            }
            postCount = records?.length
            res.status(200).json({ message: 'email checked', canUpload: postCount < maxPosts});
        })
    } catch (e){
        res.status(500).json({ message: JSON.stringify(e, null, 3)});
    }
});

app.get('/api/usercanupload/enhanced/:email', async (req, res) => {
    const email = req.params.email;
    // check the plan the particular email is subscribed to
    try {
        const maxPosts = 3
        let postCount = 0
        await venueHouseBase('Venue House').select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage(async function (err:any, records:any) {
            if (err) {
                throw new Error(err)
            }
            postCount = records?.length
            res.status(200).json({ message: 'email checked', canUpload: postCount < maxPosts});
        })
    } catch (e){
        res.status(500).json({ message: JSON.stringify(e, null, 3)});
    }
});

app.get('/api/usercanupload/exclusive/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const maxPosts = 5
        let postCount = 0
        await venueHouseBase('Venue House').select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage(async function (err:any, records:any) {
            if (err) {
                throw new Error(err)
            }
            postCount = records?.length
            res.status(200).json({ message: 'email checked', canUpload: postCount < maxPosts});
        })
    } catch (e){
        res.status(500).json({ message: JSON.stringify(e, null, 3)});
    }
});

app.listen(PORT, () => {
    console.log(`Webhook server is running on port ${PORT}`);
});