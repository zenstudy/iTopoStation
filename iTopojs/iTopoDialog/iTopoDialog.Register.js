import { UIPanel, UIButton,UIInput, UIRow, UISelect, UITextArea, UIText, UISpan, UIInteger,UIBreak } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { iTopoStarUser } from '../iTopoElement/iTopoStarUser.js';
import { iTopoMenubarStarUser } from '../iTopoMenubar/iTopoMenubar.StarUser.js';

function iTopoDialogRegister( editor, menubar ) {
	var strings = editor.strings;
	var userStar = new iTopoStarUser();
	var userStarInfo = userStar.info;

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
		var cellPhoneRow = new UIRow();

		cellPhoneRow.add( new UIText( strings.getKey( 'iTopoDialog/register/cellPhone' ) ).setWidth( '80px' ) );

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

		passwordRow.add( new UIText( strings.getKey( 'iTopoDialog/register/password' ) ).setWidth( '80px' ) );

		var inputPassword = new UIInput();
		inputPassword.setValue( userStarInfo.password );
		inputPassword.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		passwordRow.add( inputPassword );

		dlgBody.add( passwordRow );
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/register/longitude' ) ).setWidth( '80px' ) );

		var longitudeValueUI = new UIInput();
		longitudeValueUI.setValue( userStarInfo.lng );
		longitudeValueUI.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		longitudeRow.add( longitudeValueUI );

		dlgBody.add( longitudeRow );
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/register/latitude' ) ).setWidth( '80px' ) );

		var latitudeValueUI = new UIInput();
		latitudeValueUI.setValue( userStarInfo.lat );
		latitudeValueUI.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		latitudeRow.add( latitudeValueUI );

		dlgBody.add( latitudeRow );
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

			editor.stationDB.registerUser(userStarInfo, function(){
				userStarInfo.storeActiveUserInfo2Config(editor);

				menubar.addMenubarStarUser( new iTopoMenubarStarUser( editor, menubar, userStarInfo) );
				menubar.removeRegisterMenu();
				menubar.removeLoginMenu();

				editor.scene.rotation.y = 0;
				editor.sceneHelpers.rotation.y = 0;

				var star = iTopoEarthModel.lightStars(userStarInfo);
				editor.select(star); // this function will call editor.signals.objectSelected.dispatch(star);

				console.log(star.userData.objectUUID);
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