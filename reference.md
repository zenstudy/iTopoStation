在iTopoUserBriefcaseMineNotification删除Item时用ID删除，因为title重复现象明显

1.赞助共享地球
a.对话框的设计， 开发一个对赞助商轮回的动画，类似央视新闻上的那个滚动广告条，根据赞助的总额度排序来进行轮播。

2. 用户注册功能完善：
a. 给心愿联盟合作，因为任务协作空间与心愿联盟是一回事儿，了解心愿联盟
b. 给刚注册的用户发一个欢迎的信息
c. 用户注册与角色控制,根据身份开启自己的功能
d. 给每个对象增加一个2D logo的展示位置，希望放到外貌模型中去，与二维码一同展示。
e. 任务墙，产品墙

3.注册基地和食堂的功能
a.关注基地和其它用户的功能，并添加到我的订阅，且同时记录到对方我的粉丝当中。
b.基地的站外分享功能，先支持微信，后支持国外的facebook和twiter.（当下仅支持微信ID)，考虑在示意模型上绘制多种功能按钮。

4.首页
a. 首页增加弹幕
b. 首面用户放在一个平面上

5.性能改良
a.三维在定位对象功能的完善
b.THREEJS 深度清除内存，非简单dispose，踩坑记录
https://blog.csdn.net/qq_41488724/article/details/107367159

6.侧栏增加热点管理功能。

7.搜索功能

8. loader统一的问题
===========
mongoDB= http://127.0.0.1:27017/
MongoDB下载地址：http://dl.mongodb.org/dl/win32/x86_64
win32/mongodb-win32-x86_64-2012plus-4.2.10.zip

mongoDB 可视化工具 = 介绍一款好用 mongodb 可视化工具, 启动    npm start
https://blog.csdn.net/qq_32340877/article/details/79142129?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522160220299819724839233086%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=160220299819724839233086&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v28-1-79142129.pc_first_rank_v2_rank_v28&utm_term=mongodb%E7%9A%84%E5%8F%AF%E8%A7%86%E5%8C%96%E5%B7%A5%E5%85%B7%E6%9C%89%E5%93%AA%E4%BA%9B&spm=1018.2118.3001.4187

0.记住：核心思想是打造全网的入口，入口是一个功能汇集处，是人们使用频率最多的地方。这个入口是人们在互联网上的家，因为家可以存放东西，也可以用来做自我展示。

===========
1.增加一带一路相关信息的建设

2. 把消息功能改造成邮箱功能即（邮箱=消息），将来再把邮箱中的邮件改造成可转发的任务功能即（邮件=任务），这样做的好处在于可以相互转发任务。

3. 建立面向对象的数据库，同步时以整体进行同步，而非个体，把整个模型当做一个模型来考虑，在协作时，将局部以整体的方式进行同步。

4.共享地球系统开发资金问题的解决方法，开源钱包，开源帐户。

5.考虑是否为每个uuid增加一个uuid.iTopo.json 文件, 将每一个对象当成一个project来做。

6.模型空间（应用空间）
区块链应用安装到用户空间的功能，使用不同的区块链存储共享地球的数据存储，区块链项目开辟他们的空间给共享地球使用，以换取它们的影响力。

7.各类民间机构和公司的入驻问题
a.UFO联合会等民间机构入驻的功能。（通过点亮功能入驻）。
b.酒店入驻的功能，实现类似贝壳那样的在线看房功能。
c.地球地理信息录入功能，分公共数据和私有数据两部分。

8.开发一个节律控制器，类似跟随节气的功能，做到与时俱进。

9.何霞，中国天文博物院（文物考古），文化中国（梁主席），（北斗手机的负责人，成立中国天文研究院，他的儿子，动物保护联盟，他们已经有自己的网站）

===============
用户制作成照片墙
https://blog.csdn.net/hangGe0111/article/details/88870776?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-4.channel_param

