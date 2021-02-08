const bcrypt = require('bcrypt-nodejs');

const encrypted = '$2a$10$QnDEdADnojmoMkSxmpXqMeLq33Zq2LgvBPJ8nSZc8KbVQDKIUEEti';
const data = '#!ABC123';

const password2 = bcrypt.hashSync(data);
console.log('password 2:', password2);

bcrypt.compare(data, encrypted, (err, result) => {
  if (result === true) {
    console.log('passwords match');
    return;
  }

  if (err) {
    console.log('[ERROR]', err);
    return;
  }

  console.log('Invalid Password Combo');
});
