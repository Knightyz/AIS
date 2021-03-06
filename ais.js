/* AIS.js
	All-end Integrated Solution 全端集成解决方案
	Auto Integrated Solution 自动化集成解决方案
	AIS 爱SCRIPT
 * By ericqin http://weibo.com/513178997
 * AIS.js https://github.com/AISteam/AIS
 * My website:http://oninternet.sinaapp.com/
 * MIT Licensed .
 */

 ;(function(exports,AIS){
 	var W3C = exports.document.dispatchEvent;

 	var slice = W3C ? function(nodes, start, end) {
        return factorys.slice.call(nodes, start, end);
    } : function(nodes, start, end) {
        var ret = [],
                n = nodes.length;
        if (end === void 0 || typeof end === "number" && isFinite(end)) {
            start = parseInt(start, 10) || 0;
            end = end == void 0 ? n : parseInt(end, 10);
            if (start < 0) {
                start += n;
            }
            if (end > n) {
                end = n;
            }
            if (end < 0) {
                end += n;
            }
            for (var i = start; i < end; ++i) {
                ret[i - start] = nodes[i];
            }
        }
        return ret;
    }

    AIS.slice = slice;
 })(window,window.AIS||{});