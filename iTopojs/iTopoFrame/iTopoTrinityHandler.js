import * as THREE from '../../threejs/build/three.module.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';

class iTopoTrinityHandler {

	constructor() {

		this.SELECTED = null;
		this.HOVERED = null;

	}

	setSelected( obj2Process ) {

		if( this.SELECTED ===null && obj2Process !== null){

			// 设置 this.SELECTED 对象
			this.SELECTED = obj2Process;
			if(this.HOVERED !== null && obj2Process.id === this.HOVERED.id)
				this.SELECTED.currentHex = this.HOVERED.currentHex;
			else
				this.SELECTED.currentHex = obj2Process.material.color.getHex();//记录当前选择的颜色
			this.SELECTED.material.color.setHex(0x66ff00);

		}else if( this.SELECTED !==null && obj2Process === null ){

			//还原 this.SELECTED 对象为最初的状态，并更新为obj2Process
			this.SELECTED.material.color.setHex(this.SELECTED.currentHex);
			this.SELECTED = null;

		} else if(obj2Process !== null && this.SELECTED !==null && obj2Process.id !== this.SELECTED.id){

			//还原 this.SELECTED 对象为最初的状态，并更新为obj2Process,和更新obj2Process的状态为选中状态
			this.SELECTED.material.color.setHex(this.HOVERED.currentHex);

			this.SELECTED = obj2Process;

			if(this.HOVERED !== null && obj2Process.id === this.HOVERED.id)
				this.SELECTED.currentHex = this.HOVERED.currentHex;
			else
				this.SELECTED.currentHex = obj2Process.material.color.getHex();//记录当前选择的颜色

			this.SELECTED.material.color.setHex(0x66ff00);
		}

	}

	setHovered( obj2Process ) {

		if(obj2Process !== null && this.HOVERED ===null){// obj2Process 与 this.HOVERED 不同

			if(this.SELECTED !== null && obj2Process.id === this.SELECTED.id) {
				return;
			}

			this.HOVERED = obj2Process;
			this.HOVERED.currentHex = obj2Process.material.color.getHex();//记录当前选择的颜色
			this.HOVERED.material.color.setHex(0x66ff00);

		} else if(obj2Process === null && this.HOVERED !==null){// obj2Process 与 this.HOVERED 不同

			this.HOVERED.material.color.setHex(this.HOVERED.currentHex);
			this.HOVERED = null;

		} else if(obj2Process !== null && this.HOVERED !==null && obj2Process.id !== this.HOVERED.id){

			//还原 this.HOVERED 对象为最初的状态，并更新为obj2Process
			if( this.SELECTED !== null && obj2Process.id !== this.SELECTED.id){

				this.HOVERED.material.color.setHex(this.HOVERED.currentHex);

				this.HOVERED = obj2Process;
				this.HOVERED.currentHex = obj2Process.material.color.getHex();//记录当前选择的颜色
				this.HOVERED.material.color.setHex(0x66ff00);
			}
		}

	}

}

export {
	iTopoTrinityHandler
};
