### 1.使用
#### 常见vscode问题
yarn : 无法加载文件 C:\Users\admin\AppData\Roaming\npm\yarn.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
在管理员命令下：set-ExecutionPolicy RemoteSigned

#### 镜像源设置
npm config set registry https://registry.npm.taobao.org    
yarn config set registry  https://registry.npm.taobao.org

#### git 账号设置
git config --global user.email "you@example.com"
git config --global user.name "Your Name"