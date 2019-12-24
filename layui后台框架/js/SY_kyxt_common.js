var http_com = "",
    http_comdome = httpip + ""; //公用的ip地址，公用的图片地址
baseUrl = ""



// 适应多种请求方式

function PostData(requestData, callback) { //异步的ajax请求
    var rv;
    try {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            url: httpip + '/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKYGL',
            data: requestData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnData) {

                if (returnData.success || returnData.msg) {

                    if (callback) {
                        callback(returnData, this)
                    }
                    rv = returnData
                } else {
                    rv = returnData.message;
                    if (rv == "NOTLOGIN") {

                        parent.location.href = baseUrl + "/login.html"

                    } else {
                        layer.msg(rv)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)
            }
        });
    } catch (e) {

        rv = e.message;
    }
}




// 获取token
function getAuth() {
    if (localStorage.getItem("sytoken")) {

        return localStorage.getItem("sytoken")
    } else {
        window.location.href = baseUrl + "/login.html"
    }

}

// 不同系统
function PostData_xklx(requestData, xklx, callback) { //异步的ajax请求
    var rv;
    try {
        $.ajax({
            async: true,
            cache: false,
            type: "post",
            url: httpip + "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=" + xklx,
            data: requestData, // $('#mkufang').val() 
            dataType: 'json',
            headers: {
                Authorization: getAuth()
            },
            success: function(returnData) {

                if (returnData.success || returnData.msg) {
                    if (callback) {
                        callback(returnData, this)
                    }
                    rv = returnData
                } else {
                    rv = returnData.message;
                    if (rv == "NOTLOGIN") {

                        parent.location.href = baseUrl + "/login.html"

                    } else {
                        layer.msg(rv)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                rv = XMLHttpRequest.responseText;
                layer.msg(rv)
            }
        });
    } catch (e) {

        rv = e.message;
    }
}

// 获取url传值
String.prototype.getQuery = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = this.substr(this.indexOf("?") + 1).match(reg);
    // console.log(unescape(r[2]))
    if (r != null) return unescape(r[2]);
    return null;
}

//全页面刷新
function updateData() {
    window.location.reload()
    return false
}

//表格刷新
function updateDataTable() {
    tableins.reload()
    return false
}


//时间设置
function currentDate() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() + '-';

    if ((d.getMonth() + 1) < 10) {

        str += '0' + parseInt(d.getMonth() + 1) + '-';
    } else {
        str += d.getMonth() + 1 + '-';
    }
    if (d.getDate() < 10) {
        str += '0' + d.getDate();
    } else {
        str += d.getDate();
    }
    return str;
}

function YearMonthDate() {
    var d = new Date(),
        str = '';
    str += d.getFullYear();

    if ((d.getMonth() + 1) < 10) {

        str += '0' + parseInt(d.getMonth() + 1);
    } else {
        str += d.getMonth() + 1;
    }
    if (d.getDate() < 10) {
        str += '0' + d.getDate();
    } else {
        str += d.getDate();
    }
    return str;
}

function currentDateMonth() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() + '-';

    if ((d.getMonth() + 1) < 10) {

        str += '0' + parseInt(d.getMonth() + 1);
    } else {
        str += d.getMonth() + 1;
    }

    return str;
}

function lastcurrentDate() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() - 1 + '-';

    if ((d.getMonth() + 1) < 10) {

        str += '0' + parseInt(d.getMonth() + 1) + '-';
    } else {
        str += d.getMonth() + 1 + '-';
    }
    if (d.getDate() < 10) {
        str += '0' + d.getDate();
    } else {
        str += d.getDate();
    }
    return str;
}

function curDateTime() {
    var d = new Date();
    var year = d.getFullYear() + "";
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();
    var Hours = d.getHours(); //获取当前小时数(0-23)
    var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
    var Seconds = d.getSeconds(); //获取当前秒数(0-59)
    var Milliseconds = d.getMilliseconds();
    var curDateTime = year;
    if (month > 9) {
        curDateTime = curDateTime + month;

    } else {
        curDateTime = curDateTime + "0" + month;
    }
    if (date > 9)
        curDateTime = curDateTime + date;
    else
        curDateTime = curDateTime + "0" + date;
    if (Hours > 9)
        curDateTime = curDateTime + Hours;
    else
        curDateTime = curDateTime + "0" + Hours;
    if (Minutes > 9)
        curDateTime = curDateTime + Minutes;
    else
        curDateTime = curDateTime + "0" + Minutes;
    if (Seconds > 9)
        curDateTime = curDateTime + Seconds;
    else
        curDateTime = curDateTime + "0" + Seconds;
    curDateTime = curDateTime + "0" + Milliseconds;
    return curDateTime;
}

