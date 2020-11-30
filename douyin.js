auto.waitFor();

let robot_minute = 180;//max..
let timesInterval = 20000;

app.launchApp('抖音极速版');
sleep(1000);

console.show(); //开启日志（悬浮窗权限）

CheckPopView();
CloseFriendTip();

let Loocation_count = 0
let recommend_count = 10;

if(Loocation_count > 0)
{
    TabLocation();
}

for (var i = 0; i < recommend_count; i++) {
    if(i >= Loocation_count && Loocation_count > 0)
    {
        TabRecommend();
    }

    toastLog("抖音极速版滑动" + i + '次' + "总计:" + recommend_count + "次")

    // if(SimulateInterest())
    // {
    //     HighInterest();
    // }
    // else if(SimulateDislike())
    // {
    //     LowInterest();
    // }
    // else
    // {
    //     var interest = random(0,10);
    //     if(interest > 8)
    //     {
    //         HighInterest();
    //     }
    //     else if(interest > 3)
    //     {
    //         MiddleInterest();
    //     }
    //     else
    //     {
    //         LowInterest();
    //     }
    // }

    HighInterest();

    // RandomFollow();

    sleep(1000);
}

CheckReward();

console.hide();
home();//关闭当前程序


/**如果弹出窗口，关闭 */
//青少年
function CheckPopView()
{
    var popView = text("我知道了").exists()
    if (popView)
    {
        popView.click();
    };
}
/**
 * 关闭好友红包提示
 */
function CloseFriendTip() {
    if (id("bap").exists()) {
        id("bap").findOnce().click();
    }
}

/**
 * 切换到同城
 */
function TabLocation() {
    if (className("android.widget.TextView").text("同城").exists()) {
        let bounds = className("android.widget.TextView").text("同城").findOnce().bounds();
        click(bounds.centerX() + random(-20, 20), bounds.centerY() + random(-10, 10));
        sleep(random(2000, 3000));
        SelectVideo();
    }
}

/**
 * 切换到推荐
 */
function TabRecommend() {
    back();
    sleep( random(500,1500) );
    if (className("android.widget.TextView").text("首页").exists()) {
        let bounds = className("android.widget.TextView").text("首页").findOnce().bounds();
        click(bounds.centerX() + random(-20, 20), bounds.centerY() + random(-10, 10));
        // toastLog("回到首页推荐页面.......");
    }
}

/**
 *选择一个同城视频
 */
function SelectVideo() {
    var x = device.width / 2 + random(-device.width*0.2, device.width*0.2);
    var y = device.height / 2 + random(-device.height*0.2, device.height*0.2);
    toastLog("点击屏幕" + x + ":" + y);
    let clickResult = click(x, y);
    toastLog(clickResult);
}

function LowInterest() 
{
    sleep(random(1000, 3000));
    NextVideo();
}

function MiddleInterest() 
{
    sleep(random(3000, 8000));
    NextVideo();
}

function HighInterest() 
{
    sleep(random(8000, 15000));

    // RandomHeart();
    RandomFollow();
    RandomComment();

    NextVideo();
}


/**
 * 随机点赞
 * 
*/
function RandomHeart()
{
    var bingo = random(1, 1);
    if (bingo == 1) {

        var target = descContains("未选中").className("ImageView").depth(8).findOne(100)
        if (target)
        {
            sleep(random(1000, 1500));

            target.parent().click();
            console.log("RandomHeart");

            sleep(random(500, 1000));
        }
        else
        {
            console.log("Not find heart");
            return;
        }
    }
}
/**
 * 随机关注
 */
function RandomFollow()
{
    var bingo = random(1, 1);
    if (bingo == 1)
    {

        var target = descContains("关注").className("Button").depth(6).findOne(100)
        if (target)
        {
            console.log(target);
            sleep(random(1000, 1500));

            var b = target.click();
            console.log("RandomFollow",b);

            sleep(random(1500, 3000));
        }
        else
        {
            console.log("Not find Follow");
            return;
        }
    }
    // sleep(30000);
}
/**
 * 评论
 */
