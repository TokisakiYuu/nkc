var dataStr = $('.hidden').text();
var data = JSON.parse(dataStr);
var forumList = data.forums;
var subscribeForums = data.subscribeForums;

$(function() {
	displayForum();
});

function getForumInfo(id) {
	for(var i = 0; i < forumList.length; i++) {
		var forum = forumList[i];
		if(forum.children.length !== 0) {
			for(var j = 0; j < forum.children.length; j++) {
				var childForum = forum.children[j];
				if(id === childForum.fid) {
					return {
						id: id,
						color: childForum.color,
						description: childForum.description,
						displayName: childForum.displayName
					}
				}
			}
		}
	}
}


function chooseForum(id) {
	if(subscribeForums.indexOf(id) === -1) {
		subscribeForums.push(id);
		displayForum();
	} else {
		screenTopWarning('请勿重复选择。');
	}
}
function removeForum(id) {
	for(var i = 0; i < subscribeForums.length; i++) {
		var index = subscribeForums.indexOf(id);
		if(index !== -1) {
			subscribeForums.splice(index ,1);
			displayForum();
			break;
		}
	}
}
function displayForum() {
	var $chose = $('.forum-chose');
	$chose.html('');
	for(var i = 0; i < subscribeForums.length; i++) {
		var forum = getForumInfo(subscribeForums[i]);
		var $mask = $('<div class="mask glyphicon glyphicon-minus"></div>');
		var $span = $('<span class="forum-span"></span>');
		$span.attr({
			onclick: 'removeForum("'+forum.id+'")',
			title: forum.description
		}).css('background-color', forum.color).text(forum.displayName).append($mask);
		$chose.append($span);
	}
}