import { PurgeCSS, UserDefinedOptions } from 'purgecss';
import { PluginOption } from 'vite';


export type VitePurgeCSSOptions = Pick<UserDefinedOptions, "content" | "variables" | "defaultExtractor" | "safelist">;

function mergeConfigs(baseConfig: UserDefinedOptions, userOptions?: VitePurgeCSSOptions): UserDefinedOptions {
  if (!userOptions) return baseConfig;

  if (userOptions.content) {
    baseConfig.content.push(...userOptions.content)
    delete userOptions.content
  }

  return Object.assign(baseConfig, userOptions);
}

export default (options?: VitePurgeCSSOptions): PluginOption => {
  let _html: string = '';
  return {
    name: 'vite-plugin-html-purgecss',
    enforce: 'post',
    transformIndexHtml(html) { _html += html;},
    async generateBundle(_options, bundle) {
      const cssFiles = Object.keys(bundle).filter(key => key.endsWith('.css'));
      if (!cssFiles) return;
      for (const fileKey of cssFiles) {
        const file = bundle[fileKey];
        if (file.type === 'asset') {
          const baseConfig =  <UserDefinedOptions>{
            content: [{raw: _html, extension: 'html'}],
            css: [{raw: file.source}],
          };
          const purged = await new PurgeCSS().purge(mergeConfigs(baseConfig, options));
          file.source = purged[0].css;
        }
      }
    }
  }
}
