/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea  } from '../js/libs/ui.js';
import { UIOutliner, UITexture } from '../js/libs/ui.three.js';

function iTopoTaskBriefcaseHeader( editor ) {

	var lightEarthInfo = {
		taskType: 'Canteen',
		longitude:0,
		latitude:0,
		lightWish:"light wish"
	};

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );

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

		container.add( taskTypeRow );
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

		container.add( longitudeRow );
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

		container.add( latitudeRow );
	}

	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/lightWish' ) ).setWidth( '120px' ) );
		container.add( lightWishTitleRow );

		var lightWishTextAreaRow = new UIRow();
		var lightWishValueUI = new UITextArea().setWidth( '250px' ).setHeight( '80px' ).setFontSize( '12px' )/*.onChange( update )*/;
		lightWishValueUI.onKeyUp( function () {
			lightEarthInfo.lightWish = this.getValue();

		} );
		lightWishTextAreaRow.add( lightWishValueUI );

		container.add( lightWishTextAreaRow );
	}


	var ignoreObjectSelectedSignal = false;

	function refreshUI() {

		if ( editor.selected !== null ) {

			lightWishValueUI.setValue( editor.selected.id );

		}
	}

	refreshUI();

	// events

	signals.editorCleared.add( refreshUI );

	signals.sceneGraphChanged.add( refreshUI );

	signals.objectSelected.add( function ( object ) {

		if ( ignoreObjectSelectedSignal === true ) return;

		if ( object !== null ) {
			refreshUI();
		} else {
			//outliner.setValue( null );
		}

	} );

	return container;

}

export { iTopoTaskBriefcaseHeader };
