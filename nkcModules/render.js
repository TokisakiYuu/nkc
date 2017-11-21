const render = require('./nkc_render');
const moment = require('moment');
const pug = require('pug');
const jsdiff = require('diff');
const settings = require('../settings');
moment.locale('zh-cn');
let filters = {
  markdown:render.commonmark_render,
  markdown_safe:render.commonmark_safe,
  bbcode:render.bbcode_render,
  thru: function(k){return k},
};
let getCertsInText = (user) => {
  let perm = require('./permissions.js');

  let certs =  perm.calculateThenConcatCerts(user);

  let s = '';
  for(i in certs){
    let cname = perm.getDisplayNameOfCert(certs[i]);
    s+=cname+' ';
  }
  return s;
};

function toQueryString(object) {
  let qs = '';
  for(const key of Object.keys(object)) {
    const value = object[key];
    if(value){
      if(qs === '') qs += key.toString() + '=' + value.toString();
      else qs += '&' + key.toString() + '=' + value.toString();
    }
  }
  return '?' + qs;
}

function htmlDiff(earlier,later){
  let diff = jsdiff.diffChars(earlier,later);
  let outputHTML = '';

  diff.forEach(function(part){
    let stylestr = part.added?'DiffAdded':part.removed?'DiffRemoved':null;
    part.value = render.plain_render(part.value);
    outputHTML += (stylestr?`<span class="${stylestr}">${part.value}</span>`:part.value)
  });

  return outputHTML
}

function testModifyTimeLimit(cs, ownership, toc){

  let smtl = cs.selfModifyTimeLimit;
  let emtl = cs.elseModifyTimeLimit;

  // if you can modify others in 1y,
  // you should be able to do that to yourself,
  // regardless of settings. // wtf r u talking about   wtf r u talking about!!!! --lzszone
  if(smtl<emtl){
    smtl = emtl
  }
  //who dat fuck wrote these fucking codes,
  //--test ownership--
  if(ownership)
    // if he own the post
    return Date.now() < toc.getTime() + smtl;
  return Date.now() < toc.getTime() + emtl
}

let getUserDescription = (user) => {
  return `${user.username}\n`+
    `学术分 ${user.xsf||0}\n`+
    `科创币 ${user.kcb||0}\n`+
    `${getCertsInText(user)}`
};
let dateTimeString = (t) => {
  return moment(t).format('YYYY-MM-DD HH:mm')
};

function dateString(date){
  var dateformat="YYYY-MM-DD HH:mm:ss";

  if(date)//if input contains date
  {
    return moment(date).format(dateformat);
  }
  else
  {
    return moment().format(dateformat);
  }
}
let creditString = (t) => {
  switch (t) {
    case 'xsf':
      return '学术分';
      break;
    case 'kcb':
      return '科创币';
      break;
    default:
      return '[未定义积分]'
  }
};

let fromNow = (time) => {
  return moment(time).fromNow();
};
let pugRender = (template, data) => {
  let options = {
    markdown_safe: render.commonmark_safe,
    markdown: render.commonmark_render,
    getUserDescription: getUserDescription,
    dateTimeString: dateTimeString,
    fromNow: fromNow,
    server: settings.server,
    plain:render.plain_render,
    experimental_render:render.experimental_render,
    toQueryString,
    testModifyTimeLimit,
    dateString,
    creditString,
    htmlDiff
  };
  options.data = data;
  options.filters = filters;
  options.pretty = true; // 保留换行
  return pug.renderFile(template, options);
};
module.exports = pugRender;