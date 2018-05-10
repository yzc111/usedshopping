/**
 * 等待层提示
 * MaskUtil.mask() 显示等待层
 * MaskUtil.unmask() 隐藏等待层
 */
var MaskUtil = (function() {
	var $mask, $loading;
	
	function init() {
		if(!$mask) {
			$mask = $('<div id="mask_loading" class="mask_loading" style="display:none;"></div>');
			$(document.body).append($mask);
		}
		if(!$loading) {
			var tmp = '<div class="loading" style="display:none;">'
				+ '<div class="loading_content">'
				+ '<div id="curvedarrow_top"></div>'
				+ '<div id="curvedarrow_bottom"></div>'
				+ '</div>'
				+ '<div class="jzz">努力加载中...</div>'
				+ '</div>';
			$loading = $(tmp);
			$(document.body).append($loading);
		}
	}
	
	return {
		mask: function() {
			init();
			$mask.show();
			$loading.show();
		},
		unmask: function() {
			$mask.hide();
			$loading.hide();
		}
	};
})();

/**
 * 控制台打印日志。
 * @param msg 日志内容
 */
function _log(msg) {
	if(window["console"]) {
		console.log(msg);
	}
}

/**
 * 弹框提示。
 * @param msg 提示信息
 */
function _tip(msg) {
	alert(msg);
}

/**
 * 将Date转为yyyy-MM-dd字符串并返回。
 * @param date Date
 * @return yyyy-MM-dd字符串，非日期时返回null
 */
function _toDateStr(date) {
	if(!date) {
		return null;
	}
	date = new Date(date);
	if(date == 'NaN' || date == 'Invalid Date') {
		return null;
	}
	var month = date.getMonth() + 1;
	var day = date.getDate();
	return date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
}

/**
 * 将Date转为yyyy-MM-dd hh:mm:ss字符串并返回。
 * @param date Date
 * @return yyyy-MM-dd hh:mm:ss字符串，非日期时返回null
 */
function _toDateTimeStr(date) {
	if(!date) {
		return null;
	}
	date = new Date(date);
	if(date == 'NaN' || date == 'Invalid Date') {
		return null;
	}
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' 
		+ (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
}

/**
 * 返回时间差描述，如：2分钟前、5小时前，只到“天”，1分钟以内为“刚刚”。
 * @param date Date对象或毫秒数或时间格式字符串
 * @returns 描述
 */
function _getTimeDiffDesc(date) {
	if(!date) {
		return null;
	}
	date = new Date(date);
	if(date == 'NaN' || date == 'Invalid Date') {
		return null;
	}
	var diff = new Date().getTime() - date.getTime(); // 毫秒差
	var desc = '';
	if(diff > 60 * 1000) {
		var minute = diff / 60 * 1000;
		if(minute >= 60) {
			var hour = minute / 60;
			if(hour >= 24) {
				var day = hour / 24;
				desc = day + '天';
			} else {
				desc = hour + '小时';
			}
		} else {
			desc = minute + '秒';
		}
		desc += '前';
	} else {
		desc = '刚刚';
	}
	
	return desc;
}

/**
 * 检查是否匹配邮箱格式。
 * @param val 检查的值
 * @returns true-匹配，false-不匹配
 */
function _isEmail(val) {
	return /^[a-zA-Z0-9]([a-zA-Z0-9-_\.]*[a-zA-Z0-9]+)?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9]+)?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9]+)?)+$/.test(val);
}

/**
 * 检查是否为数值。
 * @param val 要检查的值
 * @returns true-有效数值，false-无效数值
 */
function _isNumberic(val) {
	return /^[+-]?\d+(\.\d+)?$/.test(val);
}