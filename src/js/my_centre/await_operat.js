$(function () {
  var clientId = getUrlParms("clientId");
  var shopAroundPicture1 = "";//货比三家图片
  var browsePicture1 = "";//浏览店铺及目标商品操作图

  min_height();
    $(".seek").click(function () {
        if ($(".seek i").hasClass("pull_down")) {
            $(".seek i").addClass("pull_up").removeClass("pull_down");
            $(".pro_message").slideUp();
            return;
        }
        if ($(".seek i").hasClass("pull_up")) {
            $(".seek i").addClass("pull_down").removeClass("pull_up");
            $(".pro_message").slideDown();
            return;
        }
    })
    $(".require").click(function () {
        if ($(".require i").hasClass("pull_down")) {
            $(".require i").addClass("pull_up").removeClass("pull_down");
            $(".operation").slideUp();
            return;
        }
        if ($(".require i").hasClass("pull_up")) {
            $(".require i").addClass("pull_down").removeClass("pull_up");
            $(".operation").slideDown();
            return;
        }
    })
    // upload_bj();
    // upload_ll();
    $("#ctlBtn").click(function(){
        var clientOrderId = $("#serialVal").val();//订单编号
        var parms = {
            "clientOrderId":clientId,
            "shopAroundPicture1":shopAroundPicture1,
            "browsePicture1":browsePicture1,
            "clientOrderOperationId":clientId
        }
      console.log(parms);
      operat(parms,clientId);
    })

    // 上传截图(货币三家图片)
    $("#lg_upload_bj").click(function(){
      $("#lg_upload_bj_input_file").click()
    })
    $('#lg_upload_bj_input_file').on('change',()=>{
    //    获取图片上传key 和token
    getUploadKeyAndToken('', (data)=>{
      console.log(data);
      let token = data.token;
      let key = data.rid;
      shopAroundPicture1 = key
      let file = $('#lg_upload_bj_input_file')[0].files[0]
      console.log(file);
      lrz(file).then((data)=>{
        console.log(data);
        uploadImg(data.file,token,key)
        $('#lg_upload_bj>img').attr('src',data.base64)
      })
    })
  })
  //  上传图片（浏览商铺及目标商品）
  $('#lg_upload_ll').click(function(){
    $('#lg_upload_ll_input_file').click()
  })
  $('#lg_upload_ll_input_file').on('change',()=>{
    getUploadKeyAndToken('', (data)=>{
      console.log(data);
      let token = data.token;
      let key = data.rid;
      browsePicture1 = key
      let file = $('#lg_upload_ll_input_file')[0].files[0]
      console.log(file);
      lrz(file).then((data)=>{
        console.log(data);
        uploadImg(data.file,token,key)
        $('#lg_upload_ll>img').attr('src',data.base64)
      })
    })
  })
  operat_detail(clientId);
})

