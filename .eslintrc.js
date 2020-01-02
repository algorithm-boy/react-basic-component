module.exports = {
	root: true,
	extends: "plugin:@typescript-eslint/recommended",
	parser: "@typescript-eslint/parser",
	env: {
		"browser": true,
		"es6": true
	},
	globals: {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	parserOptions: {
		project: "./tsconfig.json",
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			module: true,
			ts: true,
			tsx: true
		},
	},
	plugins: [
		"react",
		"react-hooks",
		"@typescript-eslint"
	],
	rules: {
		"no-console": ["error", {
			"allow": ["warn", "error", "info"]
		}],
		"@typescript-eslint/no-empty-interface": "warn",
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/indent": ["warn", 2],
		"linebreak-style": ["warn", "unix"],
		"indent": ["warn", 2],
		"quotes": ["error", "single"],
		"@typescript-eslint/camelcase": ["off"],
		"@typescript-eslint/restrict-plus-operands": ["off"],
		"@typescript-eslint/array-type": ["off"],
		"@typescript-eslint/no-use-before-define": ["off"],
		"@typescript-eslint/no-angle-bracket-type-assertion": ["off"],
		"@typescript-eslint/interface-name-prefix": ["off"],
		"@typescript-eslint/explicit-member-accessibility": "warn",
		"@typescript-eslint/consistent-type-assertions": "warn",
		"@typescript-eslint/no-inferrable-types": "warn",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"semi": ["error", "always"],
		"no-var": "warn",
		"prefer-spread": "warn"
	},
};