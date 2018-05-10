/* 产品轮播-*/
var Effect = (function() {

    var Slider = function(o) {
        this.setting      = typeof o === 'object' ? o : {};
        this.target       = this.setting.target || 'slider';
        this.showMarkers  = this.setting.showMarkers || false;
        this.showControls = this.setting.showControls || false;
        this.timer        = null;
        this.currentTime  = null;
        this.ms           = 35;
        this.autoMs       = 3000;
        this.iTarget      = 0;
        this.nextTarget   = 0;
        this.speed        = 0;

        this.init();
        this.handleEvent();
    };

    Slider.prototype = {
        init: function() {
            this.obj      = document.getElementById(this.target);
            this.oUl      = this.obj.getElementsByTagName('ul')[0];
            this.aUlLis   = this.oUl.getElementsByTagName('li');
            this.width    = this.aUlLis[0].offsetWidth;
            this.number   = this.aUlLis.length;

            this.oUl.style.width = this.width * this.number + 'px';

            if(this.showMarkers) {
                var oDiv = document.createElement('div');
                var aLis = [];
                for(var i = 0; i < this.number; i++) {
                    aLis.push('<li>'+ (i+1) +'<\/li>');
                };
                oDiv.innerHTML = '<ol>'+ aLis.join('') +'<\/ol>';
                this.obj.appendChild(oDiv.firstChild);
                this.aLis = this.obj.getElementsByTagName('ol')[0].getElementsByTagName('li');
                this.aLis[0].className = 'active';
                oDiv = null;
            };

            if(this.showControls) {
                this.oPrev = document.createElement('p');
                this.oNext = document.createElement('p');
                this.oPrev.className = 'prev';
                this.oPrev.innerHTML = '&laquo;';
                this.oNext.className = 'next';
                this.oNext.innerHTML = '&raquo;';
                this.obj.appendChild(this.oPrev);
                this.obj.appendChild(this.oNext);

            };

        },

        handleEvent: function() {
            var that = this;

            this.currentTime = setInterval(function() {
                that.autoPlay();
            }, this.autoMs);

            this.addEvent(this.obj, 'mouseover', function() {
                clearInterval(that.currentTime);
            });

            this.addEvent(this.obj, 'mouseout', function() {
                that.currentTime = setInterval(function() {
                    that.autoPlay();
                }, that.autoMs);
            });

            if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    var el = this.aLis[i];
                    (function(index) {
                        that.addEvent(el, 'mouseover', function() {
                            that.goTime(index);
                        });
                    })(i);
                };
            };

            if(this.showControls) {
                this.addEvent(this.oPrev, 'click', function() {
                    that.fnPrev();
                });
                this.addEvent(this.oNext, 'click', function() {
                    that.autoPlay();
                });
            };

        },

        addEvent: function(el, type, fn) {
            if(window.addEventListener) {
                el.addEventListener(type, fn, false);
            }
            else if(window.attachEvent) {
                el.attachEvent('on' + type, fn);
            };
        },

        fnPrev: function() {
            this.nextTarget--;
            if(this.nextTarget < 0) {
                this.nextTarget = this.number - 1;
            };
            this.goTime(this.nextTarget);
        },

        autoPlay: function() {
            this.nextTarget++;
            if(this.nextTarget >= this.number) {
                this.nextTarget = 0;
            };
            this.goTime(this.nextTarget);
        },

        goTime: function(index) {
            var that = this;
            this.nextTarget = index;
            if(this.showMarkers) {
                for(var i = 0; i < this.number; i++) {
                    i == index ? this.aLis[i].className = 'active' : this.aLis[i].className = '';
                };
            };

            this.iTarget = -index * this.width;
            if(this.timer) {
                clearInterval(this.timer);
            };
            this.timer = setInterval(function() {
                that.doMove(that.iTarget);
            }, this.ms);
        },

        doMove: function(target) {
            this.oUl.style.left = this.speed + 'px';
            this.speed += (target - this.oUl.offsetLeft) / 3;
            if(Math.abs(target - this.oUl.offsetLeft) === 0) {
                this.oUl.style.left = target + 'px';
                clearInterval(this.timer);
                this.timer = null;
            };
        }

    };

    return {

        slider: function(o) {
            var tt = new Slider(o);
            return tt;
        }
    };
})();

// 调用语句
var slider = Effect.slider({
    'targetElement': 'slider',
    'showMarkers': true,
    'showControls': true
});

//产品放大

$(function(){
    $.fn.magnifying = function(){
        var that = $(this),
            $imgCon = that.find('.con-fangDaIMg'),//正常图片容器
            $Img = $imgCon.find('img'),//正常图片，还有放大图片集合
            $Drag = that.find('.magnifyingBegin'),//拖动滑动容器
            $show = that.find('.magnifyingShow'),//放大镜显示区域
            $showIMg = $show.find('img'),//放大镜图片
            $ImgList = that.find('.con-FangDa-ImgList > li >img'),
            multiple = $show.width()/$Drag.width();

        $imgCon.mousemove(function(e){
            $Drag.css('display','block');
            $show.eq(slider.nextTarget).css('display','block');
            //获取坐标的两种方法
            // var iX = e.clientX - this.offsetLeft - $Drag.width()/2,
            // 	iY = e.clientY - this.offsetTop - $Drag.height()/2,
            var iX = e.pageX - $(this).offset().left - $Drag.width()/2,
                iY = e.pageY - $(this).offset().top - $Drag.height()/2,
                MaxX = $imgCon.width()-$Drag.width(),
                MaxY = $imgCon.height()-$Drag.height();

            /*这一部分可代替下面部分，判断最大最小值
             var DX = iX < MaxX ? iX > 0 ? iX : 0 : MaxX,
             DY = iY < MaxY ? iY > 0 ? iY : 0 : MaxY;
             $Drag.css({left:DX+'px',top:DY+'px'});
             $showIMg.css({marginLeft:-3*DX+'px',marginTop:-3*DY+'px'});*/

            iX = iX > 0 ? iX : 0;
            iX = iX < MaxX ? iX : MaxX;
            iY = iY > 0 ? iY : 0;
            iY = iY < MaxY ? iY : MaxY;
            $Drag.css({left:iX+'px',top:iY+'px'});
            $showIMg.eq(slider.nextTarget).css({marginLeft:-multiple*iX+'px',marginTop:-multiple*iY+'px'});
            //return false;
        });
        $imgCon.mouseout(function(){
            $Drag.css('display','none');
            $show.eq(slider.nextTarget).css('display','none');
        });

        /*$ImgList.click(function(){
            var NowSrc = $(this).data('bigimg');
            $Img.attr('src',NowSrc);
            $(this).parent().addClass('active').siblings().removeClass('active');
        });*/
    }

    $("#fangdajing").magnifying();
});