function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++) {
        rnd += Math.floor(Math.random() * 10);
    }

    return rnd;
}

function getonlynum() {
    return "SY" + curDateTime() + RndNum(4);
}

function getTimeAndRandom(type) {
    return type + "_" + curDateTime() + RndNum(2);
}

function currentTime() {
    var d = new Date(),
        str = '';
    var times = d.toLocaleDateString();
    if (d.getHours() < '10') {
        str += '0' + d.getHours() + ':';
    } else {
        str += d.getHours() + ':';
    }
    if (d.getMinutes() < '10') {
        str += '0' + d.getMinutes() + ':';
    } else {
        str += d.getMinutes() + ':';
    }
    if (d.getSeconds() < '10') {
        str += '0' + d.getSeconds() + '';
    } else {
        str += d.getSeconds() + '';
    }
    return str;
}

function currentYear() {
    var d = new Date(),
        str = '';
    str += d.getFullYear() - 1;
    return str;
}

//时间格式化
function timeEXchange(obj) {

    if (obj == '') {
        return '';
    } else {

        if (obj.split(' ')[0].indexOf('-') != '-1') {
            var arrTime = obj.split(' ')[0].trim().split('-');
        } else {
            var arrTime = obj.split(' ')[0].trim().split('/');
        }
        return arrTime[0] + '年' + arrTime[1] + '月' + arrTime[2] + '日';
    }

}
//查询变色
function QueryKeyColor(field) {
    var dd = $('#keyWords').val().split(" ");
    if (field != null) {
        for (var i = 0; i < dd.length; i++) {
            field = field.replace(dd[i], "<span style='color:red;'>" + dd[i] + "</span>");
        }
    }

    return field;
}

function QueryKeyColorsc(keyValue, idName, sctext) {
    // console.log(keyValue)
    // console.log(idName)
    let dt = []
    if (idName) {
        // console.log("idName")
        dt = ($('#' + idName).val() || "").split(" ");
    } else if (sctext) {
        // console.log("sctext")
        if ($('#' + sctext).val()) {
            dt = ($("#" + sctext + " option:checked").text() || "").split(" ");
        }
    }
    // console.log(dt)
    if (keyValue != null) {
        for (var i = 0; i < dt.length; i++) {
            keyValue = keyValue.replace(dt[i], "<span style='color:red;'>" + dt[i] + "</span>");
            // console.log(keyValue)
        }
    }
    return keyValue;
}

function getSelect(id, data, key, attr, attrValue) { //获取下拉框形式的模板
    var select = key
    if (attrValue) {
        select = attrValue
    }
    var xmmcTemplate = "";
    $('#' + id).empty()
    if (data.length > 0) {
        // console.log("封装下拉请求")
        // console.log(arrt)
        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
            }
        }
    }

    $('#' + id).append(xmmcTemplate)

}

function getTzgl(id, data, key, attr) { //获取默认为空的下拉框形式的模板
    var select = key
    var xmmcTemplate = "<option value=''>请选择可多选</option>";
    $('#' + id).empty()

    if (data.length > 0) {
        //		data.reverse()
        if (attr) {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option   value="' + data[i][attr] + '" idname="' + data[i].id + '">' + data[i].mUserName + '</option>'
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                xmmcTemplate += '<option value="' + data[i].mUserName + '" id="' + data[i][select] + '">' + data[i].mUserName + '</option>'
            }
        }

    }
    // console.log(xmmcTemplate)
    $('#' + id).append(xmmcTemplate)
}

//写cookies 
//这是有设定过期时间的使用示例： 
//s20是代表20秒 
//h是指小时，如12小时则是：h12 
//d是天数，30天则：d30 
//setCookie("name","hayden","s20");
function setCookiee(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/"

    // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function getsec(str) {
    // alert(str);
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
//删除cookies 
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookieName(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getUserName() {
    var name = 'mUserName';
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    } else {

    }
    //		window.parent.location.href = "/kf/login.html";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function getCookieName(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);

    } else {


    }

}

