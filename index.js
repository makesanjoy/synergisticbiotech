const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const isNetlify = !!process.env.LAMBDA_TASK_ROOT;
const basePath = isNetlify ? process.env.LAMBDA_TASK_ROOT : __dirname;
const viewsPath = path.join(basePath, "views");
const publicPath = path.join(basePath, "public");

const SITE_URL = process.env.SITE_URL || "https://synergisticbiotech.in/";

app.set('views', viewsPath);
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

const formSchema = new mongoose.Schema({
  Name: String,
  Number: Number,
  Email: String
});
const Form = mongoose.model("Form", formSchema);

app.get("/robots.txt", function (req, res) {
  res.type("text/plain");
  res.send(
    "User-agent: *\nAllow: /\n\nSitemap: " + SITE_URL + "/sitemap.xml"
  );
});

app.get("/sitemap.xml", function (req, res) {
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/product</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`);
});

app.get("/", function (req, res) {
  res.render("home", {
    siteUrl: SITE_URL,
    pageTitle: "Synergistic Biotech Pvt Ltd | Medical Nutrition Solutions India",
    pageDescription: "Synergistic Biotech Pvt Ltd provides high-quality evidence-based medical nutrition products. Specializing in critical care nutrition with RAW PRO HP and RAW PRO CRITIPEP whey protein formulations.",
    pageKeywords: "medical nutrition, clinical nutrition, whey protein, critical care nutrition, Synergistic Biotech, RAW PRO HP, RAW PRO CRITIPEP, healthcare nutrition India",
    canonicalUrl: SITE_URL + "/",
    ogType: "website"
  });
});

app.get("/product", function (req, res) {
  res.render("product", {
    siteUrl: SITE_URL,
    pageTitle: "Our Products - RAW PRO HP & RAW PRO CRITIPEP | Synergistic Biotech",
    pageDescription: "Explore Synergistic Biotech's medical nutrition products: RAW PRO HP with 43% whey protein and RAW PRO CRITIPEP for critical care. Sugar-free, MCT-based clinical nutrition solutions.",
    pageKeywords: "RAW PRO HP, RAW PRO CRITIPEP, whey protein, medical nutrition products, critical care nutrition, MCT protein, clinical nutrition, enteral feed",
    canonicalUrl: SITE_URL + "/product",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Synergistic Biotech Products",
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "RAW PRO HP",
          "description": "100% Whey Protein with 43% high quality whey protein per 100gm. MCT based, sugar free, banana flavour. 400gm powder for oral and enteral feed.",
          "brand": { "@type": "Brand", "name": "Synergistic Biotech" }
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "RAW PRO CRITIPEP",
          "description": "100% Whey Peptide, 15% MCT based. Rich in Glutamine, BCAA, and Omega 3 Fatty Acids. Sugar free, elaichi flavour. 400gm powder for oral and enteral feed.",
          "brand": { "@type": "Brand", "name": "Synergistic Biotech" }
        }
      ]
    }
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    siteUrl: SITE_URL,
    pageTitle: "Contact Us - Synergistic Biotech Pvt Ltd | Mumbai & Guwahati",
    pageDescription: "Get in touch with Synergistic Biotech Pvt Ltd. Offices in Mumbai (Andheri East) and Guwahati (Assam). Call +917086056327 or email for enquiries about our medical nutrition products.",
    pageKeywords: "contact Synergistic Biotech, medical nutrition enquiry, Mumbai office, Guwahati office, healthcare nutrition contact",
    canonicalUrl: SITE_URL + "/contact",
    ogType: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Synergistic Biotech",
      "description": "Contact page for Synergistic Biotech Pvt Ltd",
      "mainEntity": {
        "@type": "Organization",
        "name": "Synergistic Biotech Pvt Ltd",
        "telephone": "+917086056327",
        "email": "s_singh200623@rediffmail.com"
      }
    }
  });
});

app.post("/", function (req, res) {
  const form = new Form({
    Name: req.body.formName,
    Number: req.body.number,
    Email: req.body.email,
  });

  form.save(function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      res.status(500).send("Error saving form");
    }
  });
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
  });
}