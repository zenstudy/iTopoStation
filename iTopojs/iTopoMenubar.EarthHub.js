/**
 * @author mrdoob / http://mrdoob.com/
 */

import {UIPanel,UIRow,UIButton} from './iTopoUI.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';
import { iTopoEarthBluePrint } from './iTopoFrame/iTopoEarthBluePrint.js';

function iTopoMenubarEarthHub(editor) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass('menu');

	var title = new UIButton();
	title.setClass('title');
	title.setTextContent(strings.getKey('menubar/iTopoEarthHub'));
	container.add(title);

	var options = new UIPanel();
	options.setClass('options');
	container.add(options);

	var whitepaperMenu = new UIRow();
	whitepaperMenu.setClass('option');
	whitepaperMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoBluePrint'));
	whitepaperMenu.onClick(function() {

		var scope = this;
	    var title = editor.strings.getKey( 'menubar/iTopoEarthHub/iTopoBluePrint' ) ;
		var bluePrintWindow = new iTopoEarthBluePrint(title);
		document.body.appendChild(bluePrintWindow.container.dom);
		bluePrintWindow.container.setDisplay( 'block' );
		bluePrintWindow.container.setPosition('absolate');

		
		bluePrintWindow.container.dom.addEventListener( 'resize', function () {

		});

		bluePrintWindow.closeBtn.dom.addEventListener('click', function() {

		});

	});
	options.add(whitepaperMenu);

	var skyCastleMenu = new UIRow();
	skyCastleMenu.setClass('option');
	skyCastleMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoSkyCastle'));
	skyCastleMenu.onClick(function() {

		editor.scene.traverse(function(obj) {
			  if (obj.userData.objectUUID === iTopoEarthModel.SkyCastle.castleUUID) {
				editor.select(obj);
			  }
		});

	});
	options.add(skyCastleMenu);

	var innerEarthMenu = new UIRow();
	innerEarthMenu.setClass('option');
	innerEarthMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoInnerEarth'));
	innerEarthMenu.onClick(function() {

		editor.scene.traverse(function(obj) {
			  if (obj.userData.objectUUID === iTopoEarthModel.InnerEarth.innerEarthUUID) {
				editor.select(obj);
			  }
		});

	});
	options.add(innerEarthMenu);

	var lunarMoonMenu = new UIRow();
	lunarMoonMenu.setClass('option');
	lunarMoonMenu.setTextContent(strings.getKey('menubar/iTopoEarthHub/iTopoLunarMoon'));
	lunarMoonMenu.onClick(function() {

		editor.scene.traverse(function(obj) {
			  if (obj.userData.objectUUID === iTopoEarthModel.LunarMoon.lunarMoonUUID) {
				editor.select(obj);
			  }
		});

	});
	options.add(lunarMoonMenu);

	return container;
}

export { iTopoMenubarEarthHub };
