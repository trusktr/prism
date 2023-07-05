import { insertBefore } from '../shared/language-util.js';
import cpp from './prism-cpp.js';
import type { LanguageProto } from '../types';

export default {
	id: 'cilkcpp',
	require: cpp,
	alias: ['cilk-cpp', 'cilk'],
	grammar({ extend }) {
		const cilkcpp = extend('cpp', {});
		insertBefore(cilkcpp, 'function', {
			'parallel-keyword': {
				pattern: /\bcilk_(?:for|reducer|s(?:cope|pawn|ync))\b/,
				alias: 'keyword'
			}
		});
		return cilkcpp;
	}
} as LanguageProto<'cilkcpp'>;
