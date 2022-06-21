"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapGenerator = void 0;
var glob_1 = require("glob");
var fs = require("fs");
var SitemapGenerator = (function () {
    function SitemapGenerator(srcDirectory, baseUrl) {
        this.SITEMAP_HEADER = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
        this.SITEMAP_FOOTER = "\n</urlset>";
        this.sitemapContent = '';
        this.baseUrl = SitemapGenerator.withTrailingSlash(baseUrl);
        this.srcDirectory = SitemapGenerator.withTrailingSlash(srcDirectory);
    }
    SitemapGenerator.withTrailingSlash = function (text) {
        if (!text.endsWith('/')) {
            return text + '/';
        }
        return text;
    };
    SitemapGenerator.prototype.process = function () {
        var _this = this;
        new glob_1.Glob(this.srcDirectory + '/**/index.html', function (err, res) { return _this.filesCallback(err, res); });
    };
    SitemapGenerator.prototype.addToSitemap = function (file) {
        var url = file.replace(this.srcDirectory, this.baseUrl);
        url = url.replace('/index.html', '');
        this.sitemapContent += "\n    <url>\n        <loc>" + url + "</loc>\n    </url>";
    };
    SitemapGenerator.prototype.writeSitemapToFile = function () {
        var _this = this;
        fs.writeFile(this.srcDirectory + 'sitemap.xml', this.SITEMAP_HEADER + this.sitemapContent + this.SITEMAP_FOOTER, function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log("sitemap.xml successfully created in '" + _this.srcDirectory + "'");
        });
    };
    SitemapGenerator.prototype.filesCallback = function (err, files) {
        var _this = this;
        if (err) {
            console.log('Error', err);
            return;
        }
        files.sort(function (a, b) {
            return a.length - b.length || a.localeCompare(b);
        });
        files.forEach(function (route) { return _this.addToSitemap(route); });
        this.writeSitemapToFile();
    };
    return SitemapGenerator;
}());
exports.SitemapGenerator = SitemapGenerator;
//# sourceMappingURL=sitemap-generator.js.map