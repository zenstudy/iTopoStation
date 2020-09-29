import { UIElement, UISpan, UIPanel, UIText, UIRow, UITextArea, UIButton } from '../iTopoUI.js';

function iTopoDialogApplyToJoining( dispalyContext ) {
	var scope = this;
	var strings = editor.strings;

	//var container = new UIPanel();
	var container = new UISpan();
	container.setId( 'BluePrint' );
	container.setPosition( 'absolute' );
	scope.container = container;

	var header = new UIPanel();
	header.setBackgroundColor( '#dddddd' );
	header.setPadding( '10px' );
	scope.container.dom.appendChild( header.dom );

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
	scope.closeBtn = closeBtn;
	scope.header = header;

	var dlgBody = new UIPanel();
	dlgBody.setPadding( '10px' );
	dlgBody.setBackgroundColor( '#eeeeee' );

	scope.container.add( dlgBody );
	{
		var lightWishTitleRow = new UIRow();
		lightWishTitleRow.add( new UIText( strings.getKey( 'iTopoDialog/ApplyToJoining/joiningReason' ) ) );
		dlgBody.add( lightWishTitleRow );

		var lightWishTextAreaRow = new UIRow();
		var lightWishValueUI = new UITextArea().setHeight( '120px' ).setFontSize( '12px' );
		lightWishValueUI.dom.cols = 40;
		lightWishValueUI.setValue( 'apply...' );
		lightWishValueUI.onKeyUp( function () {
			//baseInfo.lightWish = this.getValue();

		} );
		lightWishTextAreaRow.add( lightWishValueUI );

		dlgBody.add( lightWishTextAreaRow );
	}

	var bottomPanel = new UIPanel();
	bottomPanel.setPadding( '10px' );
	bottomPanel.setBackgroundColor( '#dddddd' );
	container.add( bottomPanel );
	{
		var lightEarth = new UIButton( strings.getKey( 'iTopoDialog/ok' ) );
		lightEarth.setLeft( '170px' );
		lightEarth.onClick( function () {

			//editor.signals.baseRegistered.dispatch( editor.starUser.starUUID, baseInfo);
			document.body.removeChild(document.getElementById("BluePrint"));

		} );
		bottomPanel.add( lightEarth );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'iTopoDialog/cancel' ) );
		cancelBtn.setLeft( '180px' );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("BluePrint"));
		} );
		bottomPanel.add( cancelBtn );
	}

	return scope;
}

iTopoDialogApplyToJoining.prototype.constructor = iTopoDialogApplyToJoining;

iTopoDialogApplyToJoining.prototype = {

	titleHeight: function() {
		return this.header.dom.offsetHeight;
	},

	contexHeight: function() {
		var height = this.container.dom.offsetHeight - this.header.dom.offsetHeight;
		console.log(height);
		return height;
	}
}

export { iTopoDialogApplyToJoining };
