module.exports = {
  _id: 'fund',
  c: {
    enableFund: false,
    fundName: '科创基金',
    description: '这是基金描述',
    terms: '这是基金协议',
    money: 0,
    readOnly: false,
    closed: {
      status: false,
      openingHours: Date.now(),
      reason: '关闭原因',
      uid: '',
      username: '',
      closingTime: Date.now()
    },
    donationDescription: '赞助说明',
    fundPoolDescription: '资金池介绍'
  }
};
