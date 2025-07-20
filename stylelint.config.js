/** @type {import('stylelint').Config} */
const stylelintConfig = {
    plugins: ['stylelint-prettier', 'stylelint-selector-tag-no-without-class'],
    extends: ['stylelint-config-standard-scss'],
    rules: {
        'prettier/prettier': true,
        'selector-class-pattern': [
            '^(?!.*(__|--))[a-z][a-zA-Z0-9]*(_[a-zA-Z0-9]+)*$',
            {
                message: 'Classes must be in camelCase or snake_case',
                resolveNestedSelectors: true,
            },
        ],
        'color-no-invalid-hex': true,
        'unit-no-unknown': true,
        'function-no-unknown': true,
        'no-unknown-animations': true,
        'no-unknown-custom-media': true,
        'selector-max-type': null,
        'plugin/selector-tag-no-without-class': null,
        'scss/dollar-variable-pattern': [
            '^[a-z][a-zA-Z0-9]*$',
            {
                message: 'Expected variable to be in camelCase',
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.module.*'],
            rules: {
                'selector-max-type': [
                    0,
                    {
                        message: 'Tag selectors are not allowed, use only class selectors',
                    },
                ],
                'plugin/selector-tag-no-without-class': [
                    ['div', 'span'],
                    {
                        message: 'Tag selectors are not allowed, use only class selectors',
                    },
                ],
            },
        },
    ],
};

module.exports = stylelintConfig;
