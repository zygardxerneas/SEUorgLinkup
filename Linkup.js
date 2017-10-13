alert("欢迎来玩连连看~~~~");
alert("请先自定义难度 （要求：(行数*列数)%2==0）！！");
var row=prompt("请输入行数","")-'0';
var col=prompt("请输入列数","")-'0';
var totimage = 6;
var totrow=row+2;
var totcol=col+2;
var ii,jj;
var jieguo;

var today=new Date()
var h=today.getHours()
var m=today.getMinutes()
var s=today.getSeconds()

var start=h*60*60+m*60+s;
var end;
var zg=row*col;

var mapp = new Array(totcol);
for(var j = 0; j < totcol; j++)  mapp[j] = new Array(totrow);

var flag = new Array(totcol);
for(var j = 0; j < totcol; j++)  flag[j] = new Array(totrow);

var image = row * col / 2;
var imagenames=['','朱鑫','丁泓','欧俊宏','王斯琨','王明星','马武泽'];

var imagesz=new Array(image);
var bianhao=1,nn=0;
for(var i=0;i<image;i++)
{
    if(bianhao>totimage) bianhao=1;
    imagesz[nn]=bianhao;
    imagesz[nn+1]=bianhao;
    nn=nn+2;
    bianhao++;
}

imagesz=randomOrder(imagesz);

var html="<table>\n";

var n=0;
var c,r;
for(c=0;c<totcol;c++)
{
    html += "<tr>\n";
    for(r=0;r<totrow;r++)
    {
        html += "<td>\n";
        if(c==0||r==0||r==(totrow-1)||c==(totcol-1)) mapp[c][r]=0;
        else
        {
            mapp[c][r]=imagesz[n];
            n++;
            html += "<img src=\"images/"+ mapp[c][r] +".jpg\" onclick=\"jiancha(this, " + c + ", " + r + ")\">\n";
        }
        html += "</td>\n";

    }
}

//alert(html);

document.getElementById("main").innerHTML = html;


var temp1 = null;
var twopic = new Array({x:0,y:0}, {x:0,y:0});

function jiancha(temp2,x,y)
{
    if(mapp[x][y]!=0)
    {
        if(temp1==null)
        {
            temp1=temp2;
            temp1.parentNode.style.background ="#FFFFFF";
            twopic[0].x = x;
            twopic[0].y = y;
        }
        else if(temp2!=temp1)
        {
            temp1.parentNode.style.background = "transparent";
            twopic[1].x = x;
            twopic[1].y = y;
            if(mapp[twopic[0].x][twopic[0].y]==mapp[twopic[1].x][twopic[1].y])
            {
                for(ii=0;ii<totcol;ii++)
                {
                    for(jj=0;jj<totrow;jj++)
                    {
                        flag[ii][jj]=0;
                    }
                }
                flag[twopic[0].x][twopic[0].y]=1;
                jieguo=0;
                panduan(twopic[0].x,twopic[0].y,0,-1);

                if(jieguo==1)
                {
                    alert(imagenames[mapp[twopic[0].x][twopic[0].y]]);
                    mapp[twopic[0].x][twopic[0].y] = 0;
                    mapp[twopic[1].x][twopic[1].y] = 0;
                    temp1.parentNode.removeChild(temp1);
                    temp2.parentNode.removeChild(temp2);
                    zg=zg-2;
                    if(zg==0)
                    {
                        var today=new Date();
                        var h=today.getHours();
                        var m=today.getMinutes();
                        var s=today.getSeconds();
                        end=h*60*60+m*60+s;
                        alert("恭喜你，通关成功，用时："+(end-start)+"秒！！请按F5重新开始游戏！！");
                    }
                }
            }
            temp1 = null;
        }
    }
}

var direct =new Array(5);
for(j=0;j<5;j++) direct[j]= new Array(3);
direct[0][0]=1;direct[0][1]=0;
direct[2][0]=-1;direct[2][1]=0;
direct[1][0]=0;direct[1][1]=1;
direct[3][0]=0;direct[3][1]=-1;

//接下来用到的是DFS(深度优先搜索)对两个点进行判断能不能消除
function panduan(nowx,nowy,tj,father)
{
    var i;
    if(tj>2) return;
    if(nowx==twopic[1].x&&nowy==twopic[1].y&&tj<=2)
    {
        jieguo=1;
        return;
    }
    for(i=0;i<4;i++)
    {
        var xxx=nowx+direct[i][0];
        var yyy=nowy+direct[i][1];
        if(xxx>=0&&xxx<totcol&&yyy>=0&&yyy<totrow)
        {
            if((flag[xxx][yyy]==0&&mapp[xxx][yyy]==0)||(xxx==twopic[1].x&&yyy==twopic[1].y))
            {
                if(i%2==father%2||father==-1)
                {
                    flag[xxx][yyy]=1;
                    panduan(xxx,yyy,tj,i);
                    flag[xxx][yyy]=0;
                }
                else
                {
                    flag[xxx][yyy]=1;
                    panduan(xxx,yyy,tj+1,i);
                    flag[xxx][yyy]=0;
                }
            }
        }
    }
}

function randomOrder(targetArray)
{
    var arrayLength = targetArray.length

    var tempArray1 = new Array();
    for (var i = 0; i < arrayLength; i ++)
    {
        tempArray1[i] = i;
    }
    var tempArray2 = new Array();

    for (var i = 0; i < arrayLength; i ++)
    {

        tempArray2[i] = tempArray1.splice(Math.floor(Math.random() * tempArray1.length) , 1)
    }
    var tempArray3 = new Array();
    for (var i = 0; i < arrayLength; i ++)
    {
        tempArray3[i] = targetArray[tempArray2[i]];
    }
    return tempArray3;
}