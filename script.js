const navToggle = document.querySelector('.nav-toggle'); 
const navLinks = document.querySelector('.nav-links'); 
if (navToggle && navLinks) { 
navToggle.addEventListener('click', () => { 
navLinks.classList.toggle('open'); 
}); 
} 
// Scroll reveal for About cards 
const reveals = document.querySelectorAll('.reveal'); 
const onReveal = () => { 
const trigger = window.innerHeight * 0.85; 
reveals.forEach(el => { 
const top = el.getBoundingClientRect().top; 
if (top < trigger) el.classList.add('visible'); 
}); 
}; 
window.addEventListener('scroll', onReveal); 
window.addEventListener('load', onReveal); 
// Contact form validation 
const contactForm = document.getElementById('contactForm'); 
if (contactForm) { 
contactForm.addEventListener('submit', (e) => { 
e.preventDefault(); 
const name = contactForm.querySelector('#name'); 
const email = contactForm.querySelector('#email'); 
const message = contactForm.querySelector('#message'); 
let valid = true; 
const setErr = (input, msg) => { 
const err = input.parentElement.querySelector('.error'); 
err.textContent = msg || ''; 
if (msg) valid = false; 
}; 
setErr(name, name.value.trim() ? '' : 'Name is required'); 
setErr(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Valid email required'); 
setErr(message, message.value.trim() ? '' : 'Message is required'); 
if (valid) { 
contactForm.reset(); 
contactForm.querySelector('.form-success').textContent = 'Thank you for contacting us!'; 
setTimeout(() => contactForm.querySelector('.form-success').textContent = '', 3000); 
} 
}); 
} 
/* --------------------------- 
Admin dashboard mock data ---------------------------- */ 
const mockReports = [ 
{ 
id: 1, 
image: 'https://images.unsplash.com/photo-15209759222845f7da4f3f1f4?auto=format&fit=crop&w=400&q=60', 
location: 'Park', 
description: 'Litter scattered near playground', 
status: 'Pending' 
}, 
{ 
id: 2, 
image: 'https://images.unsplash.com/photo-15824079473041b1f1b1b1b1b?auto=format&fit=crop&w=400&q=60', 
location: 'Market Street', 
description: 'Dumpster overflowing with garbage', 
status: 'In Progress' 
}, 
{ 
id: 3, 
image: 'https://images.unsplash.com/photo-154283137129b0f74f9713?auto=format&fit=crop&w=400&q=60', 
location: 'Elm Avenue', 
description: 'Garbage dumped on roadside', 
status: 'Cleaned' 
} 
]; 
// Populate admin table and update dropdown 
const adminTable = document.getElementById('adminTable'); 
const updateSelect = document.getElementById('updateSelect'); 
const statusSelect = document.getElementById('statusSelect'); 
const updateBtn = document.getElementById('updateBtn'); 
const updateToast = document.getElementById('updateToast'); 
function renderAdminTable() { 
if (!adminTable) return; 
const tbody = adminTable.querySelector('tbody'); 
tbody.innerHTML = ''; 
mockReports.forEach(r => { 
const tr = document.createElement('tr'); 
tr.innerHTML = ` 
<td><img src="${r.image}" alt="report image" style="width:80px;height:60px;object
f
it:cover;border-radius:.4rem"/></td> 
<td>${r.location}</td> 
<td>${r.description}</td> 
<td>${statusPill(r.status)}</td> 
`; 
tbody.appendChild(tr); 
}); 
} 
function statusPill(s) { 
const map = { 
'Pending': 'status-pending', 
'In Progress': 'status-progress', 
'Cleaned': 'status-cleaned' 
}; 
return `<span class="status-pill ${map[s] || ''}">${s}</span>`; 
} 
function populateUpdateSelect() { 
if (!updateSelect) return; 
updateSelect.innerHTML = '<option value="" disabled selected>Select report</option>'; 
mockReports.forEach(r => { 
const opt = document.createElement('option'); 
opt.value = r.id; 
opt.textContent = `#${r.id} — ${r.location}`; 
updateSelect.appendChild(opt); 
}); 
} 
if (adminTable) { 
renderAdminTable(); 
populateUpdateSelect(); 
adminTable.addEventListener('click', (e) => { 
const btn = e.target.closest('button'); 
if (!btn) return; 
const id = Number(btn.dataset.id); 
const action = btn.dataset.action; 
if (action === 'update' && updateSelect && statusSelect) { 
updateSelect.value = id; 
statusSelect.focus(); 
} 
}); 
if (updateBtn) { 
updateBtn.addEventListener('click', () => { 
const id = Number(updateSelect.value); 
const status = statusSelect.value; 
if (!id) { 
        updateToast.textContent = 'Select a report first.'; 
        setTimeout(() => updateToast.textContent = '', 2000); 
        return; 
      } 
      const item = mockReports.find(r => r.id === id); 
      if (item) { 
        item.status = status; 
        renderAdminTable(); 
        updateToast.textContent = 'Status updated successfully!'; 
        setTimeout(() => updateToast.textContent = '', 2000); 
        // Update stats 
        updateStats(); 
      } 
    }); 
  } 
} 
 
function updateStats() { 
  const total = mockReports.length; 
  const pending = mockReports.filter(r => r.status === 'Pending').length; 
  const progress = mockReports.filter(r => r.status === 'In Progress').length; 
  const cleaned = mockReports.filter(r => r.status === 'Cleaned').length; 
  const sTotal = document.getElementById('statTotal'); 
  const sPending = document.getElementById('statPending'); 
  const sProgress = document.getElementById('statProgress'); 
  const sCleaned = document.getElementById('statCleaned'); 
if (sTotal) sTotal.textContent = total; 
if (sPending) sPending.textContent = pending; 
if (sProgress) sProgress.textContent = progress; 
if (sCleaned) sCleaned.textContent = cleaned; 
} 
updateStats(); 
/* --------------------------- 
User panel interactions ---------------------------- */ 
const userTable = document.getElementById('userTable'); 
const reportForm = document.getElementById('reportForm'); 
const imageInput = document.getElementById('imageInput'); 
const imagePreview = document.getElementById('imagePreview'); 
const locationInput = document.getElementById('locationInput'); 
const descInput = document.getElementById('descInput'); 
const reportToast = document.getElementById('reportToast'); 
let userReports = [ 
{ id: 101, image: mockReports[0].image, location: 'City Park', description: 'Plastic bottles near bench', status: 'In Progress' } 
]; 
function renderUserTable() { 
if (!userTable) return; 
const tbody = userTable.querySelector('tbody'); 
tbody.innerHTML = ''; 
userReports.forEach((r, i) => { 
const tr = document.createElement('tr'); 
tr.innerHTML = ` 
<td>${i + 1}</td> 
<td><img src="${r.image}" alt="report image" style="width:70px;height:50px;object
f
it:cover;border-radius:.4rem"/></td> 
<td>${r.location}</td> 
<td>${r.description}</td> 
<td>${statusPill(r.status)}</td> 
`; 
tbody.appendChild(tr); 
}); 
} 
renderUserTable(); 
// Image preview 
if (imageInput && imagePreview) { 
imageInput.addEventListener('change', () => { 
const file = imageInput.files?.[0]; 
if (!file) { 
imagePreview.textContent = '+ Upload Image'; 
return; 
} 
const reader = new FileReader(); 
reader.onload = (e) => { 
imagePreview.innerHTML = `<img src="${e.target.result}" alt="preview"/>`; 
}; 
reader.readAsDataURL(file); 
}); 
} 
// Report form submit 
if (reportForm) { 
reportForm.addEventListener('submit', (e) => { 
e.preventDefault(); 
let valid = true; 
const setErr = (el, msg) => { 
const err = el.parentElement.querySelector('.error'); 
if (err) err.textContent = msg || ''; 
if (msg) valid = false; 
}; 
setErr(locationInput, locationInput.value.trim() ? '' : 'Location is required'); 
setErr(descInput, descInput.value.trim() ? '' : 'Description is required'); 
// Image optional for demo; uncomment to require 
// setErr(imageInput, imageInput.files.length ? '' : 'Image is required'); 
if (!valid) return; 
const newReport = { 
id: Date.now(), 
image: imagePreview.querySelector('img')?.src || 'https://images.unsplash.com/photo1520975922284-5f7da4f3f1f4?auto=format&fit=crop&w=400&q=60', 
location: locationInput.value.trim(), 
description: descInput.value.trim(), 
status: 'Pending' 
}; 
userReports.unshift(newReport); 
renderUserTable(); 
// Also push to admin mock list for demo coherence 
mockReports.unshift({ 
id: Math.max(...mockReports.map(r => r.id)) + 1, 
image: newReport.image, 
location: newReport.location, 
description: newReport.description, 
status: newReport.status 
}); 
renderAdminTable?.(); 
updateStats?.(); 
reportForm.reset(); 
imagePreview.textContent = '+ Upload Image'; 
reportToast.textContent = 'Report submitted!'; 
setTimeout(() => reportToast.textContent = '', 2000); 
}); 
}

// Admin login credential check (frontend demo)
// Admin login credential check (frontend demo)
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = adminLoginForm.querySelector('input[type="email"]');
    const password = adminLoginForm.querySelector('input[type="password"]');
    let valid = true;

    const setErr = (el, msg) => {
      const err = el.parentElement.querySelector('.error');
      if (err) err.textContent = msg || '';
      if (msg) valid = false;
    };

    // basic field validation
    setErr(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Valid email required');
    setErr(password, password.value.trim().length ? '' : 'Password is required');
    if (!valid) return;

    // credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Vcet@2025';
    const userEmail = 'user@gmail.com';
    const userPassword = 'Vcet@2025';

    if (email.value.trim().toLowerCase() === adminEmail && password.value === adminPassword) {
      // success: redirect to admin dashboard
      window.location.href = 'admin.html';
    } else if (email.value.trim().toLowerCase() === userEmail && password.value === userPassword) {
      // success: redirect to user dashboard
      window.location.href = 'user.html';
    } else {
      // invalid credentials
      setErr(password, 'Invalid credentials');
    }
  });
}

