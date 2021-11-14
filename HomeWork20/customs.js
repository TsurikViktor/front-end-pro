'use strict'
	const CLASS = Object.freeze({
		LIST: 'list',
		BLOCK: 'block',
		NONE: 'none',
		BLUE: 'blue'
	});
	const SELECTOR = Object.freeze({
		LIST: '.list',
		TABS: '.tabs',
		TEXT: '.text'
	});

class Tabs {
	constructor(tabsEl) {
		tabsEl.addEventListener('click', this.onTabsClick);
	}

	onTabsClick(e) {
	  	const tab = e.target;

	  	if (tab.classList.contains(CLASS.LIST)) {
			const itemId = tab.id;

			Tabs.showTabs(itemId);
	  	};
	};

	static showTabs(itemIds) {
	  	const tab = document.querySelectorAll(SELECTOR.LIST);
	  	const text = document.querySelectorAll(SELECTOR.TEXT);
	  	const displayTabBlock = document.querySelector(`#${itemIds}`)
	  	const displayTextBlock = document.querySelector(`#${itemIds}-text`)

	  	for (let i = 0; i < tab.length; i++) {
	  	  let textEL = text[i];
	  	  let tabEl = tab[i]
	  	  tabEl.classList.remove(CLASS.BLUE);
	  	  textEL.classList.remove(CLASS.BLOCK);
	  	  textEL.classList.add(CLASS.NONE);
	  	};

	  	displayTabBlock.classList.add(CLASS.BLUE);
	  	displayTextBlock.classList.remove(CLASS.NONE);
	  	displayTextBlock.classList.add(CLASS.BLOCK);
	};
}

const tabsEl = document.querySelector('#tabs');

new Tabs(tabsEl);