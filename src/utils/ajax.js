
function ajax(options) {
  const { name,file,action,onError,onSuccess,onProgress } = options
  const xhr = new XMLHttpRequest()
  const data = new FormData()
  data.append(name,file)
  xhr.onerror = function(err) {
    onError(err)
  }
  xhr.onload = function() {
    let text = xhr.responseText || xhr.response
    onSuccess(JSON.parse(text))
  }
  xhr.upload.onprogress = function(event) {
    if(event.total > 0) {
      event.percent = event.loaded / event.total * 100
    }
    onProgress(event)
  }
  xhr.open("post",action,true)
  xhr.send(data)
  return xhr
}

export default ajax