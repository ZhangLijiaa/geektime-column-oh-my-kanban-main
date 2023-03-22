# 看板应用 `oh-my-kanban`

此项目包含了**极客时间**专栏《***现代 React Web 开发实战***》看板应用`oh-my-kanban`的全部源码。

专栏首页：[https://time.geekbang.org/column/intro/100119601](http://gk.link/a/11Oax)

在第二模块《看板应用》中，专栏带领同学们从零开始，快速搭建一个React Web应用项目`oh-my-kanban`，然后在扩展应用功能的过程中，一步一步加入新版React中的各个重要概念和对应API，以提升学习效果。

## 如何使用

根据专栏内容准备开发环境，然后：

1. 克隆项目仓库到本地 `git clone git@gitee.com:evisong/geektime-column-oh-my-kanban.git`；
2. 检出需要的分支或Tag，如 `cd geektime-column-oh-my-kanban && git checkout base/ch-05`；
3. 安装NPM依赖 `npm install`；
4. 运行NPM脚本 `npm start`，浏览器会自动打开 [http://localhost:3000](http://localhost:3000)，展示应用。

## 代码版本

截止到目前，此代码仓库包含了如下分支和Tags：

* 主分支`main`：包含了课程第二模块oh-my-kanban的所有代码，从提交历史中可以找到每一节课的代码增改；
* 基准分支`base/ch-**`：对应每节课开始时的代码状态，如base/ch-05就是第5节课开始时的代码；
* 开发分支`dev-ch-**`：对应每节课结束时的代码状态，包含了这节课期间的一次或多次代码提交，如dev-ch-05包含了第5节课期间开发的所有代码增改；
* 发行版Tags `v0.*.*`：对应每节课结束时的代码状态，比起对应的开发分支多了一个升版提交。

根据同学们的使用场景不同，这些版本分支或Tags可以有以下几种用法：

### 如果希望直接拿到所有代码和最完整的提交历史

请检出主分支：`git checkout main`，通过`git log` + `git checkout <commit>`可以检查特定某个提交的历史。

### 如果希望拿到某节课开始时的代码

请检出基准分支，如第10节课：`git checkout base/ch-10`。然后就可以在这个版本基础上，跟随第10节课内容编写自己的代码。

### 如果希望拿到某节课结束时的代码

最直观的方式是发行版（Release），如第10节课的[`v0.10.0-ch-10-react-hooks-下`](https://gitee.com/evisong/geektime-column-oh-my-kanban/releases/tag/v0.10.0)，页面下方有[下载 Source code (zip)](https://gitee.com/evisong/geektime-column-oh-my-kanban/archive/refs/tags/v0.10.0.zip)的链接。

当然也可以检出对应的Git Tag，如第10节课：`git checkout v0.10.0`。

### 如果希望看到某节课从开始到结束期间有哪些代码更改

请查看对应的拉取请求（Pull Request），如第10节课的：[`evisong/geektime-column-oh-my-kanban!9`](https://gitee.com/evisong/geektime-column-oh-my-kanban/pulls/9)。

或者检出对应的开发分支，如第10节课：`git checkout dev-ch-10`，通过`git log` + `git checkout <commit>`可以检查特定某个提交的历史。

## 代码版本说明

另外这里解释一下，这样安排代码版本的原因。

从第3节课开始，`oh-my-kanban`代码是在一直迭代开发的。在课程连载的过程中，每当一节课有代码修改时，专栏作者都会遵循以下的工作流：

1. 从**当时**的`main`分支拉出对应的**开发分支**，比如第5节课就是`dev-ch-05`，第6节课就是`dev-ch-06`；为了方便事后定位代码，同时也拉出了相应的**基准分支**，比如第5节课的`base/ch-05`；
2. 在这节课中随着内容进展，会有多个`commit`提交到开发分支中；代码不会提交到基准分支；
3. 这节课结尾时，会在Gitee上创建一个从开发分支（如`dev-ch-05`）到`main`分支的拉取请求（Pull Request），比如 [`evisong/geektime-column-oh-my-kanban!3`](https://gitee.com/evisong/geektime-column-oh-my-kanban/pulls/3)；
4. 这个PR会被合并回`main`分支并关闭；
5. 在包含了新代码的`main`分支上，执行`npm version minor`命令，把`oh-my-kanban`的`package.json`跳一个次版本号（Minor Version），比如从`0.5.0`跳到`0.6.0`，npm也会自动打一个Git Tag，如`v0.6.0`；
6. 在Gitee中，基于新的Git Tag建一个发行版（Release），如[`v0.5.0-ch-05-组件拆分`](https://gitee.com/evisong/geektime-column-oh-my-kanban/releases/tag/v0.5.0)。

这意味着，每节课都是一轮代码迭代。比如第6节课的代码，是基于第5节课完成时的代码开发的。

## 其他

这个项目是使用 [Create React App](https://github.com/facebook/create-react-app) 即CRA脚手架工具创建的。有关CRA的使用细节，请参考[Create React App 官方文档](https://facebook.github.io/create-react-app/docs/getting-started)。
