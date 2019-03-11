# 2019.2.1
- 完成
    1. 用express建立项目目录
    2. 引进bootstrap和jquery
- 明天任务
    - 编写前端
        1. 查找合适的组件 学习 使用它 完成音乐app前端的编写
    - 查看后端
        1. 学习ajax和fetch一类的post get的方法

# 2019.2.6
- 目标
    1. 学习 查找合适的组件
    2. 学习fetch 为了get到服务器上的数据，将数据显示在电脑上
    3. 如果时间够的话，编写前端，并且美化一下。"# CloudMusic" 

# 2019.3.7
- 前言： 把项目放到github后才看到这个文档，原来这个项目开始已一个月多了。生命诚可贵，好好打代码。
 - 现状：
    1. 歌曲条目显示的顺序混乱，并无从数组中读取出时的顺序。
    2. 下方控制歌曲按钮相关信息显示中，歌曲播放时间的功能还未添加。
    3. 页面右方的歌词显示还没有一点点构思。

- 目标：
    1. play的功能设计，代码编写。
    2. js书籍一看。
    3. play的界面优化思考，代码编写。

- 完成状况：
    1. 先遍历Id，存储相关数据到store中，后遍历相关数据挂载到dom中。解决了歌曲条目顺序混乱的问题；
    2. 在dotmove函数中附加完成 歌曲播放时间的显示。

# 2019.3.8
- 目标
    1. 完成各个路由之间socketio的逻辑，传递歌曲id或歌单id或专辑id。 play页面完成消息接受的逻辑。并打印到log中。
    2. 为传递过来的消息做出处理。 直接得出或访问网络得出歌曲id。
    3. 添加id到play的store中。 这些id的歌曲信息也要添加到页面中。
    以上总结： 传递歌曲消息，展示并播放歌曲。

- 遇到的问题：？？？？
    1. 变量在全局中申明， 在html的标签中onClick中调用一个函数，这个函数的参数是它， 可是结果在运行的时候是undefined。
    2. 滚动条失效了？ 有什么比较好的设计样式？


# 2019.3.11
round 1

- aim:
    1. pass the right id to play
    2. style the index
    3. getting the right id from visiting the website.
- result:
    all done;

round 2

- aim:
    1. 给play页面歌曲信息展示添加滚动条
    2. 让歌曲进度条边长一点
- result
    all done;


结语：

I feel that this project is not based on the template, many places are thinking myself, the reconstruction of the code has a lot of problems, the details are not particularly good, the efficiency of learning is not particularly high, so I decided to stop first. this project.