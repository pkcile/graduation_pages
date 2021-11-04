- [ ] 1.问题：safari浏览器中，不能将2021-11-01 10:14:00解析

  ```
  Date.parse("2021-11-01 10:14:00");  // NAN
  new Date("2021-11-01 10:14:00");    // Invalid Date
  ```

- [ ] 2.问题：关于html中标签的focus等伪类

  3.git提交文件系统权限问题

  ```
  pkcile@localhost graduation-project-master % git commit -m "定位问题"
  error: 权限不足，无法在仓库对象库 .git/objects 中添加对象
  error: 权限不足，无法在仓库对象库 .git/objects 中添加对象
  error: 无法创建树对象
  ```

  赋予权限用户pkcile权限

  ```
  sudo chown -R pkcile:group .git
  ```

  4.定位在各个浏览器的情况统计

  ```
  电脑：
  
  手机：
  QQ内置：  不可行
  微信内置： 可行，采用公众号或小程序的方式，初步公众号开发
  等等
  
  ```

  5.评论动态页面制作