全景图转换为天空盒图
https://blog.csdn.net/juebai123/article/details/79450896?utm_medium=distribute.pc_relevant_download.none-task-blog-blogcommendfrombaidu-27.nonecase&depth_1-utm_source=distribute.pc_relevant_download.none-task-blog-blogcommendfrombaidu-27.nonecas

Mongodb亿级数据量的性能测试
https://blog.csdn.net/zrjdds/article/details/52159936

关于正态分布与上限和下限之间的关系,社区分配方式
iTopoConfig\iTopoStorage\iTopoLoader的整合

可视化地球数据展示-7W8数据量城市数据-1千+国家数据JSON，包含经纬度，国家中文名称，英文名称
https://download.csdn.net/download/qq_29814417/11866679
===================
//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

//WARNING: Too many active WebGL contexts. Oldest context will be lost. 一个页面画了超过16个webgl，最先绘制的将会丢失掉
geometry.dispose();
material.dispose();
texture.dispose();
各个manager管理了载入对象的释放问题。

dragon/threejs教程
https://teakki.com/space/58a19327f0d40775548c6bd6

threeJS后处理-星空
https://blog.csdn.net/weixin_39452320/article/details/85107882
可视化-threejs文字滚动效果
https://blog.csdn.net/qq_29814417/article/details/103289008?utm_medium=distribute.pc_relevant.none-task-blog-OPENSEARCH-2.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-OPENSEARCH-2.channel_param

学习codepen的UI布局
webglstudy学习网，有很多案例
https://www.webglstudy.com/product/threejs-casesource

threejs实现的无限小镇的WEBGL示例程序
https://www.webglstudy.com/product/200070.html

3d map base on threejs
https://github.com/SmokingRabbit/map-3d

20 Impressive Examples for Learning WebGL with Three.js
https://tutorialzine.com/2013/09/20-impressive-examples-for-learning-webgl-with-three-js

planetmaker
http://planetmaker.wthr.us/#

https://milliondollarmetropolis.com/
借鉴它的展示模型的思维

https://www.reddit.com/r/threejs/
里面有很多threejs的案例

Mixing HTML Pages Inside Your WebGL
http://learningthreejs.com/blog/2013/04/30/closing-the-gap-between-html-and-webgl/

CSS3D and WebGl playing together - Initial Experiments via a Cylindrical Family Tree (threejs+d3)
https://www.nowherenearithaca.com/2015/08/css3d-and-webgl-playing-together.html

Summary of Interactive Visualizations
https://www.nowherenearithaca.com/2014/02/a-summary-of-some-of-my-visualizations.html

https://www.programmersought.com/search

考虑将任务变成行星。围绕目标中心进行旋转
https://www.programmersought.com/article/8350355823/

也是css3d的例子，css3d对象与对象对齐
https://threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html

表格 css可参考
https://www.php5000.com/index/source/index/id/899

研究一侧代码一侧文字的布局
https://threejsfundamentals.org/threejs/lessons/threejs-align-html-elements-to-3d.html

box添加title的功能
https://subscription.packtpub.com/book/web_development/9781783980864/6/ch06lvl1sec39/creating-an-interactive-3d-google-maps-cube

一个有深度的threejs博客
http://learningthreejs.com/

PPT展示考虑使用这个
http://slidedeck.io/leefsmp/forge-connected-data

三维展示法
https://www.bypeople.com/pure-css-3d-box/

https://stackoverflow.com/questions/44241837/three-js-curved-bend-css3dobject

//正方体嵌入div
https://stackoverflow.com/questions/63575607/mix-webgl-and-css3d-renderers-when-using-percentage

HT图形组件设计之道（三）
https://v.youku.com/v_show/id_XNzU2MzYzODA4.html

three.js平时常用的链接
https://blog.csdn.net/weixin_45544796/article/details/103593115

耀眼星星的例子
https://www.youtube.com/watch?v=x68rZ_UEQPE&t=462s

threejs的一个登陆案例
https://redstapler.co/cool-nebula-background-effect-three-js/

Displacement Map,可以呈现出真实地面的例子
https://sbcode.net/threejs/displacmentmap/

