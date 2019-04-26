
const router = function (url, type, obj) {
  let form = document.createElement('form');
  
  if (obj) {
    console.log(url, obj)
    for(let key in obj) {
      let input = document.createElement('input');
      input.type = 'text'
      input.name = key
      input.value = obj[key]

      form.appendChild(input)
    }
  }
  
  form.action = url
  form.method = type
  document.body.appendChild(form)
  form.submit()
}