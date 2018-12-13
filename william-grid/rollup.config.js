import less from 'rollup-plugin-less';
import uglify from 'rollup-plugin-uglify';
import merge from 'deepmerge';

const dev = {
    input: 'src/index.js',
    output: {
        name: 'Grid',
        file: 'dist/william-grid.js',
        format: 'iife'
    },
    plugins: [
        less({
            output: 'dist/william-grid.css'
        })
    ]
};
const prod = merge(dev, {
    output: {
        file: 'dist/william-grid.min.js'
    },
    plugins: [uglify()]
});

export default [dev, prod];
