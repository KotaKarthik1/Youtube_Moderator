const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const generateUUID=require('../helpers/uuid');
const { Upload } = require('@aws-sdk/lib-storage');
const router = express.Router();
const { Readable } = require('stream');
const {authenticateToken,isLoggedIn} = require('../authentication/AuthCheck');
const s3 = require('../config/awss3');
const User = require('../Models/UsersModel');
// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// YouTube API setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/auth/google/callback" // Redirect URL
);

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
const youtube = google.youtube({ version: 'v3', auth: oauth2Client });



router.post('/upload',isLoggedIn,upload.single('file'), async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  if (!title || !description) {
    return res.status(400).send('Title and description are required.');
  }
  const uniqueid=generateUUID();
  // Upload file to S3
  try {
    console.log("uploading to s3");
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${uniqueid}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read', // You can adjust the ACL as needed
      },
    });

    const user = User.findOne()
    const s3Response = await upload.done();
    console.log("File uploaded to S3 successfully", s3Response);
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return res.status(500).send('Error uploading file to S3.');
  }

  // Upload video to YouTube
  try {
    console.log("uploading to youtube");
    const accessToken = req.user.accessToken; // Assuming you store it in the user object
    oauth2Client.setCredentials({ access_token: accessToken });
    const videoStream = bufferToStream(req.file.buffer);

    const youtubeResponse = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags: ['video', 'upload'],
          categoryId: '22', // Change to your desired category ID
        },
        status: {
          privacyStatus: 'public', // Change as needed
        },
      },
      media: {
        body: videoStream,
      },
    });
    console.log("uploaded to youtube");
    res.status(200).send(youtubeResponse.data);
  } catch (error) {
    console.error('Error uploading video to YouTube:', error);
    res.status(500).send('Error uploading video to YouTube.');
  }
});

router.get('/uploadtest',isLoggedIn,async(req,res)=>
{
  console.log("hey bro ");
  res.json(text='testing done');
})

router.get('/getvideo',isLoggedIn,async(req,res)=>
{

})

module.exports = router;
