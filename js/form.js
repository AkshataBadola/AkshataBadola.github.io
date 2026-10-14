/* ==========================================================================
   form.js — Client-side contact form validation + mailto fallback.
   This is a static site, so the form opens the user's mail client with
   a pre-filled message. It does NOT send mail on its own.
   ========================================================================== */

(function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const RECIPIENT = form.dataset.recipient || 'akshatabadola@gmail.com';

  const fields = {
    name:    form.querySelector('[name="name"]'),
    email:   form.querySelector('[name="email"]'),
    subject: form.querySelector('[name="subject"]'),
    message: form.querySelector('[name="message"]')
  };

  function setError(input, msg) {
    const wrap = input.closest('.form-field');
    const err  = wrap.querySelector('.form-error');
    wrap.classList.toggle('has-error', !!msg);
    err.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validate() {
    let ok = true;
    if (!fields.name.value.trim()) { setError(fields.name, 'Please tell me your name.'); ok = false; }
    else setError(fields.name, '');

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(fields.email.value.trim())) {
      setError(fields.email, 'Please enter a valid email address.');
      ok = false;
    } else setError(fields.email, '');

    if (fields.message.value.trim().length < 10) {
      setError(fields.message, 'Message is a bit short — a sentence or two is lovely.');
      ok = false;
    } else setError(fields.message, '');
    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(fields.subject.value.trim() || 'Hello from your portfolio');
    const bodyRaw =
`${fields.message.value.trim()}

— ${fields.name.value.trim()}
(${fields.email.value.trim()})`;
    const body = encodeURIComponent(bodyRaw);
    const mail = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    window.location.href = mail;

    // Visual confirmation (we honestly can't confirm the user hits send)
    window.showToast && window.showToast('Opening your email app — press Send to finish.');
  });

  // Live-clear errors as the user types
  Object.values(fields).forEach(input => {
    input.addEventListener('input', () => {
      if (input.closest('.form-field').classList.contains('has-error')) validate();
    });
  });
})();
