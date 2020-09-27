import { UIPanel, UIButton, UICheckbox } from '../iTopoUI.js';

function iTopoToolbar( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'toolbar' );

	// translate / rotate / scale

	var translateIcon = document.createElement( 'img' );
	translateIcon.title = strings.getKey( 'iTopoToolbar/translate' );
	translateIcon.src = 'images/translate.svg';

	var translate = new UIButton();
	translate.dom.className = 'Button selected';
	translate.dom.appendChild( translateIcon );
	translate.onClick( function () {

		signals.transformModeChanged.dispatch( 'translate' );

	} );
	container.add( translate );

	var rotateIcon = document.createElement( 'img' );
	rotateIcon.title = strings.getKey( 'iTopoToolbar/rotate' );
	rotateIcon.src = 'images/rotate.svg';

	var rotate = new UIButton();
	rotate.dom.appendChild( rotateIcon );
	rotate.onClick( function () {

		signals.transformModeChanged.dispatch( 'rotate' );

	} );
	container.add( rotate );

	var scaleIcon = document.createElement( 'img' );
	scaleIcon.title = strings.getKey( 'iTopoToolbar/scale' );
	scaleIcon.src = 'images/scale.svg';

	var scale = new UIButton();
	scale.dom.appendChild( scaleIcon );
	scale.onClick( function () {

		signals.transformModeChanged.dispatch( 'scale' );

	} );
	container.add( scale );

	var local = new UICheckbox( false );
	local.dom.title = strings.getKey( 'iTopoToolbar/local' );
	local.onChange( function () {

		signals.spaceChanged.dispatch( this.getValue() === true ? 'local' : 'world' );

	} );
	container.add( local );

	//

	signals.transformModeChanged.add( function ( mode ) {

		translate.dom.classList.remove( 'selected' );
		rotate.dom.classList.remove( 'selected' );
		scale.dom.classList.remove( 'selected' );

		switch ( mode ) {

			case 'translate': translate.dom.classList.add( 'selected' ); break;
			case 'rotate': rotate.dom.classList.add( 'selected' ); break;
			case 'scale': scale.dom.classList.add( 'selected' ); break;

		}

	} );

	return container;

}

export { iTopoToolbar };
