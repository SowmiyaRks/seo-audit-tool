# SEO Audit Tool

A TypeScript CLI tool that audits URLs for key SEO signals and outputs a CSV report.

## What it checks
- HTTP Status Code
- Meta Title
- Meta Description
- H1 Tag
- Canonical URL
- Schema Markup presence (JSON-LD)

## Built with
- TypeScript
- Node.js
- axios (HTTP requests)
- cheerio (HTML parsing)
- csv-writer (CSV output)

## How to run

### 1. Clone the repo
git clone https://github.com/SowmiyaRks/seo-audit-tool.git
cd seo-audit-tool

### 2. Install dependencies
npm install

### 3. Add your URLs
Open audit.ts and update the urls array with the URLs you want to audit.

### 4. Run the audit
npx ts-node audit.ts

### 5. Check the output
A file called seo-audit-report.csv will be generated in the project folder.

## Sample output

| URL | Status Code | Meta Title | Meta Description | H1 | Canonical | Schema Present |
|-----|-------------|------------|------------------|----|-----------|----------------|
| https://ahrefs.com | 200 | Ahrefs - AI Marketing Platform | We help marketers... | Make your business... | https://ahrefs.com | YES |
| https://moz.com | 200 | Moz - SEO Software | Backed by the largest... | Show up in search... | https://moz.com | YES |

## About
Built as part of an SEO engineering portfolio. This tool replicates core Screaming Frog-style 
audit functionality programmatically using TypeScript — the same logic I previously built 
in Python, now ported to the Node.js ecosystem.

Author: Sowmiya Rajendran | github.com/SowmiyaRks