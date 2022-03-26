# shared-styles

Custom Material themes can be bundled as sepearate CSS files by using something like this in project.json

```json
"styles": [
  {
    "input": "apps/b-cal/src/styles.scss"
  },
  {
    "inject": false,
    "input": "libs/shared/styles/src/lib/themes/material/pink-bluegrey.scss",
    "bundleName": "pink-bluegrey"
  },
]
```
