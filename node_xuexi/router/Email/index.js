
var nodemailer = require('nodemailer')

module.exports =  function (email, txt, emailObj) {
  let transporter = nodemailer.createTransport({
    // @ts-ignore
    host: 'smtp.qq.com', 
    port: 465, 
    auth: {
      user: '1771872709@qq.com',//你的邮箱
      pass: 'aqojaonqtizsdbjh',
    }
  });

  console.log(email)
  
  let mailOptions = {
    from: '潇潇的个人项目<1771872709@qq.com>',
    to: email, 
    subject: 'Hello', 
    text: txt, 
  };

  mailOptions = emailObj ? emailObj : mailOptions
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}