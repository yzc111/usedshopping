//每次只显示5个页码
(function($) {
    //设定页码方法，初始化
    $.fn.setPager = function(options) {
        var opts = $.extend({}, pagerDefaults, options);
        return this.each(function() {
            $(this).empty().append(setPagerHtml(parseInt(options.RecordCount), parseInt(options.PageIndex), options.buttonClick));

        });
    };
    //设定页数及html
    function setPagerHtml(RecordCount, PageIndex, pagerClick) {

        var $content = $("<div class=\"page-num clearfix\"></div>");
        var startPageIndex = 1;
        //若页码超出
        if (RecordCount <= 0) RecordCount = pagerDefaults.PageSize;
        //末页
        var endPageIndex = parseInt(RecordCount % parseInt(pagerDefaults.PageSize)) > 0 ? parseInt(RecordCount / parseInt(pagerDefaults.PageSize)) + 1 : RecordCount / parseInt(pagerDefaults.PageSize)

        if (PageIndex > endPageIndex) PageIndex = endPageIndex;
        if (PageIndex <= 0) PageIndex = startPageIndex;
        var nextPageIndex = PageIndex + 1;
        var prevPageIndex = PageIndex - 1;
        if (PageIndex == startPageIndex) {
            $content.append($("<span class=\"page-first\">首页</span>"));
            $content.append($("<span class=\"page-prev\">上一页</span>"));
        } else {

            $content.append(renderButton(RecordCount, 1, pagerClick, "首页"));
            $content.append(renderButton(RecordCount, prevPageIndex, pagerClick, "上一页"));
        }
        //这里判断是否显示页码
        if (pagerDefaults.ShowPageNumber) {
            // var html = "";
            //页码部分隐藏 只显示中间区域
            if (endPageIndex <= 5 && PageIndex <= 5) {
                for (var i = 1; i <= endPageIndex; i++) {
                    if (i == PageIndex) {
                        $content.append($("<span class=\"current\">" + i + "</span>"));
                    } else {
                        $content.append(renderButton(RecordCount, i, pagerClick, i));
                    }

                }

            } else if (endPageIndex > 5 && endPageIndex - PageIndex <= 2) {

                $content.append($("<b class=\"page-break\">...</b>"));
                for (var i = endPageIndex - 4; i <= endPageIndex; i++) {
                    if (i == PageIndex) {
                        $content.append($("<span class=\"current\">" + i + "</span>"));
                    } else {
                        $content.append(renderButton(RecordCount, i, pagerClick, i));
                    }

                }
            } else if (endPageIndex > 5 && PageIndex > 3) {

                $content.append($("<b class=\"page-break\">...</b>"));
                for (var i = PageIndex - 2; i <= PageIndex + 2; i++) {
                    if (i == PageIndex) {
                        $content.append($("<span class=\"current\">" + i + "</span>"));
                    } else {
                        $content.append(renderButton(RecordCount, i, pagerClick, i));
                    }

                }
                $content.append($("<b class=\"page-break\">...</b>"));

            } else if (endPageIndex > 5 && PageIndex <= 3) {

                for (var i = 1; i <= 5; i++) {
                    if (i == PageIndex) {
                        $content.append($("<span class=\"current\">" + i + "</span>"));
                    } else {
                        $content.append(renderButton(RecordCount, i, pagerClick, i));
                    }

                }
                $content.append($("<b class=\"page-break\">...</b>"));
            }
        }
        if (PageIndex == endPageIndex) {
            $content.append($("<span class=\"page-next\">下一页</span>"));
            $content.append($("<span class=\"page-last\">末页</span>"));
        } else {
            $content.append(renderButton(RecordCount, nextPageIndex, pagerClick, "下一页"));
            $content.append(renderButton(RecordCount, endPageIndex, pagerClick, "末页"));
        }

        return $content;
    }
    function renderButton(recordCount, goPageIndex, EventHander, text) {
    	var $goto = $("<a class=\"a-page\" page=\""+goPageIndex+"\" title=\"第" + goPageIndex + "页\">" + text + "</a>\"");
    	if (pagerDefaults.href) {
    		var href = pagerDefaults.href.replace("{pageNumParam}",goPageIndex);
    		if (pagerDefaults.pageMinusone) {
    			href = pagerDefaults.href.replace("{pageNumParam}",parseInt(goPageIndex)-1);
    		}
    		$goto = $("<a class=\"a-page\" target=\"_self\" href=\""+href+"\" page=\""+goPageIndex+"\" title=\"第" + goPageIndex + "页\">" + text + "</a>\"");
    	}
        $goto.click(function() {
            EventHander(recordCount, goPageIndex);
        });
        return $goto;
    }
    //初始化页面大小
//    var pagerDefaults = {
//    		DefaultPageCount: 1,
//            DefaultPageIndex: 1,
//            PageSize: 3,
//            ShowPageNumber: true //是否显示页码
//    };
})(jQuery);