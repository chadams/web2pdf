#! /usr/bin/env bun

// bun build --compile --target=bun-windows-x64 ./index.ts --outfile web2pdf

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const puppeteer = require("puppeteer");

// var argv = yargs(process.argv.slice(2)).string("uri").string("pdf").parseSync();
const argv = yargs(process.argv.slice(2))
  .option("pdf", {
    alias: "p",
    description: "The path to the PDF file",
    type: "string",
    default: "screenshot.pdf",
    demandOption: true,
  })
  .option("uri", {
    alias: "u",
    description: "The URI associated with the PDF",
    type: "string",
    demandOption: true,
  })
  .option("format", {
    alias: "f",
    description: "The size format A4 letter etc...",
    type: "string",
    default: "A4",
  })
  .help()
  .alias("help", "h")
  .parseSync();

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.goto(argv.uri, { waitUntil: "networkidle0" });

await page.pdf({
  path: argv.pdf,
  format: "A4",
  printBackground: true,
});

await browser.close();

export {};