//setScreenMetrics(1080,1920);
function RandomComment()
{
    var bingo = random(1, 10);
    // console.log("RandomComment");
    if (bingo == 1) {

        var target = descContains("评论").className("LinearLayout").depth(6).findOne(100)
        if (target == null) {
            // console.log("Not find Follow");
            return;
        }
        else
        {
            // console.log("RandomComment");
            target.click();
            sleep(random(100, 300));


            var comment = className("EditText").depth(2).findOne(100)//textContains("评论")..depth(2)
            if (comment)
            {
                // console.log("Edit~~~~");
                comment.click();
                sleep(random(2000, 2500));

                var input = className("EditText").depth(3).findOne(100)//textContains("评论").

                if(input)
                {
                    var content = "666";
                    input.setText(content);
                    sleep(random(100, 300));
                    
                    var rect = input.bounds();
                    click(device.width*0.91, rect.centerY());
                    sleep(random(100, 300));

                    // console.log("RandomComment Finish");
                }
            }
            else
            {
                // console.log("not find");
            }

            sleep(10000);
        }
    }
}

function GetInfo() 
{
    // className("TextView").find().forEach(function(tv){
    //     if(tv.text() != ""){
    //         log(tv.text());
    //     }
    // });
    for(var i = 0; i < 10; i++)
    {
        var textComponent = className("TextView").clickable(true).editable(false).depth(7).findOnce(i);
        if(textComponent)
        {
            if(textComponent.bounds().centerY() >= device.height / 2)
            {
                // console.log(textComponent.text());
                return textComponent.text();
            }
        }
        else
        {
            break;
        }

    }

    // var textArray = className("TextView").clickable(true).editable(false).depth(7).findOnce(1)
    // // var textArray = className("TextView").clickable(true).editable(false).depth(7).find();
    // if(textArray.empty())
    // {
    //     console.log("找到啦");
    //     for(var i = 0; i < textArray.length; i++){
    //         var textComponent = textArray[i];
    //         if(textComponent.bounds().centerY() >= device.width / 2)
    //         {
    //             console.log(textComponent.text());
    //             return textComponent.text();
    //         }
    //     }
    // }
    // else
    // {
    //     console.log("没找到╭(╯^╰)╮");
    // }
    
    // // var info = className("TextView").clickable(true).editable(false).depth(7).findOne(300)
    // var info = className("TextView").clickable(true).editable(false).depth(7).findOne(300)
    // if (info)
    // {
    //     console.log("Get Info");
    //     console.log(info.text(),info.id());
    //     return info.text();
    // }
    // else
    // {
    //     console.log("Not Get Info");
    //     return "";
    // }
}

function SearchKeyWord(keywords) 
{
    var content = GetInfo();
    if(content)
    {
        var words = keywords;
        for(var i = 0; i < words.length; i++)
        {
            var flag = content.search(words[0]);
            if(flag >= 0)
            {
                // console.log("true");
                return true;
            }
        }
        return false;
    }
    else
    {
        return false;
    }
    return false;
}

function SimulateInterest() 
{
    var words = ["电视", "电影", "动漫", "动画", "剧", "影视"];
    return SearchKeyWord(words);
}

function SimulateDislike() 
{
    var words = ["偶像", "哥哥", "idol", "肖战", "王一博"];
    return SearchKeyWord(words);
}


function NextVideo() 
{
    // NextVideoSimple();
    NextVideoAI();
}

function NextVideoSimple() 
{
    swipe(device.width / 2, device.height - 400, device.width / 2, 300, 300);
    sleep(timesInterval);
}