//清除所有cookie函数  
function clearAllCookie() {
    var exp = new Date();
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + "=0;expires=" + exp.toGMTString() + ";path=/"

        }

        //          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

function QXALL() {
    var indexlayer = parent.layer.getFrameIndex(window.name); //获取窗口索引

    if (parent.tableins) {
        parent.tableins.reload();
    }
    parent.layer.close(indexlayer);

}

//弹出窗口新页面
function openWindow(type, url, title, w, h, anim, callback) {
    let maxmin = true;
    if (title == null || title == '') {
        title = false;
        maxmin = false;
    };
    if (url == null || url == '') {
        url = "/404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() - 200);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 100);
    };
    if (anim == null || anim == "") {
        anim = 5
    }
    var layerPage = layer.open({
        type: type * 1,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: maxmin,
        shade: 0.4,
        title: title,
        content: url,
        anim: anim,
        success: function(layero) {},
        end: function() {

        },
        cancel: callback

    });
    return layerPage
}

function delData(id, XDLMSID, callback) { //删除数据
    layui.use(['layer'], function() {
        layer.confirm('确定要删除？删除后不可恢复！！', {
                btn: ['确定删除', '再想想'] //按钮
            },
            function() //确定
            {
                submitDataVertifyModule("确定要量删除吗", function() {
                    layer.msg('确定删除，请稍等...', {
                        icon: 1,
                        time: 500,
                        success: function() {
                            PostData({
                                XDLMCID: 4000,
                                XDLMROWID: id,
                                XDLMSID: XDLMSID
                            }, function(data) {
                                if (data.msg || data.success) {
                                    tipMsg(data, callback)
                                }

                            })
                        }
                    });
                })
            }
        );
    });

}

function QXALLTT(status) {

    if (status == "yes") {
        window.parent.location.reload(); //刷新父页面
        var index = parent.layer.getFrameIndex(window.name); //获取
        parent.layer.close(index);
    }
    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(index);

}


