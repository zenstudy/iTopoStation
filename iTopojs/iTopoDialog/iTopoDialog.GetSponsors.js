import { UIElement, UISpan, UIPanel, UIText, UIRow, UITextArea, UIButton, UIDiv } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js';

function iTopoDialogGetSponsors( editor, dispalyContext, fnOK ) {
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
		var elementListItem = document.createElement('div');
		elementListItem.className = 'product-item';

		var sceneElement=document.createElement("img");
		sceneElement.src = "./iTopoObjects/00_iTopoEarth/img/pay2QRCode.jpg";
		elementListItem.appendChild(sceneElement);

		var descriptionElement = document.createElement('div');
		descriptionElement.innerText = strings.getKey('iTopoDialog/Sponsor/WechatReward');
		elementListItem.appendChild(descriptionElement);

		dlgBody.dom.appendChild(elementListItem);
	}

	{
		var elementListItem = document.createElement('div');
		elementListItem.className = 'product-item';

		var sceneElement=document.createElement("img");
		sceneElement.src = "./iTopoObjects/00_iTopoEarth/img/ID2QRCode.jpg";
		elementListItem.appendChild(sceneElement);

		var descriptionElement = document.createElement('div');
		descriptionElement.innerText = strings.getKey('iTopoDialog/Sponsor/AddWXFriend');
		elementListItem.appendChild(descriptionElement);

		dlgBody.dom.appendChild(elementListItem);
	}

	{
		var righDiv = new UIDiv();
		righDiv.setPadding('10px' );

		var labelRow = new UIRow();
		labelRow.add( new UIText( strings.getKey( 'iTopoDialog/Sponsor/LeaveAMessage' ) ) );
		righDiv.add( labelRow );

		var sponsorWordsRow = new UIRow();
		var sponsorWordsUI = new UITextArea().setHeight( '120px' ).setFontSize( '12px' );
		sponsorWordsUI.dom.cols = 78;
		sponsorWordsUI.setValue( '我想成为共享地球的赞助单位,我的手机是..., 我的微信ID是...' );
		sponsorWordsUI.onKeyUp( function () {
			//baseInfo.lightWish = this.getValue();

		} );
		sponsorWordsRow.add( sponsorWordsUI );
		righDiv.add( sponsorWordsRow );

		dlgBody.add(righDiv);
	}

	var bottomPanel = new UIPanel();
	bottomPanel.setPadding( '10px' );
	bottomPanel.setBackgroundColor( '#dddddd' );
	container.add( bottomPanel );
	{
		var lightEarth = new UIButton( strings.getKey( 'iTopoDialog/ok' ) );
		lightEarth.setLeft( '380px' );
		lightEarth.onClick( function () {

			fnOK(sponsorWordsUI.getValue());
			document.body.removeChild(document.getElementById("BluePrint"));

		} );
		bottomPanel.add( lightEarth );
	}

	{
		var cancelBtn = new UIButton( strings.getKey( 'iTopoDialog/cancel' ) );
		cancelBtn.setLeft( '400px' );
		cancelBtn.onClick( function () {
			document.body.removeChild(document.getElementById("BluePrint"));
		} );
		bottomPanel.add( cancelBtn );
	}

	return scope;
}

iTopoDialogGetSponsors.prototype.constructor = iTopoDialogGetSponsors;

iTopoDialogGetSponsors.prototype = {

	titleHeight: function() {
		return this.header.dom.offsetHeight;
	},

	contexHeight: function() {
		var height = this.container.dom.offsetHeight - this.header.dom.offsetHeight;
		console.log(height);
		return height;
	}
}

export { iTopoDialogGetSponsors };
