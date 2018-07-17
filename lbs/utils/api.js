let server = 'http://localhost:7001/web';
server = 'https://www.zhikong4.com/web'
const api = {
  login: `${server}/login`,// 新用户
  locList: `${server}/locList`, //获取用户定位集合
  addLoc: `${server}/addLoc`, // 新增定位
  report: `${server}/report`, // 反馈
  getOpenId: `${server}/getOpenId`, //获取openId
}

module.exports = api;