//批量删除
function delDataVolume(XDLMSID, callback) {
    var ids = [];
    layui.use('table', function() {
        var table = layui.table;
        var checkStatus = table.checkStatus('tableLayui'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if (ids.length < 1) {
            layer.msg("请选中行")
        } else {
            layui.use(['layer'], function() {
                layer.confirm('确定要删除？删除后不可恢复！！', {
                        btn: ['确定删除', '再想想'] //按钮
                    },
                    function() //确定
                    {
                        submitDataVertifyModule("确定要批量删除吗", function() {
                            PostData({
                                XDLMCID: 4000,
                                XDLMROWID: ids.join(","),
                                XDLMSID: XDLMSID
                            }, function(data) {
                                if (data.msg || data.success) {
                                    tipMsg(data, callback)
                                }
                            })
                        })

                    }
                );
            });



        }
    });
}

// 操过成功提示
function tipMsg(data, callback) {
    var iconType = "";
    var tipMessage = data.message;

    if (data.msg || data.success) {
        iconType = 1;
        if (data.message) {

        } else {
            tipMessage = "操作成功"
        }
    } else {
        iconType = 5;
        if (data.message) {

        } else {
            tipMessage = "操作失败"
        }
    }

    layer.msg(tipMessage, {
        icon: iconType,
        time: 500
    }, function() {
        if (callback) {
            callback(data)
        } else {
            QXALL()
                //          console.log(tableins)
                //          if(tableins){
                //          tableins.reload()
                //          	
                //          }
        }

    });
}

// tab卡
function newTab(url, tit) {
    if (top.layui.index) {
        top.layui.index.openTabsPage(url, tit)
    } else {
        window.open(url)
    }
}


function submitDataTip(tip, callback, data) { //没有验证码的弹框	
    layer.confirm(tip, {
            btn: ['确定', '再想想'] //按钮
        },
        function() //确定
        {
            var index000002 = layer.msg('正在提交，请稍等...', {
                icon: 1,
                time: 500,
                success: function() {
                    layer.close(index000002)
                    callback(data)

                }
            });
        }

    );

}

function submitDataVertifyModule(tip, callback) { //有验证码的弹框
    layer.open({
        title: tip,
        type: 1,
        content: `<div id='vertifyCode' style="padding-top:15px;padding-right:30px;"></div>
		<div class="layui-layer-btn layui-layer-btn-" style="position:absolute;bottom:0px;left:55px;"><a class="layui-layer-btn0" id="confirmBtn">确定</a><a class="layui-layer-btn1">再想想</a></div>
				`, //这里content是一个普通的String
        area: ['280px', '260px'],
        success: function() {
            $('#vertifyCode').codeVerify({
                type: 1,
                width: '200px',
                height: '50px',
                fontSize: '30px',
                codeLength: 4,
                btnId: 'confirmBtn',
                ready: function() {},
                success: function() {
                    callback()
                },
                error: function() {
                    layer.msg('验证码不匹配！');
                    return false;
                }
            });

        }
    });

}

function submitDataVertifyPassword(tip, callback) { //验证密码的弹框
    var index002 = layer.prompt({
        formType: 1,
        value: '',
        title: '警告！系统关键操作，必须再次输入确认密码',
    }, function(value, index, elem) {
        if (value == "3.1415") {
            layer.close(index002);
            if (callback) {
                callback()
            }
        } else {
            layer.msg("密码错误")
        }

    });
}
//搜索
function searchTableGY(where, tableins) {
    where.QueryType = $("#cxlb").find("option:selected").attr("attrdata");
    // where.QueryKey = $("#ztss").val();
    where.QueryKey = $("#keyWords").val();
    // where.QueryKey = $("#xmcx").val();
    tableins.reload({
        where: where,
        page: {
            curr: 1
        }
    });
}


//***上传图片相关部分start****
function uploadFilex(id, showId) {
    // console.log(learnType)
    var loading, files = []
    layui.use('upload', function() {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#' + id, //绑定元素				
            url: ipUploadUrl, //上传接口		
            accept: 'file',
            auto: true,
            multiple: true,
            number: 10,
            // choose: function(obj) {
            //     console.log(obj)

            // },
            before: function(obj) {

                loading = layer.msg("正在上传...", {
                        time: 3000
                    })
                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function(index, file, result) {
                    // console.log(index);
                    files.push(index);
                    // console.log(files);
                });
            },
            done: function(res) {

                //上传完毕回调
                if (res.filepath) {
                    // console.log(res)
                    //回显图片
                    // showImg(showId, res.filepath, res.filename, "new")
                    let fh = res.filepath.substring(res.filepath.lastIndexOf('.') + 1);
                    // console.log(h);
                    switch (fh.toLowerCase()) {
                        case "zip":
                        case "rar":
                        case "z7":
                            showImg1(showId, '../../images/ysb.jpg', res.filename, res.filepath, "new")
                            break;
                        case "doc":
                        case "docx":
                        case "xls":
                        case "xlsx":
                            showImg1(showId, '../../images/wordimg.jpg', res.filename, res.filepath, "new")
                            break;
                        case "pdf":
                            showImg1(showId, '../../images/PDFimg.jpg', res.filename, res.filepath, "new")
                            break;
                        case "png":
                        case "jpg":
                        case "bmp":
                        case "gif":
                        case "jpeg":
                        case "tiff":
                        case "psd":
                        case "svg":
                            showImg1(showId, httpip + res.filepath, res.filename, res.filepath, "new")
                            break;
                        case "3gp":
                        case "asf":
                        case "avi":
                        case "flv":
                        case "mkv":
                        case "mov":
                        case "mp4":
                        case "mpeg":
                        case "navi":
                        case "rmvb":
                        case "wmv":
                        case "swf":
                        case "mp5":
                            showImg1(showId, '../../images/MP4img.jpg', res.filename, res.filepath, "new")
                            break;
                        default:

                    }
                } else {
                    layer.msg('当前格式暂不支持上传', {
                        icon: 2,
                        time: 2000,
                        anim: 5
                    });
                }
                layer.close(loading)

            },
            error: function() {
                //请求异常回调

            }
        });
    });

}

/**
 * @函数: uploadFile(id, showId, learnType, ndId, cgmcId)
 * @参数:id, showId, learnType, ndId, cgmcId
 * @参数值: 上传按钮id ， 显示图片DIVid，显示图片类型：如：著作，页面年度id，页面著作名称id 
 * @返回值: 
 */
