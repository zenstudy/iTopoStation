/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIButton, UIRow, UISelect, UITextArea, UIText, UISpan, UIInteger,UIBreak } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'

function LightStarDialog( editor ) {

	//var config = editor.config;
	var lightStarInfo = {
		longitude:0,
		latitude:0,
		starWish:"star wish"
	};

	var strings = editor.strings;

	var container = new UISpan();
	var dlgTitleRow = new UIRow();
	dlgTitleRow.add( new UIText( strings.getKey( 'LightToolbar/lightStars' ) ).setWidth( '120px' ) );
	container.add(dlgTitleRow);
//	container.add( new UIBreak() );

	var dlgBody = new UIPanel();
	// dlgBody.setBorderTop( '0' );
	// dlgBody.setPaddingTop( '20px' );
	// dlgBody.setPaddingBottom( '20px' );
	dlgBody.setMargin( '20px' );

	container.add(dlgBody);

	{
		var longitudeRow = new UIRow();

		longitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightStars/longitude' ) ).setWidth( '120px' ) );

		var longitudeValueUI = new UIInteger( lightStarInfo.longitude ).setRange( 2, Infinity );
		longitudeValueUI.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		longitudeRow.add( longitudeValueUI );

		dlgBody.add( longitudeRow );
	}

	{
		var latitudeRow = new UIRow();

		latitudeRow.add( new UIText( strings.getKey( 'iTopoDialog/lightStars/latitude' ) ).setWidth( '120px' ) );

		var latitudeValueUI = new UIInteger( lightStarInfo.latitude ).setRange( 2, Infinity );
		latitudeValueUI.onChange( function () {
			// var value = this.getValue();
			// editor.config.setKey( 'exportPrecision', value );
		} );
		latitudeRow.add( latitudeValueUI );

		dlgBody.add( latitudeRow );
	}

	{
		var starWishTitleRow = new UIRow();
		starWishTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightStars/starWish' ) ).setWidth( '120px' ) );
		dlgBody.add( starWishTitleRow );

		var starWishTextAreaRow = new UIRow();
		var starWishValueUI = new UITextArea().setWidth( '250px' ).setHeight( '80px' ).setFontSize( '12px' )/*.onChange( update )*/;
		starWishValueUI.onKeyUp( function () {
			lightStarInfo.starWish = this.getValue();

		} );
		starWishTextAreaRow.add( starWishValueUI );

		dlgBody.add( starWishTextAreaRow );
	}

	var buttonPanel = new UIPanel();
	buttonPanel.setPaddingLeft( '20px' );
	buttonPanel.setPaddingRight( '20px' );
	buttonPanel.setPaddingBottom( '20px' );
	container.add( buttonPanel );

	{
		var lightStars = new UIButton( strings.getKey( 'LightToolbar/lightStars' ) );
		lightStars.setMarginRight( '20px' );
		lightStars.onClick( function () {
			editor.scene.rotation.y = 0;
			editor.sceneHelpers.rotation.y = 0;
			iTopoEarthModel.lightStars(THREE.MathUtils.generateUUID(),editor.camera);
			document.body.removeChild(document.getElementById("iTopoDialog"));
		} );
		buttonPanel.add( lightStars );
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

export { LightStarDialog };
