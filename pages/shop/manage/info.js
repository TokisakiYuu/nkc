var positionObj;
var hasImg = false;
var upLoadFile;
function init() {
	hasImg = true;
	positionObj = undefined;
}

$('#inputFile').on('change', function() {
	var file = $('#inputFile')[0].files[0];
	if(file) {
		upLoadFile = file;
	}
	var reader = new FileReader();
	reader.onload = function() {
		var url = reader.result;
		displayAvatar(url);
	};
	reader.readAsDataURL(upLoadFile)
});

function displayAvatar(url) {
	var html = '<img src="'+url+'" style="width: 100px;height:100px" id="element_id">';
	$('.user-settings-img-dev').html(html);
	init()
}

function submit(storeId) {
	if(!hasImg) {
		return screenTopWarning('请选择图片');
	}
	var formData = new FormData();
	formData.append('file', upLoadFile);
	$.ajax({
		url: '/shopLogo/'+storeId,
		method: 'POST',
		cache: false,
		data: formData,
		headers: {
			'FROM': 'nkcAPI'
		},
		dataType: 'json',
		contentType: false,
		processData: false,
	})
		.done(function() {
			screenTopAlert('保存成功');
		})
		.fail(function(data) {
			screenTopWarning(JSON.parse(data.responseText).error);
		})
}

function saveToInfo(storeId) {
  var post = {};  
	var dealDescription = $("#dealDescription").val().trim();
	var dealAnnouncement = $("#dealAnnouncement").val().trim();
  var location = $("#location").val().trim();
  var address = $("#address").val().trim();
  if(!dealAnnouncement || !dealDescription || !location || !address) {
    screenTopWarning("请完善交易基础设置后再提交")
    return;
	}
	if(dealAnnouncement.length > 500) {
		screenTopWarning("全局公告不得超过500字");
		return;
	}
	if(dealDescription.length > 200) {
		screenTopWarning("供货说明不得超过200字");
		return;
	}
  address = location + "&" + address;
  post = {
    dealDescription: dealDescription,
		address: address,
		dealAnnouncement: dealAnnouncement
  }
  nkcAPI("/shop/manage/"+storeId+"/info", "POST", post)
  .then( function(data){
    screenTopAlert('交易基础设置保存成功');
  })
  .catch( function(data){
    screenTopWarning(data || data.error);
  })
}
