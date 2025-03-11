"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const Airtable = require("airtable");
console.log('the key', process.env.AIRTABLE_KEY);
Airtable.configure({ apiKey: process.env.AIRTABLE_KEY, endpointUrl: 'https://api.airtable.com' });
const venueHouseBase = Airtable.base('app0bMO8gPe4LCRL0');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: "https://vibrant-clicks-492859.framer.app" }));
// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Webhook endpoint
app.post('/webhook', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);
    // Process the form data here
    res.status(200).json({ message: 'Webhook received successfully', data: formData });
});
app.get('/api/essential/usercanupload/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    // check the plan the particular email is subscribed to
    try {
        const maxPosts = 1;
        let postCount = 0;
        yield venueHouseBase('Venue House').select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage(function (err, records) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw new Error(err);
                }
                postCount = records === null || records === void 0 ? void 0 : records.length;
                res.status(200).json({ message: 'email checked', canUpload: postCount < maxPosts });
            });
        });
    }
    catch (e) {
        res.status(500).json({ message: JSON.stringify(e, null, 3) });
    }
}));
app.get('/api/enhanced/usercanupload/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    // check the plan the particular email is subscribed to
    try {
        const maxPosts = 3;
        let postCount = 0;
        yield venueHouseBase('Venue House').select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage(function (err, records) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw new Error(err);
                }
                postCount = records === null || records === void 0 ? void 0 : records.length;
                res.status(200).json({ message: 'email checked', canUpload: postCount < maxPosts });
            });
        });
    }
    catch (e) {
        res.status(500).json({ message: JSON.stringify(e, null, 3) });
    }
}));
app.get('/api/exclusive/usercanupload/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const maxPosts = 5;
        let postCount = 0;
        yield venueHouseBase('Venue House').select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage(function (err, records) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw new Error(err);
                }
                postCount = records === null || records === void 0 ? void 0 : records.length;
                res.status(200).json({ message: 'email checked', canUpload: postCount < maxPosts });
            });
        });
    }
    catch (e) {
        res.status(500).json({ message: JSON.stringify(e, null, 3) });
    }
}));
app.listen(PORT, () => {
    console.log(`Webhook server is running on port ${PORT}`);
});
