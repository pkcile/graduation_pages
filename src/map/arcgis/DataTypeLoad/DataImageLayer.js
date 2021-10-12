/*
 * @Author: 王朋坤
 * @Date: 2021-09-06 10:03:13
 * @LastEditTime: 2021-09-09 14:51:11
 * @LastEditors: Please set 王朋坤
 * @Description: 影像加载控制
 * @FilePath: \index\src\ys\cesium\DataTypeLoad\DataImageLayer.js
 */

import * as Cesium from "cesium";

/**
 * @description: 影像图层加载初始化
 * @param {*} viewer
 * @return {*} void
 */
function DataImageLayerInit(viewer) {
  this.viewer = viewer;
  this.viewer.imageryProviderBase;
  // 将底图图层添加到imageryProviderBase
  this.viewer.scene.imageryLayers._layers.forEach((layerItem) => {
    if (layerItem?._isBaseLayer) {
      this.viewer.imageryProviderBase = layerItem;
      return;
    }
  });
  // 影像图层数据集合
  this.LayerCollectionById = [
    // 示例
    {
      layerId: "001",        // 识别图层的唯一id
      layerResult: "obj",    // 返回的单个图层对象
      display: true,         // 无意义
    }
  ];
}

/**
 * @description: 影像控制入口
 * @param {Boolean} displayStatus 显示状态
 * @param {*} layerId 识别图层的唯一id
 * @param {Object} imgType 影像类型（底图或单个图层）
 * @param {String/Number} providerUrl 资源链接
 * @return {*} void
 */
DataImageLayerInit.prototype.layerControlEntrance = function(
  displayStatus,
  layerId,
  imgType,
  providerUrl
) {
  // 如果控制影像底图
  if (imgType == "imageBaseLayer") {
    this.dataImageBaseLayerControl(displayStatus);
  } 
  // 如果控制影像图层
  else {
    // 判断影像图层是否初始化
    let imgLayerIdHave = true;
    let LayerCollectionById = this.LayerCollectionById; // console.log(this); 
    // 如果存在imgLayerId则不初始化
    for (const layerItem of LayerCollectionById) {
      if (layerItem?.imgLayerId == layerId) {
        imgLayerIdHave = false;
      }
    }
    // 影像图层初始化、图层控制
    if (imgLayerIdHave) {
      this.dataImageLayerLoad(providerUrl, layerId);
      this.dataImageLayerShowControl(layerId, displayStatus);
    }
    // 影像图层图层控制
    else {
       this.dataImageLayerShowControl(layerId, displayStatus);
    }
  }
};

/**
 * @description: 单个影像图层添加显示
 * @param {String/Number} providerUrl 影像源
 * @param {*} layerId
 * @return {Object} layerResult 单个影像图层数据（对象）
 */
DataImageLayerInit.prototype.dataImageLayerLoad = function(
  providerUrl,
  layerId
) {
  // 图层添加
  let viewer = this.viewer;
  let imageLayers = viewer.scene.imageryLayers;
  let layerResult = imageLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider(
      {
        url: providerUrl,
      }
      // imgLayerIndex //影像图层index可不设置
    )
  );
  this.LayerCollectionById.push({
    layerId: layerId,
    layerResult: layerResult,
    display: true,
  });
  return layerResult;
};

/**
 * @description: 底图影像图层设置
 * @param {String/Number} providerUrl 影像源
 * @param {Boolean} isIonImageryProvider 是否使用Ion作为数据源，默认使用Ion
 * @return {void}
 */
DataImageLayerInit.prototype.dataImageBaseLayerChange = function(
  providerUrl = 4,
  isIonImageryProvider = true
) {
  // 设置为IonImageryProvider数据源
  if (isIonImageryProvider) {
    this.viewer.imageryProviderBase._imageryProvider = new Cesium.IonImageryProvider(
      {
        assetId: providerUrl,
      }
    );
  }
  // 设置为UrlTemplateImageryProvider本地数据源
  else {
    this.viewer.imageryProviderBase._imageryProvider = new Cesium.UrlTemplateImageryProvider(
      {
        url: providerUrl,
      }
    );
  }
  return this.viewer.imageryProviderBase._imageryProvider;
};

/**
 * @description: 底图影像图层的亮度、透明度属性设置
 * @param {*}
 * @return {*} void
 */
DataImageLayerInit.prototype.dataImageBaseLayerChangeProperty = function() {
  // 调整亮度
  if (this.viewer.imageryProviderBase.brightness <= 3) {
    this.viewer.imageryProviderBase.brightness += 0.2;
  }
  // 调整透明度
  this.viewer.imageryProviderBase.alpha -= 0.1;
};

/**
 * @description: 底图影像图层的显示控制
 * @param {Boolean} displayStatus 显示控制状态
 * @return {*} void
 */
DataImageLayerInit.prototype.dataImageBaseLayerControl = function(
  displayStatus = false
) {
  this.viewer.imageryProviderBase.show = displayStatus;
};

/**
 * @description: 所有添加的影像数据的显示控制
 * @param {displayStatus} 显示控制状态
 * @return {*} void
 */
DataImageLayerInit.prototype.dataImageryLayerCollectionControl = function(
  displayStatus
) {
  // 获取cesium中全局的影像图层，包括底图
  let imageryLayersArray = this.viewer.scene.imageryLayers._layers;
  // 跳过底图，其他图层设置显示状态
  imageryLayersArray.forEach((layerItem) => {
    //跳过底图， _isBaseLayer
    if (layerItem?._isBaseLayer) {
      return;
    }
    layerItem.show = displayStatus;
  });
};

/**
 * @description: 单个影像图层的显示控制
 * @param {*} layerId 识别图层的唯一id
 * @param {Boolean} controlStatus 显示控制状态
 * @return {*} void
 */
DataImageLayerInit.prototype.dataImageLayerShowControl = function(
  layerId,
  controlStatus
) {
  // 获取图层集合
  let LayerCollectionById = this.LayerCollectionById;
  // 根据唯一id找到图层并设置显示状态
  for (const layerItem of LayerCollectionById) {
    if (layerItem?.layerId == layerId) {
      layerItem.layerResult.show = controlStatus;
    }
  }
};

/**
 * @description: 调整单个影像图层位置为最上层
 * @param {Object} adjustLayer 单个影像图层对象
 * @return {*} void
 */
DataImageLayerInit.prototype.dataImageLayerPositionTop = function(adjustLayer) {
  let viewer = this.viewer;
  let imageLayers = viewer.scene.imageryLayers;
  imageLayers.raiseToTop(adjustLayer);
};

/**
 * @description: 调整单个影像图层位置向上一层
 * @param {Object} adjustLayer 单个影像图层对象
 * @return {*} void
 */
DataImageLayerInit.prototype.dataImageLayerPositionUpper = function(
  adjustLayer
) {
  let viewer = this.viewer;
  let imageLayers = viewer.scene.imageryLayers;
  imageLayers.raise(adjustLayer);
};

export default DataImageLayerInit;