function uploadFile(id, showId, learnType, ndId, cgmcId, onlynum) { //上传了直接回显的上传
    // console.log(learnType)
    var loading, files = []
    layui.use('upload', function() {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#' + id, //绑定元素				
            url: ipUploadUrl, //上传接口		
            accept: 'file',
            auto: true,
            multiple: true,
            number: 10,
            // choose: function(obj) {
            // console.log(obj)

            // },
            before: function(obj) {
                //files = obj.pushFile();
                loading = layer.msg("正在上传...", {
                        time: 3000
                    })
                    //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function(index, file, result) {
                    // console.log(index);
                    files.push(index);
                    // console.log(files);
                });
            },
            done: function(res, index, upload) {
                // console.log(res)
                // console.log(index)
                // console.log(upload)
                //上传完毕回调
                if (res.filepath) {
                    // console.log(res)
                    //回显图片
                    // showImg(showId, res.filepath, res.filename, "new")
                    let fh = res.filepath.substring(res.filepath.lastIndexOf('.') + 1);
                    // console.log(h);
                    switch (fh.toLowerCase()) {
                        case "zip":
                        case "rar":
                        case "z7":
                            let Filename = learnType + "_" + getCookieName('mUserName') + "_" + $("#" + ndId).val() + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + res.filename
                            showImg(showId, '../../images/ysb.jpg', Filename, res.filepath, "new")
                            break;
                        case "doc":
                        case "docx":
                        case "xls":
                        case "xlsx":
                            let Filename1 = learnType + "_" + getCookieName('mUserName') + "_" + $("#" + ndId).val() + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + res.filename
                            showImg(showId, '../../images/wordimg.jpg', Filename1, res.filepath, "new")
                            break;
                        case "pdf":
                            let Filename10 = learnType + "_" + getCookieName('mUserName') + "_" + $("#" + ndId).val() + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + res.filename
                            showImg(showId, '../../images/PDFimg.jpg', Filename10, res.filepath, "new")
                            break;
                        case "png":
                        case "jpg":
                        case "bmp":
                        case "gif":
                        case "jpeg":
                        case "tiff":
                        case "psd":
                        case "svg":
                            let Filename2 = learnType + "_" + getCookieName('mUserName') + "_" + $("#" + ndId).val() + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + res.filename
                            showImg(showId, httpip + res.filepath, Filename2, res.filepath, "new")
                            break;
                        case "3gp":
                        case "asf":
                        case "avi":
                        case "flv":
                        case "mkv":
                        case "mov":
                        case "mp4":
                        case "mpeg":
                        case "n avi":
                        case "rmvb":
                        case "wmv":
                        case "swf":
                        case "mp5":
                            let Filename3 = learnType + "_" + getCookieName('mUserName') + "_" + $("#" + ndId).val() + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + res.filename
                            showImg(showId, '../../images/MP4img.jpg', Filename3, res.filepath, "new")

                            break;
                        default:
                    }
                } else {
                    layer.msg('当前格式暂不支持上传', {
                        icon: 2,
                        time: 2000,
                        anim: 5
                    });
                }
                layer.close(loading)

            },
            error: function() {
                //请求异常回调
            }
        });
    });

}
/**
 * @函数说明: 上传文件
 * @函数: upfile(onlynum, filenames, filepaths, filetype)
 * @参数: onlynum, filenames, filepaths, filetype
 * @参数值说明: 唯一编码，所有图片名字字符串，所有图片路径字符串，类型
 * @返回值: 
 */
