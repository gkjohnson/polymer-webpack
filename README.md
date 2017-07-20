# webpack-script-guard

Webpack loader that adds a guard based on the source hash around running script content so the same guarded script cannot be included twice

## Goal

Webcomponents and HTML imports are designed to be self-contained and droppable, but either require a number of polyfills or other framework to support their inclusion. Building a single, self contained `.js` file per import enables a single-file, cross-platform ease-of-use, but can't benefit from the deduping that HTML imports enable, causing runtime errors from code redundancy.

Webpack-script-guard aims to solve this by guarding against execution of a script if it has already been included in a sibling webpack bundle (that used this same loader).

## Problem Example

Consider two web components with the following hierarchies output to two bundles `element-a.bundle.js` and `element-b.bundle.js` using something like [wc-loader](https://github.com/aruntk/wc-loader)

**Element A**
```
element-a.html
| common-element.html
| | polymer.html
| polymer.html
```

**Element B**
```
element-b.html
| common-element.html
| | polymer.html
| polymer.html
```

Normally, in a single project, any redundant elements like `polymer.html` and `common-element.html` would be deduped during import or webpack. However, including the two bundles produced from these two elements separately will cause errors on the page from Polymer and `common-element` being included multiple times.

## Use
Use webpack-script-guard on any javascript output from a weback loader or a javascript file:
```javascript
{
  test: /.html$/,
  use: [
    { loader: 'babel-loader' },
    { loader: 'webpack-script-guard' },
    { loader: 'wc-loader' }
  ]
}
```

## Gotchas
The guard does not work in every case. For example, when Polymer is included separately in the application without being packed with this plugin, the errors will still occur. It is suggested that elements be packed in a `full` and `lite` way such that external applications with problems can import dependency libraries themselves.

```html
<link rel="import" href=".../polymer.html" />
<script src=".../element-a.bundle.js" />
<!-- run time error! -->
```

## Approach
Webpack-script-guard is a loader that hashes the source of a file and wraps the source in a conditional that will only execute if a corresponding hash has not already been run
``` javascript
if(!window.__scriptguards__['<sourcehash>']) {
  window.__scriptguards__['<sourcehash>'] = true
  // ... run script
}
```
