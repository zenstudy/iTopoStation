import { UIPanel, UIRow, UIButton } from '../iTopoUI.js';
import { iTopoEarthBluePrint } from '../iTopoFrame/iTopoEarthBluePrint.js';

function iTopoMenubarAboutiTopoEarth(editor, menubar) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass('menu');

	var title = new UIButton();
	title.setClass('title');
	title.setTextContent(strings.getKey('menubar/AboutiTopoEarth'));
	container.add(title);

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);


	var whitepaperMenu = new UIRow();
	whitepaperMenu.setClass('option');
	whitepaperMenu.setTextContent(strings.getKey('menubar/AboutiTopoEarth/iTopoBluePrint'));
	whitepaperMenu.onClick(function() {

		var scope = this;
		var title = editor.strings.getKey('menubar/AboutiTopoEarth/iTopoBluePrint');
		var bluePrintWindow = new iTopoEarthBluePrint(title);
		document.body.appendChild(bluePrintWindow.container.dom);
		bluePrintWindow.container.setDisplay('block');
		bluePrintWindow.container.setPosition('absolate');


		bluePrintWindow.container.dom.addEventListener('resize', function() {

		});

		bluePrintWindow.closeBtn.dom.addEventListener('click', function() {

		});

	});
	options.add(whitepaperMenu);

	return container;
}

export {
	iTopoMenubarAboutiTopoEarth
};
