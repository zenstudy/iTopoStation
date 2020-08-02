/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../js/libs/ui.js';
import { UIOutliner, UITexture } from '../js/libs/ui.three.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'
import { iTopoEarthSettings } from './iTopoEarthSettings.js';

function iTopoTaskBriefcaseHeader( editor ) {

	var lightEarthInfo = {
		uuid:THREE.MathUtils.generateUUID(),
		taskType: 'Canteen',
		longitude:0,
		latitude:0,
		lightWish:"light wish",
		city: "恩施",
		title: "湖北恩施宣恩县:松果家园",
		address: "湖北恩施宣恩县",
	};

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );

	{
		// uuid
		var geometryUUIDRow = new UIRow();
		var geometryUUID = new UIInput().setWidth( '120px' ).setFontSize( '12px' ).setDisabled( true );
		geometryUUID.setValue( lightEarthInfo.uuid );
		geometryUUIDRow.add( new UIText( strings.getKey( 'iTopoDialog/lightEarth/uuid' ) ).setWidth( '90px' ) );
		geometryUUIDRow.add( geometryUUID );

		container.add( geometryUUIDRow );
	}

	{
		var options = {
			Canteen: "Canteen",
			EcologicalFarm: "EcologicalFarm",
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

		var longitudeValueUI = new UINumber( lightEarthInfo.longitude ).setRange( 2, Infinity );
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

		var latitudeValueUI = new UINumber( lightEarthInfo.latitude ).setRange( 2, Infinity );
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
			fetch(iTopoEarthSettings.CANTEEN_ITOPOBASE_FILE, {
				method: 'GET',
				mode: 'cors', // 允许发送跨域请求
				credentials: 'include'
			}).then(function(response) {
				//打印返回的json数据
				response.json().then(function(json) {
					for (var i = 0; i < json.length; i++) {
						console.log(editor.selected.name);
						if(json[i].uuid === editor.selected.name) {
							geometryUUID.setValue( json[i].uuid );
							taskTypeSelect.setOptions( options );
							taskTypeSelect.setValue(json[i].taskType);
							longitudeValueUI.setValue( json[i].lng );
							latitudeValueUI.setValue( json[i].lat );
							lightWishValueUI.setValue( json[i].lightWish );
						}
					}
				})
			}).catch(function(e) {
				console.log('error: ' + e.toString());
			})
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
