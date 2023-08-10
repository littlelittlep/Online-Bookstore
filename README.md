# 《量化交易系统》
## 项目背景
a． 系统的名称：量化交易系统:本系统旨在为专业股票分析人员、量化策略分析人员、金融爱好者、高校提供中国股票市场行情、传统与AI量化策略的回测，自定义量化策略等服务，本系统融合了专业炒股app的市场行情展示与专业量化交易平台的策略编写与回测</br>
b． 该软件项目的任务提出者为老师；开发者为lml、zcc、xyz、syj；用户（或首批用户）为专业股票分析人员、量化策略分析人员、金融爱好者、高校
## 项目功能概览
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/a65b1da9-ccde-45e6-8497-231c6e471e43)</br>
## 总体用例图
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/2b3eba94-a4ba-42ce-892e-69d80c73b337)</br>
## 总体数据库设计
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/b351e83e-c75c-4403-a4b9-5e8a0e46d8c7)</br>
## 使用说明
### 用户登录
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/dda2f29f-c1d7-43bd-823b-98ce25666d1f)</br>
1. 该功能模块是用户登录/注册的用户登录模块</br>
2. 功能模块使用方法说明：用户输入注册过的用户名与密码，验证成功即可登录，若未注册，则可点击登录按钮左边的注册链接</br>
### 用户注册
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/01178e9b-5187-4d2f-99ca-26f1c85455cb)</br>
1. 该功能模块是用户登录/注册的用户注册模块
2. 功能模块使用方法说明：用户输入注册用户名，密码以及确认密码，如果用户名重复,服务器会告知前台，用户名重复
### 行情中心
#### 沪深市场概览
1. 该功能模块是行情中心的沪深市场总览模块
2. 功能模块使用方法说明：用户可以分别点击左边的三个按钮，来分别查看涨跌分布、龙虎榜、上证指数，深证指数，创业板指的历史行情折线图
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/1d2ba42c-65ae-48f0-8357-a154377cd8fa)</br>
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/3685b07e-e85d-4a75-8992-6f82a071e3b5)</br>
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/921fb77c-6b08-4381-84c2-f78e66829390)</br>
#### 大盘实时指数
功能模块使用方法说明：用户可在此界面查看大盘实时行情，服务器端每1s刷新一次数据，用户无需手动刷新
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/33afa581-53e6-4933-aea3-fb7ca3a8b1d6)</br>
#### 实时股票列表
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/75354f32-c4ec-4307-8331-cbb1057faf82)</br>
功能模块使用说明:用户可在股票列表实时查看每个股票的大致实时行情，也可以点击右边的加号按钮添加到收藏中，股票列表按涨幅顺序排序，服务器端每3s刷新一次数据。点击底部分页栏可以切换页码。点击股票代码可以跳转到个股行情界面，点击公司名可以跳转到公司详细资料
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/30fa0371-5ddc-4945-8232-ea2a9299b798)</br>
### 个股行情
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/982f2b65-a003-4a74-9dc0-137c95738cd2)</br>
功能模块使用方法说明：可以通过行情中心股票列表展示，点击股票代码跳转，也可以通过导航栏的搜索框输入股票代码进行搜索，K线图展示的是历史行情数据，其余均为实时数据，热门快讯是所有股票新闻中热度最高的四个。点击查看公司资料，可以查看到此股票的公司详细资料
### 查询公司详细资料
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/a5dd76f5-ee45-4a5e-a7c2-542d8a5b3bd8)</br>
功能模块使用方法说明:进入到个股行情页面，点击公司资料或者在首页股票列表中点击股票名称，可以查看到本支股票对应公司的公司简介，包括公司ID、证券代码、公司名称、注册地址、注册资金等，同时可以通过左侧的目录连接到其他相关财经网站查看更多信息
### 策略列表
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/4b5a6e68-2de2-49ea-ba33-c8b92484d820)</br>
功能模块使用方法说明：在导航栏中，点击策略列表栏目，进入策略选择界面。界面会展示策略列表，每一处卡片包含策略名称，策略描述，策略特点及权限。其中包括5种传统策略和3种深度学习策略
### 策略回测
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/5f791561-a3ba-4937-9570-b2722a08b4c6)</br>
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/3d2c8c45-f304-4f06-ac02-125c289e4247)</br>
功能模块使用说明:在策略列表点击回测按钮，会弹出回测设置表单（VIP才可使用AI策略回测），传统策略回测设置为图一，AI策略回测设置为图二，传统策略可以传入多支股票组合，AI策略只可传入一支股票
### 回测数据展示
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/b20921c3-ca85-4fae-9129-026a29d76a9b)</br>
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/29dbe13f-a9c1-44ba-952c-f9472ab9ef60)</br>
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/648f7936-c3b7-4de1-b2f2-e1abefcdb46a)</br>
功能模块使用方法说明：在点击回测后，后台会运行策略代码，通过我们团队编写的数据分析包，会统计回测数据，左边导航栏第一个可以查询收益概述，会有七项基本指标展示与折线图，左边第二个导航栏可以查询交易详情，左边第三个导航栏可以查询每日持仓收益
### 回测历史
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/d6673cda-c386-4e59-a42c-496f2b14cd56)</br>
功能模块使用方法说明:点击导航栏的“回测历史”，即可查看用户所有的回测记录，点击某一条记录查询功能即可跳转到上述三个详细信息的界面，点击删除按钮即可删除该回测历史
### 自定义策略
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/83d32a0f-be13-45af-a0e1-b72e6744b5ab)</br>
功能模块使用方法说明:用户在策略列表界面点击自定义策略即可跳转到自定义策略界面，给用户提供模板策略代码，及右侧的说明文档，详细说明了如何进行自定义策略。用户可以在模板策略的基础上进行更改，编辑用户自定义策略并保存，点击运行，进行回测，跳转到回测详情界面，可以对回测的各项数据进行查看。运行功能仅VIP用户可以使用
### 个人中心
![image](https://github.com/littlelittlep/Online-Bookstore/assets/73582617/4d4310b3-8bd6-4e8a-b576-52d0c254898e)</br>
功能模块使用方法说明:用户可在个人中心里查看我的收藏股票，顶部导航栏最右边的下拉框如图一所示，可以开通VIP和退出登录
## 总结
市面上的量化交易平台虽然可以提供回测与策略编写等服务，但是并不能查看行情数据，用户仍然需要到其他股票网站查看，我们团队开发的量化系统网站，不仅可以查看行情数据，也可以提供回测与编写策略等服务。并且我们充分考虑用户的需求，提供实时性强的行情信息以及完整的历史行情数据，增加自定义量化策略满足专业用户需求。用户可以在我们的网站查询股票行情，并以此来开展策略编写以及回测


