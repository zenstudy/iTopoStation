import { UIElement, UISpan, UIRow, UIPanel, UIBreak, UIText } from '../iTopoUI.js';
import { iTopoThumbnailManager } from '../iTopoFrame/iTopoThumbnailManager.js';
import { iTopoProductManager } from '../iTopoFrame/iTopoProductManager.js';
import { iTopoArticleManager } from '../iTopoFrame/iTopoArticleManager.js';
import { GLTFLoader } from '../../../examples/jsm/loaders/GLTFLoader.js';
import { iTopoStandPlatform } from '../iTopoFrame/iTopoStandPlatform.js';
import { iTopoDisplayStand } from '../iTopoFrame/iTopoDisplayStand.js';

function iTopoObjectEcologicalFarmProduct(editor) {
	var scope = this;
	scope.strings = editor.strings;

	var container = new UISpan();
	scope.container = container;

	var groupPanel = new UIPanel();
	groupPanel.setWidth('280px');
	groupPanel.setHeight('460px');
	groupPanel.setOverflow('auto');
	scope.thumbnailManager = new iTopoThumbnailManager();
	scope.thumbnailManager.create(groupPanel.dom);

	container.add(groupPanel);

	var memberDetailPanel = new UIPanel();
	memberDetailPanel.setTop( '530px' );
	memberDetailPanel.setWidth('280px');
	memberDetailPanel.setHeight('400px');
	memberDetailPanel.setOverflow('auto');

	var geometryUUIDRow = new UIRow();
	scope.thumbnailManager2 = new iTopoThumbnailManager();
	scope.thumbnailManager2.setItemClassName("register-item");
	scope.thumbnailManager2.create(geometryUUIDRow.dom);
	memberDetailPanel.add(geometryUUIDRow);
	container.add(memberDetailPanel);

	return scope;
}

iTopoObjectEcologicalFarmProduct.prototype = Object.create(UIElement.prototype);
iTopoObjectEcologicalFarmProduct.prototype.constructor = iTopoObjectEcologicalFarmProduct;

iTopoObjectEcologicalFarmProduct.prototype = {

	activeTabPanel: function() {
		var scope = this;
		if(scope.thumbnailManager !== null){
		scope.thumbnailManager.updateCanvasSize();
		scope.thumbnailManager.active();
		}

		if(scope.thumbnailManager2 !== null){
		scope.thumbnailManager2.updateCanvasSize();
		scope.thumbnailManager2.active();
		}
	},

	deactiveTabPanel: function(){
		var scope = this;
		if(scope.thumbnailManager !== null){
			scope.thumbnailManager.deactive();
		}
		if(scope.thumbnailManager2 !== null){
			scope.thumbnailManager2.deactive();
		}
	},

	dispose: function() {
		if(this.thumbnailManager !== undefined && this.thumbnailManager !== null){
			this.thumbnailManager.dispose();
			this.thumbnailManager = null;
		}

		if(this.thumbnailManager2 !== undefined && this.thumbnailManager2 !== null){
			this.thumbnailManager2.dispose();
			this.thumbnailManager2 = null;
		}
	},

	getValue: function() {
		return this.taskObject;
	},

	setValue: function(taskObject) {
		var scope = this;
		if (editor.selected !== null) {

			var title = scope.strings.getKey('sidebar/EcologicalFarm/product');

			var material = new THREE.MeshStandardMaterial({
				color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
				roughness: 0.5,
				metalness: 0,
				flatShading: true
			});
			var mesh = new THREE.Mesh(new THREE.DodecahedronBufferGeometry(0.5), material);

			scope.thumbnailManager.createThumbnailItem('添加' + title , mesh.clone(), function() {
				alert('to add new product function.')
			});

			//如果没有对应的文件夹，则会出错，因为找不到相应的文件
			editor.stationDB.fetchiTopoBaseProductCategorys(taskObject.baseUUID,function(jsonProductCategorys){

				jsonProductCategorys.forEach(function(productCategory){
					scope.thumbnailManager.createThumbnailItem(productCategory.productCategoryName, mesh.clone(),
					function() {
						scope.onSelectProductCategory(taskObject.baseUUID,productCategory);
					});
				})

			})

			scope.thumbnailManager.updateCanvasSize();
		}

		scope.taskObject = taskObject;
	},

	onSelectProductCategory: function(baseUUID,productCategory){
		var scope = this;

		scope.thumbnailManager2.clearAllThumbnailItems();

		editor.stationDB.fetchiTopoBaseProducts(baseUUID, function(jsonProducts){

			jsonProducts.forEach(function(jsonProductInfo) {

				var originPosition = new THREE.Vector3();
				editor.resourceTracker.loadDefaultProduct( originPosition, 1, function(object){
					scope.thumbnailManager2.createThumbnailItem( jsonProductInfo.productName,
				 	object.clone() , function() { scope.onSiteProductClass3D(jsonProductInfo);	});
				}) ;

			});

			scope.thumbnailManager2.updateCanvasSize();
			scope.thumbnailManager2.active();
		});

	},

	onSiteProductClass3D: function(jsonProductInfo) { // this对应一个item
		var scope = this;
		var originPosition = new THREE.Vector3();
		editor.resourceTracker.loadProductModel(jsonProductInfo.productModelURL,originPosition, 300, function(baseModel){

				var album2DImgs = [];
				var baseURL = "./iTopoObjects/" + scope.taskObject.baseUUID + "/Products/" + jsonProductInfo.productUUID + "/";
				jsonProductInfo.album2DImgs.forEach(function(imgItem){
					album2DImgs.push({ imgURL: baseURL + imgItem.productImgFileName , imgDesc: imgItem.productImgDesc });
				});

				var explore = new iTopoStandPlatform.Explore(jsonProductInfo.productName);
				console.log(album2DImgs);
				explore.show3D(null , baseModel, album2DImgs);
				explore.play();

		}) ;
	}
}

export {
	iTopoObjectEcologicalFarmProduct
};
