# Headless Strapi CMS for VTEX FastStore

Strapi v5.28.0 headless CMS template designed to manage content sections that feed into a VTEX FastStore frontend.

## Table of Contents

- [Project Structure](#project-structure)
- [Content Types vs Components](#content-types-vs-components)
- [Existing Components](#existing-components)
- [How to Add a New Component](#how-to-add-a-new-component)
- [How to Add a New Content Type](#how-to-add-a-new-content-type)
- [Page and Position System](#page-and-position-system)
- [Running the Project](#running-the-project)
- [API Usage](#api-usage)

---

## Project Structure

```
src/
  api/                              # Content Types (data models with API endpoints)
    article/                        # Collection - blog articles
    author/                         # Collection - article authors
    category/                       # Collection - article categories
    custom-banner-multi-media/      # Collection - banner with media/video and text overlays
    custom-header/                  # Collection - full header (logo, promo bar, nav, search)
    custom-info-card/               # Collection - up to 4 info cards in grid
    custom-product-shelf/           # Collection - product shelf with filtering and sorting
    infocard-doble/                 # Collection - dual infocard sections
    about/                          # Single - "About" page
    global/                         # Single - site-wide settings (name, SEO, favicon)
    use-strappi/                    # Single - feature flag
  components/                       # Reusable components (NO API endpoint, embedded in content types)
    shared/                         # Generic components (media, seo, quote, rich-text, slider)
    sections/                       # VTEX section components (infocard, cta, terms, header, etc.)
  middlewares/                      # Custom Strapi middlewares
    rest-cache.js                   # Adds Cache-Control headers to API GET responses
  admin/                            # Admin panel customization
  extensions/                       # Plugin extensions
  bootstrap.js                      # Seed data + public permissions setup
  index.js                          # App entry point
config/                             # Strapi configuration
  database.js                       # Database connection (SQLite default, Postgres/MySQL optional)
  server.js                         # Host, port, app keys
  admin.js                          # Admin panel JWT/tokens
  api.js                            # REST API defaults (pagination limits)
  middlewares.js                    # Middleware stack
  plugins.js                        # Plugin configuration
data/                               # Seed data files (imported on first run)
```

---

## Content Types vs Components

### Content Types (`src/api/`)

Top-level data models that get their own REST API endpoint. Each content type folder contains:

```
src/api/<name>/
  content-types/<name>/schema.json   # Data schema definition
  controllers/<name>.js              # Request handler (factory default)
  routes/<name>.js                   # URL routing (factory default)
  services/<name>.js                 # Business logic (factory default)
```

Two kinds:
- **Collection Type** (`"kind": "collectionType"`) - Multiple entries (e.g., Articles, InfocardDoble)
- **Single Type** (`"kind": "singleType"`) - One global instance (e.g., Global settings)

### Components (`src/components/`)

Reusable field groups that are **embedded** inside content types. They do NOT get their own API endpoint. They are organized by category folder (e.g., `shared/`, `sections/`).

Components are referenced in content type schemas with:
```json
"myField": {
  "type": "component",
  "repeatable": false,
  "component": "category.component-name"
}
```

---

## Existing Components

### `src/components/shared/` - Generic

| File | Description |
|------|-------------|
| `media.json` | Single media file upload (images, files, videos) |
| `seo.json` | SEO metadata (metaTitle, metaDescription, shareImage) |
| `quote.json` | Quote block (title + body text) |
| `rich-text.json` | Rich text editor field |
| `slider.json` | Multiple image gallery |

### `src/components/sections/` - VTEX Sections

| File | Description |
|------|-------------|
| `infocard.json` | Full card: media + CTA + positioning + promotion settings |
| `cta.json` | Call-to-action button (isArrow, title, link) |
| `terms-and-conditions.json` | Toggleable T&C block (active, title, text) |
| `marker-configuration.json` | Visual marker settings (color, position) |
| `promotion-settings.json` | Analytics pixel config (id, name, creative, position, target) |
| `banner-text2.json` | Banner text2 overlay (content, link, isArrow) |
| `shelf-cta.json` | Product shelf CTA (content, link) |
| `facet.json` | Search facet key-value pair for product filtering |
| `product-card-configuration.json` | Product card display options (showDiscountBadge, bordered) |
| `info-card-item.json` | Info card with image, text, link, and promotion settings |
| `header-logo.json` | Header logo (src, alt, link) |
| `header-logo-link.json` | Logo link (url, title) |
| `promo-bar-item.json` | Promotional bar entry with styling, CTA, links, Synerise |
| `promo-bar-link.json` | Additional link for promotional bar (title, url) |
| `synerise-segmentation.json` | Synerise segmentation config (expression, assignments) |
| `navigation.json` | Navigation: page links + menu component |
| `page-link.json` | Navigation page link (text, url) |
| `header-menu.json` | Menu container with drawer menu items |
| `drawer-menu-item.json` | Drawer menu entry (campaignId, title, jsonContent, images, subMenuCarousels) |
| `drawer-images.json` | Container for drawer menu images |
| `drawer-image.json` | Drawer image with link and promotion settings |
| `sub-menu-carousel.json` | Sub-menu carousel (subCategoryTitle, subMenuImages) |
| `sub-menu-image.json` | Sub-menu image with link |
| `menu-image-link.json` | Shared link for menu images (url, text) |
| `menu-promotion-settings.json` | Promotion settings for menu images (promotion_creative as free text) |
| `search-input.json` | Search input config with Synerise indexes |
| `sign-in-button.json` | Sign-in button (icon, label, myAccountLabel) |
| `sign-in-icon.json` | Sign-in icon config (icon enum, alt) |
| `cart-icon.json` | Shopping cart icon config (icon enum, alt) |

---

## How to Add a New Component

1. Create a JSON file at `src/components/<category>/<name>.json`

2. Use this template:

```json
{
  "collectionName": "components_<category>_<name_with_underscores>",
  "info": {
    "displayName": "Human Readable Name",
    "icon": "strapi-icon-name",
    "description": "What this component does"
  },
  "options": {},
  "attributes": {
    "fieldName": {
      "type": "string"
    }
  }
}
```

3. Reference it in a content type or another component:

```json
"myField": {
  "type": "component",
  "repeatable": false,
  "component": "<category>.<file-name-without-json>"
}
```

4. Restart Strapi (`yarn develop`) to pick up the changes.

### Available field types

| Type | Description |
|------|-------------|
| `string` | Short text |
| `text` | Long text |
| `richtext` | Rich text editor |
| `integer` | Whole number |
| `boolean` | True/false |
| `enumeration` | Predefined options (use `"enum": [...]`) |
| `media` | File upload (use `"allowedTypes"` to restrict) |
| `component` | Nested component reference |
| `dynamiczone` | Multiple component types in a flexible list |
| `json` | Raw JSON data |
| `date` / `datetime` | Date fields |
| `email` | Email string |
| `uid` | Unique identifier (slug) |
| `relation` | Reference to another content type |

---

## How to Add a New Content Type

1. Create the directory structure:
```
src/api/<name>/
  content-types/<name>/schema.json
  controllers/<name>.js
  routes/<name>.js
  services/<name>.js
```

2. Write `schema.json`:
```json
{
  "kind": "collectionType",
  "collectionName": "<name_with_underscores>",
  "info": {
    "singularName": "<name>",
    "pluralName": "<name-plural>",
    "displayName": "DisplayName",
    "description": "What this content type stores"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": { "type": "string", "required": true }
  }
}
```

3. Create the 3 JS files (copy from any existing content type, just change the name):
```js
// controllers/<name>.js
'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::<name>.<name>');
```
Same pattern for `routes` (createCoreRouter) and `services` (createCoreService).

4. **Make it publicly readable** (optional): Add to `src/bootstrap.js` in the `setPublicPermissions` call:
```js
'<name>': ['find', 'findOne'],
```

5. Restart Strapi. The content type will appear in the admin panel Content Manager.

---

## Page and Position System

Section content types (InfocardDoble, CustomBannerMultiMedia, CustomProductShelf, CustomInfoCards, CustomHeader) include `page` and `position` fields:

- **`page`** (string): The URL path where this section should appear (e.g., `"/"` for home, `"/about"`)
- **`position`** (integer): The order within the page (0, 1, 2, ...). Lower numbers render first.

### Frontend query example

To get all sections for the home page, sorted by position:

```
GET /api/infocard-dobles?filters[page][$eq]=/&sort=position:asc&populate=*
```

When creating new section types, always include these two fields so the frontend can place them correctly.

---

## Running the Project

```bash
# Install dependencies
yarn install

# Copy and configure environment variables
cp .env.example .env
# Edit .env and replace the placeholder security keys

# Start in development mode (with auto-reload)
yarn develop

# Build admin panel for production
yarn build

# Start in production mode
yarn start

# Seed example data (articles, categories, etc.)
yarn seed:example
```

- Admin panel: http://localhost:1337/admin
- API base URL: http://localhost:1337/api

---

## API Usage

### Endpoints

Each collection type gets REST endpoints automatically:

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/<plural-name>` | List entries (paginated) |
| GET | `/api/<plural-name>/:id` | Get single entry |
| POST | `/api/<plural-name>` | Create entry |
| PUT | `/api/<plural-name>/:id` | Update entry |
| DELETE | `/api/<plural-name>/:id` | Delete entry |

### Populating nested components

By default, Strapi returns only top-level fields. To include nested components:

```
# Populate all relations one level deep
GET /api/infocard-dobles?populate=*

# Populate specific nested fields
GET /api/infocard-dobles?populate[card1][populate]=*&populate[card2][populate]=*
```

### Filtering and sorting

```
# Filter by page
GET /api/infocard-dobles?filters[page][$eq]=/

# Sort by position
GET /api/infocard-dobles?sort=position:asc

# Combined
GET /api/infocard-dobles?filters[page][$eq]=/&sort=position:asc&populate=*
```

---

## Caching

A custom middleware (`src/middlewares/rest-cache.js`) adds `Cache-Control` headers to all GET requests on `/api/*` endpoints:

- **Browser cache**: 60 seconds (`max-age=60`)
- **CDN/proxy cache**: 5 minutes (`s-maxage=300`)

This avoids hitting the database on every request and improves first-response times. The middleware is registered in `config/middlewares.js` as `global::rest-cache`.

---

## Notes on Component Nesting

Some VTEX sections (notably CustomHeader's `navigation.menu.drawerMenu`) have 7+ levels of component nesting. All levels are modeled as proper Strapi components so that non-technical users see labeled form fields in the admin panel. When querying deeply nested content types, use deep population:

```
GET /api/custom-headers?populate=deep
```

Or specify exact paths:
```
GET /api/custom-headers?populate[navigation][populate][menu][populate][drawerMenu][populate]=*
```
