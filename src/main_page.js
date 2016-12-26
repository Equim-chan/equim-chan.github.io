// 换了jQuery
$(function() {
    // 初始化，只会执行一次
    $.LessFlag = false;
    $("#blurStack").css("opacity", "1");     //在moz下无效，原因不明
    $("body").animate({backgroundSize: "104%"}, 1200);

    // 按钮与iframe的鼠标悬停响应
    $("button,input,iframe").on({
        mouseover: function() {
            if (!$.LessFlag) {
                $("#blurStack").stop();
                $("#monokuroStack").stop();
                $("body").stop();
                $("#blurStack").animate({opacity: 0}, "slow");
                $("body").animate({backgroundSize: "103%"}, 1200);
                $("#monokuroStack").animate({opacity: 0}, 2000);
            }
        },
        mouseleave: function() {
            if (!$.LessFlag) {
                $("#blurStack").stop();
                $("#monokuroStack").stop();
                $("body").stop();
                $("#blurStack").animate({opacity: 1}, "slow");
                $("body").animate({backgroundSize: "104%"}, 1200);
                $("#monokuroStack").animate({opacity: 0}, 2000);
            }
        }
    });

    // 单独设置iframe的鼠标悬停，考虑到跨域iframe的mousemove尚未解决
    $("iframe").mouseover(function() {
        $("#monokuroStack").stop();     //这句看似多余，不过如果少了的话，动画就不是异步的了
        $("#monokuroStack").animate({opacity: 1}, 2000);
    });

    // 响应鼠标移动，以改变透视视图
    var persp = function(e) {
        // $("body").css("backgroundPosition", 
        //     ($(window).width() / 2 - e.pageX) * 0.03 + "px " + 
        //     ($(window).height() / 2 - e.pageY) * 0.03 + "px");
        $("body").css("backgroundPosition", 
            - e.pageX * 0.03 + "px " + 
            - e.pageY * 0.03 + "px");
    };
    $(window).mousemove(persp);

    // 跨域iframe事件，未解决！！！！
     // document.getElementById('cloud').addEventListener("mousemove", function(e) {
     //     alert(e.pageX);
     // }, false);
    // 这个方法确实能响应跨域iframe的"mousemove"，但是拿不到eventArgs也是白搭
    // var monitor = setInterval(function(){
    //     var elem = document.activeElement;
    //     if(elem && elem.tagName == 'IFRAME') {
            
    //     }
    // }, 100);

    // More按钮的单击响应
    $("#moreBtn").click(function() {
        //var breaks = document.getElementById("breaks");
        var breaks = $("#breaks");
        if (!$.LessFlag) {
            for (var i = 1; i <= 50; i++) {
                //breaks.innerHTML = "<br/>" + breaks.innerHTML;
                breaks.append("<br/>");
            };
            //document.getElementById("moreBtn").innerHTML = "Less";
            $(this).text("Less");

            // 这个方法有点粗暴，但确实有效
            breaks.append("<p>Ok, there is no more.</p>" +
                "<p title='And literally this page is always \"under construction\" xD.'>" +
                    "Actually I made this scroll bar so that you can see the full background image :p" +
                "</p>" + 
                "<p>Just feel her breath~</p>");
            $("#blurStack,#mask").height($("body").height());
            //location.hash = "#breaks";
            $("html,body").animate({scrollTop: $("#breaks").offset().top}, 600);    //平滑跳转锚点

            // 呼吸式循环动画，颇有函数式编程的感觉
            $("body").stop();
            $("#blurStack").stop();
            $("#monokuroStack").stop();
            (function LoopMotion() {
                $("body").animate({backgroundSize: "103%"}, 1500);
                $("#blurStack").animate({opacity: 0}, 1500, function() {
                    $("body").animate({backgroundSize: "104%"}, 1500);
                    $("#blurStack").animate({opacity: 1}, 1500, LoopMotion);
                });
            })();

            $.LessFlag = true;
        } else {
            $.LessFlag = false;
            $("#moreBtn,#hmmBtn").animate({opacity:0}, 250);
            $("html,body").animate({scrollTop: "0px"}, 1000, function() {
                breaks.text("");
                $("#moreBtn").text("More");
                $("#blurStack,#mask").height("100%");
                $("#moreBtn,#hmmBtn").animate({opacity:1}, 500);
            });
        }
    });

    // Hmm按钮的单击响应，已改为用Bootstrap Modal
    //$("#hmmBtn").click(function()  {            // QAQ，真的要习惯大括号不换行吗……
    //    if (confirm("I said it is under construction! >.<\nHowever you may enjoy these awesome songs first.\n\nWould you like to view it on GitHub?")) {
            //window.navigate("https://github.com/Equim-chan/equim-chan.github.io");        // 本地测试无效
            //window.location.href="https://github.com/Equim-chan/equim-chan.github.io";    // 在当前页面跳转
    //        window.open("https://github.com/Equim-chan/equim-chan.github.io");              // 在新页面跳转
    //    }
    //});
});