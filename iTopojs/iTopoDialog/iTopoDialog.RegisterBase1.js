import { UIPanel, UISpan, UIButton, UIRow, UISelect, UIText,UITextArea,UINumber, UIInteger, UIInput } from'../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';
import { iTopoBaseObject } from '../iTopoElement/iTopoBaseObject.js';

function iTopoDialogRegisterBase( editor ) {
	var strings = editor.strings;

	var baseObjectOnEarth = new iTopoBaseObject();
	var baseInfo = baseObjectOnEarth.info;

	var container = new UISpan();
	var dlgTitleRow = new UIRow();
	dlgTitleRow.add( new UIText( strings.getKey( 'iTopoToolbarLight/RegisterEcologicalFarm' ) ).setWidth( '120px' ) );
	container.add(dlgTitleRow);

	var dlgBody = new UIPanel();
	// dlgBody.setBorderTop( '0' );
	// dlgBody.setPaddingTop( '20px' );
	// dlgBody.setPaddingBottom( '20px' );
	dlgBody.setMargin( '20px' );

	container.add(dlgBody);

	{
		// uuid
		var geometryUUIDRow = new UIRow();
		var geometryUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
		geometryUUID.setValue( THREE.MathUtils.generateUUID() );
		var geometryUUIDRenew = new UIButton( strings.getKey( 'iTopoDialog/lightEarth/newUUID' ) ).setMarginLeft( '7px' ).onClick( function () {

			geometryUUID.setValue( THREE.MathUtils.generateUUID() );

		//	editor.execute( new SetGeometryValueCommand( editor, editor.selected, 'uuid', geometryUUID.getValue() ) );

		} );

		geometryUUIDRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/baseUUID' ) ).setWidth( '90px' ) );
		geometryUUIDRow.add( geometryUUID );
		geometryUUIDRow.add( geometryUUIDRenew );

		dlgBody.add( geometryUUIDRow );
	}

	{
		var options = {
			'iTopoType/TaskObject/SharedCanteen': strings.getKey( 'iTopoType/TaskObject/SharedCanteen' ),
			'iTopoType/TaskObject/EcologicalFarm': strings.getKey( 'iTopoType/TaskObject/EcologicalFarm' ),
		};
		var taskTypeRow = new UIRow();
		taskTypeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/taskType' ) ).setWidth( '90px' ) );

		var taskTypeSelect = new UISelect().setWidth( '160px' );
		taskTypeSelect.setOptions( options );
		taskTypeSelect.setValue(baseInfo.taskType);
		taskTypeSelect.onChange( function () {
			var value = this.getValue();
			baseInfo.taskType =  value;
			console.log(baseInfo.taskType );
		} );

		taskTypeRow.add( taskTypeSelect );
		dlgBody.add( taskTypeRow );
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/title' ) ).setWidth( '90px' ) );

		var titleInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		titleInput.setValue( baseInfo.title );
		titleInput.onChange( function () {
			baseInfo.title = this.getValue();
		} );
		titleRow.add( titleInput );

		dlgBody.add( titleRow );
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/city' ) ).setWidth( '90px' ) );

		var cityInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		cityInput.setValue( baseInfo.city );
		cityInput.onChange( function () {
			baseInfo.city = this.getValue();
		} );
		cityRow.add( cityInput );

		dlgBody.add( cityRow );
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/address' ) ).setWidth( '90px' ) );

		var addressInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		addressInput.setValue( baseInfo.address );
		addressInput.onChange( function () {
			baseInfo.lng = this.getValue();
		} );
		addressRow.add( addressInput );

		dlgBody.add( addressRow );
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/longitude' ) ).setWidth( '90px' ) );

		var longitudeValueUI = new UINumber( baseInfo.lng ).setRange( 2, Infinity );
		longitudeValueUI.onChange( function () {
			baseInfo.lng = this.getValue();
		} );
		longitudeRow.add( longitudeValueUI );

		dlgBody.add( longitudeRow );
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/latitude' ) ).setWidth( '90px' ) );

		var latitudeValueUI = new UINumber( baseInfo.lat ).setRange( 2, Infinity );
		latitudeValueUI.onChange( function () {
			baseInfo.lat = this.getValue();

		} );
		latitudeRow.add( latitudeValueUI );

		dlgBody.add( latitudeRow );
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/lightWish' ) ).setWidth( '90px' ) );
		dlgBody.add( lightWishTitleRow );

		var lightWishTextAreaRow = new UIRow();
		var lightWishValueUI = new UITextArea().setHeight( '120px' ).setFontSize( '12px' )/*.onChange( update )*/;
		lightWishValueUI.dom.cols = 40;
		lightWishValueUI.setValue( baseInfo.lightWish );
		lightWishValueUI.onKeyUp( function () {
			baseInfo.lightWish = this.getValue();

		} );
		lightWishTextAreaRow.add( lightWishValueUI );

		dlgBody.add( lightWishTextAreaRow );
	}

	var buttonPanel = new UIPanel();
	buttonPanel.setPaddingLeft( '20px' );
	buttonPanel.setPaddingRight( '20px' );
	buttonPanel.setPaddingBottom( '20px' );
	container.add( buttonPanel );
	{
		var lightEarth = new UIButton( strings.getKey( 'iTopoDialog/ok' ) );
		lightEarth.setMarginRight( '20px' );
		lightEarth.onClick( function () {

			editor.signals.baseRegistered.dispatch( editor.starUser.starUUID, baseInfo);
			document.body.removeChild(document.getElementById("iTopoDialog"));

		} );
		buttonPanel.add( lightEarth );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'iTopoDialog/ok' ) );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("iTopoDialog"));
		} );
		buttonPanel.add( cancelBtn );
	}

	//
	return container;
}

export { iTopoDialogRegisterBase };
