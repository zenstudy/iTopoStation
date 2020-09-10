/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIButton,UIInput, UIRow, UISelect, UITextArea, UIText, UISpan, UIInteger,UIBreak } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { ajaxGet } from '../ajaxPostHelper.js'
import { iTopoMenubarStarUser } from './iTopoMenubar.StarUser.js';

function iTopoDialogLogin( editor, menubar ) {

	const plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
	const plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
	const lng = plusOrMinus_lngx * (Math.random() * 180);
	const lat = plusOrMinus_latx * (Math.random() * 90);

	//var config = editor.config;
	var userStarInfo = {
		starUUID: THREE.MathUtils.generateUUID(),
		starType: 'iTopoType/TaskObject/Star',
		userNickname: 'skystar',
		gender: "female", //"male", "female"
		cellPhone:13688888888,
		password:'lightstar',
		lng:lng,
		lat:lat,
		starWish:"star wish",
		wxQRcode:'',
	};

	var strings = editor.strings;

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

		var inputCellPhone = new UIInput( userStarInfo.cellPhone );
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
		inputPassword.setValue( userStarInfo.password );
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

			ajaxGet('http://127.0.0.1:8081/iTopoEarthLogin',
			function fnSucceed(jsonData)
			{
				menubar.addMenubarStarUser( new iTopoMenubarStarUser( editor, menubar, userStarInfo) );
				menubar.removeRegisterMenu();
				menubar.removeLoginMenu();

				console.log(JSON.parse(jsonData));
				editor.scene.rotation.y = 0;
				editor.sceneHelpers.rotation.y = 0;
				//iTopoEarthModel.lightStars(userStarInfo);
			},
			function fnFail()
			{
				console.log("post failed.");
			},
			function fnLoading()
			{

			},
			'zeping.zhang',
			'password for zeping');
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
