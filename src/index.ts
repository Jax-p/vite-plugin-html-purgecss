import PurgeCSS from "purgecss";

// UserDefinedSafelist but this type is not exported from PurgeCSS
export default (safeList?: (string|RegExp)[]|object) => {
    let _html: string = '';
    return {
        name: 'vite-plugin-html-purgecss',
        enforce: 'post',
        transformIndexHtml(html) { _html += html;},
        async generateBundle(_options, bundle) {
            const cssFiles = Object.keys(bundle).filter(key => key.endsWith('.css'));
            if (!cssFiles) return;
            for (const file of cssFiles) {
                const purged = await new PurgeCSS().purge({
                    content: [{raw: _html, extension: 'html'}],
                    css: [{raw: bundle[file].source}],
                    safelist: safeList || []
                });
                bundle[file].source = purged[0].css;
            }
        }
    }
}
