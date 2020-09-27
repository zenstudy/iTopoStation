/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIButton,UIInput, UIRow, UISelect, UITextArea, UIText, UISpan, UIInteger,UIBreak } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoMenubarStarUser } from './iTopoMenubar.StarUser.js';
import { iTopoStarUser } from '../iTopoElement/iTopoStarUser.js';

function iTopoDialogLogin( editor, menubar ) {

	var strings = editor.strings;
	var starUserInfo = editor.starUser.info;

	var container = new UISpan();
	var dlgTitleRow = new UIRow();
	dlgTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/login/login' ) ).setWidth( '80px' ) );
	container.add(dlgTitleRow);
//	container.add( new UIBreak() );

	var dlgBody = new UIPanel();
	// dlgBody.setBorderTop( '0' );
	// dlgBody.setPaddingTop( '20px' );
	// dlgBody.setPaddingBottom( '20px' );
	dlgBody.setMargin( '20px' );

	container.add(dlgBody);

	{
		var cellPhoneRow = new UIRow();

		cellPhoneRow.add( new UIText( strings.getKey( 'iTopoDialog/login/cellPhone' ) ).setWidth( '80px' ) );

		var inputCellPhone = new UIInput( starUserInfo.cellPhone );
		inputCellPhone.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		cellPhoneRow.add( inputCellPhone );

		dlgBody.add( cellPhoneRow );
	}

	{
		var passwordRow = new UIRow();

		passwordRow.add( new UIText( strings.getKey( 'iTopoDialog/login/password' ) ).setWidth( '80px' ) );

		var inputPassword = new UIInput();
		inputPassword.setValue( starUserInfo.password );
		inputPassword.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		passwordRow.add( inputPassword );

		dlgBody.add( passwordRow );
	}

	var buttonPanel = new UIPanel();
	buttonPanel.setPaddingLeft( '20px' );
	buttonPanel.setPaddingRight( '20px' );
	buttonPanel.setPaddingBottom( '20px' );
	container.add( buttonPanel );

	{
		var lightStars = new UIButton( strings.getKey( 'iTopoDialog/login/login' ) );
		lightStars.setMarginRight( '20px' );
		lightStars.onClick( function () {
			console.log('login ');
			editor.stationDB.userLogin( editor.starUser, function(detailUserInfo){
				console.log(detailUserInfo);
				editor.starUser.storeActiveUserInfo2Config();

				menubar.addMenubarStarUser( new iTopoMenubarStarUser( editor, menubar, detailUserInfo ) );
				menubar.removeRegisterMenu();
				menubar.removeLoginMenu();

				editor.scene.rotation.y = 0;
				editor.sceneHelpers.rotation.y = 0;

				var star = editor.objectByiTopoUUID(detailUserInfo.starUUID);
				editor.select(star);// this function will call

				editor.signals.userRegisteredOrLogin.dispatch(detailUserInfo);
			});


			document.body.removeChild(document.getElementById("iTopoDialog"));

		} );
		buttonPanel.add( lightStars );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'iTopoDialog/login/cancel' ) );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("iTopoDialog"));
		} );
		buttonPanel.add( cancelBtn );
	}

	//
	return container;

}

export { iTopoDialogLogin };
