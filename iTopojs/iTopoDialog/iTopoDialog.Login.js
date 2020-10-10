import { UIPanel, UIButton,UIInput, UIRow, UISelect, UITextArea, UIText, UISpan, UIInteger,UIBreak } from '../iTopoUI.js';
import { iTopoMenubarStarUser } from '../iTopoMenubar/iTopoMenubar.StarUser.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoStarUser } from '../iTopoElement/iTopoStarUser.js';

function iTopoDialogLogin( editor, menubar ) {

	var strings = editor.strings;

	if( editor.starUser.info === null || editor.starUser.info === undefined){
		editor.starUser.info = { userNickname:"<在这里输入您的用户名>", password:"<在这里输入您的密码>"};
	}
	var loginUserInfo = editor.starUser.info;

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
		var userNameRow = new UIRow();

		userNameRow.add( new UIText( strings.getKey( 'iTopoDialog/login/userName' ) ).setWidth( '80px' ) );

		var inputUserName = new UIInput( loginUserInfo.userNickname );
		inputUserName.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		userNameRow.add( inputUserName );

		dlgBody.add( userNameRow );
	}

	{
		var passwordRow = new UIRow();

		passwordRow.add( new UIText( strings.getKey( 'iTopoDialog/login/password' ) ).setWidth( '80px' ) );

		var inputPassword = new UIInput();
		inputPassword.setValue( loginUserInfo.password );
		inputPassword.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		passwordRow.add( inputPassword );

		dlgBody.add( passwordRow );
	}

	var buttonPanel = new UIPanel();
	buttonPanel.setPaddingLeft( '170px' );
	buttonPanel.setPaddingRight( '30px' );
	buttonPanel.setPaddingBottom( '20px' );
	container.add( buttonPanel );

	{
		var lightStars = new UIButton( strings.getKey( 'iTopoDialog/login/login' ) );
		lightStars.setMarginRight( '20px' );
		lightStars.onClick( function () {

			loginUserInfo =	{ userNickname:inputUserName.getValue(), password:inputPassword.getValue()};

			editor.stationDB.userLogin( loginUserInfo , function(detailUserInfo){

				editor.starUser.info = detailUserInfo;
				editor.starUser.storeActiveUserInfo2Config(editor);

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