// function upload_bj() {
//     var $list = $(".uploader-list-bj");
//     var thumbnailWidth = 78; //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
//     var thumbnailHeight = 78;
//     var uploader = WebUploader.create({
//
//         // swf文件路径
//         swf: '/src/libs/webuploader/Uploader.swf',
//
//         // 文件接收服务端。
//         server: 'http://webuploader.duapp.com/server/fileupload.php',
//
//         // 选择文件的按钮。可选。
//         // 内部根据当前运行是创建，可能是input元素，也可能是flash.
//         pick: '#lg_upload_bj',
//
//         // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
//         resize: false,
//         fileNumLimit: 3,
//         // 只允许选择图片文件。
//         accept: {
//             title: 'Images',
//             extensions: 'gif,jpg,jpeg,bmp,png',
//             mimeTypes: 'image/*'
//         },
//         pick: {
//             id: $("#lg_upload_bj"), // id
//             multiple: false // false  单选
//         },
//     });
//     // 当有文件添加进来的时候
//     uploader.on('fileQueued', function (file) {
//         var $li = $(
//                 '<div id="' + file.id + '" class="file-item thumbnail">' +
//                 '<div class="remove"><i>×</i></div>' +
//                 '<img>' +
//                 '</div>'
//             ),
//             $img = $li.find('img');
//         // $list为容器jQuery实例
//         $list.append($li);
//
//         // 创建缩略图
//         // 如果为非图片文件，可以不用调用此方法。
//         // thumbnailWidth x thumbnailHeight 为 100 x 100
//         uploader.makeThumb(file, function (error, src) {
//             if (error) {
//                 $img.replaceWith('<span>不能预览</span>');
//                 return;
//             }
//
//             $img.attr('src', src);
//         }, thumbnailWidth, thumbnailHeight);
//         if ($(".uploader-list-bj .file-item").length >= 3) {
//             $("#lg_upload_bj").hide();
//         } else {
//             $("#lg_upload_bj").show();
//         }
//         $(".remove").each(function () {
//             $(this).click(function () {
//                 var id = $(this).parent().attr("id");
//                 uploader.removeFile(id);
//                 $(this).parent().remove();
//                 if ($(".uploader-list-bj .file-item").length >= 3) {
//                     $("#lg_upload_bj").hide();
//                 } else {
//                     $("#lg_upload_bj").show();
//                 }
//             })
//         })
//         $info = $('<p class="error"></p>');
//         showError = function (code) {
//             switch (code) {
//                 case 'exceed_size':
//                     text = '文件大小超出';
//                     break;
//
//                 case 'interrupt':
//                     text = '上传暂停';
//                     break;
//
//                 default:
//                     text = '上传失败，请重试';
//                     break;
//             }
//
//             $info.text(text).appendTo($li);
//         };
//
//     });
//     // 文件上传过程中创建进度条实时显示。
//     uploader.on('uploadProgress', function (file, percentage) {
//         var $li = $('#' + file.id),
//             $percent = $li.find('.progress span');
//
//         // 避免重复创建
//         if (!$percent.length) {
//             $percent = $('<p class="progress"><span></span></p>')
//                 .appendTo($li)
//                 .find('span');
//         }
//
//         $percent.css('width', percentage * 100 + '%');
//     });
//
//     // 文件上传成功，给item添加成功class, 用样式标记上传成功。
//     uploader.on('uploadSuccess', function (file) {
//         $('#' + file.id).addClass('upload-state-done');
//     });
//
//     // 文件上传失败，显示上传出错。
//     uploader.on('uploadError', function (file) {
//         var $li = $('#' + file.id),
//             $error = $li.find('div.error');
//
//         // 避免重复创建
//         if (!$error.length) {
//             $error = $('<div class="error"></div>').appendTo($li);
//         }
//
//         $error.text('上传失败');
//     });
//
//     // 完成上传完了，成功或者失败，先删除进度条。
//     uploader.on('uploadComplete', function (file) {
//         $('#' + file.id).find('.progress').remove();
//     });
//     // 所有文件上传成功后调用
//     uploader.on('uploadFinished', function () {
//         //清空队列
//         uploader.reset();
//     });
// }
// function upload_ll() {
//     var $list = $(".uploader-list-ll");
//     var thumbnailWidth = 78; //缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档
//     var thumbnailHeight = 78;
//     var uploader = WebUploader.create({
//
//         // swf文件路径
//         swf: '/src/libs/webuploader/Uploader.swf',
//
//         // 文件接收服务端。
//         server: 'http://webuploader.duapp.com/server/fileupload.php',
//
//         // 选择文件的按钮。可选。
//         // 内部根据当前运行是创建，可能是input元素，也可能是flash.
//         pick: '#lg_upload_ll',
//
//         // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
//         resize: false,
//         fileNumLimit: 3,
//         // 只允许选择图片文件。
//         accept: {
//             title: 'Images',
//             extensions: 'gif,jpg,jpeg,bmp,png',
//             mimeTypes: 'image/*'
//         },
//         pick: {
//             id: $("#lg_upload_ll"), // id
//             multiple: false // false  单选
//         },
//     });
//     // 当有文件添加进来的时候
//     uploader.on('fileQueued', function (file) {
//         var $li = $(
//                 '<div id="' + file.id + '" class="file-item thumbnail">' +
//                 '<div class="remove"><i>×</i></div>' +
//                 '<img>' +
//                 '</div>'
//             ),
//             $img = $li.find('img');
//         // $list为容器jQuery实例
//         $list.append($li);
//
//         // 创建缩略图
//         // 如果为非图片文件，可以不用调用此方法。
//         // thumbnailWidth x thumbnailHeight 为 100 x 100
//         uploader.makeThumb(file, function (error, src) {
//             if (error) {
//                 $img.replaceWith('<span>不能预览</span>');
//                 return;
//             }
//
//             $img.attr('src', src);
//         }, thumbnailWidth, thumbnailHeight);
//         if ($(".uploader-list-ll .file-item").length >= 3) {
//             $("#lg_upload_ll").hide();
//         } else {
//             $("#lg_upload_ll").show();
//         }
//         $(".remove").each(function () {
//             $(this).click(function () {
//                 var id = $(this).parent().attr("id");
//                 uploader.removeFile(id);
//                 $(this).parent().remove();
//                 if ($(".uploader-list-ll .file-item").length >= 3) {
//                     $("#lg_upload_ll").hide();
//                 } else {
//                     $("#lg_upload_ll").show();
//                 }
//             })
//         })
//         $info = $('<p class="error"></p>');
//         showError = function (code) {
//             switch (code) {
//                 case 'exceed_size':
//                     text = '文件大小超出';
//                     break;
//
//                 case 'interrupt':
//                     text = '上传暂停';
//                     break;
//
//                 default:
//                     text = '上传失败，请重试';
//                     break;
//             }
//
//             $info.text(text).appendTo($li);
//         };
//
//     });
//     // 文件上传过程中创建进度条实时显示。
//     uploader.on('uploadProgress', function (file, percentage) {
//         var $li = $('#' + file.id),
//             $percent = $li.find('.progress span');
//
//         // 避免重复创建
//         if (!$percent.length) {
//             $percent = $('<p class="progress"><span></span></p>')
//                 .appendTo($li)
//                 .find('span');
//         }
//
//         $percent.css('width', percentage * 100 + '%');
//     });
//
//     // 文件上传成功，给item添加成功class, 用样式标记上传成功。
//     uploader.on('uploadSuccess', function (file) {
//         $('#' + file.id).addClass('upload-state-done');
//     });
//
//     // 文件上传失败，显示上传出错。
//     uploader.on('uploadError', function (file) {
//         var $li = $('#' + file.id),
//             $error = $li.find('div.error');
//
//         // 避免重复创建
//         if (!$error.length) {
//             $error = $('<div class="error"></div>').appendTo($li);
//         }
//
//         $error.text('上传失败');
//     });
//
//     // 完成上传完了，成功或者失败，先删除进度条。
//     uploader.on('uploadComplete', function (file) {
//         $('#' + file.id).find('.progress').remove();
//     });
//     // 所有文件上传成功后调用
//     uploader.on('uploadFinished', function () {
//         //清空队列
//         uploader.reset();
//     });
// }
function operat_detail(clientId){
  ajax_post("/operation/clientOrder/operationSearch",{
    "clientId":clientId
  },function(res){
    console.log(res);
    if(res.code == 200){
      //关键词
      // $(".pro_message ul li:nth-child(1) .fr").text(res.);
      $(".keyword-content").text(res.data.keyword)
      $(".min-price").text(res.data.minPrice)
      $(".max-price").text(res.data.maxPrice)
      $('.city').text(res.data.city)
      // 大图地址
      $(".pro_message ul li:nth-child(6) .fr a").attr("href",res.data.image);
      //小图地址
      $(".pro_message ul li:nth-child(6) .fr a img").attr("src",res.data.image);
    }else{
      layer.msg(res.msg)
    }
  })
}
function operat(parms,clientId){
    ajax_post("/operation/clientOrder/commit",parms,function(res){
        if(res.code == 200){
          console.log(123);
          layer.msg(res.msg);
            setTimeout(function(){
                window.location.href = "/my_centre/schedule.html?clientId="+clientId
            },2000)
        }else{
            layer.msg(res.msg);            
        }
    })
}