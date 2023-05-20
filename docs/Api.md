# 接口说明

## 首页

### 轮播图 (banner)

说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据

可选参数 :

type:资源类型,对应以下类型,默认为 0 即 PC

```
0: pc

1: android

2: iphone

3: ipad
```
接口地址 : /banner

调用例子 : /banner, /banner?type=2

### 推荐歌单

说明 : 调用此接口 , 可获取推荐歌单

可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)

接口地址 : /personalized

调用例子 : /personalized?limit=1