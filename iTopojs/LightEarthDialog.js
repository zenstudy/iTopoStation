/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIButton, UIRow, UISelect, UIText, UIInteger } from '../js/libs/ui.js';
import { iTopoEarthModel } from './iTopoEarthModel.js'

function LightEarthDialog( editor ) {

	var config = editor.config;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setPaddingBottom( '20px' );

	// language

	var options = {
		en: 'English',
		fr: 'Français',
		zh: '中文'
	};

	var languageRow = new UIRow();
	var language = new UISelect().setWidth( '150px' );
	language.setOptions( options );

	if ( config.getKey( 'language' ) !== undefined ) {

		language.setValue( config.getKey( 'language' ) );

	}

	language.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'language', value );

	} );

	languageRow.add( new UIText( strings.getKey( 'sidebar/settings/language' ) ).setWidth( '90px' ) );
	languageRow.add( language );

	container.add( languageRow );

	// export precision

	var exportPrecisionRow = new UIRow();
	var exportPrecision = new UIInteger( config.getKey( 'exportPrecision' ) ).setRange( 2, Infinity );

	exportPrecision.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'exportPrecision', value );

	} );

	exportPrecisionRow.add( new UIText( strings.getKey( 'sidebar/settings/exportPrecision' ) ).setWidth( '90px' ) );
	exportPrecisionRow.add( exportPrecision );

	container.add( exportPrecisionRow );

	var lightEarth = new UIButton( strings.getKey( 'LightToolbar/lightEarth' ) );
	lightEarth.onClick( function () {

		iTopoEarthModel.generateEarthCache();
		iTopoEarthModel.lightEarth(editor.camera);
		document.body.removeChild(document.getElementById("iTopoDialog"));
	} );
	container.add( lightEarth );

	//
	return container;

}

export { LightEarthDialog };
