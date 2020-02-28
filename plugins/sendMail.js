const nodemailer = require("nodemailer");
async function sendMail(email, code) {
  //code = (parseInt(Math.random()*10000) + "").padStart(4, '0')
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "comonhuang@qq.com", // generated ethereal user
      pass: "osrprkmvuudogggi" // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: '"test" <comonhuang@qq.com>', // sender address
    to: email, // list of receivers
    subject: "注册验证码", // Subject line
    //text: "Hello world?", // plain text body
    html: `<b>你的注册验证码是${code}，五分钟后失效</b>` // html body
  });
  return info
}
module.exports = sendMail