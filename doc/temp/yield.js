/*
 * @Author: your name
 * @Date: 2021-11-23 14:37:12
 * @LastEditTime: 2021-11-23 15:04:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /graduation-project-master/doc/temp/yield.js
 */

function* WeaponGenerator() {
  yield "Katana";
  yield "Wakizshi";
}

WeaponGenerator().next();
WeaponGenerator().next();
console.log(WeaponGenerator().next())
console.log(WeaponGenerator().next())