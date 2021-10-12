/*
 * @Author: 王朋坤
 * @Date: 2021-09-06 10:05:50
 * @LastEditTime: 2021-09-09 14:51:49
 * @LastEditors: Please set 王朋坤
 * @Description: GlTF模型本地加载控制
 * @FilePath: \index\src\ys\cesium\DataTypeLoad\DataGlTFModel.js
 */

import * as Cesium from "cesium";

/**
 * @description: GlTFModel图层加载初始化
 * @param {viewer} 
 * @return {void}
 */
function DataGlTFModelLayerInit(viewer) {
  this.viewer = viewer;
  // 图层数据集合
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
 * @description: GlTFModel数据显示控制入口
 * @param {Boolean} displayStatus 显示状态
 * @param {*} layerId 识别图层的唯一id
 * @param {String/Number} providerUrl 资源链接(选填)
 * @param {Object}  positionSelf 模型初始化位置，如：{x: 112.1, y: 12, z: 100}
 * @return {*} void
 */
DataGlTFModelLayerInit.prototype.layerControlEntrance = function(
  displayStatus,
  layerId,
  providerUrl,
  positionSelf
) {
  // 判断图层是否初始化
  let IdHave = true;
  let LayerCollectionById = this.LayerCollectionById;
  // 如果存在LayerId则不初始化
  for (const layerItem of LayerCollectionById) {
    if (layerItem?.layerId == layerId) {
      IdHave = false;
    }
  }
  // 图层初始化、图层控制
  if (IdHave) {
    this.layerLoad(providerUrl, layerId, positionSelf);
  }
  // 图层图层控制
  else {
    this.layerShowControl(layerId, displayStatus);
  }
};

/**
 * @description: 图层初始化并唯一地存入数组集合中
 * @param {String/Number} providerUrl 资源链接
 * @param {*} layerId 识别图层的唯一id
 * @param {Object} positionSelf 模型初始化位置
 * @return {*} void 
 */
DataGlTFModelLayerInit.prototype.layerLoad = function(providerUrl, layerId, positionSelf) {
  // 加载初始化
  let viewer = this.viewer;
  let layerResult = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(positionSelf.x, positionSelf.y, positionSelf.z),
    model: {
      uri: providerUrl,
    },
  });
  //viewer.trackedEntity = layerResult; //中心视角
  viewer.zoomTo(layerResult);
  // 存入数组集合中
  this.LayerCollectionById.push({
    layerId: layerId,
    layerResult: layerResult,
    display: true,
  });
};

/**
 * @description: 图层显示控制
 * @param {*} layerId 识别图层的唯一id
 * @param {Boolean} controlStatus 显示状态
 * @return {*} void
 */
DataGlTFModelLayerInit.prototype.layerShowControl = function(
  layerId,
  controlStatus
) {
  let LayerCollectionById = this.LayerCollectionById; // 注意this的位置
  // 根据唯一id找到图层并设置显示状态
  for (const layerItem of LayerCollectionById) {
    if (layerItem?.layerId == layerId) {
      layerItem.layerResult.show = controlStatus;
    }
  }
};

export default DataGlTFModelLayerInit;
