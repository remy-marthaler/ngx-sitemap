#!/usr/bin/env node

import { SitemapGenerator } from './sitemap-generator';

const sitemapGenerator = new SitemapGenerator(
    process.argv[2],
    process.argv[3],
);

sitemapGenerator.process();
