import * as THREE from '../../../build/three.module.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';

class iTopoStarUser {
  constructor() {
	const plusOrMinus_lngx = Math.round(Math.random()) * 2 - 1;
	const plusOrMinus_latx = Math.round(Math.random()) * 2 - 1;
	const lng = plusOrMinus_lngx * (Math.random() * 180);
	const lat = plusOrMinus_latx * (Math.random() * 90);
	  
	this.starUUID =  THREE.MathUtils.generateUUID();
	this.starType = 'iTopoType/TaskObject/Star';
	this.userNickname = 'skystar';
	this.gender = "female"; //"male", "female"
	this.cellPhone = 13688888888;
	this.password = 'lightstar';
	this.lng = lng;
	this.lat =lat;
	this.starWish ="star wish";
	this.wxQRcode ='';
  }

  // track(resource) {
  //   if (!resource) {
  //     return resource;
  //   }

  //   // handle children and when material is an array of materials or
  //   // uniform is array of textures
  //   if (Array.isArray(resource)) {
  //     resource.forEach(resource => this.track(resource));
  //     return resource;
  //   }

  //   if (resource.dispose || resource instanceof THREE.Object3D) {
  //     this.resources.add(resource);
  //   }
  //   if (resource instanceof THREE.Object3D) {
  //     this.track(resource.geometry);
  //     this.track(resource.material);
  //     this.track(resource.children);
  //   } else if (resource instanceof THREE.Material) {
  //     // We have to check if there are any textures on the material
  //     for (const value of Object.values(resource)) {
  //       if (value instanceof THREE.Texture) {
  //         this.track(value);
  //       }
  //     }
  //     // We also have to check if any uniforms reference textures or arrays of textures
  //     if (resource.uniforms) {
  //       for (const value of Object.values(resource.uniforms)) {
  //         if (value) {
  //           const uniformValue = value.value;
  //           if (uniformValue instanceof THREE.Texture ||
  //               Array.isArray(uniformValue)) {
  //             this.track(uniformValue);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return resource;
  // }
  // untrack(resource) {
  //   this.resources.delete(resource);
  // }
  // clearResources() {
  //   for (const resource of this.resources) {
  //     if (resource instanceof THREE.Object3D) {
  //       if (resource.parent) {
  //         resource.parent.remove(resource);
  //       }
  //     }
  //     if (resource.dispose) {
  //       resource.dispose();
  //     }
  //   }
  //   this.resources.clear();
  // }
}

export { iTopoStarUser };
