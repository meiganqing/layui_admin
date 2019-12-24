var basePathImg = "/book/library/Widget"; //Widget文件夹的根目录路径
if(window.location.hostname == "localhost") {
	basePathImg = "/library/Widget";
} else {
	basePathImg = "/book/library/Widget";
}

function UploadFilex(obj) {

	this.oldName = obj.oldName; //图片的原始名称key：dog.jpg
	this.newName = obj.newName; //后台返回的图片路径的key
	//	this.url = obj.url; //上传图片请求的地址

	this.url = "http://192.168.28.251:8111/api/upload?XKLX=LIB_SY"
	this.chooseBtn = obj.chooseBtn; //选择按钮的id
	this.tableId = obj.tableId; //显示图片列表的table的id
	//回显图片要用到的
	this.echoImgUrl = obj.echoImgUrl;

	obj.echooldName !== undefined ? this.echooldName = obj.echooldName : this.echooldName = this.oldName; //回显图片的原始名称
	obj.echonewName !== undefined ? this.echonewName = obj.echonewName : this.echonewName = this.newName; //回显图片的新名称

	//返回数据的属性名:默认为data
	obj.returnDataKey !== undefined ? this.returnDataKey = obj.returnDataKey : this.returnDataKey = "data";

}
//创建监听函数
var xhrOnProgress = function(fun) { //上传进度必需的
	xhrOnProgress.onprogress = fun; //绑定监听
	//使用闭包实现监听绑
	return function() {
		//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
		var xhr = $.ajaxSettings.xhr();
		//判断监听函数是否为函数
		if(typeof xhrOnProgress.onprogress !== 'function')
			return xhr;
		//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
		if(xhrOnProgress.onprogress && xhr.upload) {
			xhr.upload.onprogress = xhrOnProgress.onprogress;
		}
		return xhr;
	}
}
UploadFilex.prototype = {

	uploadFile: function() { //上传附件	
		var that = this
		var indexload = ""
		layui.use(["form", "upload", "element"], function() {
			var upload = layui.upload,
				element = layui.element;
			var filexxx = { //上传进度需要用到
				fileIndex: [],
				loadIndex: 0
			}
			fileend = {}

			uploadListIns = upload.render({
				elem: $("#" + that.chooseBtn),
				url: that.url,
				accept: 'file',
				multiple: true,
				auto: true,
				method: "POST",
				xhr: xhrOnProgress,
				choose: function(obj) {},
				before: function(obj) {

					obj.preview(function(index, file, result) { //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
						var res = file
						filexxx.fileIndex.push(index) //将选择的index加到load的数组中					
						var tr = $(['<tr type="new" id="upload-' + index + '" oldName="' + res.name + '" newName="">',
							'<td><div class="imgDiv" style="cursor: pointer;">',
							'<div class="layadmin-homepage-pad-ver" >',
							'<img onclick=lookPicx("' + index + '","' + index + '") id="uploadImg' + index + '"  class="layadmin-homepage-pad-img" src="" width="66" height="66">',
							'</div>',
							'</div></td>',
							'<td>' + res.name + '</td>',
							//							'<td><div class="layui-progress" lay-showpercent="true" lay-filter="demo' + index + '">',
							//							'<div class="layui-progress-bar" lay-percent="20%"></div>',
							//							'</div></td>',
							//							'<td id="load' + index + '">正在上传</td>',
							'<td>',
							'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
							'<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete' + index + '" onclick=deleteFilex("' + index + '","' + index + '")>删除</span>',
							'<span class="layui-btn layui-btn-xs layui-btn-warm demo-look" id="look' + index + '" onclick=lookPicx("' + index + '","' + index + '")>预览</span>',
							//							'<span class="layui-btn layui-btn-xs edit-picture" id="edit' + index + '" onclick=editPic("' + index + '","new")>编辑</span>',
							'<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>',
							'</td>', '</tr>'
						].join(''));
						$(that.tableId).append(tr);
					});
				},
				progress: function(value) { //上传进度回调 value进度值					
					var progress = 'demo' + filexxx.fileIndex[filexxx.loadIndex]
					element.progress(progress, value + '%') //设置页面进度条
					if(value == "100") { //进度条是回调函数，多个文件是需要一一对应
						filexxx.loadIndex++
					}
				},
				done: function(res, index, upload) {

					filexxx.fileIndex = []; //上传成功本次操作选择的值都要清零
					filexxx.loadIndex = 0;
					fileend[index] = res[that.newName]
					$("#upload-" + index).attr("newName", res[that.newName]);
					$("#uploadImg" + index).attr("src", res[that.newName].replace("ss.", "."))
					element.progress("demo" + index, '100%'); //设置页面进度条,不管成功没成功走到这都成功了
					$("#load" + index).html("上传成功");
					layer.closeAll('loading'); //关闭loading
					return;
					this.error(index, upload);
				},
				error: function(index, upload) {
					layer.closeAll('loading'); //关闭loading
					layer.msg("上传失败")
					//					var tr = $(demoListView).find('tr#upload-' + index),
					//						tds = tr.children();
					//					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');

				}
			});
		})

	},

	addFileData: function(type) { //tr的ID，附件加到数据库里
		console.log(type)
		var that = this;
		var pictureUrl = ""; //调用该函数会返回图片的地址，多个图片用|隔开
		var type_ = ""
		if(type) {
			type_ = "," + type
		}

		if($(that.tableId).find("tr").length > 0) {
			$.each($(that.tableId).find("tr"), function(key, val) {
				if($(that.tableId).find("tr").length - 1 == key) { //最后一个不加|
					pictureUrl += $(val).attr("newName") + "," + $(val).attr("oldName") + type_
				} else {
					pictureUrl += $(val).attr("newName") + "," + $(val).attr("oldName") + type_ + "|"
				}
			})
		}
		console.log(type_)
		console.log(pictureUrl)
		return pictureUrl

	},
	echoDataFile: function(objData, type, type2) { //回显附加信息
		var that = this
		that.postData(objData, function(data) {
			var html = ""
			for(var i = 0; i < data[that.returnDataKey].length; i++) {

				html += `
			<tr id="upload-old${i}" oldName="${data[that.returnDataKey][i][that.echooldName]}" newName="${data[that.returnDataKey][i][that.echonewName]}">
				
				<td>
				<div style="cursor: pointer;">
					<div class="layadmin-homepage-pad-ver imgDiv" >
						<img onclick="lookPicx('${data[that.returnDataKey][i][that.echonewName]}')" type="${type}" class="layadmin-homepage-pad-img" src="${data[that.returnDataKey][i][that.echonewName].replace('ss.','.')}" width="66" height="66">
					</div>
				</div>
				</td>
				<td>${data[that.returnDataKey][i][that.echooldName]}</td>


				<td>
					<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
					<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" onclick="deleteFilex('${data[that.returnDataKey][i][that.echonewName]}','old${i}','edit','${data[that.returnDataKey][i].id}')">删除</span>
					<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPicx('${data[that.returnDataKey][i][that.echonewName]}')" >预览</span>
			</td></tr>`
			}

			$(that.tableId).append(html)
		})
	},
	postData: function(mActionData, callback) {
		var rv;
		var that = this;
		try {
			$.ajax({
				async: false,
				cache: false,
				type: "post",
				url: that.echoImgUrl,
				data: mActionData,
				dataType: 'json',
				success: function(returnValue) {
					callback(returnValue)
					if(returnValue.msg || returnValue.success) {
						rv = returnValue
					} else {
						rv = returnValue.message;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					rv = XMLHttpRequest.responseText;
				}
			});
		} catch(e) {
			rv = e.message;
		}
		return rv;
	}
}

function deleteFilex(res, index, type) {
	//	var delurl = "/xdData/xdDelData.ashx";

	var index007 = layer.confirm("确定要删除吗？", {
		btn: ['确定', '再想想']
	}, function() {
		//1)从数据库删除图片
		//		/api/oct/file?XAction=Del&path={路径}
		postData("Del", {
			path: res
		}, function(data) {

		},"/api/oct/file")

		$("#upload-" + index).remove()
		layer.close(index007)
	})
}

function lookPicx(imgSrc, imgSrcIndex) {

	if(imgSrcIndex) { //新添加的图片的查看，在函数中直接点击会陷入死循环
		if(imgSrcIndex == "批次导入") {
			ShowVideox(false, imgSrc, '90%', '90%', 1, "03");
		} else if(imgSrcIndex == "系统上传") {
			ShowVideox(false, imgSrc, '90%', '90%', 1, "03");
		} else { //新添加的图片的查看
			imgSrc = fileend[imgSrcIndex]
			ShowVideox(false, imgSrc, '90%', '90%', 1, "03");
		}
	} else {

		ShowVideox(false, imgSrc, '90%', '90%', 1, "03");
	}

}
//判断是哪一种查看图片的方式
function getScanPictureTypex(pictureType, path) {
	//	pictureType  01最基本的查看图片的形式
	//	pictureType  02最基本的查看切片的形式
	//	pictureType  03可以在切片上画图的形式
	var url = "";
	var imgPath = path.split(",")[0]
	//1)系统批量上传，切片大小自己获取

	if(pictureType == "03") {
		$.ajax({
			type: "GET",
			url: imgPath.split(".")[0] + "/ImageProperties.xml",
			async: false,
			success: function(dataxml) {

				var width_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("WIDTH"));
				var heigh_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("HEIGHT"));
				url = basePathImg + "/measurablePicture/openTitleImage.html?h=" + heigh_ + "&w=" + width_ + "&path=" + imgPath
			},
			error: function() {
				console.log("错误")
				console.log(basePathImg)
				url = basePathImg + '/imgTools/ShowImage.html?path=' + imgPath;
			}
		});

	} else if(pictureType == "02") {
		url = basePathImg + '/pictureDetail/showPicture.html?path=' + imgPath;

	} else if(pictureType == "01") {
		url = basePathImg + '/imgTools/ShowImage.html?path=' + imgPath;
	} else {
		url = basePathImg + '/imgTools/ShowImage.html?path=' + imgPath;
	}
	return url;
}

function ShowVideox(mtitle, mpath, w, h, clobtn, system) {
	if(mpath == '') {
		layer.msg('未找到文件');
	} else {

		var yl = false;
		var index = mpath.lastIndexOf("\.");
		var r = mpath.substring(index + 1, mpath.length);

		var url = basePathImg + "/video/ShowVideo.html?path=" + mpath;
		switch(r.toLowerCase()) {
			case "doc":
			case "docx":
			case "txt":
			case "zip":
			case "rar":
			case "xls":
			case "xlsx":
				break;
			case "pdf":
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
				if(getScanPictureTypex(system, mpath)) {
					url = getScanPictureTypex(system, mpath)
					yl = true;
				} else {
					yl = false;
				}

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

		if(yl) {
			if(clobtn) {
				clobtn = 1;
			} else {
				clobtn = clobtn;
			}
			var index = layer.open({
				type: 2,
				//      maxmin: true,
				content: url,
				area: [w, h],
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