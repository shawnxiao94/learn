import less from 'rollup-plugin-less'
import uglify from 'rollup-plugin-uglify'
import merge from 'deepmerge'

const dev = {
  input: 'src/index.js',
  output: {
    name: 'WWave',
    file: 'dist/w-wave.js',
    format: 'iife'
  },
  plugins: [
    less({
      output: 'dist/w-wave.css'
    })
  ]
}
const prod = merge(dev, {
  output: {
    file: 'dist/w-wave.min.js'
  },
  plugins: [uglify()]
})

export default [dev, prod]
