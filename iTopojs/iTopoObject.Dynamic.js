/**
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 */

import { UIElement,UIPanel, UIBreak, UIText } from './iTopoUI.js';
import { UIBoolean, UIOutliner } from './iTopoUI.three.js';

function iTopoObjectDynamic( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	var config = editor.config;

	var history = editor.history;

	this.container = new UIPanel();

	var ignoreObjectSelectedSignal = false;

	var outliner = new UIOutliner( editor );
	outliner.onChange( function () {

		ignoreObjectSelectedSignal = true;

		editor.history.goToState( parseInt( outliner.getValue() ) );

		ignoreObjectSelectedSignal = false;

	} );
	this.container.add( outliner );

	//

	var refreshUI = function () {

		var options = [];

		function buildOption( object ) {

			var option = document.createElement( 'div' );
			option.value = object.id;

			return option;

		}

		( function addObjects( objects ) {

			for ( var i = 0, l = objects.length; i < l; i ++ ) {

				var object = objects[ i ];

				var option = buildOption( object );
				option.innerHTML = '&nbsp;' + object.name;

				options.push( option );

			}

		} )( history.undos );


		( function addObjects( objects ) {

			for ( var i = objects.length - 1; i >= 0; i -- ) {

				var object = objects[ i ];

				var option = buildOption( object );
				option.innerHTML = '&nbsp;' + object.name;
				option.style.opacity = 0.3;

				options.push( option );

			}

		} )( history.redos );

		outliner.setOptions( options );

	};

	refreshUI();

	// events

	signals.editorCleared.add( refreshUI );

	signals.historyChanged.add( refreshUI );
	signals.historyChanged.add( function ( cmd ) {

		if ( ignoreObjectSelectedSignal === true ) return;

		outliner.setValue( cmd !== undefined ? cmd.id : null );

	} );

	return this;
}

iTopoObjectDynamic.prototype = Object.create( UIElement.prototype );
iTopoObjectDynamic.prototype.constructor = iTopoObjectDynamic;

iTopoObjectDynamic.prototype = {

	getValue: function () {

		return this.taskObject;

	},

	setValue: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			// this.geometryUUID.setValue(taskObject.baseUUID);
			// this.taskTypeSelect.setValue(taskObject.taskType);
			// this.titleInput.setValue(taskObject.title);
			// this.cityInput.setValue(taskObject.city);
			// this.addressInput.setValue(taskObject.address);
			// this.longitudeValueUI.setValue(taskObject.lng);
			// this.latitudeValueUI.setValue(taskObject.lat);
			// this.lightWishValueUI.setValue(taskObject.lightWish);
		}

		this.taskObject = taskObject;
	},

	dispose: function() {
		//this.thumbnailManager.dispose();
	}

}

export { iTopoObjectDynamic };
