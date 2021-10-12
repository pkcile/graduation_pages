/*
 * @Author: 王朋坤
 * @Date: 2021-09-06 10:04:17
 * @LastEditTime: 2021-09-09 14:52:24
 * @LastEditors: Please set 王朋坤
 * @Description: GeoJSON数据加载控制
 * @FilePath: \index\src\ys\cesium\DataTypeLoad\DataGeoJSON.js
 */

import * as Cesium from "cesium";

/**
 * @description: GeoJSON图层加载初始化
 * @param {*} viewer
 * @return {*} void
 */
function DataGeoJSONLayerInit(viewer) {
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
 * @description: GeoJSON数据显示控制入口
 * @param {Boolean} displayStatus 显示状态
 * @param {*} layerId 识别图层的唯一id
 * @param {String/Number} providerUrl 资源链接(选填)
 * @return {*} void
 */
DataGeoJSONLayerInit.prototype.layerControlEntrance = function(
  displayStatus,
  layerId,
  providerUrl 
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
    this.layerLoad(providerUrl, layerId);
    this.layerShowControl(layerId, displayStatus);
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
 * @return {Object} layerResult 单个图层对象
 */
DataGeoJSONLayerInit.prototype.layerLoad = function(providerUrl, layerId) {
  let viewer = this.viewer;
  let layerResult = viewer.dataSources.add(
    Cesium.GeoJsonDataSource.load(providerUrl, {
      stroke: Cesium.Color.HOTPINK,
      fill: "#bfa",
      strokeWidth: 3,
    })
  );
  let LayerCollectionById = this.LayerCollectionById;
  layerResult.then(function(layerResult) {
    LayerCollectionById.push({
      layerId: layerId,
      layerResult: layerResult,
      display: true,
    });
    viewer.zoomTo(layerResult);
  });
  return layerResult;
};

/**
 * @description: 图层显示控制
 * @param {*} layerId 识别图层的唯一id
 * @param {Boolean} controlStatus 显示状态
 * @return {*} void
 */
DataGeoJSONLayerInit.prototype.layerShowControl = function(
  layerId,
  controlStatus
) {
  // 注意this的位置
  let LayerCollectionById = this.LayerCollectionById;
  // 根据唯一id找到图层并设置显示状态
  for (const layerItem of LayerCollectionById) {
    if (layerItem?.layerId == layerId) {
      layerItem.layerResult.show = controlStatus;
    }
  }
};

export default DataGeoJSONLayerInit;
