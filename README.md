# Angular Universal Sitemap Generator

This package contains a CLI which is able to create a sitemap.xml file at build time.

The CLI only works in combination with [Angular SSR](https://angular.io/guide/universal) and [Prerendering](https://angular.io/guide/prerendering). The routes from the prerendered pages are being used to generate the sitemap. This package can be used in CI/CD as it does not crawl a running website.

## Installation
```
npm install ngx-sitemap --save-dev
```

## Usage
In order to work you must first prerender all routes to be included in the ``sitemap.xml``.

Then, use it from the command line as follows:
```
ngx-sitemap <srcDirectory> <baseUrl>
```

Example:
```
ngx-sitemap ./dist/prod/browser htts://www.example.com
```

This will generate a ``sitemap.xml`` in the srcDirectory given.


## How it works
[Prerendering](https://angular.io/guide/prerendering) will generate a static website with prerendered pages in the dist folder in a format like this:
```
dist
└── prod
    ├── browser
    │    ├── route1
    │    │   └── index.html
    │    ├── route2
    │    │   ├── route3
    │    │   │   └── index.html
    │    │   ├── route4
    │    │   │   └── index.html
    │    │   └── index.html
    │    ├── index.html
    │    ├── main.js
    │    ├── runtime.js
    │    └── ...
    └── server
        └── ...
```

The Command expects the ``srcDirectory`` which in this case would be ``./dist/prod/browser``. It then lists all routes which end with ``index.html`` resulting in the following:
```
[
    '/'
    'route1',
    'route2',
    'route2/route3',
    'route2/route4',
]
```

Once all routes are found they get written into the ``sitemap.xml`` as follows:
```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.example.com</loc>
    </url>
    <url>
        <loc>https://www.example.com/route1</loc>
    </url>
    <url>
        <loc>https://www.example.com/route2</loc>
    </url>
    <url>
        <loc>https://www.example.com/route2/route3</loc>
    </url>
    <url>
        <loc>https://www.example.com/route2/route4</loc>
    </url>
</urlset>
```

Once deployed, the sitemap is available under ```https://www.example.com/sitemap.xml```.

## License
[MIT](https://spdx.org/licenses/MIT.html)