function upfile(onlynum, filenames, filepaths, imgIds, ImgTypes, filetype) {
    let filename = [];
    let filepath = [];
    let imgId = [];
    let ImgType = [];
    filename = filenames.split(",")
    if (filepaths) {
        filepath = filepaths.split(",")
    }
    imgId = imgIds.split(",")
    ImgType = ImgTypes.split(",")
    console.log(ImgType)
        // console.log(filepath)
        // console.log(filepath.length)
    if (filepath.length > 0) {
        if (rowid) {
            for (let i in filepath) {
                if (ImgType[i] == "old") {
                    PostData({
                        XDLMCID: "6000",
                        XDLMSID: "DYBH201812111836043641425",
                        XDLMID: imgId[i],
                        XDLMfilename: filename[i],
                        XDLMfilepath: filepath[i]
                    }, function(data) {})
                } else {
                    PostData({

                        XDLMCID: "5000",
                        XDLMSID: "DYBH20181211183604364313",
                        XDLMclassid: onlynum,
                        XDLMfilename: filename[i],
                        XDLMfilepath: filepath[i],
                        XDLMfiletype: filetype,
                        XDLMonlynum: getonlynum()
                    }, function(data) {})
                }

            }
        } else {
            for (let i in filepath) {
                PostData({
                    XDLMCID: "5000",
                    XDLMSID: "DYBH20181211183604364313",
                    XDLMclassid: onlynum,
                    XDLMfilename: filename[i],
                    XDLMfilepath: filepath[i],
                    XDLMfiletype: filetype,
                    XDLMonlynum: getonlynum()
                }, function(data) {})
            }
        }

    }
}

/**
 * @函数: showImg(id, src, name, url, type, imgId)
 * @参数: id, src, name, url, type, imgId
 * @参数值: 显示图片DIVid，显示路径，名字，上传后路径，类型（new或old），图片id；
 * @返回值: 

 */
function showImg(id, src, name, url, type, imgId) { //给服务器上传图片待到服务器返回地址之后回显这个图片

    let html = '<li class="picture-moudle1 layui-col-xs12 layui-col-sm12 layui-col-md6 layui-col-lg6" type="' + type + '">' +
        '<i class="delete" onclick="deleteFileImg(this)" type="' + type + '" imgid="' + imgId + '"></i>' +
        '<div>' +
        '<div class="picture-moudle-img">' +
        '<img  onclick=lookPicx("' + url + '") src=' + src.replace("ss.", ".") + ' data="' + url + '" alt="" />' +
        '</div>' +
        '<div class="picture-moudle1-text">' +
        // '<p class="imgName"  title="点击下载文件"  onclick=DownFileImg("' + url + '","' + name + '")>' + name + '</p>' +
        '<p class="imgName"  title="点击下载文件" ><a href="' + httpip + url + '" download="' + name + '">' + name + '</a></p>' +
        '</div>' +
        '</div>' +
        '</li>'
    $("#" + id).append(html)
}



/**
 * @函数: lookPicx(imgSrc)
 * @参数:imgSrc 
 * @参数值: 图片路径
 * @返回值: 
 */
function lookPicx(imgSrc) {

    ShowVideo(false, imgSrc, '90%', '90%', 1);

}
/**
 * @函数: howVideo(mtitle, mpath, w, h, clobtn)
 * @参数: mtitle, mpath, w, h, clobtn
 * @参数值: 弹框名字，显示路径，弹框宽，弹框高，弹框显示按钮类型。
 * @返回值: 
 */
function ShowVideo(mtitle, mpath, w, h, clobtn) {
    // console.log(w)

    if (mpath == '') {
        layer.msg('未找到文件');
    } else {
        var yl = false;

        let r = mpath.substring(mpath.lastIndexOf('.') + 1);
        switch (r.toLowerCase()) {
            case "zip":
            case "rar":
            case "z7":
                yl = false;
                // layer.msg('当前格式暂不支持预览');
                break;
            case "doc":
            case "docx":
            case "txt":
            case "xls":
            case "xlsx":
                let mpaths = mpath.substring(0, mpath.lastIndexOf(".") + 1)
                url = basePathImg + '/pdfViewer/pdfView.html?path=' + mpaths + 'pdf';
                yl = true;
                break;
            case "pdf":
                //              url = '/widget/pdfD/ShowPDF.html?path=' + mpath;
                url = basePathImg + '/pdfViewer/pdfView.html?path=' + mpath;
                yl = true;
                break;
            case "png":
            case "jpg":
            case "bmp":
            case "gif":
            case "jpeg":
            case "tiff":
            case "psd":
            case "svg":
                url = basePathImg + '/imgTools/ShowImage.html?path=' + mpath.replace("ss.", ".");
                yl = true;
                break;
            case "3gp":
            case "asf":
            case "avi":
            case "flv":
            case "mkv":
            case "mov":
            case "mp4":
            case "mpeg":
            case "n avi":
            case "rmvb":
            case "wmv":
            case "swf":
            case "mp5":
                url = basePathImg + "/video/ShowVideo.html?path=" + mpath;
                yl = true;
                break;
            default:
                yl = false;

        }
        if (yl) {
            if (clobtn) {
                clobtn = 1;
            } else {
                clobtn = clobtn;
            }
            var index = layer.open({
                type: 2,
                //      maxmin: true,
                content: url,
                area: [w, h],
                // area: [w + "px", h + "px"],
                title: mtitle,
                closeBtn: clobtn,
                shadeClose: true
            });
        } else {
            layer.msg('当前格式暂不支持预览', {
                icon: 2,
                time: 2000,
                anim: 5
            });
        }

    }

}

