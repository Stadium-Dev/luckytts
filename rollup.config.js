import typescript from '@rollup/plugin-typescript';
import node_resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const production = process.env.NODE_ENV === 'production';

export default [
    {
        input: 'src/web/main.ts',
        output: {
            sourcemap: !production,
            file: 'public/main.js',
            format: 'cjs'
        },
        plugins: [
            json(),
            commonjs(),
            node_resolve(),
            typescript(),
        ]
    }
];
