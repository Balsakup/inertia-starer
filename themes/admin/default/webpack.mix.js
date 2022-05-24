const mix = require('laravel-mix');
const publicPath = '/assets/admin';

mix
    .setPublicPath(`../../../public${publicPath}`)
    .webpackConfig({
        output: {
            publicPath: `${publicPath}/`
        }
    })
    .sass('sass/app.scss', 'css')
    .js('js/app.js', 'js')
    .react()
    .sourceMaps()
    .version();
