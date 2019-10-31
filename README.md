# utils

## 功能函数

### mutilSort

- 对数组按`{key,sort}`进行多级排序
- （待做）需要按需求将空值放到最下面

### receive

- 用于处理 redux 接收到的数据，主要是 fetch 成功后的处理
- 每次传入`nextProps[key]`都会创建一个新对象，有性能问题
