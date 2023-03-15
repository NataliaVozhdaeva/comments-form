const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.comments-list');
const commentsArr = [
  { id: 0, author: 'John Dow', date: '2023-03-01 13:05', text: 'Bla-bla-bla bla-bla-bla', isLiked: true },
  { id: 1, author: 'Виталик', date: '2023-03-14 18:13', text: 'опрдукприабтмивалмивдоа влруд куакулдр ауар', isLiked: false },
  { id: 2, author: 'Krya-Krya', date: '2023-03-15 21:33', text: 'Blablablablablabla', isLiked: false },
];

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

commentsArr.forEach((el) => {
  let commentsListItem = document.createElement('li');
  commentsListItem.classList.add('comment');
  commentsList.append(commentsListItem);

  let commentText = document.createElement('p');
  commentText.classList.add('comment-text');
  commentText.textContent = el.text;
  commentsListItem.append(commentText);

  let commentWrapper = document.createElement('div');
  commentWrapper.classList.add('comment-info');
  commentsListItem.append(commentWrapper);

  let commentLikeBtn = document.createElement('button');
  el.isLiked ? (commentLikeBtn.className = 'active comment-like') : (commentLikeBtn.className = 'comment-like');
  commentWrapper.append(commentLikeBtn);

  let commentAuthor = document.createElement('span');
  commentAuthor.classList.add('comment-author');
  commentAuthor.textContent = el.author;
  commentWrapper.append(commentAuthor);

  let now = new Date();
  let commentFullDate = new Date(el.date);
  let index = el.date.indexOf(' ');
  let time = el.date.slice(index);
  let commentDate = document.createElement('span');
  commentDate.classList.add('comment-day');

  commentDate.textContent =
    now.getFullYear() == commentFullDate.getFullYear() && now.getMonth() == commentFullDate.getMonth() && now.getDate() == commentFullDate.getDate()
      ? 'сегодня в ' + time
      : now.getFullYear() == commentFullDate.getFullYear() &&
        now.getMonth() == commentFullDate.getMonth() &&
        now.getDate() - 1 == commentFullDate.getDate()
      ? 'вчера в ' + time
      : el.date;

  commentWrapper.append(commentDate);

  let commentDeleteBtn = document.createElement('button');
  commentDeleteBtn.classList.add('comment-delete');
  commentWrapper.append(commentDeleteBtn);
});

//добавление нового комментария

const newCommentArea = document.querySelector('.comment-input');
const userName = document.querySelector('.name-input');
const dateOfComment = document.querySelector('.date-input');

const submitBtn = document.querySelector('.comment-submit');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault;
  if (!userName.value) {
    document.querySelector('.name-input +.error').hidden = false;
  }
  return;
  //commentsArr.push({ id: commentsArr.length, text: newCommentArea.value });
});

userName.oninput = function () {
  document.querySelector('.name-input +.error').hidden = true;
};
