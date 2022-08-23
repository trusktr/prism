import { insertBefore } from '../shared/language-util.js';
import markup from './prism-markup.js';

export default /** @type {import("../types").LanguageProto} */ ({
	id: 'wiki',
	require: markup,
	grammar({ extend, getLanguage }) {
		const markup = getLanguage('markup');

		const wiki = extend('markup', {
			'block-comment': {
				pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
				lookbehind: true,
				alias: 'comment'
			},
			'heading': {
				pattern: /^(=+)[^=\r\n].*?\1/m,
				inside: {
					'punctuation': /^=+|=+$/,
					'important': /.+/
				}
			},
			'emphasis': {
				// TODO Multi-line
				pattern: /('{2,5}).+?\1/,
				inside: {
					'bold-italic': {
						pattern: /(''''').+?(?=\1)/,
						lookbehind: true,
						alias: ['bold', 'italic']
					},
					'bold': {
						pattern: /(''')[^'](?:.*?[^'])?(?=\1)/,
						lookbehind: true
					},
					'italic': {
						pattern: /('')[^'](?:.*?[^'])?(?=\1)/,
						lookbehind: true
					},
					'punctuation': /^''+|''+$/
				}
			},
			'hr': {
				pattern: /^-{4,}/m,
				alias: 'punctuation'
			},
			'url': [
				/ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:PMID|RFC) +\d+/i,
				/\[\[.+?\]\]|\[.+?\]/
			],
			'variable': [
				/__[A-Z]+__/,
				// FIXME Nested structures should be handled
				// {{formatnum:{{#expr:{{{3}}}}}}}
				/\{{3}.+?\}{3}/,
				/\{\{.+?\}\}/
			],
			'symbol': [
				/^#redirect/im,
				/~{3,5}/
			],
			// Handle table attrs:
			// {|
			// ! style="text-align:left;"| Item
			// |}
			'table-tag': {
				pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
				lookbehind: true,
				inside: {
					'table-bar': {
						pattern: /\|$/,
						alias: 'punctuation'
					},
					rest: markup['tag'].inside
				}
			},
			'punctuation': /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m
		});

		insertBefore(wiki, 'tag', {
			// Prevent highlighting inside <nowiki>, <source> and <pre> tags
			'nowiki': {
				pattern: /<(nowiki|pre|source)\b[^>]*>[\s\S]*?<\/\1>/i,
				inside: {
					'tag': {
						pattern: /<(?:nowiki|pre|source)\b[^>]*>|<\/(?:nowiki|pre|source)>/i,
						inside: markup['tag'].inside
					}
				}
			}
		});

		return wiki;
	}
});