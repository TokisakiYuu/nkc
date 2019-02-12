
function submit(fid) {
  try{
    var mergeForumId = getResultForumId();
  }catch(e) {
    return screenTopWarning(e)
  }
  var obj = {
    fid: fid,
    mergeForumId: mergeForumId
  }
	nkcAPI('/f/'+fid+'/settings/merge', 'PATCH', obj)
		.then(function() {
			screenTopAlert('保存成功');
		})
		.catch(function(data) {
			screenTopWarning(data.error || data);
		})

}