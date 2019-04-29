$(function(){
    var start = $(".start");
    var rules = $(".rules");
    var mask = $(".mask");
    var reStart = $(".reStart");
    var wolfTimer = null;
    var timer = null;

    //点击显示游戏规则
    rules.click(function(){
        mask.stop().fadeIn(100);
        $(".closeMask").click(function(){
            mask.stop().fadeOut(100);
        });
    });

    //开始游戏按钮
    start.click(function(){

        var progress = $(".progress");
        var gameOver = $(".gameOver");

        //初始化游戏界面
        $(".score").text("0");
        progress.css({
            "width": "180px"
        });
        gameOver.stop().fadeOut(100);
        $(this).stop().fadeOut(100);
        //清空定时器
        clearInterval(timer);


        //设置定时器
        timer = setInterval(function(){
            progress.css({
                "width": progress.width()-1
            });
            //判断游戏是否结束
            if(progress.width() <= 0){
                gameOver.stop().fadeIn(100);

                //处理结束动画
                endWolfAnimation();
                clearInterval(timer);
            }
        },200);

        //生成动画
        startWolfAnimation();
    });

    //重新开始按钮
    reStart.click(function(){
        start.trigger("click");
    });

    //定义一个专门处理动画的方法
    function startWolfAnimation(){
        //1.定义一个存储灰太狼图片和小灰灰图片的数组
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        //2.定义一个变量显示图片的位置（出现在哪个坑）
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //随机生成图片对象
        var wolfType = Math.round(Math.random()) == 0? wolf_1 : wolf_2 ;
        //3.创建图片对象
        var $wolfImages = $("<img src='' class='wolfImages'>");
        //随机生成位置
        var posIndex = Math.floor(Math.random()*9);
        //4.设置图片的位置
        $wolfImages.css({
            "position":"absolute",
            "left":arrPos[posIndex].left,
            "top":arrPos[posIndex].top
        });
        //5.设置图片的src属性
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function(){
            if(wolfIndex > wolfIndexEnd){
                endWolfAnimation();
                startWolfAnimation();
            }
            $wolfImages.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        },200);
        //6.插入创建的图片对象
        $(".container").append($wolfImages);
        //7.处理游戏点击拍打逻辑
        gameRules($wolfImages);
    }

    //定义一个方法专门处理结束动画
    function endWolfAnimation(){
        $(".wolfImages").remove();
        clearInterval(wolfTimer);
    }

    //处理游戏拍打逻辑方法
    function gameRules($wolfImages){
        //监听图片点击事件
        $wolfImages.one("click", function(){
            //修改图片索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            //判断图片的类型
            var picType = $wolfImages.attr("src");
            var typeFlag = (picType.indexOf("h") >= 0);
            //根据点击图片类型增减分数
            if(typeFlag){
                //+10
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                //-10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }
});