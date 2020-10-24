import { UIElement,UISpan ,UIPanel, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';

function iTopoArticleHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var container = new UISpan();
	this.container = container;

	var containerParameter = new UIPanel();
	containerParameter.setBorderTop('0');
	containerParameter.setPaddingTop('10px');
	container.add(containerParameter);

	{
		var articleTitleRow = new UIRow();
		this.articleTitleInput = new UIInput().setWidth('320px').setFontSize('12px').setDisabled(true);
		articleTitleRow.add(new UIText(strings.getKey('iTopoStand/article/Title')).setWidth('90px'));
		articleTitleRow.add(this.articleTitleInput);

		containerParameter.add(articleTitleRow);
	}

	{
		var articleDescTitleRow = new UIRow();
		articleDescTitleRow.add(new UIText(strings.getKey('iTopoStand/article/Description')).setWidth('90px'));
		containerParameter.add(articleDescTitleRow);

		var articleDescTextAreaRow = new UIRow();
		this.articleDescTextArea = new UITextArea().setWidth('520px').setFontSize('12px') /*.onChange( update )*/ ;
		this.articleDescTextArea.dom.style.height = '300px';
		this.articleDescTextArea.onKeyUp(function() {
			//starUser.starWish = this.getValue();

		});
		articleDescTitleRow.add(this.articleDescTextArea);

		containerParameter.add(articleDescTitleRow);
	}

	return this;
}

iTopoArticleHeader.prototype = Object.create( UIElement.prototype );
iTopoArticleHeader.prototype.constructor = iTopoArticleHeader;

iTopoArticleHeader.prototype = {

	activeTabPanel: function() {
		var scope = this;
	},

	deactiveTabPanel: function(){
		var scope = this;
	},

	dispose: function() {
		var scope = this;

	},

	getValue: function () {

		return this.articleObject;

	},

	setValue: function (articleObject) {

		if (articleObject !== null) {
		//	container.setDisplay( 'block' );
		//console.log(articleObject);
			this.articleTitleInput.setValue(articleObject.imgTitle);
			this.articleDescTextArea.setValue(articleObject.imgDesc);
		}

		this.articleObject = articleObject;
	}
}

export { iTopoArticleHeader };
