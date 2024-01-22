import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import clear from "rollup-plugin-clear";

// Production
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/main.js',
  output: {
    file: './dist/bundle.js',
    name: 'MyGame',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    clear({
      targets: ['dist'],
      watch: true,
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      include: [
        'node_modules/eventemitter3/**',
        'node_modules/phaser/**'
      ],
      exclude: [
        'node_modules/phaser/src/polyfills/requestAnimationFrame.js',
        'node_modules/phaser/src/phaser-esm.js'
      ],
      sourceMap: true,
      ignoreGlobal: true
    }),
    serve({
      open: true,
      contentBase: ['.', 'public'],
      host: 'localhost',
      port: 2023,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }),
    // terser(),
    livereload({
      watch: 'dist'
    })
  ]
};