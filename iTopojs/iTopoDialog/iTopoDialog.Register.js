import { UIPanel, UIButton,UIInput, UIRow, UISelect, UITextArea, UIText, UISpan, UIInteger,UIBreak } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoStarUser } from '../iTopoElement/iTopoStarUser.js';
import { iTopoMenubarStarUser } from '../iTopoMenubar/iTopoMenubar.StarUser.js';

function iTopoDialogRegister( editor, menubar ) {
	var strings = editor.strings;
	var registerUserInfo =  { userNickname:"<在这里输入您的用户名>", password:"<在这里输入您的密码>"};

	var container = new UISpan();
	var dlgTitleRow = new UIRow();
	dlgTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/register/register' ) ).setWidth( '80px' ) );
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

		userNameRow.add( new UIText( strings.getKey( 'iTopoDialog/register/userName' ) ).setWidth( '80px' ) );

		var inputUserName = new UIInput( registerUserInfo.userNickname );
		inputUserName.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		userNameRow.add( inputUserName );

		dlgBody.add( userNameRow );
	}

	{
		var passwordRow = new UIRow();

		passwordRow.add( new UIText( strings.getKey( 'iTopoDialog/register/password' ) ).setWidth( '80px' ) );

		var inputPassword = new UIInput();
		inputPassword.setValue( registerUserInfo.password );
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
		var lightStars = new UIButton( strings.getKey( 'iTopoDialog/register/register' ) );
		lightStars.setMarginRight( '20px' );
		lightStars.onClick( function () {

			var registeredStarUser = new iTopoStarUser();
			registeredStarUser.info.userNickname = inputUserName.getValue();
			registeredStarUser.info.password = inputPassword.getValue();

			editor.stationDB.registerUser(registeredStarUser.info, function(){
				editor.starUser = registeredStarUser;
				editor.starUser.storeActiveUserInfo2Config(editor);

				menubar.addMenubarStarUser( new iTopoMenubarStarUser( editor, menubar, editor.starUser.info) );
				menubar.removeRegisterMenu();
				menubar.removeLoginMenu();

				editor.scene.rotation.y = 0;
				editor.sceneHelpers.rotation.y = 0;

				var star = iTopoEarthModel.lightStars(editor.starUser.info);
				editor.select(star); // this function will call editor.signals.objectSelected.dispatch(star);
			});

			document.body.removeChild(document.getElementById("iTopoDialog"));
		} );

		buttonPanel.add( lightStars );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'iTopoDialog/register/cancel' ) );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("iTopoDialog"));
		} );
		buttonPanel.add( cancelBtn );
	}

	//
	return container;

}

export { iTopoDialogRegister };
