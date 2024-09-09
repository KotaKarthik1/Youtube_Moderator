const oauth2Client = require('./oauth2client');
exports.youtube = google.youtube({ version: 'v3', auth: oauth2Client.oauth2Client });