关于blender的一些信息
https://www.youtube.com/watch?v=ckcuQw2fDT4&list=PLOGomoq5sDLutXOHLlESKG2j9CCnCwVqg&index=20

threejs产品信息展示
https://blog.csdn.net/weixin_45544796/article/details/100742898
https://blog.csdn.net/weixin_45544796/article/details/100742424
https://blog.csdn.net/weixin_45544796/article/details/100741439

火箭且两侧有操作面板展示
http://127.0.0.1:8848/three.js/examples/webgl_loader_lwo.html

3D 展示html+3D 对话框
http://stemkoski.github.io/Three.js/CSS3D.html

前景插入文字展示法
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-tips-html-background.html

在文章中插入3d 对象
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-responsive-paragraph.html

相册
http://127.0.0.1:8848/three.js/examples/webgl_multiple_elements.html
博客内带threejs
http://127.0.0.1:8848/three.js/examples/webgl_multiple_elements_text.html

一些模型素材
https://www.artstation.com/artwork/6qVmO
https://sketchfab.com/store/3d-models/furniture-home?ref=header
https://sketchfab.com/store/3d-models/nature-plants?ref=header 里面有天空之城的素材

天空盒子的图片素材
http://www.humus.name/index.php?page=Textures&start=8

转动的球点
https://blog.csdn.net/weixin_45544796/article/details/108715688

星辰球
https://blog.csdn.net/weixin_45544796/article/details/107860626

快速加载的地球，地图全，可单选, 线条+PNG
resources/data/world/country-index-texture.png
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-indexed-textures-picking-and-highlighting.html
threejs-indexed-textures-picking-debounced
threejs-indexed-textures-random-colors

//地球模型
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-align-html-elements-to-3d-globe.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-align-html-elements-to-3d-globe-too-many-labels.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-align-html-to-3d.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-cameras-orthographic-canvas-top-left-origin.html

http://127.0.0.1:8848/threejsfundamentals/threejs/background-v01.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-cleanup-loaded-files.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-load-gltf.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-load-gltf-animated-cars.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-load-gltf-car-path.html

http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-load-obj-materials.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-lots-of-objects-animated.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-shadertoy-as-texture.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-voxel-geometry-culled-faces-ui.html

动态背景
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-shadertoy-basic.html

http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-transparency-intersecting-planes-fixed.html

webaudio_orientation

webgl_animation_keyframes
webgl_buffergeometry_custom_attributes_particles
https://sketchfab.com/yellow09
webgl_loader_collada

初音未来的小女孩儿
http://127.0.0.1:8848/three.js/examples/webgl_loader_mmd.html
http://127.0.0.1:8848/three.js/examples/webgl_loader_mmd_audio.html
男孩儿模型
http://127.0.0.1:8848/three.js/examples/webgl_loader_obj.html
http://127.0.0.1:8848/three.js/examples/webgl_loader_obj_mtl.html
女孩儿模型
http://127.0.0.1:8848/three.js/examples/webgl_loader_obj2.html
天使模型
http://127.0.0.1:8848/three.js/examples/webgl_loader_ply.html
免女郎模型
http://127.0.0.1:8848/three.js/examples/webgl_loader_vrm.html
http://127.0.0.1:8848/three.js/examples/webgl_loader_vrml.html
http://127.0.0.1:8848/three.js/examples/webgl_materials_car.html
闪烁的茶杯
http://127.0.0.1:8848/three.js/examples/webgl_materials_compile.html

雪花动画
http://127.0.0.1:8848/three.js/examples/webgl_points_sprites.html

树模型
http://127.0.0.1:8848/three.js/examples/webgl_postprocessing_outline.html
点亮选择的对象
http://127.0.0.1:8848/three.js/examples/webgl_postprocessing_unreal_bloom_selective.html
选择
http://127.0.0.1:8848/three.js/examples/webgl_raycast_texture.html

http://127.0.0.1:8848/threejsfundamentals/threejs/background-v01.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-background-cubemap.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-background-equirectangularmap.html
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-cleanup-loaded-files.html

