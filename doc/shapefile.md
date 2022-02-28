// var shpwrite = require('shp-write');

// console.log(shpwrite);
 
// // (optional) set names for feature types and zipped folder
// var options = {
//     folder: 'myshapes',
//     types: {
//         point: 'mypoints',
//         polygon: 'mypolygons',
//         line: 'mylines'
//     }
// }
// // a GeoJSON bridge for features
// shpwrite.download({
//     type: 'FeatureCollection',
//     features: [
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [0, 0]
//             },
//             properties: {
//                 name: 'Foo'
//             }
//         },
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [0, 10]
//             },
//             properties: {
//                 name: 'Bar'
//             }
//         }
//     ]
// }, options);