/* ========================
User Login Handler
======================== */
const userLoginForm = document.getElementById('userLoginForm');
if (userLoginForm) {
  userLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = userLoginForm.querySelector('input[type="email"]');
    const password = userLoginForm.querySelector('input[type="password"]');
    let valid = true;

    const setErr = (el, msg) => {
      const err = el.parentElement.querySelector('.error');
      if (err) err.textContent = msg || '';
      if (msg) valid = false;
    };

    // Basic field validation
    setErr(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Valid email required');
    setErr(password, password.value.trim().length ? '' : 'Password is required');
    if (!valid) return;

    // User credentials
    const userEmail = 'user@gmail.com';
    const userPassword = 'Vcet@2025';

    if (email.value.trim().toLowerCase() === userEmail && password.value === userPassword) {
      // Success: redirect to user dashboard
      window.location.href = 'user.html';
    } else {
      // Invalid credentials
      setErr(password, 'Invalid credentials');
    }
  });
}

/* ========================
User Registration Handler
======================== */
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = registerForm.querySelector('input[name="name"]');
    const email = registerForm.querySelector('input[name="email"]');
    const password = registerForm.querySelector('#regPassword');
    const confirm = registerForm.querySelector('#regConfirm');
    let valid = true;

    const setErr = (input, msg) => {
      const err = input.parentElement.querySelector('.error');
      if (err) err.textContent = msg || '';
      if (msg) valid = false;
    };

    // Validation
    setErr(name, name.value.trim().length >= 2 ? '' : 'Name must be at least 2 characters');
    setErr(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Valid email required');
    setErr(password, password.value.length >= 6 ? '' : 'Password must be at least 6 characters');
    setErr(confirm, password.value === confirm.value ? '' : 'Passwords do not match');

    if (!valid) return;

    // Store user in localStorage (frontend demo)
    const users = JSON.parse(localStorage.getItem('ecotrack_users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === email.value.toLowerCase())) {
      setErr(email, 'Email already registered');
      return;
    }

    // Add new user
    users.push({
      name: name.value.trim(),
      email: email.value.trim().toLowerCase(),
      password: password.value
    });

    localStorage.setItem('ecotrack_users', JSON.stringify(users));
    
    // Success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-msg';
    successMsg.textContent = 'Registration successful! Redirecting to login...';
    successMsg.style.cssText = 'color: #27ae60; font-weight: bold; margin-top: 10px; text-align: center;';
    registerForm.appendChild(successMsg);

    setTimeout(() => {
      window.location.href = 'user-login.html';
    }, 2000);
  });
}