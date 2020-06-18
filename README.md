# ts框架

### 使用方法
```
npm install
npm run watch
```

### 命令说明
```
npm run watch 开发使用 自动监听文件变化进行生成
npm run devStart 生成开发版文件
npm run gaStart 生成生产版文件
npm run test 运行单元测试
```

### 文件介绍
```
├── config  配置文件
│    ├── karma 单元测试生成报告的文件
│    └── build 配置需要生成的文件
├── script  样式文件
│    ├── karam-test 单元测试粒子的ts文件
│    ├── singleton ts的开发和生成文件  在config -> build进行配置的
│    └── test js的开发和生成文件  在config build进行配置的
├── test    单元测试文件夹
│    └── karam-test karam-test文件的单元测试文件夹
│         └── hello.component.test   karam-test -> hello.component ts文件的单元测试
├── karma.conf.js   单元测试的配置文件
└── rollup.config.js   rollup的配置文件
```