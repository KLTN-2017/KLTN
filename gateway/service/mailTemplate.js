const mailSuccessOrder = (listOrder) => {
    let content = `<p style="text-align: center;"><span style="color: rgb(41, 105, 176);"><span style="font-size: 28px;"><strong>X&aacute;c nhận đặt thanh to&aacute;n th&agrave;nh c&ocirc;ng</strong></span></span></p>
<p style="text-align: left;"><br></p>
<div></div>
<p style="text-align: left;"><span style="font-size: 20px;">Cảm ơn bạn đ&atilde; tin tưởng ch&uacute;ng t&ocirc;i !.</span></p>
<p style="text-align: left;"><span style="font-size: 20px;">Danh s&aacute;ch đặt h&agrave;ng của bạn bao gồm:</span></p>
<ul>`
    listOrder.forEach(order => content += `<li style="text-align: left;"><span style="font-size: 20px;">${order.title}</span></li>`)
   content += `</ul>
<p style="text-align: center;"><span style="font-size: 20px;"><span class="text css-1c7zdkb"><em><span style="color: rgb(250, 197, 28);">&copy; 2020 VietTravelUet Global Limited. All rights reserved.<span class="css-3u3jcm">GIT_VERSION</span></span></em></span></span></p>`;
    return content
}
module.exports = mailSuccessOrder