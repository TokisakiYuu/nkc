!function i(r,n,a){function l(t,e){if(!n[t]){if(!r[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(s)return s(t,!0);throw(o=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",o}o=n[t]={exports:{}},r[t][0].call(o.exports,function(e){return l(r[t][1][e]||e)},o,o.exports,i,r,n,a)}return n[t].exports}for(var s="function"==typeof require&&require,e=0;e<a.length;e++)l(a[e]);return l}({1:[function(e,t,o){"use strict";function n(e,t){var o;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(o=function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return l(e,t)}(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var i=0,t=function(){};return{s:t,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,n=!0,a=!1;return{s:function(){o=e[Symbol.iterator]()},n:function(){var e=o.next();return n=e.done,e},e:function(e){a=!0,r=e},f:function(){try{n||null==o.return||o.return()}finally{if(a)throw r}}}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,i=new Array(t);o<t;o++)i[o]=e[o];return i}NKC.modules.Library=function(){return function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var o=t.lid,i=t.folderId,r=t.tLid,t=t.uploadResourcesId,u=this;u.app=new Vue({el:"#moduleLibrary",data:{uid:NKC.configs.uid,uploadResourcesId:t,pageType:"list",nav:[],folders:[],files:[],lid:o,tLid:r,sort:"time",histories:[],index:0,selectedFiles:[],mark:!1,selectedLibrariesId:[],permission:[],lastHistoryLid:"",selectedCategory:"book",selectedFolder:"",selectedFolderPath:"",listCategories:["book","paper","program","media","other"],categories:[{id:"book",name:"图书"},{id:"paper",name:"论文"},{id:"program",name:"程序"},{id:"media",name:"媒体"},{id:"other",name:"其他"}],protocol:!0},watch:{listCategories:function(){this.saveCategoriesToLocalStorage()}},mounted:function(){i&&this.saveToLocalStorage(i),this.getCategoriesFromLocalStorage();var e=NKC.methods.getFromLocalStorage("libraryVisitFolderLogs")[this.lid],t=this;void 0!==e&&e!==this.lid?this.getList(e).then(function(){t.addHistory(t.lid),t.addFileByRid()}).catch(function(e){t.getListInfo(t.lid)}):this.getListInfo(t.lid),window.CommonModal||(NKC.modules.CommonModal?window.CommonModal=new NKC.modules.CommonModal:sweetError("未引入通用弹框")),window.ResourceInfo||(NKC.modules.ResourceInfo?window.ResourceInfo=new NKC.modules.ResourceInfo:sweetError("未引入资源信息模块")),window.SelectResource||(NKC.modules.SelectResource?window.SelectResource=new NKC.modules.SelectResource:sweetError("未引入资源信息模块")),window.LibraryPath||(NKC.modules.LibraryPath?window.LibraryPath=new NKC.modules.LibraryPath:sweetError("未引入文库路径选择模块")),window.onpopstate=this.onpopstate},computed:{uploading:function(){var e,t=n(this.selectedFiles);try{for(t.s();!(e=t.n()).done;)if("uploading"===e.value.status)return!0}catch(e){t.e(e)}finally{t.f()}},lastFolder:function(){var e=this.nav.length;if(1<e)return this.nav[e-2]},folder:function(){var e=this.nav.length;return 0!==e?this.nav[e-1]:{}},folderList:function(){var t=this.listCategories,e=this.files,o=this.folders,i=this.uid,r=e,r=(r=t.includes("own")&&i?e.filter(function(e){return e.uid===i}):r).filter(function(e){return t.includes(e.category)});return o.concat(r)},uploadedCount:function(){var t=0;return this.selectedFiles.map(function(e){"uploaded"===e.status&&t++}),t},unUploadedCount:function(){var t=0;return this.selectedFiles.map(function(e){"notUploaded"===e.status&&t++}),t}},methods:{getUrl:NKC.methods.tools.getUrl,visitUrl:NKC.methods.visitUrl,format:NKC.methods.format,getSize:NKC.methods.tools.getSize,checkString:NKC.methods.checkData.checkString,scrollTo:NKC.methods.scrollTop,addFileByRid:function(){var e=this.uploadResourcesId;!e||e.length<=0||(e=e.join("-"),nkcAPI("/rs?rid=".concat(e),"GET").then(function(e){e.resources.map(function(e){u.app.selectedFiles.push(u.app.createFile("onlineFile",e))}),u.app.pageType="uploader",u.app.uploadResourcesId=[]}).catch(sweetError))},clearUnUploaded:function(){this.selectedFiles=this.selectedFiles.filter(function(e){return"notUploaded"!==e.status})},selectFilesFolder:function(){var o=this;LibraryPath.open(function(e){var t=e.folder,e=e.path;o.selectedFolder=t,o.selectedFolderPath=e},{lid:this.lid,warning:"该操作将覆盖本页所有设置，请谨慎操作。"})},clearUploaded:function(){this.selectedFiles=this.selectedFiles.filter(function(e){return"uploaded"!==e.status})},markCategory:function(){var t=this.selectedCategory,e=this.selectedFiles;t&&sweetQuestion("该操作将覆盖本页所有设置，请再次确认。").then(function(){e.map(function(e){return e.category=t})}).catch(function(e){})},markFolder:function(){var e,t=this.selectedFolder,o=this.selectedFolderPath,i=this.selectedFiles;t&&(e=this,sweetQuestion("该操作将覆盖本页所有设置，请再次确认。").then(function(){i.map(function(e){e.folder=t,e.folderPath=o}),e.selectedFolder="",e.selectedFolderPath=""}).catch(function(e){}))},onpopstate:function(e){var t=e.state,e=this.lid;t&&t.lid&&(e=t.lid),this.getList(e).catch(function(e){sweetError(e)})},getListInfo:function(e,t){this.getList(e,t).then(function(){u.app.addHistory(e),u.app.addFileByRid()}).catch(function(e){sweetError(e)})},per:function(e){return this.permission.includes(e)},markLibrary:function(){this.mark=!this.mark,this.selectedLibrariesId=[]},markAll:function(){this.selectedLibrariesId.length===this.folderList.length?this.selectedLibrariesId=[]:this.selectedLibrariesId=this.folderList.map(function(e){return e._id})},deleteFolders:function(){this.deleteFolder(this.selectedLibrariesId)},moveFolders:function(){this.moveFolder(this.selectedLibrariesId)},selectPath:function(o){LibraryPath.open(function(e){var t=e.folder,e=e.path;o.folder=t,o.folderPath=e},{lid:o.folder?o.folder._id:""})},createFile:function(e,t){var o=t.folder,i=t.folderPath,r=t._id,n=t.toc,a=t.rid,l=t.category,s=t.name,d=void 0===s?"":s,c=t.oname,s=t.description,s=void 0===s?"":s,n={_id:r,type:e,rid:a,name:d||c,size:t.size,category:l||"",description:s,folder:o||this.folder,folderPath:i||"/"+u.app.nav.map(function(e){return e.name}).join("/"),data:t,toc:n||new Date,status:"notUploaded",disabled:!1,progress:0,error:""};return n.name=n.name.replace(/\..*?$/gi,""),"localFile"===n.type&&(t.type.includes("image")?n.ext="mediaPicture":n.ext="mediaAttachment"),"mediaPicture"===n.ext?(n.error="暂不允许上传图片到文库",n.disabled=!0):209715200<n.size&&(n.error="文件大小不能超过200MB",n.disabled=!0),n},startUpload:function(){this.uploadFile(0,this.selectedFiles)},removeFile:function(e){this.selectedFiles.splice(e,1)},uploadFile:function(e,t){if(!(e>=t.length)){var n=t[e],o=n.status;if(n.disabled||"notUploaded"!==o)return this.uploadFile(e+1,t);n.error="",n.status="uploading",Promise.resolve().then(function(){if(!n)throw"文件异常";if(u.app.checkString(n.name,{minLength:1,maxLength:500,name:"文件名称"}),u.app.checkString(n.description,{minLength:0,maxLength:1e3,name:"文件说明"}),!["media","paper","book","program","other"].includes(n.category))throw"未选择文件分类";if(!n.folder)throw"未选择目录";if("localFile"===n.type)return NKC.methods.getFileMD5(n.data)}).then(function(e){if("localFile"===n.type){var t=new FormData;return t.append("fileName",n.data.name),t.append("type","checkMD5"),t.append("md5",e),nkcUploadFile("/r","POST",t)}}).then(function(e){return!e||e.uploaded||"localFile"!==n.type?e:((e=new FormData).append("file",n.data),nkcUploadFile("/r","POST",e,function(e,t){n.progress=t}))}).then(function(e){if("localFile"===n.type&&(e=e.r,n.data=e,n.ext=e.mediaType,n.rid=e.rid,n.toc=e.toc,n.type="onlineFile","mediaPicture"===n.ext))throw n.disabled=!0,new Error("暂不允许上传图片到文库")}).then(function(){if("modify"===n.type){var e=n._id,t={name:n.name,description:n.description,category:n.category};return nkcAPI("/library/".concat(e),"PUT",t)}var o=n.name,i=n.description,r=n.category,e=n.rid,t=n.folder,r={rid:e,name:o,description:i,category:r};return(new FormData).append("body",JSON.stringify(r)),nkcAPI("/library/".concat(t._id),"POST",r)}).then(function(){n.status="uploaded"}).catch(function(e){n.error=e.error||e.message||e,n.status="notUploaded"}).finally(function(){u.app.uploadFile(e+1,t)})}},back:function(){this.lastFolder&&this.selectFolder(this.lastFolder)},toUpload:function(){this.mark||(this.pageType="uploader")},toList:function(){this.selectFolder(this.folder),this.pageType="list"},saveCategoriesToLocalStorage:function(){var e=this.listCategories,t=NKC.methods.getFromLocalStorage("libraryListCategories");t[this.lid]=e,NKC.methods.saveToLocalStorage("libraryListCategories",t)},getCategoriesFromLocalStorage:function(){var e=NKC.methods.getFromLocalStorage("libraryListCategories")[this.lid];e&&(this.listCategories=e)},saveToLocalStorage:function(e){var t=NKC.methods.getFromLocalStorage("libraryVisitFolderLogs");t[this.lid]=e,NKC.methods.saveToLocalStorage("libraryVisitFolderLogs",t)},addHistory:function(e){var t;this.lastHistoryLid&&this.lastHistoryLid===e||((t=window.location.href).includes("#")&&(t=t.replace(/#.*/gi,"")),window.history.pushState({lid:e},"page",t+"#"+e),this.lastHistoryLid=e)},getList:function(t,o){var e="/library/".concat(t,"?file=true&nav=true&folder=true&permission=true&t=").concat(Date.now());return nkcAPI(e,"GET").then(function(e){u.app.nav=e.nav,u.app.folders=e.folders,u.app.files=e.files,u.app.permission=e.permission,u.app.saveToLocalStorage(t),o&&u.app.scrollTo(null,0)})},selectOnlineFiles:function(){SelectResource.open(function(e){e.resources.map(function(e){u.app.selectedFiles.push(u.app.createFile("onlineFile",e))})},{allowedExt:["attachment","video","audio"],countLimit:99})},selectedLocalFiles:function(){var e=document.getElementById("moduleLibraryInput").files,t=n(void 0===e?[]:e);try{for(t.s();!(o=t.n()).done;){var o=o.value;this.selectedFiles.push(this.createFile("localFile",o))}}catch(e){t.e(e)}finally{t.f()}document.getElementById("moduleLibraryInput").value=""},selectFolder:function(e,t){this.mark||("folder"===e.type?this.getListInfo(e._id,t):this.selectFile(e))},selectNavFolder:function(e){"list"!==this.pageType&&(this.pageType="list"),this.selectFolder(e)},moveFolder:function(e){var e=Array.isArray(e)?e:[e],t={};t.foldersId=e;var o="/library/".concat(this.folder._id,"/list");LibraryPath.open(function(e){t.targetFolderId=e.folder._id,nkcAPI(o,"PUT",t).then(function(e){sweetSuccess("执行成功".concat(e.ignoreCount?"，共有".concat(e.ignoreCount,"个项目因存在冲突或不是你自己发布的而被忽略"):"")),u.app.mark=!1,u.app.selectFolder(u.app.folder)}).catch(function(e){sweetError(e)})},{lid:u.app.folder._id,warning:"此操作不会保留原有目录结构，且不可恢复。"})},editFolder:function(r){var e,t;this.mark||(t=[{dom:"input",type:"text",label:"".concat(e="文件夹","名称"),value:r.name},{dom:"textarea",label:"".concat(e,"简介"),value:r.description}],"file"===r.type&&(e="文件",t.push({dom:"radio",label:"文件分类",radios:[{name:"图书",value:"book"},{name:"论文",value:"paper"},{name:"程序",value:"program"},{name:"媒体",value:"media"},{name:"其他",value:"other"}],value:r.category})),CommonModal.open(function(e){var t=e[0].value,o=e[1].value,i="";if("file"===r.type&&(i=e[2].value),!t)return sweetError("名称不能为空");nkcAPI("/library/"+r._id,"PUT",{name:t,description:o,category:i}).then(function(){u.app.selectFolder(u.app.folder),window.CommonModal.close()}).catch(function(e){sweetError(e)})},{title:"编辑".concat(e),data:t}))},deleteFolder:function(e){(e=Array.isArray(e)?e:[e]).length&&(e=e.join("-"),sweetQuestion("确定要执行删除操作？").then(function(){nkcAPI("/library/".concat(u.app.folder._id,"/list?lid=").concat(e),"DELETE").then(function(e){u.app.mark=!1,u.app.selectFolder(u.app.folder),sweetSuccess("执行成功".concat(e.ignoreCount?"，共有".concat(e.ignoreCount,"个项目因不是你自己发布的而被忽略"):""))}).catch(function(e){sweetError(e)})}).catch(function(){}))},selectFile:function(e){ResourceInfo.open({lid:e._id})},createFolder:function(){this.mark||window.CommonModal.open(function(e){var t=e[0].value,e=e[1].value;if(!t)return sweetError("名称不能为空");nkcAPI("/library/"+u.app.folder._id+"/list","POST",{name:t,description:e}).then(function(){sweetSuccess("文件夹创建成功"),window.CommonModal.close(),u.app.selectFolder(u.app.folder)}).catch(function(e){sweetError(e)})},{title:"新建文件夹",data:[{dom:"input",type:"text",label:"文件夹名称",value:""},{dom:"textarea",label:"文件夹简介",value:""}]})}}})}}()},{}]},{},[1]);
