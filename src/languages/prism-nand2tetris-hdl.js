export default /** @type {import("../types").LanguageProto} */ ({
	id: 'nand2tetris-hdl',
	grammar: {
		'comment': /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		'keyword': /\b(?:BUILTIN|CHIP|CLOCKED|IN|OUT|PARTS)\b/,
		'boolean': /\b(?:false|true)\b/,
		'function': /\b[A-Za-z][A-Za-z0-9]*(?=\()/,
		'number': /\b\d+\b/,
		'operator': /=|\.\./,
		'punctuation': /[{}[\];(),:]/
	}
});