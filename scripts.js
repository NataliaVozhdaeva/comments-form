const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.comments-list');
const commentsArr = [
  { id: 0, author: 'John Dow', date: '2023-03-01 13:05', text: 'Bla-bla-bla bla-bla-bla', isLiked: true },
  { id: 1, author: 'Виталик', date: '2023-03-14 18:13', text: 'опрдукприабтмивалмивдоа влруд куакулдр ауар', isLiked: false },
  { id: 2, author: 'Krya-Krya', date: '2023-03-15 21:33', text: 'Blablablablablabla', isLiked: false },
];
let currentDate = new Date();

commentsCount.textContent = commentsArr.length;

commentsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('comment-like')) {
    e.target.classList.toggle('active');
  }

  if (e.target.classList.contains('comment-delete')) {
    e.target.closest('.comment').remove();
    commentsCount.textContent = document.querySelectorAll('.comment').length;
  }
});

const createItem = (data) => {
  let commentsListItem = document.createElement('li');
  commentsListItem.classList.add('comment');
  commentsList.append(commentsListItem);

  let commentText = document.createElement('p');
  commentText.classList.add('comment-text');
  commentText.textContent = data.text;
  commentsListItem.append(commentText);

  let commentWrapper = document.createElement('div');
  commentWrapper.classList.add('comment-info');
  commentsListItem.append(commentWrapper);

  let commentLikeBtn = document.createElement('button');
  data.isLiked ? (commentLikeBtn.className = 'active comment-like') : (commentLikeBtn.className = 'comment-like');
  commentWrapper.append(commentLikeBtn);

  let commentAuthor = document.createElement('span');
  commentAuthor.classList.add('comment-author');
  commentAuthor.textContent = data.author;
  commentWrapper.append(commentAuthor);

  let commentFullDate = new Date(data.date);
  let index = data.date.indexOf(' ');
  let time = data.date.slice(index);
  let commentDate = document.createElement('span');
  commentDate.classList.add('comment-day');

  commentDate.textContent =
    currentDate.getFullYear() == commentFullDate.getFullYear() &&
    currentDate.getMonth() == commentFullDate.getMonth() &&
    currentDate.getDate() == commentFullDate.getDate()
      ? 'сегодня, ' + time
      : currentDate.getFullYear() == commentFullDate.getFullYear() &&
        currentDate.getMonth() == commentFullDate.getMonth() &&
        currentDate.getDate() - 1 == commentFullDate.getDate()
      ? 'вчера, ' + time
      : data.date;

  commentWrapper.append(commentDate);

  let commentDeleteBtn = document.createElement('button');
  commentDeleteBtn.classList.add('comment-delete');
  commentWrapper.append(commentDeleteBtn);
};

commentsArr.forEach((el) => {
  createItem(el);
});

//добавление нового комментария

const form = document.querySelector('.new-comment');
const newCommentArea = document.querySelector('.comment-input');
newCommentArea.value = '';
const userName = document.querySelector('.name-input');
const dateOfComment = document.querySelector('.date-input');
//хотя я бы поговорила со страршими товарищами относительно того, стоит ли давать пользователю возможность выбора даты.

const submitBtn = document.querySelector('.comment-submit');

form.onsubmit = function (e) {
  e.preventDefault();
  if (!newCommentArea.value) {
    document.querySelector('.comment-input +.error').hidden = false;
    return false;
  }

  function createCommentDate() {
    return (
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate() +
      ' ' +
      currentDate.getHours().toString().padStart(2, '0') +
      ':' +
      currentDate.getMinutes().toString().padStart(2, '0')
    );
  }

  let date = dateOfComment.value
    ? dateOfComment.value + ' ' + currentDate.getHours().toString().padStart(2, '0') + ':' + currentDate.getMinutes().toString().padStart(2, '0')
    : createCommentDate();
  commentsArr.push({ id: commentsArr.length, author: userName.value, date: date, text: newCommentArea.value, isLiked: false });

  console.log(commentsArr);
  createItem({ id: commentsArr.length, author: userName.value, text: newCommentArea.value, date: date, isLiked: false });

  newCommentArea.value = '';
};

newCommentArea.addEventListener(
  'input',
  () => {
    document.querySelector('.comment-input +.error').hidden = true;
  },
  { once: true }
);
