/*
 * @Author: your name
 * @Date: 2021-10-11 17:08:29
 * @LastEditTime: 2021-10-15 20:38:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /graduation-project-master/src/map/arcgis/AnalysePosition.js
 */
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Graphic from "@arcgis/core/Graphic";

function AnalysePosition(map, view, locationCoords, queryParamConfig) {
  return new Promise(function(resolve) {
    // 1.Graphic 点、线、面样式设置；geometry点、线、面设置
    // geometry点
    const geometryPoint = {
      type: "point",
      longitude: locationCoords[0],
      latitude: locationCoords[1],
    };

    // geometry线
    const geometryLine = {
      type: "polyline",
      paths: [
        [-111.3, 52.68],
        [-98, 49.5],
        [-93.94, 29.89],
      ],
    };

    // geometry面
    const geometryPolygon = {
      type: "polygon",
      rings: [
        [-64.78, 32.3],
        [-66.07, 18.45],
        [-80.21, 25.78],
        [-64.78, 32.3],
      ],
    };

    // 被选中点要素样式设置
    const pointGraphic = new Graphic({
      geometry: geometryPoint,
      symbol: {
        type: "simple-marker",
        size: "30px",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
    });

    // 被选中面要素样式设置
    const polygonGraphic = new Graphic({
      symbol: {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    });

    // 被选中线要素样式设置
    const polylineGraphic = new Graphic({
      symbol: {
        type: "simple-line", // autocasts as SimpleLineSymbol()
        color: [226, 119, 40],
        width: 4,
      },
    });

    // 缓冲区样式设置
    const polygonBufferGraphic = new Graphic({
      symbol: {
        type: "simple-fill",
        color: [255, 255, 255, 0.2],
        outline: {
          color: [0, 0, 255],
          width: 2,
        },
      },
    });

    // 2.查询图层添加
    const featureLayerByServer = new FeatureLayer({
      url:
        "https://services5.arcgis.com/tMUv40jPkGf3F4zc/ArcGIS/rest/services/schoolbuilding001/FeatureServer/0",
    });
    // map.add(featureLayerByServer);

    // 3.查询、查询参数设置
    const queryParam = featureLayerByServer.createQuery();
    queryParam.where = `${queryParamConfig.whereParamField} = ${queryParamConfig.whereParamValue}`;
    queryParam.geometry = geometryPoint;
    queryParam.units = "meters";
    queryParam.distance = queryParamConfig.bufferDistance;
    queryParam.spatialRelationship = "intersects";
    queryParam.returnQueryGeometry = true;
    queryParam.returnGeometry = true;

    featureLayerByServer.queryFeatures(queryParam).then(function(firstResult) {
      console.log(firstResult);
      // 缓冲区样式
      polygonBufferGraphic.geometry = firstResult.queryGeometry;
      view.graphics.add(polygonBufferGraphic);

      // 要素样式设置
      firstResult.features.forEach(function(item) {
        // 被选中点样式
        const pointGraphic = new Graphic({
          symbol: {
            type: "simple-marker",
            size: "18px",
            color: [255, 0, 0],
            outline: {
              color: [255, 255, 255],
              width: 1,
            },
          },
        });
        // 被选中面样式
        const polygonGraphic = new Graphic({
          symbol: {
            type: "simple-fill",
            color: [227, 139, 79, 0.8],
            outline: {
              color: [255, 255, 255],
              width: 1,
            },
          },
        });
        if (item.geometry.type === "point") {
          pointGraphic.geometry = item.geometry;
          view.graphics.add(pointGraphic);
        } else if (item.geometry.type === "polygon") {
          polygonGraphic.geometry = item.geometry;
          view.graphics.add(polygonGraphic);
        }
      });

      // 分析结果判断
      if (firstResult.features.length > 0) {
        resolve(1);
      }
      else 
      {
        resolve(0);
      }
    });
  });
}

export default AnalysePosition;
