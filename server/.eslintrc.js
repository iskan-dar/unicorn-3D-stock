module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'consistent-return': 0,
		'no-tabs': 'off',
		'no-plusplus': 'off',
		'no-console': 1,
		indent: ['error', 'tab'],
	},
};