/**
 * @函数: xghx(showId, hxurl, hxname, imgId)
 * @参数: showId, hxurl, hxname, imgId
 * @参数值: 显示图片DIVid，回显图片名字，回显图片id；
 * @返回值: 
 */
function xghx(showId, hxurl, hxname, imgId) {
    // let hxurls = hxurl.split(',')
    // let hxnames = hxname.split(',')
    // console.log(hxurls)
    // console.log(hxnames)
    // for (var i = 0; i < hxurls.length; i++) {
    let fh = hxurl.substring(hxurl.lastIndexOf('.') + 1);
    // console.log(h);
    switch (fh.toLowerCase()) {
        case "zip":
        case "rar":
        case "z7":
            showImg(showId, '../../images/ysb.jpg', hxname, hxurl, "old", imgId)
            break;
        case "doc":
        case "docx":
        case "txt":
        case "xls":
        case "xlsx":
            showImg(showId, '../../images/wordimg.jpg', hxname, hxurl, "old", imgId)
            break;
        case "pdf":
            showImg(showId, '../../images/PDFimg.jpg', hxname, hxurl, "old", imgId)
            break;
        case "png":
        case "jpg":
        case "bmp":
        case "gif":
        case "jpeg":
        case "tiff":
        case "psd":
        case "svg":
            showImg(showId, httpip + hxurl, hxname, hxurl, "old", imgId)
            break;
        case "3gp":
        case "asf":
        case "avi":
        case "flv":
        case "mkv":
        case "mov":
        case "mp4":
        case "mpeg":
        case "navi":
        case "rmvb":
        case "wmv":
        case "swf":
        case "mp5":

            showImg(showId, '../../images/MP4img.jpg', hxname, hxurl, "old", imgId)
            break;
        default:

    }
}
// }


/**
 * @函数说明: 回显文件
 * @函数: hxupfile(classid, filetype)
 * @参数: classid, filetype
 * @参数值说明: 上传时唯一编码，上传类型
 * @返回值: 
 */
function hxupfile(showId, classid, filetype) {
    let where;
    if (filetype) {
        where = {
            XDLMCID: 1001,
            XDLMSID: "DYBH201812111836043641191",
            XDLMA: classid,
            XDLMB: filetype
        }
    } else {
        where = {
            XDLMCID: 1001,
            XDLMSID: "DYBH201812111836043641191",
            XDLMA: classid
        }
    }
    PostData(where, function(returndata) {
        // console.log(returndata)
        if (returndata.rows.length > 0) {
            for (let i in returndata.rows) {
                xghx(showId, returndata.rows[i]["filepath"], returndata.rows[i]["filename"], returndata.rows[i]["id"])
            }
        }

    })
}

/**
 * @函数: submitPicture(id)
 * @参数: id
 * @参数值: 放所有图片的DIVid
 * @返回值: 
 */
