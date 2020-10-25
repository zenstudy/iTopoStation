import { UIElement,UISpan ,UIPanel, UIDiv, UIBreak, UIRow, UIColor, UISelect, UIText, UINumber, UIInteger, UITextArea, UIInput, UIButton  } from '../iTopoUI.js';
import { iTopoEarthModel } from '../iTopoEarthModel.js'
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';
import { iTopoTaskDashboard3D } from '../iTopoFrame/iTopoTaskDashboard3D.js';
import { iTopoStandBriefcase } from '../iTopoStandBriefcase/iTopoStandBriefcase.js';

function iTopoVideoHeader(editor) {
	var scope = this;
	var strings = editor.strings;
	var container = new UISpan();
	this.container = container;

	// <div class="player">
	//     <video src="./farm1.mp4"></video>
	//     <div class="controls">
	//         <a href="#" class="switch"></a>
	//         <div class="progress">
	//             <div class="curr-progress"></div>
	//         </div>
	//         <div class="time">
	//             <span class="curr-time">00:00:00</span>/
	//             <span class="total-time">00:00:00</span>
	//         </div>
	//         <a href="#" class="extend"></a>
	//     </div>
	// </div>

	var imgRow = new UIRow();
	let playerDiv =  document.createElement('div');
	playerDiv.className = 'player';
	imgRow.dom.appendChild(playerDiv);

	// 创建video对象
	let video = document.createElement('video');
	video.src = './iTopoObjects/3861590E-CB58-48BA-977C-9F9F107B61AD/outlook/castle(13).mp4'; // 设置视频地址
	video.autoplay = "true"; //要设置播放
	video.loop = "true"; //要设置播放
	playerDiv.appendChild(video);
	scope.video = video;

	let controlsDiv = document.createElement('div');
	controlsDiv.className = 'controls';
	playerDiv.appendChild(controlsDiv);

	let playBtn = document.createElement('a');
	playBtn.href = "#";
	playBtn.className = 'switch';
	controlsDiv.appendChild(playBtn);

	let progressDiv = document.createElement('div');
	progressDiv.className = 'progress';
	controlsDiv.appendChild(progressDiv);

	let currProgress = document.createElement('div');
	currProgress.className = 'curr-progress';
	progressDiv.appendChild(currProgress);

	let timeDiv = document.createElement('div');
	timeDiv.className = 'time';
	controlsDiv.appendChild(timeDiv);

	let currTime = document.createElement('span');
	currTime.className = 'curr-time';
	currTime.innerText = '00:00:00';
	timeDiv.appendChild(currTime);

	let totalTime = document.createElement('span');
	totalTime.className = 'total-time';
	totalTime.innerText = '00:00:00';
	timeDiv.appendChild(totalTime);

	let extend = document.createElement('a');
	extend.href = "#";
	extend.className = 'extend';
	controlsDiv.appendChild(extend);

	container.add(imgRow);

	{
		var articleDescTitleRow = new UIRow();
		articleDescTitleRow.add(new UIText(strings.getKey('iTopoStand/video/Description')).setWidth('90px'));
		container.add(articleDescTitleRow);

		var articleDescTextAreaRow = new UIRow();
		this.articleDescTextArea = new UITextArea().setWidth('720px').setFontSize('12px') /*.onChange( update )*/ ;
		this.articleDescTextArea.dom.style.height = '360px';
		this.articleDescTextArea.onKeyUp(function() {
			//starUser.starWish = this.getValue();

		});
		articleDescTextAreaRow.add(this.articleDescTextArea);
		container.add(articleDescTextAreaRow);
	}

	var tTime = 0;

	//将以秒为单位的时间变成“00:00:00”格式的字符串
	function getTimeStr(time) {
	    var h = Math.floor(time/3600);
	    var m = Math.floor(time%3600/60);
	    var s = Math.floor(time%60);
	    h = h>=10?h:"0"+h;
	    m = m>=10?m:"0"+m;
	    s = s>=10?s:"0"+s;
	    return h+":"+m+":"+s;
	}

	playBtn.onclick = function() {
	    if(video.paused){  // 如果视频是暂停的
	        video.play();    //play()播放  load()重新加载  pause()暂停
	    }else{
	        video.pause();
	    }
	}

	//当视频能播放(已经通过网络加载完成)时
	video.oncanplay = function() {
	    tTime = video.duration;  //获取视频总时长(单位秒)
	    var tTimeStr = getTimeStr(tTime);
	    totalTime.innerHTML = tTimeStr;
	}

	//当视频当前播放时间更新的时候
	video.ontimeupdate = function() {
	    var cTime = video.currentTime;  //获取当前播放时间
	    var cTimeStr = getTimeStr(cTime);
	    console.log(cTimeStr);
	    currTime.innerHTML = cTimeStr;

	    currProgress.style.width = cTime/tTime*100+"%";
	}

	extend.onclick = function() {
	    video.webkitRequestFullScreen();  //视频全屏
	}

	return this;
}

iTopoVideoHeader.prototype = Object.create( UIElement.prototype );
iTopoVideoHeader.prototype.constructor = iTopoVideoHeader;

iTopoVideoHeader.prototype = {

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

		return this.videoUserData;

	},

	setValue: function (videoUserData) {
		var scope = this;
		if (videoUserData !== null) {
		scope.video.src = videoUserData.imgURL;
		//	console.log(articleObject);
		//	container.setDisplay( 'block' );
		//	console.log(articleObject);
		//	this.articleTitleInput.setValue(articleObject.imgTitle);
		scope.articleDescTextArea.setValue(videoUserData.imgDesc);
		}

		this.videoUserData = videoUserData;
	}
}

export { iTopoVideoHeader };
