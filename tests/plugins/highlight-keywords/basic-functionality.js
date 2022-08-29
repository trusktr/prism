import { createScopedPrismDom, createUtil } from '../../helper/prism-dom-util';


describe('Highlight Keywords', async function () {
	const { window } = await createScopedPrismDom(this, {
		languages: 'javascript',
		plugins: 'highlight-keywords'
	});
	const util = createUtil(window);


	it('should highlight keywords', () => {
		util.assert.highlightElement({
			language: 'javascript',
			code: `import * from ''; const foo;`,
			expected: `<span class="token keyword keyword-import">import</span> <span class="token operator">*</span> <span class="token keyword keyword-from">from</span> <span class="token string">''</span><span class="token punctuation">;</span> <span class="token keyword keyword-const">const</span> foo<span class="token punctuation">;</span>`
		});
	});

});
