# 利器 nvm

nvm是node版本管理工具，类似python的virtualenv和ruby的rvm。主要特点：

1. 可安装多版本的node。
2. 灵活切换当前的node版本。
3. 以沙箱方式全局安装第三方组件到对应版本的node中。
4. 通过.vnmrc文件，方便灵活地指定各应用系统所需的node版本进行运行。

> 如果是需要管理 Windows 下的 node，官方推荐是使用 [nvmw](https://github.com/hakobera/nvmw) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)。

## 卸载已安装到全局的 node/npm

安装 nvm 之后最好先删除下已安装的 node 和全局 node 模块：

```sh
npm ls -g --depth=0 #查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装

sudo rm -rf /usr/local/lib/node_modules #删除全局 node_modules 目录

sudo rm /usr/local/bin/node #删除 node

cd  /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链
```

## 安装 nvm

官网推荐的两种安装方式

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
```

或者:

```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
```

安装器会在~/.bashrc文件中自动增加以下代码：

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

我们需要创建`~/.bash_profile`文件（如果不存在），并在尾部加入以下代码：

```
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node; # nvm 加速
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"; # cnpm 加速
source ~/.bashrc;
```

重新打开终端执行以下命令验证安装：

```sh
command -v nvm
```

## 安装 node

```sh
nvm install stable # 安装最新稳定版
nvm current # 查看当前node版本
node -v
```

**以下是nvm常用命令**

```sh
# all node's versions
nvm ls

# Install a specific version number
nvm install v0.10.32

# Use the latest available 0.10.x release
nvm use 0.10

# Run app.js using node v0.10.32
nvm run 0.10.32 app.js

# Run `node app.js` with the PATH pointing to node v0.10.32
nvm exec 0.10.32 node app.js

# Set default node version on a shell
nvm alias default 0.10.32
```

## 使用cnpm安装第三方库

之前安装，我们在`~/.bash_profile`中加入淘宝`cnpm`源，现在可以像用`npm`一样使用它

```sh
cnpm install -g express-generator
```