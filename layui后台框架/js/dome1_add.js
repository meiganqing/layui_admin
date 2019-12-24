var $, rowid, laydate, formSubmit, form; //必须声明的变量
layui.config({
    base: "../../layuiadmin/lib/"
}).use(["formSubmit", "jquery", "laydate"], function() {
    form = layui.form,
        laydate = layui.laydate, $ = layui.jquery,
        formSubmit = layui.formSubmit; //使用封装好的表单提交的js
    rowid = window.location.href.getQuery("rowId"); //列表页单行数据id


    if (rowid) {

    }


    // 验证必填信息
    form.verify({ // value：表单的值、item：表单的DOM对象
        pmName: function(value, item) { //非空
            if (value == "") {
                return "提示";
            }
        }
    })


    formSubmit.init({
        dataUrl: { url: httpUrl },

        addData: { //添加的接口

        },

        editData: { //修改的接口

        },

        echoData: { //获取单行数据的接口

        },

        beforeSubmitCallback: function(data) { //提交前要要重新修改表单内的值的回调函数

        },
        beforeEchoDataCallback: function(data) { //回显之前的操作，data参数值为回显的数据

        }
    })

    form.render()
});