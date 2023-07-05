import { insertBefore } from '../shared/language-util.js';
import c from './prism-c.js';
import type { LanguageProto } from '../types';

export default {
	id: 'cilkc',
	require: c,
	alias: 'cilk-c',
	grammar({ extend }) {
		const cilkc = extend('c', {});
		insertBefore(cilkc, 'function', {
			'parallel-keyword': {
				pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
				alias: 'keyword'
			}
		});
		return cilkc;
	}
} as LanguageProto<'cilkc'>;
