/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from '../../../build/three.module.js';

import { UIPanel, UIButton } from '../iTopoUI.js';
import { UIBoolean } from '../../js/libs/ui.three.js';
import { iTopoDialogLogin } from '../iTopoDialog.Login.js';

function iTopoMenubarLogin( editor , menubar) {
	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu right' );

	var title = new UIButton(strings.getKey( 'menubar/Login' ));
	title.setClass( 'title' );
	title.onClick( function () {

		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var loginDlg = new iTopoDialogLogin( editor,menubar );
		dlg.add(loginDlg);

		document.body.appendChild(dlgContainer.dom);

	} );
	container.add( title );

	return container;
}

export { iTopoMenubarLogin };
