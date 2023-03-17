module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: {version: '3.28', proposals: true},
                targets: {
                    browsers: [
                        'last 1 version',
                    ]
                },
            }
        ]
    ]
};