可以用来精细化商品
mpvue-xbyjShop

星星的随机移动
http://127.0.0.1:8848/three.js/examples/webgl_gpgpu_protoplanet.html

可拖动的侧栏
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-responsive-editor.html

有一个进度条
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-game-check-animations.html

艺术字
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-primitives-text.html

3d实体对象
http://127.0.0.1:8848/three.js/examples/webgl_loader_3ds.html
推土机
http://127.0.0.1:8848/three.js/examples/webgl_loader_3mf_materials.html

3d人物
http://127.0.0.1:8848/three.js/examples/webgl_loader_collada.html

3d头盔+背景
http://127.0.0.1:8848/three.js/examples/webgl_tonemapping.html

list 单选后变化
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-tips-tabindex.html

Shader风格系列
webgl_shader
webgl_shaders_ocean
webgl_shaders_ocean2
webgl_shaders_ocean2
http://127.0.0.1:8848/three.js/examples/webgl_shaders_tonemapping.html
http://127.0.0.1:8848/three.js/examples/webgl_shaders_vector.html
http://127.0.0.1:8848/three.js/examples/webgl_shading_physical.html
webgl_test_memory2
http://127.0.0.1:8848/three.js/examples/webgl_trails.html
http://127.0.0.1:8848/three.js/examples/webgl2_multisampled_renderbuffers.html

threejsfundamentals




loading UI
http://127.0.0.1:8848/threejsfundamentals/threejs/threejs-game-player-input.html

时光涟漪
https://blog.csdn.net/weixin_45544796/article/details/107483941

native HTML expand（本机HTML拓展）抽屉菜单
https://blog.csdn.net/weixin_45544796/article/details/104634055

switch button
https://blog.csdn.net/weixin_45544796/article/details/104633764

等距图标导航栏(isometric icon Nav Bar) 立体导航
https://blog.csdn.net/weixin_45544796/article/details/104633511

左下角有一个logo
http://127.0.0.1:8848/three.js/examples/index.html#webgl_loader_ldraw

底下一排按钮
http://127.0.0.1:8848/three.js/examples/index.html#webgl_loader_pdb

阵列展示1
http://127.0.0.1:8848/three.js/examples/index.html#webgl_loader_texture_dds
阵列展示2
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_blending
阵列展示3
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_blending_custom
阵列展示之将对象全部放置在一个面上
http://127.0.0.1:8848/three.js/examples/index.html#misc_exporter_gltf
车辆展示，可以切换颜色
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_car
有很多自由移动的球，可以考虑星星的移动的素材
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_cubemap_balls_refraction
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_shaders_fresnel

中间有个球，可以充当实景影射时的球
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_envmaps


有一个小房子，可以充当食堂
http://127.0.0.1:8848/three.js/examples/index.html#webgl_loader_vrml

通过一个下拉列表展示多种姿态的样式
http://127.0.0.1:8848/three.js/examples/index.html#webgl_loader_x

非常透亮的材质
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_physical_transmission

油画，且左右两侧有浮动的信息展示项
http://127.0.0.1:8848/three.js/examples/index.html#webgl_materials_texture_filters

考虑充当展示box
http://127.0.0.1:8848/three.js/examples/index.html#webgl_mirror

双曲环面展示法
http://127.0.0.1:8848/three.js/examples/index.html#webgl_multiple_canvases_circle

虚拟人物，缘生缘灭
http://127.0.0.1:8848/three.js/examples/index.html#webgl_points_dynamic

神秘古老的机械操作装置
http://127.0.0.1:8848/three.js/examples/index.html#webgl_postprocessing_unreal_bloom

使用GPU渲染的鸟群
http://127.0.0.1:8848/three.js/examples/index.html#webgl_gpgpu_birds_gltf

闪电特效
http://127.0.0.1:8848/three.js/examples/index.html#webgl_lightningstrike

被拉伸的二维码
http://127.0.0.1:8848/three.js/examples/index.html#svg_sandbox

热汽球模型
https://sketchfab.com/treecat/collections/airships