import * as THREE from '../../../build/three.module.js';

import { UIPanel, UIButton } from '../iTopoUI.js';
import { UIBoolean } from '../../js/libs/ui.three.js';
import { iTopoDialogRegister } from '../iTopoDialog/iTopoDialog.Register.js';

function iTopoMenubarRegister( editor, menubar ) {
	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu right' );

	var title = new UIButton(strings.getKey( 'menubar/register' ));
	title.setClass( 'title' );
	title.onClick( function () {

		var dlgContainer = new UIPanel();
		dlgContainer.setId( 'iTopoDialog' );
		dlgContainer.setDisplay( 'block' );

		var dlg = new UIPanel();
		dlgContainer.add(dlg);

		var loginDlg = new iTopoDialogRegister( editor, menubar );
		dlg.add(loginDlg);

		document.body.appendChild(dlgContainer.dom);

	} );
	container.add( title );

	return container;
}

export { iTopoMenubarRegister };
