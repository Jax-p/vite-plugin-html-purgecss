# vite-plugin-html-purgecss
This [Vite](https://github.com/vitejs/vite) plugin purges CSS based on HTML output using [PurgeCSS](https://github.com/FullHuman/purgecss).

✔️ Works with Multi Page App   
✔️ Content/pattern setup is not needed - plugin purges styles over the whole HTML code which is being resolved by Vite  
✔  Classes can be dynamically created (`'bg-' + true ? 'red' : 'blue'`) because PurgeCSS runs over already generated HTML (_post_).

## Install
**Yarn**
```
yarn add vite-plugin-html-purgecss -D
```
or **npm**
```
npm i vite-plugin-html-purgecss --save-dev
```

## Usage
### Configuration
Use plugin in your Vite config (`vite.config.ts`)
```
import htmlPurge from 'vite-plugin-html-purgecss'

export default {
    plugins: [
        htmlPurge(),
    ]
}
```

## Options

| Parameter | Type  | Description |
| ----------- | -----------  | ----------- |
| safeList | `UserDefinedSafelist` | Check [available safelist options in PurgeCSS docs](https://purgecss.com/configuration.html#options).

