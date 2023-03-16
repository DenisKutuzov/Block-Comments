let comments = []

loadComments()

commentId = 0

document
  .getElementById('form-add')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    let commentName = document.getElementById('comment-name')
    let commentBody = document.getElementById('comment-body')
    let commentDate = document.getElementById('comment-date')
    commentId++

    comment = {
      name: commentName.value,
      body: commentBody.value,
      time: commentDate.value,
      id: commentId,
    }
    console.log(comment.time)
    commentName.value = ''
    commentBody.value = ''
    commentDate.value = ''

    comments.push(comment)
    id = comments.indexOf(comment)

    saveComments()

    renderComments(comment)
  })

// Сохраняем коменты в локалсторидж
function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments))
}

// Выгружаем коменты из локалсторидж
function loadComments() {
  if (localStorage.getItem('comments'))
    comments = JSON.parse(localStorage.getItem('comments'))
  showComments()
}
// Достаем все елементы из локалсторидж
function showComments() {
  comments.forEach(function (element) {
    renderComments(element)
  })
}

// Создаем каждый коментарий
function renderComments(comment) {
  let div = document.createElement('div')
  div.classList.add('comments__field')
  div.id = `${arguments[0].id}`

  let divUp = document.createElement('div')
  divUp.classList.add('comments__up')
  div.append(divUp)

  let textName = document.createElement('p')
  textName.classList.add('comments__name')
  textName.innerHTML = `${arguments[0].name}`
  divUp.append(textName)

  let textDate = document.createElement('p')
  textDate.classList.add('comments__date')
  textDate.innerHTML = `${timeConverter(arguments[0].time)}`
  divUp.append(textDate)

  let button = document.createElement('button')
  button.classList.add('comments__btn-remove')
  button.onclick = function () {
    console.log(comment)
    comments = comments.filter((n) => n.id !== comment.id)
    localStorage.setItem('comments', JSON.stringify(comments))
    button.parentElement.parentElement.remove()
  }
  divUp.append(button)

  let textBody = document.createElement('p')
  textBody.classList.add('comments__body')
  textBody.innerHTML = `${arguments[0].body}`
  div.append(textBody)

  let likeButton = document.createElement('button')
  likeButton.classList.add('comments__like')
  likeButton.onclick = function () {
    likeButton.classList.toggle('comments__btn-like')
  }
  div.append(likeButton)

  let commentField = document.getElementById('comment-field')
  commentField.append(div)
}

function timeConverter(t) {
  let months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ]
  console.log(t)
  if (!t) {
    t = Date.now() / 1000
    console.log(t)
    let a = new Date(t * 1000)

    let yars = a.getFullYear()
    let month = months[a.getMonth()]
    let date = a.getDate()
    let hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours()
    let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
    let time = 'Сегодня, ' + hour + ':' + min
    return time
  } else {
    a = new Date(t)
    console.log(a)
    let yars = a.getFullYear()
    let month = months[a.getMonth()]
    let date = a.getDate()
    console.log(date)
    let hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours()
    let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()
    let time = date + ' ' + month + ' ' + yars + ' ' + hour + ':' + min

    let daynow = yars + month + date
    let daytomorow = new Date(Date.now() - 86400000)

    let yarstomorow = daytomorow.getFullYear()
    let monthtomorow = months[daytomorow.getMonth()]
    let datetomorow = daytomorow.getDate()

    daytomorow = yarstomorow + monthtomorow + datetomorow

    if (daynow == daytomorow) {
      return (time = 'Вчера, ' + hour + ':' + min)
    } else {
      console.log(daynow)
      console.log(daytomorow)
      return time
    }
  }
}

// Валидация инпута name

document.getElementById('comment-name').oninput = function () {
  this.value = this.value.substr(0, 15)
}

// Валидация инупута body

document.getElementById('comment-body').oninput = function () {
  this.value = this.value.substr(0, 200)
}
