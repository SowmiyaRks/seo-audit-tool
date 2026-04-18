import axios from "axios";
import * as cheerio from "cheerio";
import { createObjectCsvWriter } from "csv-writer";

const urls: string[] = [
  "https://ahrefs.com",
  "https://moz.com",
  "https://semrush.com",
];

interface AuditResult {
  url: string;
  status: number;
  title: string;
  description: string;
  h1: string;
  canonical: string;
  hasSchema: string;
}

async function auditUrl(url: string): Promise<AuditResult> {
  try {
    const response = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(response.data);

    const title = $("title").text().trim() || "MISSING";
    const description = $('meta[name="description"]').attr("content")?.trim() || "MISSING";
    const h1 = $("h1").first().text().trim() || "MISSING";
    const canonical = $('link[rel="canonical"]').attr("href") || "MISSING";
    const hasSchema = $('script[type="application/ld+json"]').length > 0 ? "YES" : "NO";

    return {
      url,
      status: response.status,
      title,
      description,
      h1,
      canonical,
      hasSchema,
    };
  } catch (error: any) {
    return {
      url,
      status: error.response?.status || 0,
      title: "ERROR",
      description: "ERROR",
      h1: "ERROR",
      canonical: "ERROR",
      hasSchema: "NO",
    };
  }
}

async function runAudit() {
  console.log("Starting SEO Audit...\n");
  const results: AuditResult[] = [];

  for (const url of urls) {
    console.log(`Checking: ${url}`);
    const result = await auditUrl(url);
    results.push(result);
    console.log(`  Status: ${result.status}`);
    console.log(`  Title: ${result.title}`);
    console.log(`  H1: ${result.h1}`);
    console.log(`  Schema: ${result.hasSchema}\n`);
  }

  const csvWriter = createObjectCsvWriter({
    path: "seo-audit-report.csv",
    header: [
      { id: "url", title: "URL" },
      { id: "status", title: "Status Code" },
      { id: "title", title: "Meta Title" },
      { id: "description", title: "Meta Description" },
      { id: "h1", title: "H1" },
      { id: "canonical", title: "Canonical" },
      { id: "hasSchema", title: "Schema Present" },
    ],
  });

  await csvWriter.writeRecords(results);
  console.log("Audit complete. Report saved to seo-audit-report.csv");
}

runAudit();