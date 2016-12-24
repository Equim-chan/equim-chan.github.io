// 换了jQuery
$(function() {
    // 初始化，只会执行一次
    $.LessFlag = false;
    $("#blurStack").css("opacity", "1");     //在moz下无效，原因不明

    // 按钮与iframe的鼠标悬停响应
    $("button,iframe").mouseover(function() {
        if (!$.LessFlag) {
            $("#blurStack").stop();
            $("#blurStack").animate({opacity:0}, "slow");
        }
    });
    $("button,iframe").mouseleave(function() {
        if (!$.LessFlag) {
            $("#blurStack").stop();
            $("#blurStack").animate({opacity:1}, "slow");
        }
    });

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
            $("#blurStack").height($("body").height());
            //location.hash = "#breaks";
            $("html,body").animate({scrollTop: $("#breaks").offset().top}, 600);    //平滑跳转锚点

            // 呼吸式循环动画，颇有函数式编程的感觉
            $("#blurStack").stop();
            (function loopMotion() {
                $("#blurStack").animate({opacity:0}, 1500, function(){
                    $("#blurStack").animate({opacity:1}, 1500, loopMotion);
                });
            })();

            $.LessFlag = true;
        } else {
            $.LessFlag = false;
            $("#moreBtn,#hmmBtn").animate({opacity:0}, 250);
            $("html,body").animate({scrollTop: "0px"}, 1000, function() {
                breaks.text("");
                $("#moreBtn").text("More");
                $("#blurStack").height("100%");
                $("#moreBtn,#hmmBtn").animate({opacity:1}, 500);
            });
        }
    });

    // Hmm按钮的单击响应
    //$("#hmmBtn").click(function()  {            // QAQ，真的要习惯大括号不换行吗……
    //    if (confirm("I said it is under construction! >.<\nHowever you may enjoy these awesome songs first.\n\nWould you like to view it on GitHub?")) {
            //window.navigate("https://github.com/Equim-chan/equim-chan.github.io");        // 本地测试无效
            //window.location.href="https://github.com/Equim-chan/equim-chan.github.io";    // 在当前页面跳转
    //        window.open("https://github.com/Equim-chan/equim-chan.github.io");              // 在新页面跳转
    //    }
    //});
});