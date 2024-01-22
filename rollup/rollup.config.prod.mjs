import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';
import glslify from 'rollup-plugin-glslify';

// Production
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/main.js',
    output: {
        file: './dist/bundle.js',
        name: 'PhaserTemplate',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        glslify(),
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
            sourceMap: false,
            ignoreGlobal: false
        }),
        terser({
            format: {
                comments: false
            }
        }),
        del({
            targets: 'dist/*',
            runOnce: true
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        url(),
        copy({
            targets: [
                { src: 'index.html', dest: 'dist/' },
                { src: 'public/*', dest: 'dist/' },
            ]
        })
    ]
};