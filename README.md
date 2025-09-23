# PW Certificate Generator

A web application that generates personalized certificates for Physics Wallah (PW) students.

## Features

- Generate personalized certificates with custom names
- Download certificates as PNG images
- Track download statistics
- Admin panel for monitoring downloads
- Responsive design with rainbow animations

## Deployment

This app is designed to be deployed on Vercel at https://pwcertificate.vercel.app/

### API Endpoints

- `GET /api/download-count` - Get current download count
- `POST /api/download-count` - Increment download count
- `DELETE /api/download-count` - Reset download count to 0

### Pages

- `/` - Main certificate generator
- `/admin.html` - Admin dashboard for download statistics
- `/test.html` - API testing page (for debugging)

## Local Development

```bash
npm install
npm start
```

The server will run on http://localhost:3000

## File Structure

```
├── api/
│   └── download-count.js    # Serverless API function
├── data/
│   └── downloads.json       # Download count storage
├── public/
│   ├── index.html          # Main certificate generator
│   ├── admin.html          # Admin dashboard
│   ├── test.html           # API testing page
│   ├── certificate.jpg     # Certificate template
│   └── logo*.svg           # PW logos
├── server.js               # Express server (local dev)
├── package.json
├── vercel.json             # Vercel deployment config
└── README.md
```

## Recent Fixes

1. Fixed API endpoint mismatch between admin.html and serverless function
2. Added proper error handling and user feedback
3. Improved CORS headers for API requests
4. Added directory creation for data persistence
5. Enhanced CSS compatibility with standard properties
6. Added comprehensive debugging and testing capabilities

## Troubleshooting

If you encounter "Error loading count" on the admin page:

1. Check the browser console for error messages
2. Use `/test.html` to debug API connectivity
3. Verify that the `/api/download-count` endpoint is accessible
4. Check Vercel deployment logs for server-side errors