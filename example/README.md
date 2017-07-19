# webpack-script-guard example

Examples of the existing failure cases and how webpack-script-guard solves them when packing and using multiple separate webcomponents

## Element Structure
`parent-element` imports `child-element`, and both import `polymer.html`

## Example Pages
### index-raw.html
Demonstrates basic use of html imports and polymer elements.

### index-unguarded.html
Demonstrates the failure case without script gaurding. Multiple bundled elements are loaded with common code and the browser fails to run the scripts.

### index-guarded.html
Demonstrates loading multiple bundled element scripts with guards running without failure

## Webpack Config Arguments
### --env.lite
Bundles without any node modules

### --env.unguarded
Bundles without using the webpack-script-guard loader

### --env.separate
Bundles every element in `/elements` seperately
