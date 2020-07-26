/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from '../../build/three.module.js';

import { UIPanel, UIButton } from '../js/libs/ui.js';
import { UIBoolean } from '../js/libs/ui.three.js';

function MenubarLogin( editor ) {
	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu right' );

	var title = new UIButton(strings.getKey( 'menubar/Login' ));
	title.setClass( 'title' );
	title.onClick( function () {

		window.open( 'https://www.flaticon.com/packs/interface-44', '_blank' );

	} );
	container.add( title );

	return container;
}

export { MenubarLogin };
