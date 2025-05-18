const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
if (savedData.email) form.elements.email.value = savedData.email;
if (savedData.message) form.elements.message.value = savedData.message;

form.addEventListener('input', event => {
  const { name, value } = event.target;

  const formData = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
    ...savedData,
    [name]: value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Please fill in both fields!');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
