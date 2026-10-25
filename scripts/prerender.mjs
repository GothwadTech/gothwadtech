#!/usr/bin/env node
/**
 * Post-build static prerender.
 *
 * The app is a client-side SPA, but social scrapers (WhatsApp, Facebook, LinkedIn,
 * Slack, Telegram) and non-JS crawlers never execute JS. This script writes a real
 * HTML file per route into `dist/`, with that route's title, description, canonical,
 * Open Graph/Twitter tags and JSON-LD already baked in. The body stays the SPA
 * shell (React renders it in a few hundred ms); a <noscript> block covers no-JS users.
 *
 * Runs automatically as part of `npm run build`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://gothwadtech.com';
const OG_IMAGE = `${ORIGIN}/assets/brand/og-image.png`;
const LAST_MODIFIED = '2026-10-25';
const SITE_NAME = 'Gothwad Tech';

const pageMeta = JSON.parse(await readFile(path.join(ROOT, 'src/data/pageMeta.json'), 'utf8'));

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found → ${pattern}`);
  return html.replace(pattern, replacement);
}

function metaTag(attr, key, value) {
  return `<meta ${attr}="${key}" content="${esc(value)}" />`;
}

function jsonLd(id, data) {
  return `<script type="application/ld+json" id="${id}">\n${JSON.stringify(data, null, 2)}\n    </script>`;
}

function webPageJsonLd(page, canonical) {
  const type =
    page.path === '/ecosystem' ? 'CollectionPage' : page.path === '/company' ? 'AboutPage' : page.path === '/contact' ? 'ContactPage' : 'WebPage';
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${ORIGIN}/#website` },
    about: { '@id': `${ORIGIN}/#organization` },
    inLanguage: 'en-IN',
    datePublished: '2023-01-01T00:00:00+05:30',
    dateModified: `${LAST_MODIFIED}T00:00:00+05:30`,
    primaryImageOfPage: { '@id': `${ORIGIN}/#logo` },
    breadcrumb: { '@id': `${canonical}#breadcrumb` },
  };
}

function breadcrumbJsonLd(page, canonical) {
  const items = [{ name: 'Home', item: `${ORIGIN}/` }];
  if (page.path !== '/') items.push({ name: page.label, item: canonical });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, name: entry.name, item: entry.item })),
  };
}

function renderRoute(template, page) {
  const canonical = `${ORIGIN}${page.path}`;
  let html = template;

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = replaceTag(html, /<meta name="title" content="[^"]*" \/>/, metaTag('name', 'title', page.title));
  html = replaceTag(html, /<meta\s+name="description"\s+content="[^"]*"\s+\/>/, metaTag('name', 'description', page.description));
  html = replaceTag(html, /<meta\s+name="keywords"\s+content="[^"]*"\s+\/>/, metaTag('name', 'keywords', page.keywords ?? ''));
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" id="canonical-link" \/>/, `<link rel="canonical" href="${canonical}" id="canonical-link" />`);
  html = replaceTag(html, /<link rel="alternate" href="[^"]*" hreflang="x-default" \/>/, `<link rel="alternate" href="${canonical}" hreflang="x-default" />`);
  html = replaceTag(html, /<link rel="alternate" href="[^"]*" hreflang="en-IN" \/>/, `<link rel="alternate" href="${canonical}" hreflang="en-IN" />`);
  html = replaceTag(html, /<link rel="alternate" href="[^"]*" hreflang="en" \/>/, `<link rel="alternate" href="${canonical}" hreflang="en" />`);

  // Open Graph
  html = replaceTag(html, /<meta property="og:url" content="[^"]*" \/>/, metaTag('property', 'og:url', canonical));
  html = replaceTag(html, /<meta property="og:title" content="[^"]*" \/>/, metaTag('property', 'og:title', page.title));
  html = replaceTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s+\/>/, metaTag('property', 'og:description', page.description));

  // Twitter
  html = replaceTag(html, /<meta name="twitter:url" content="[^"]*" \/>/, metaTag('name', 'twitter:url', canonical));
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, metaTag('name', 'twitter:title', page.title));
  html = replaceTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s+\/>/, metaTag('name', 'twitter:description', page.description));

  // Structured data for this route
  html = replaceTag(
    html,
    /<script type="application\/ld\+json" id="ld-webpage-fallback">[\s\S]*?<\/script>/,
    jsonLd('ld-webpage-fallback', webPageJsonLd(page, canonical))
  );
  html = replaceTag(
    html,
    /<script type="application\/ld\+json" id="ld-breadcrumb-fallback">[\s\S]*?<\/script>/,
    jsonLd('ld-breadcrumb-fallback', breadcrumbJsonLd(page, canonical))
  );

  return html;
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
const written = [];

for (const page of Object.values(pageMeta)) {
  const html = renderRoute(template, page);
  const outDir = page.path === '/' ? DIST : path.join(DIST, page.path.slice(1));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
  written.push(page.path);
}

console.log(`prerender: wrote ${written.length} routes → ${written.join(', ')}`);
