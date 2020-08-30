/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UIPanel, UIText } from '../iTopoUI.js';

import { SetScriptValueCommand } from '../../js/commands/SetScriptValueCommand.js';
import { SetMaterialValueCommand } from '../../js/commands/SetMaterialValueCommand.js';

function iTopoDisplayStand( dispalyContext ) {
	var scope = this;

	var container = new UIPanel();
	container.setId( 'DisplayStand' );
	container.setPosition( 'absolute' );
	container.setBackgroundColor( '#fffae8' );
	container.setDisplay( 'none' );
	this.container = container;

	var header = new UIPanel();
	header.setBackgroundColor( '#cccccc' );
	header.setPadding( '10px' );
	this.container.dom.appendChild( header.dom );

	var title = new UIText().setColor( '#fff' );
	title.setValue(dispalyContext);
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

	var closeBtn = new UIElement( buttonSVG );
	closeBtn.setPosition( 'absolute' );
	closeBtn.setTop( '3px' );
	closeBtn.setRight( '1px' );
	closeBtn.setCursor( 'pointer' );
	closeBtn.dom.addEventListener( 'click', function () {
		//container.setDisplay( 'none' );
		document.body.removeChild(scope.container.dom);
	} );
	header.add( closeBtn );
	this.closeBtn = closeBtn;
	this.header = header;

	return scope;
}

iTopoDisplayStand.prototype.constructor = iTopoDisplayStand;

iTopoDisplayStand.prototype = {

	titleHeight: function() {
		return this.header.dom.offsetHeight;
	},

	contexHeight: function() {
		var height = this.container.dom.offsetHeight - this.header.dom.offsetHeight;
		console.log(height);
		return height;
	}
}

export { iTopoDisplayStand };
