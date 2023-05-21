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

## 最新 MV

### 全部 mv

说明 : 调用此接口 , 可获取全部 mv

可选参数 :
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部

order: 排序,可选值为上升最快,最热,最新,不填则为上升最快

limit: 取出数量 , 默认为 30

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认 为 0

接口地址 : /mv/all

调用例子 : /mv/all?area=港台

## 推荐歌单

### 获取精品歌单

说明 : 调用此接口 , 可获取精品歌单

可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)

limit: 取出歌单数量 , 默认为 50

before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据

接口地址 : /top/playlist/highquality

调用例子 : /top/playlist/highquality?before=1503639064232&limit=3

### 歌单 ( 网友精选碟 )

说明 : 调用此接口 , 可获取网友精选碟歌单

可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

limit: 取出歌单数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*50, 其中 50 为 limit 的值

接口地址 : /top/playlist

调用例子 : /top/playlist?limit=10&order=new

## 推荐音乐

### 新歌速递

说明 : 调用此接口 , 可获取新歌速递

必选参数 :

type: 地区类型 id,对应以下:

全部:0

华语:7

欧美:96

日本:8

韩国:16
接口地址 : /top/song

调用例子 : /top/song?type=96