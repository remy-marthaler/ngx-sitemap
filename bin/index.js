#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sitemap_generator_1 = require("./sitemap-generator");
var sitemapGenerator = new sitemap_generator_1.SitemapGenerator(process.argv[2], process.argv[3]);
sitemapGenerator.process();
//# sourceMappingURL=index.js.map