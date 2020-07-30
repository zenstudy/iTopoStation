/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UISpan, UIButton, UIRow, UISelect, UIText,UITextArea, UIInteger } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'

function LightEarthDialog( editor ) {
	var lightEarthInfo = {
		taskType: 'Canteen',
		longitude:0,
		latitude:0,
		lightWish:"light wish"
	};

	var strings = editor.strings;

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
		var options = {
			Canteen: 'Canteen',
			EcologicalFarm: 'Ecological Farm',
		};

		var taskTypeRow = new UIRow();
		var taskTypeSelect = new UISelect().setWidth( '150px' );
		taskTypeSelect.setOptions( options );
		taskTypeSelect.setValue( options.Canteen );
		taskTypeSelect.onChange( function () {
			var value = this.getValue();
			lightEarthInfo.taskType = value;
		} );

		taskTypeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/taskType' ) ).setWidth( '90px' ) );
		taskTypeRow.add( taskTypeSelect );

		dlgBody.add( taskTypeRow );
	}


	{
		var longitudeRow = new UIRow();

		longitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/longitude' ) ).setWidth( '120px' ) );

		var longitudeValueUI = new UIInteger( lightEarthInfo.longitude ).setRange( 2, Infinity );
		longitudeValueUI.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		longitudeRow.add( longitudeValueUI );

		dlgBody.add( longitudeRow );
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/latitude' ) ).setWidth( '120px' ) );

		var latitudeValueUI = new UIInteger( lightEarthInfo.latitude ).setRange( 2, Infinity );
		latitudeValueUI.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		latitudeRow.add( latitudeValueUI );

		dlgBody.add( latitudeRow );
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/lightWish' ) ).setWidth( '120px' ) );
		dlgBody.add( lightWishTitleRow );

		var lightWishTextAreaRow = new UIRow();
		var lightWishValueUI = new UITextArea().setWidth( '250px' ).setHeight( '80px' ).setFontSize( '12px' )/*.onChange( update )*/;
		lightWishValueUI.onKeyUp( function () {
			lightEarthInfo.lightWish = this.getValue();

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

			iTopoEarthModel.generateEarthCache();
			iTopoEarthModel.lightEarth(editor.camera);
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