function submitPicture(id) {
    var imgData = {
            imgPath: "",
            imgName: "",
            imgId: "",
            imgType: ""
        }
        // [type='new']
    if ($(".picture-moudle1").length > 0) {
        $("#" + id).find(".picture-moudle1").each(function(key2, val2) {
            imgData.imgPath += $(val2).find(".picture-moudle-img img").attr("data") + ",";
            imgData.imgName += $(val2).find(".picture-moudle1-text p").text() + ",";
            imgData.imgId += $(val2).find(".delete").attr("imgid") + ",";
            imgData.imgType += $(val2).find(".delete").attr("type") + ",";
        })
    }
    console.log(imgData)
    return imgData

};
//改变上传名字
//函数ObtainFilename
// 参数learnType:显示类型 如：著作
// 参数learnType1:第二显示类型 如：证明文件
// 参数ndId:年度
// 参数cgmcId:成果id
function ObtainFilename(learnType, learnType1, ndId, cgmcId) {
    let obj1 = $("#imgContent").find(".imgName");
    let obj2 = $("#imgContentZM").find(".imgName");
    if (obj1.length > 0) {
        let filenames = [];
        for (let i = 0; i < obj1.length; i++) {

            filenames.push(obj1[i].innerHTML.substring(obj1[i].innerHTML.lastIndexOf('_') + 1))
        }
        if (filenames.length > 0) {
            for (let j = 0; j < filenames.length; j++) {
                obj1[j].innerHTML = learnType + "_" + getCookieName('mUserName') + "_" + ndId + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + filenames[j]
                console.log(obj1[j].innerHTML)
            }
        }
    }
    if (obj2.length > 0) {
        let filenames = [];
        for (let i = 0; i < obj2.length; i++) {
            filenames.push(obj2[i].innerHTML.substring(obj2[i].innerHTML.lastIndexOf('_') + 1))
        }
        if (filenames.length > 0) {
            for (let j = 0; j < filenames.length; j++) {
                obj2[j].innerHTML = learnType1 + "_" + getCookieName('mUserName') + "_" + ndId + "_" + $("#" + cgmcId).val() + "_" + YearMonthDate() + "_" + filenames[j]

                console.log(obj2[j].innerHTML)

            }
        }
    }

}

// 查看图片
function seeImg(id, src, name, type, imgId) { //给服务器上传图片待到服务器返回地址之后回显这个图片

    let html = '<li class="picture-moudle " type="' + type + '">' +
        '<div>' +
        '<div class="picture-moudle-img">' +
        '<img onclick=lookPicx("' + src + '") src=' + httpip + src.replace("ss.", ".") + ' data="' + src + '" alt="" />' +
        '</div>' +
        '<div class="picture-moudle-text">' +
        '<p class="imgName">' + name + '</p>' +

        '</div>' +
        '</div>' +
        '</li>'

    $("#" + id).append(html)
}


function chooseImg(id, src, name, type, imgId) { //给服务器上传图片待到服务器返回地址之后回显这个图片
    // console.log(httpip)
    let html = '<li class="picture-moudle " type="' + type + '"  picId="' + imgId + '">' +
        '<input type="checkbox" />' +
        '<div>' +
        '<div class="picture-moudle-img">' +
        '<img onclick=lookPicx("' + src + '") src="' + httpip + src.replace("ss.", ".") + '" data="' + src + '" alt="" />' +
        '</div>' +
        '<div class="picture-moudle-text">' +
        '<p class="imgName">' + name + '</p>' +
        '<input type="checkbox" class="check" checked="checked"/>' +
        '</div>' +
        '</div>' +
        '</li>'
    $("#" + id).append(html)
}

//删除图片
function deleteFileImg(that) {

    submitDataTip("确定要删除吗?", function() {
        //从当前表单删除图片
        if ($(that).attr("type") == "old") { //之前添加的图片,需要从表里删除
            PostData({
                XDLMCID: "4000",
                XDLMSID: "DYBH20181211183604364714",
                XDLMROWID: $(that).attr("imgid")
            }, function(returnData) {
                if (returnData.success) {
                    $(that).parents(".picture-moudle1").remove()
                }
            })
        } else {
            $(that).parents(".picture-moudle1").remove()
        }
    })

}
//删除图片
function deleteFileImg1(that) {

    submitDataTip("确定要删除吗?", function() {
        //从当前表单删除图片
        if ($(that).attr("type") == "old") { //之前添加的图片,需要从表里删除
            PostData({
                XDLMCID: "4000",
                XDLMSID: "DYBH20181211183604364714",
                XDLMROWID: $(that).attr("imgid")
            }, function(returnData) {
                if (returnData.success) {
                    $(that).parents(".picture-moudle").remove()
                }
            })
        } else {
            $(that).parents(".picture-moudle").remove()
        }
    })

}

//数组去重
function unique1(array) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
}