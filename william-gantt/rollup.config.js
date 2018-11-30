import less from 'rollup-plugin-less';
import uglify from 'rollup-plugin-uglify';
import merge from 'deepmerge';

const dev = {
    input: 'src/index.js',
    output: {
        name: 'Gantt',
        file: 'dist/william-gantt.js',
        format: 'iife'
    },
    plugins: [
        less({
            output: 'dist/william-gantt.css'
        })
    ]
};
const prod = merge(dev, {
    output: {
        file: 'dist/william-gantt.min.js'
    },
    plugins: [uglify()]
});

export default [dev, prod];
