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

### 推荐新音乐
说明 : 调用此接口 , 可获取推荐新音乐

可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)

接口地址 : /personalized/newsong

调用例子 : /personalized/newsong

### 获取音乐 url
说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)

必选参数 : id : 音乐 id

可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推

接口地址 : /song/url

调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312

### 推荐 mv
说明 : 调用此接口 , 可获取推荐 mv

接口地址 : /personalized/mv

调用例子 : /personalized/mv