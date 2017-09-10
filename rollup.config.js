import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'isop',
  },
  plugins: [
    uglify({}, minify)
  ]
};