function NextVideoAI() 
{
    var startX = device.width * 0.5 + random(-device.width*0.1, device.width*0.1);
    var startY = device.height * 0.9 + random(-device.height*0.05, device.height*0.05);
    var endX = device.width * 0.78 + random(-device.width*0.1, device.width*0.1);
    var endY = device.height * 0.4 + random(-device.height*0.05, device.height*0.05);

    // var startX = 545;
    // var startY = 1770;
    // var endX = 840;
    // var endY = 790;
    // console.log(startX,endX,startY,endY);
    var convertY = 1980;

    var startPointX = startX;
    var startPointY = convertY - startY;

    var endPointX = endX;
    var endPointY = convertY - endY;

    console.log(startPointX,endPointX,startPointY,endPointY);
    console.log(endPointX-startPointX,endPointY-startPointY);

    var angle = Math.PI / 6;

    var xuan = Math.sqrt( Math.pow((endPointX - startPointX), 2) + Math.pow((endPointY - startPointY), 2) );
    var r = xuan / 2 / Math.sin(angle);

    var slant = Math.atan( (endPointY - startPointY) / (endPointX - startPointX) );
    var centerAngle = slant + angle - Math.PI / 2;
    // console.log(centerAngle);
    // console.log(angle,xuan,r,slant);

    var circleCentreX = startPointX + r * Math.cos(centerAngle);
    var circleCentreY = startPointY + r * Math.sin(centerAngle);

    // console.log(circleCentreX,circleCentreY);
    // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

    var pointList = [];
    var sampleCount = 10;
    for(var i = 0; i <= sampleCount; i++)
    {
        var sampleAngle = centerAngle + 2 * angle / sampleCount * i;
        var sampleXuan = Math.sin(sampleAngle/2) * r * 2;
        var sampleSlant = centerAngle + Math.PI/2 - sampleAngle/2;

        var x = startPointX + sampleXuan * Math.cos(sampleSlant);
        var y = startPointY + sampleXuan * Math.sin(sampleSlant);

        var py = convertY - y;

        var p = [];
        p.x = Math.round(x);
        p.y = Math.round(py);
        pointList[i] = p;

        // console.log(x,y);
        // console.log(p);
    }

    // for(var i = 1; i <= sampleCount; i++)
    // {
    //     var start = pointList[i-1];
    //     var end = pointList[i];
    //     console.log(start.x,end.x,start.y,end.y);

    //     // swipe(start.x, start.y, end.x, end.y, 100/sampleCount);
    //     // gesture(100,[start.x, start.y], [end.x, end.y]);

    //     // sleep(1000);
    // }

    var parms = [];
    for(var i = 0; i <= sampleCount; i++)
    {
        var parm = [];
        parm[0] = pointList[i].x;
        parm[1] = pointList[i].y;
        parms[i] = parm;
    }

    // console.log(parms);
    gesture(1000,parms);

    // gesture(1000, [544, 1335], [554, 1222], [583, 1113], [631, 1010], [696, 917], [777, 837], [869, 772]);

    // gestures([0, 100, [544, 1335], [554, 1222]],
    //     [0, 100, [554, 1222], [583, 1113]],
    //     [0, 100, [583, 1113], [631, 1010]],
    //     [0, 100, [631, 1010], [696, 917]],
    //     [0, 100, [696, 917], [777, 837]],
    //     [0, 100, [777, 837], [869, 772]]);

    // swipe(startX, startY, endX, endY, 500);

    // sleep(5000);

}


function CheckReward() 
{    
    //clickxx
    //sleep
    var target = className("RelativeLayout").indexInParent(5).depth(3).findOne(100)
    if (target)
    {

        sleep(random(1000, 1500));

        var success = target.click();
        // console.log("Reward",success);

        if(success)
        {
            sleep(random(1000, 1500));
        }
        else
        {
            return;
        }
    }

    // CheckSign()

    var gold = 0;
    var cash = 0;

    for(var i = 0; i < 10; i++)
    {
        var textComponent = className("android.view.View").clickable(false).editable(false).depth(7).findOnce(i);
        if(textComponent)
        {
            var number = textComponent.text();
            if(typeof(number)=='string' && number.length > 0)
            {
                var patten = /[^\d+(,\d\d\d)*.\d+$]/g;
                if(patten.test(number) == false)
                {
                    if(textComponent.bounds().centerX() <= device.width / 2)
                    {
                        gold = Number(number.split(",").join(""));
                    }
                    else
                    {
                        cash = Number(number);
                    }
                }
            }
        }
        else
        {
            break;
        }

    }

    console.log(gold,cash);
    toastLog("今日收入" + gold + '金币' + "，" + cash + "现金")

    back();
    sleep(random(500, 1000));

    return gold,cash;
}

function CheckSign() 
{
    var target = textContains("签到").className("android.view.View").depth(9).findOne(100)
    if (target)
    {
        console.log(target);
        sleep(random(1000, 1500));

        var b = target.click();
        console.log("CheckSign",b);

        sleep(random(1500, 3000));
    }
    else
    {
        console.log("Not find Sign");
        return;
    }
}
