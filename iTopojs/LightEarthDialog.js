/**
 * @author mrdoob / http://mrdoob.com/
 */
import { UIPanel, UISpan, UIButton, UIRow, UISelect, UIText,UITextArea,UINumber, UIInteger, UIInput } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { ajaxPost } from './ajaxPostHelper.js'

function LightEarthDialog( editor ) {
	var strings = editor.strings;

	const plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
	const plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
	const lng = plusOrMinus_lngx * (Math.random() * 180);
	const lat = plusOrMinus_latx * (Math.random() * 90);

	var lightTask = {
		"baseUUID": THREE.MathUtils.generateUUID(),
		"taskType": 'iTopoType/TaskObject/EcologicalFarm',
		"title": "有机农场",
		"city": "城市1",
		"address": "详细地址1",
		"lng":lng,
		"lat":lat,
		"lightWish":"共同创造基地",
		"QRcode":"./iTopojs/QRcode/88F48BD-823C-42F1-857A-124E495B351B.jpg"
	}

	var container = new UISpan();
	var dlgTitleRow = new UIRow();
	dlgTitleRow.add( new UIText( strings.getKey( 'LightToolbar/lightEarth' ) ).setWidth( '120px' ) );
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
			'iTopoType/TaskObject/Canteen': strings.getKey( 'iTopoType/TaskObject/Canteen' ),
			'iTopoType/TaskObject/EcologicalFarm': strings.getKey( 'iTopoType/TaskObject/EcologicalFarm' ),
		};
		var taskTypeRow = new UIRow();
		taskTypeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/taskType' ) ).setWidth( '90px' ) );

		var taskTypeSelect = new UISelect().setWidth( '160px' );
		taskTypeSelect.setOptions( options );
		taskTypeSelect.setValue(lightTask.taskType);
		taskTypeSelect.onChange( function () {
			var value = this.getValue();
			lightTask.taskType =  value;
			console.log(lightTask.taskType );
		} );

		taskTypeRow.add( taskTypeSelect );
		dlgBody.add( taskTypeRow );
	}

	{
		// title
		var titleRow = new UIRow();
		titleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/title' ) ).setWidth( '90px' ) );

		var titleInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		titleInput.setValue( lightTask.title );
		titleInput.onChange( function () {
			lightTask.title = this.getValue();
		} );
		titleRow.add( titleInput );

		dlgBody.add( titleRow );
	}

	{
		// city
		var cityRow = new UIRow();
		cityRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/city' ) ).setWidth( '90px' ) );

		var cityInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		cityInput.setValue( lightTask.city );
		cityInput.onChange( function () {
			lightTask.city = this.getValue();
		} );
		cityRow.add( cityInput );

		dlgBody.add( cityRow );
	}

	{
		// address
		var addressRow = new UIRow();
		addressRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/address' ) ).setWidth( '90px' ) );

		var addressInput = new UIInput().setWidth( '160px' ).setFontSize( '12px' );
		addressInput.setValue( lightTask.address );
		addressInput.onChange( function () {
			lightTask.lng = this.getValue();
		} );
		addressRow.add( addressInput );

		dlgBody.add( addressRow );
	}

	{
		var longitudeRow = new UIRow();

		longitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/longitude' ) ).setWidth( '90px' ) );

		var longitudeValueUI = new UINumber( lightTask.lng ).setRange( 2, Infinity );
		longitudeValueUI.onChange( function () {
			lightTask.lng = this.getValue();
		} );
		longitudeRow.add( longitudeValueUI );

		dlgBody.add( longitudeRow );
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/latitude' ) ).setWidth( '90px' ) );

		var latitudeValueUI = new UINumber( lightTask.lat ).setRange( 2, Infinity );
		latitudeValueUI.onChange( function () {
			lightTask.lat = this.getValue();

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
		lightWishValueUI.setValue( lightTask.lightWish );
		lightWishValueUI.onKeyUp( function () {
			lightTask.lightWish = this.getValue();

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
		var lightEarth = new UIButton( strings.getKey( 'LightToolbar/lightEarth' ) );
		lightEarth.setMarginRight( '20px' );
		lightEarth.onClick( function () {

			ajaxPost('http://127.0.0.1:8081/lightEarth', JSON.stringify(lightTask),
			function fnSucceed(jsonData)
			{
				console.log(JSON.parse(jsonData));
				editor.scene.rotation.y = 0;
				editor.sceneHelpers.rotation.y = 0;
				iTopoEarthModel.lightEarth(lightTask);
			},
			function fnFail()
			{
				console.log("post failed.");
			},
			function fnLoading()
			{

			});

			document.body.removeChild(document.getElementById("iTopoDialog"));

		} );
		buttonPanel.add( lightEarth );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'LightToolbar/cancel' ) );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("iTopoDialog"));
		} );
		buttonPanel.add( cancelBtn );
	}

	//
	return container;
}

export { LightEarthDialog };
