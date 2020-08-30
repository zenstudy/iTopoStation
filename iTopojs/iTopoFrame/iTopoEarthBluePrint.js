/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIElement, UIPanel, UIText } from '../iTopoUI.js';

import { SetScriptValueCommand } from '../../js/commands/SetScriptValueCommand.js';
import { SetMaterialValueCommand } from '../../js/commands/SetMaterialValueCommand.js';

function iTopoEarthBluePrint( dispalyContext ) {
	var scope = this;

	var container = new UIPanel();
	container.setId( 'BluePrint' );
	container.setPosition( 'absolute' );
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

	var h1 = document.createElement("h1");
	var content=document.createTextNode("共享地球的生活");
	h1.appendChild(content);
	container.dom.appendChild(h1);

	var pTexts =
		["佩尔蒂埃(Wilfred Pelletier)是一位生于休伦湖北部奥吉布瓦部落的印第安人。他说他们那儿的人没有构成组织，也没有构成组织的必要，“因为部落本来就是有机的整体”。佩尔蒂埃解释说，他们那里的人尽管没有组织起来，但仍然能把事办好：“从一个印第安部落需要翻新议事厅屋顶讲起。……议事厅的屋顶千疮百孔且日益破旧，人们议论纷纷，没有人出面组织特别委员会或者指派项目负责人。事实上什么也没有发生，直到某天早上，一个老兄爬上屋顶拆掉旧的木瓦，而地面上则是一捆捆才用手劈出来的木板。也许一己之力不能包办，但这足以开个好头。过了一会儿，另一个老兄路过，看到第一个人在屋顶。他走过来，没有问‘你待在上面干什么？’，因为这是显然的，但是他可以说，‘它怎么样？我想风化很严重’等等诸如此类的话。然后，他离开后不久，又拿着一把锤子或一把斧头，也许还有一些石钉或几卷油纸赶回来。下午，屋顶上聚集起了一个完整的工作组，地上堆满施工材料，小孩运走旧的木瓦---把它们当引火石拿回家----狗叫着、女人拿来凉柠檬水和三明治。整个部落沸腾起来充满欢声笑语。也许第二天又有一个人会带来更多的木板。这样，前后两三天的工夫就可完工，最后他们在“新”议事厅会聚一堂”。",
		"由谁来负责决定翻新议事厅的屋顶？是第一个出现在屋顶上的人，一个孤立的个体，还是整个部落？“你如何分得清？没有召集会议，没有组成委员会，也没有建立专项基金。没有讨论屋顶是应该用铝、杜罗艾德铬合金钢、马口铁还是木板来覆盖，哪种最便宜，那种最耐久，哪种综合起来最适用。既没有工头，也没有打工仔。而且也没有人质疑第一个上屋顶的家伙是否有权拆掉旧的屋顶。但是工程毕竟顺利完工了，因此必定某种‘组织’在其中起作用，甚至比雇用专业人士做起来还要快，而且，用这种方式干活全然不同于死板的工作，而更像娱乐。” ",
		"摘自《混沌七鉴：来自易学的永恒智慧 》 第3鉴 行云流水——关于集体创造与革新的鉴识"];

	for( var i=0; i < pTexts.length; ++i ){
		var pEle = document.createElement("p");//创建元素节点p
//	pEle.className = "message";//设置p标签的样式
		var textEle = document.createTextNode(pTexts[i]);
		pEle.appendChild(textEle);//将文本追加到p中
		container.dom.appendChild(pEle);//将p追加到body中
	}

	return scope;
}

iTopoEarthBluePrint.prototype.constructor = iTopoEarthBluePrint;

iTopoEarthBluePrint.prototype = {

	titleHeight: function() {
		return this.header.dom.offsetHeight;
	},

	contexHeight: function() {
		var height = this.container.dom.offsetHeight - this.header.dom.offsetHeight;
		console.log(height);
		return height;
	}
}

export { iTopoEarthBluePrint };
