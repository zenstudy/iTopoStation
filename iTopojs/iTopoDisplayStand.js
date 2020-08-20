/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UIPanel, UIText } from './iTopoUI.js';

import { SetScriptValueCommand } from '../js/commands/SetScriptValueCommand.js';
import { SetMaterialValueCommand } from '../js/commands/SetMaterialValueCommand.js';

function iTopoDisplayStand( ) {
	var scope = this;

	var container = new UIPanel();
	container.setId( 'player' );//DisplayStand
	container.setPosition( 'absolute' );
	container.setBackgroundColor( '#272822' );
	container.setDisplay( 'none' );
	this.container = container;

	var header = new UIPanel();
	header.setPadding( '10px' );
	container.add( header );

	var title = new UIText().setColor( '#fff' );
	title.setValue('DisplayStand');
	header.add( title );


	var buttonSVG = ( function () {

		var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.setAttribute( 'width', 32 );
		svg.setAttribute( 'height', 32 );
		var path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
		path.setAttribute( 'd', 'M 12,12 L 22,22 M 22,12 12,22' );
		path.setAttribute( 'stroke', '#fff' );
		svg.appendChild( path );
		return svg;

	} )();

	var close = new UIElement( buttonSVG );
	close.setPosition( 'absolute' );
	close.setTop( '3px' );
	close.setRight( '1px' );
	close.setCursor( 'pointer' );
	close.onClick( function () {
		//container.setDisplay( 'none' );
		document.body.removeChild(container.dom);
	} );
	header.add( close );

	return scope;
}

export { iTopoDisplayStand };
