
var nodemailer = require('nodemailer')

module.exports =  function (email, txt, emailObj) {
  return new Promise((resolve, reject)=> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', 
      port: 465, 
      auth: {
        user: '1771872709@qq.com',//你的邮箱
        pass: 'catokgfdcoqzebje',
      }
    });

    const mailOptions = emailObj || {
      from: '潇潇的个人项目<1771872709@qq.com>',
      to: email, 
      subject: '找回密码', 
      text: txt, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) { 
        console.log('邮件发送失败：%s', error);
        reject('邮件发送失败！')
      } else {
        console.log('邮件已发送: %s', info.messageId);
        resolve('邮件已发送！')
      }
    });
  })
}