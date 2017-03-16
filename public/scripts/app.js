$(() => {
  displayImages()
  $('form').submit(uploadImage)
})

function uploadImage(event) {
  event.preventDefault()
  let img = $('input[type=file]').prop('files')[0]
  let formData = new FormData();
  formData.append("image", img);
  $.ajax({
    url: '/image',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: data => {
      displayImages()
    },
    fail: error => {
      console.log(error)
    }
  });
}

function displayImages() {
  let baseUrl = "https://s3-us-west-2.amazonaws.com/imagedemobucket/"
  $.get('/image')
    .then(result => {
      $('section').html('')
      result.resp.Contents.forEach(image => {
        $('section').append(`<img src="${baseUrl + image.Key}" alt="not an image">`) 
      })
    })
}
