/*
 * @Author: 王朋坤
 * @Date: 2021-09-06 10:03:54
 * @LastEditTime: 2021-09-09 14:50:37
 * @LastEditors: Please set 王朋坤
 * @Description: 地形加载
 * @FilePath: \index\src\ys\cesium\DataTerrain.js
 */

import * as Cesium from "cesium";

/**
 * @description: Terrain加载初始化
 * @param {*} viewer
 * @return {void}
 */
function DataTerrainLayerInit(viewer) {
    this.viewer = viewer;
    // 图层数据集合
    this.LayerCollectionById = [];
}

/**
 * @description: Terrain加载入口控制
 * @param {Boolean} displayStatus 显示状态
 * @param {*} layerId 识别图层的唯一id
 * @param {String/Number} providerUrl 资源链接
 * @param {Object} position 视图跳转位置
 * @return {*} void
 */
DataTerrainLayerInit.prototype.layerControlEntrance = function(displayStatus, layerId, providerUrl, position) {
  // 地形只能设置一个，每次更换都初始化一次来替代之前设置的地形资源
  if(displayStatus) {
        this.changeProvider(layerId, providerUrl, position);
  }
  else 
  {
    // 清空三维地形状态
  }
};

/**
 * @description: 更改Terrain加载源
 * @param {*} layerId 识别图层的唯一id
 * @param {String/Number} providerUrl 资源链接
 * @param {Object} position 视图跳转位置
 * @return {void}
 */
DataTerrainLayerInit.prototype.changeProvider = function(layerId, providerUrl, position) {
    let viewer = this.viewer;
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: providerUrl,
    })
    viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
        position.x, position.y, position.z
    ),
  });
}

export default DataTerrainLayerInit;
  
