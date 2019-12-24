var $, element, layer, laydate, form, table, where, tableins, hsz;
layui.use(["jquery", "form", "element", "layer", "laydate", "table"], function() {
    $ = layui.jquery, element = layui.element, layer = layui.layer, table = layui.table, form = layui.form;
    //    回收站
    hsz = window.location.href.getQuery("hsz");

    //变量赋值
    if (hsz) {
        where = {}
    } else {
        where = {}
    }
    // 获取查询下拉列表   
    PostData({
        XDLMCID: "1001",
        XDLMSID: "DYBH2019091111324509611667"
    }, function(data) {
        if (data.success && data.rows.length > 0) {
            getSelect("cxlb", data.rows, "查询显示名", "查询属性")
            form.render("select")
        }
    })


    // 列表显示
    getTable("tableList", where)

    //头工具栏事件
    table.on('toolbar(tableList)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'add': //添加
                openWindow("2", "./dome1_add.html", "添加")
                break;
            case "delPL": //删除（批量）
                delDataVolume("", function(data) {
                    tableins.reload()
                })
                break;
        };
    });

    //监听行工具事件
    table.on('tool(tableList)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            case 'edit': //修改
                openWindow("2", "./dome1_add.html?rowId=" + data.id, "修改教材")
                break;
            case 'del': //删除（单个）
                delData(data.id, "", function(data) {
                    tipMsg(data, function() {
                        tableins.reload()
                    })
                })
                break;
        };
    });
    //查询
    $("#searchData").click(function() {
        searchTableGY(where, tableins)
    })
});

/**
 * @函数说明: 列表
 * @函数:getTable(id, where) 
 * @参数: id, where
 * @参数值说明: 存放列表id，列表接口
 * @返回值: 
 */
function getTable(id, where) {

    var limit = 15;
    cols = [
        [ //表头
            {
                checkbox: true,
                LAY_CHECKED: false
            }, {
                type: 'numbers',
                title: "序号"
            },
            {
                templet: '#jcmc',
                field: '', //字段
                title: '', //表头
                width: "21%",
                align: "center"
            }, {
                field: '',
                title: '操作',
                width: "10%",
                align: "center",
                templet: '#opeTpl'
            }
        ]
    ]

    layui.use(["table"], function(data) {
        var table = layui.table;
        tableins = table.render({
            elem: '#' + id,
            url: httpUrl,
            where: where,
            method: 'post',
            cols: cols,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
            toolbar: '#toolbarDemo',
            headers: {
                // getAuth()
                Authorization: getAuth()
            },
            // data: testData,
            //			toolbar: true, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            //			width: $(window).width() - 40,
            defaultToolbar: [],
            height: $(window).height() - 170,
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                    ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            response: {
                //				statusName: 'success', //规定数据状态的字段名称，默认：code					
                //				statusCode: true, //规定成功的状态码，默认：0					
                //				msgName: 'success', //规定状态信息的字段名称，默认：msg					
                countName: 'total', //规定数据总数的字段名称，默认：count					
                dataName: 'rows' //规定数据列表的字段名称，默认：data
            },
            loading: true,
            cellMinWidth: 30,
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                    ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            //				height: 'full-70',
            page: true, //是否显示分页
            limits: [limit, 50, 100, 200, 500, 1000],
            limit: limit, //每页默认显示的数量
            id: "tableLayui",
            done: function(res, curr, count) {
                if (res.message == "NOTLOGIN") {
                    // parent.location.href = baseUrl + "/login.html"

                }
            },
            error: function() {

            }
        });
    })
}