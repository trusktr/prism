import { insertBefore } from '../shared/language-util.js';
import clike from './prism-clike.js';
import type { LanguageProto } from '../types';

export default {
	id: 'go',
	require: clike,
	grammar({ extend }) {
		const go = extend('clike', {
			'string': {
				pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
				lookbehind: true,
				greedy: true
			},
			'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
			'boolean': /\b(?:_|false|iota|nil|true)\b/,
			'number': [
				// binary and octal integers
				/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
				// hexadecimal integers and floats
				/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
				// decimal integers and floats
				/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
			],
			'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
			'builtin': /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|imag|u?int(?:8|16|32|64)?|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
		});

		insertBefore(go, 'string', {
			'char': {
				pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
				greedy: true
			}
		});

		delete go['class-name'];

		return go;
	}
} as LanguageProto<'go'>;