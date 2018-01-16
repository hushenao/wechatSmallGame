## quickstart

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