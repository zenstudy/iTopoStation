/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIBreak, UIText, UIButton, UIRow, UIInput } from './iTopoUI.js';

import { AddScriptCommand } from '../js/commands/AddScriptCommand.js';
import { SetScriptValueCommand } from '../js/commands/SetScriptValueCommand.js';
import { RemoveScriptCommand } from '../js/commands/RemoveScriptCommand.js';

function iTopoTaskChildContribute( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	this.container = new UIPanel();
	var container = this.container;
	this.container.setDisplay( 'none' );

	this.container.add( new UIText( strings.getKey( 'sidebar/contribute' ) ).setTextTransform( 'uppercase' ) );
	this.container.add( new UIBreak() );
	this.container.add( new UIBreak() );

	//

	var scriptsContainer = new UIRow();
	this.container.add( scriptsContainer );

	var newScript = new UIButton( strings.getKey( 'sidebar/contribute/newTask' ) );
	newScript.onClick( function () {

		var script = { name: '', source: 'function update( event ) {}' };
		editor.execute( new AddScriptCommand( editor, editor.selected, script ) );

	} );
	this.container.add( newScript );

	/*
	var loadScript = new UI.Button( 'Load' );
	loadScript.setMarginLeft( '4px' );
	container.add( loadScript );
	*/

	//

	function update() {

		scriptsContainer.clear();
		scriptsContainer.setDisplay( 'none' );

		var object = editor.selected;

		if ( object === null ) {

			return;

		}

		var scripts = editor.scripts[ object.uuid ];

		if ( scripts !== undefined && scripts.length > 0 ) {

			scriptsContainer.setDisplay( 'block' );

			for ( var i = 0; i < scripts.length; i ++ ) {

				( function ( object, script ) {

					var name = new UIInput( script.name ).setWidth( '130px' ).setFontSize( '12px' );
					name.onChange( function () {

						editor.execute( new SetScriptValueCommand( editor, editor.selected, script, 'name', this.getValue() ) );

					} );
					scriptsContainer.add( name );

					var edit = new UIButton( strings.getKey( 'sidebar/script/edit' ) );
					edit.setMarginLeft( '4px' );
					edit.onClick( function () {

						signals.editScript.dispatch( object, script );

					} );
					scriptsContainer.add( edit );

					var remove = new UIButton( strings.getKey( 'sidebar/script/remove' ) );
					remove.setMarginLeft( '4px' );
					remove.onClick( function () {

						if ( confirm( 'Are you sure?' ) ) {

							editor.execute( new RemoveScriptCommand( editor, editor.selected, script ) );

						}

					} );
					scriptsContainer.add( remove );

					scriptsContainer.add( new UIBreak() );

				} )( object, scripts[ i ] );

			}

		}

	}

	// signals

	signals.objectSelected.add( function ( object ) {

		if ( object !== null && editor.camera !== object ) {

			container.setDisplay( 'block' );

			update();

		} else {

			container.setDisplay( 'none' );

		}

	} );

	signals.scriptAdded.add( update );
	signals.scriptRemoved.add( update );
	signals.scriptChanged.add( update );

	return this;

}

iTopoTaskChildContribute.prototype = {

	refreshUI: function (taskObject) {

		if (editor.selected !== null) {
		//	container.setDisplay( 'block' );
			// geometryUUID.setValue(taskObject.baseUUID);
			// taskTypeSelect.setOptions(options);
			// taskTypeSelect.setValue(taskObject.taskType);
			// titleInput.setValue(taskObject.title);
			// cityInput.setValue(taskObject.city);
			// addressInput.setValue(taskObject.address);
			// longitudeValueUI.setValue(taskObject.lng);
			// latitudeValueUI.setValue(taskObject.lat);
			// lightWishValueUI.setValue(taskObject.lightWish);
		}
	}
}

export { iTopoTaskChildContribute };
