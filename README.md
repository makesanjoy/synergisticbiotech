# Synergistic Biotech

A pharmaceutical website built with Express.js and EJS templating engine.

## Project Description

This is a Node.js web application for a pharmaceutical company. It serves static pages for home, products, and contact information, with form submission capabilities.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Templating:** EJS
- **Database:** MongoDB (currently disabled)
- **Middleware:** Body-parser
- **Development Tool:** Nodemon
- **Hosting:** Netlify (Serverless)

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- MongoDB (optional - only if you want to enable database functionality)

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd synergisticbiotech
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Project

### Development Mode
Run with auto-reload on file changes:
```bash
npx nodemon index.js
```

### Production Mode
Run the server normally:
```bash
node index.js
```

The server will start on **http://localhost:3000**

## Available Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Home page |
| `/product` | GET | Product page |
| `/contact` | GET | Contact page |
| `/` | POST | Form submission (form handling currently disabled) |

## Project Structure

```
synergisticbiotech/
├── index.js                 # Main server file
├── package.json            # Dependencies and project metadata
├── netlify.toml           # Netlify deployment configuration
├── README.md              # This file
├── public/                # Static files
│   ├── script.js         # Client-side JavaScript
│   ├── css/
│   │   └── styles.css    # Stylesheets
│   └── images/           # Image assets
└── views/                # EJS templates
    ├── home.ejs          # Home page template
    ├── product.ejs       # Product page template
    ├── contact.ejs       # Contact page template
    ├── about.ejs         # About page template
    ├── facilities.ejs    # Facilities page template
    └── partials/
        ├── header.ejs    # Header component
        └── footer.ejs    # Footer component
```

## Database Configuration (Optional)

The MongoDB connection is currently disabled. To enable form submission with database storage:

1. Uncomment the MongoDB connection string in `index.js` (lines 12-23)
2. Update the connection string with your MongoDB Atlas credentials
3. Ensure the database name and schema match your requirements

**Current schema:**
```javascript
const formSchema = new mongoose.Schema({
  Name: String,
  Number: Number,
  Email: String
});
```

## Scripts

- `npm install` – Install all dependencies
- `npx nodemon index.js` – Start development server with hot reload
- `node index.js` – Start production server

## Dependencies

- **express** (^4.18.2) - Web framework
- **ejs** (^3.1.6) - Templating engine
- **body-parser** (^1.19.2) - Parse HTTP request bodies
- **mongoose** (^6.2.6) - MongoDB ODM
- **nodemon** (^2.0.15) - Auto-restart during development
- **serverless-http** (^3.2.0) - Convert Express app to serverless handler
- **@netlify/functions** (^2.6.0) - Netlify functions support

## Deployment

The project is configured for Netlify deployment. Check `netlify.toml` for deployment settings.

## Notes for Developers

- Form submission endpoint (`POST /`) is functional but database operations are currently commented out
- All static files should be placed in the `public/` directory
- EJS partials in the `views/partials/` folder can be included in templates using `<%- include('partials/header') %>`
- Make sure to uncomment and configure the MongoDB connection if you need persistent data storage
- Update the `netlify.toml` configuration if deploying to Netlify

## Future Improvements

- [ ] Enable and configure MongoDB database
- [ ] Add form validation
- [ ] Add error handling middleware
- [ ] Configure environment variables for sensitive data
- [ ] Add authentication if needed
- [ ] Implement more complex forms
- [ ] Add logging and monitoring

## Author

Sanjay Singha

## License

ISC
