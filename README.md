仿微信小游戏官方实现的像素鸟游戏
===
仿照微信小游戏官方demo开发，其中libs中的Symbol和适配器全部用的官方的demo<br>
## 下载<br>
    git clone https://github.com/hushenao/wechatSmallGame.git<br>
## 预览<br>
1、下载微信开发者工具，必须使用官方指定版本[链接](https://mp.weixin.qq.com/debug/wxagame/dev/devtools/download.html?t=2018115 "https://mp.weixin.qq.com/debug/wxagame/dev/devtools/download.html?t=2018115")<br>
2、然后在项目文件夹下创建一个小游戏的项目（如果这个文件是空的，会自动生成一个官方的demo，就是打飞机的）<br>
![](https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/images/select-game.jpg)

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 阻挡类（墙）
├── player
│   └── index.js                           // 玩家类（小鸟）
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   ├── music.js                           // 全局音效管理器，暂时没音效
│   └── startGame.js                       // 游戏开始之前的倒计时
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```