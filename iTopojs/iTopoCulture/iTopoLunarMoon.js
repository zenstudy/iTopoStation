import * as THREE from '../../../build/three.module.js';
import {iTopoEarthSettings} from '../iTopoEarthSettings.js';

class iTopoLunarMoon {
  constructor() {
    //this.resources = new Set();
	this.lunarMoonUUID = '8C38386A-886D-4B8B-92B8-05E8CB6BCB85';
	this.title = '月亮船';
	this.lng = 0;
	this.lat = 0;
	this.size = 100;
	this.dis2Cloud = 20;
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

export { iTopoLunarMoon };
