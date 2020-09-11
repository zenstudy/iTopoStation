fetch('<接口地址>', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: '<请求参数：json字符串>',
})
.then(res => res.blob())
.then(data => {
  let blobUrl = window.URL.createObjectURL(data);
  download(blobUrl);
});
 
function download(blobUrl) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.download = '导出的文件名';
  a.href = blobUrl;
  a.click();
  document.body.removeChild(a);
}
