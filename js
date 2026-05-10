// Login functionality
let activeDeleteDialog = null;
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const loginSection = document.querySelector('.login-section');
  const profileSection = document.getElementById('profileSection');
  const navRight = document.querySelector('.nav-right');
  const featurePages = document.getElementById('featurePages');
  const profileBtn = document.getElementById('profileBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const logoutBtn = document.getElementById('logoutBtn');
  const profileName = document.getElementById('profileName');

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  const usernameInput = document.getElementById('username');
  const usernameError = document.getElementById('usernameError');
  const loginBtn = document.querySelector('.login-btn');
  const btnText = document.querySelector('.btn-text');
  const loadingSpinner = document.getElementById('loadingSpinner');

  // File input custom styling
  const fileInput = document.getElementById('file');
  const fileLabel = document.getElementById('fileLabel');
  const fileName = document.getElementById('fileName');

  if (fileInput) {
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        fileName.textContent = '✓ Selected: ' + this.files[0].name;
        fileName.style.display = 'block';
        fileLabel.style.borderStyle = 'solid';
        fileLabel.style.borderColor = '#10b981';
        fileLabel.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
      } else {
        fileName.style.display = 'none';
        fileLabel.style.borderStyle = 'dashed';
        fileLabel.style.borderColor = '#334155';
        fileLabel.style.backgroundColor = '#1e293b';
      }
    });

    // Drag and drop functionality
    fileLabel.addEventListener('dragover', function(e) {
      e.preventDefault();
      fileLabel.classList.add('drag-over');
    });

    fileLabel.addEventListener('dragleave', function() {
      fileLabel.classList.remove('drag-over');
    });

    fileLabel.addEventListener('drop', function(e) {
      e.preventDefault();
      fileLabel.classList.remove('drag-over');
      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        fileInput.files = droppedFiles;
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    });
  }

  // Password visibility toggle
  const passwordToggle = document.getElementById('passwordToggle');
  const eyeIcon = document.getElementById('eyeIcon');
  let isPasswordVisible = false;

  passwordToggle.addEventListener('click', function() {
    isPasswordVisible = !isPasswordVisible;
    // Force custom eye only
passwordInput.setAttribute(
  'type',
  isPasswordVisible ? 'text' : 'password'
);

// Extra fix for browser default eye
passwordInput.style.webkitTextSecurity =
  isPasswordVisible ? 'none' : 'disc';
    eyeIcon.textContent = isPasswordVisible ? '🙈' : '👁️';
  });

  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  if (isLoggedIn === 'true' && userEmail) {
    showLoggedInState(userEmail, userName);
  } else {
    showLoginState();
  }

  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation (at least 8 characters, one uppercase, one lowercase, one number)
  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  // Show error message
  function showError(element, message) {
    element.textContent = message;
    element.style.opacity = '1';
  }

  // Hide error message
  function hideError(element) {
    element.textContent = '';
    element.style.opacity = '0';
  }

  // Show login state
 function showLoginState() {

  // SHOW LOGIN
  loginSection.style.display = 'block';

  // HIDE PROFILE
  profileSection.style.display = 'none';

  // HIDE NAVBAR LINKS BEFORE LOGIN
  const navLinks = document.querySelector('.nav-links');

  if (navLinks) {
    navLinks.style.display = 'none';
  }

  // HIDE FEATURE PAGES
  if (featurePages) {
    featurePages.style.display = 'none';
  }

  // HIDE ALL MAIN CONTENT
  document.querySelector('.hero').style.display = 'none';
  document.querySelector('.feature-section').style.display = 'none';
  document.querySelector('.upload-section').style.display = 'none';
  document.querySelector('.download-section').style.display = 'none';

  // HIDE ABOUT SECTION
  const aboutSection = document.querySelector('.about-content');

  if (aboutSection) {
    aboutSection.style.display = 'none';
  }

  // HIDE FOOTER
  const footer = document.querySelector('.footer');

  if (footer) {
    footer.style.display = 'none';
  }

}
  // Show logged in state
  function showLoggedInState(email, username) {

  // HIDE LOGIN
  loginSection.style.display = 'none';

  // SHOW PROFILE
  profileSection.style.display = 'flex';

  // SHOW NAVBAR LINKS AFTER LOGIN
  const navLinks = document.querySelector('.nav-links');

  if (navLinks) {
    navLinks.style.display = 'flex';
  }

  // HIDE FEATURE PAGES INITIALLY
  if (featurePages) {
    featurePages.style.display = 'none';
  }

  // SET USERNAME
  profileName.textContent = username || 'User';

  // SHOW ALL MAIN CONTENT
  document.querySelector('.hero').style.display = 'block';
  document.querySelector('.feature-section').style.display = 'block';
  document.querySelector('.upload-section').style.display = 'block';
  document.querySelector('.download-section').style.display = 'block';

  // SHOW ABOUT SECTION
  const aboutSection = document.querySelector('.about-content');

  if (aboutSection) {
    aboutSection.style.display = 'block';
  }

  // SHOW FOOTER
  const footer = document.querySelector('.footer');

  if (footer) {
    footer.style.display = 'block';
  }

  // DISPLAY FILES
  displayUploadedFiles();

}
  

  function showFeature(feature) {
    if (!featurePages) return;

    const sectionMap = {
      attendance: 'attendancePage',
      cgpa: 'cgpaPage'
    };

    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.feature-section').style.display = 'none';
    document.querySelector('.upload-section').style.display = 'none';
    document.querySelector('.download-section').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';

    const pageId = sectionMap[feature];
    if (!pageId) return;

    featurePages.style.display = 'block';
    document.querySelectorAll('.feature-page').forEach(page => {
      page.style.display = page.id === pageId ? 'block' : 'none';
    });
  }

  function closeFeaturePage() {
    if (!featurePages) return;
    featurePages.style.display = 'none';
    const currentEmail = localStorage.getItem('userEmail');
    const currentUsername = localStorage.getItem('userName');
    if (currentEmail) {
      showLoggedInState(currentEmail, currentUsername);
    } else {
      showLoginState();
    }
  }

  window.showFeature = showFeature;
  window.closeFeaturePage = closeFeaturePage;
  window.scrollToSection = function(section) {
    const map = {
      home: 'home',
      features: 'features',
      upload: 'upload',
      download: 'download'
    };
    const targetId = map[section];
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Profile dropdown toggle
  profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
    document.querySelector('.dropdown-arrow').style.transform =
      dropdownMenu.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    
    // Position dropdown near profile button on mobile
    if (dropdownMenu.classList.contains('show')) {
      const btnRect = profileBtn.getBoundingClientRect();
      dropdownMenu.style.top = (btnRect.bottom + 8) + 'px';
      dropdownMenu.style.right = window.innerWidth - btnRect.right + 'px';
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!profileSection.contains(e.target)) {
      dropdownMenu.classList.remove('show');
      document.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
    }
  });

  // Logout functionality
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    showLoginState();
    showSuccessMessage('Logged out successfully!');
  });

  // Real-time validation
  usernameInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
      hideError(usernameError);
    } else if (this.value.trim().length < 3) {
      showError(usernameError, 'Username must be at least 3 characters long');
    } else {
      hideError(usernameError);
    }
  });

  emailInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
      hideError(emailError);
    } else if (!validateEmail(this.value)) {
      showError(emailError, 'Please enter a valid email address');
    } else {
      hideError(emailError);
    }
  });

  passwordInput.addEventListener('input', function() {
    if (this.value === '') {
      hideError(passwordError);
    } else if (this.value.length < 8) {
      showError(passwordError, 'Password must be at least 8 characters long');
    } else if (!validatePassword(this.value)) {
      showError(passwordError, 'Password must contain uppercase, lowercase, and number');
    } else {
      hideError(passwordError);
    }
  });

  // Form submission
  loginForm.addEventListener('submit', function(e) {

  e.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  let isValid = true;

  // VALIDATION

  if (username === '') {
    showError(usernameError, 'Username is required');
    isValid = false;
  }

  if (!validateEmail(email)) {
    showError(emailError, 'Enter valid email');
    isValid = false;
  }

  if (!validatePassword(password)) {
    showError(
      passwordError,
      'Password needs uppercase, lowercase and number'
    );
    isValid = false;
  }

  if (!isValid) return;

  // GET USERS
  let users =
    JSON.parse(localStorage.getItem("users") || "{}");

  // USER EXISTS
  if (users[email]) {

    // WRONG PASSWORD
    if (users[email].password !== password) {

      showError(
        passwordError,
        'Wrong password'
      );

      return;
    }

    // LOGIN SUCCESS
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', users[email].username);

    showLoggedInState(
      email,
      users[email].username
    );

    showSuccessMessage(
      'Login successful!'
    );

    loginForm.reset();

    return;
  }

  // NEW ACCOUNT CREATE
  users[email] = {
    username: username,
    password: password
  };

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  // SAVE LOGIN
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', username);

  showLoggedInState(email, username);

  showSuccessMessage(
    'Account created successfully!'
  );

  loginForm.reset();

});

  // Success message function
  window.showSuccessMessage = function(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${isError ? '#ef4444' : '#10b981'};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 300);
    }, 3000);
  };
});

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

function generateCode() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for(let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function openFileDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('StudentHubFiles', 1);

    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'key' });
      }
    };

    request.onsuccess = function(event) {
      resolve(event.target.result);
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  });
}

function saveFileBlob(key, blob) {
  return openFileDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite');
    const store = tx.objectStore('files');
    const request = store.put({ key, blob });

    request.onsuccess = function() {
      resolve();
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  }));
}

function getFileBlob(key) {
  return openFileDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    const request = store.get(key);

    request.onsuccess = function(event) {
      resolve(event.target.result ? event.target.result.blob : null);
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  }));
}

function deleteFileBlob(key) {
  return openFileDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite');
    const store = tx.objectStore('files');
    const request = store.delete(key);

    request.onsuccess = function() {
      resolve();
    };

    request.onerror = function(event) {
      reject(event.target.error);
    };
  }));
}

async function uploadFile() {
  const subject = document.getElementById("subject").value.trim();
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  const uploadBtn = document.querySelector('.upload-btn');
  const btnText = uploadBtn.querySelector('.btn-text');
  const uploadSpinner = document.getElementById('uploadSpinner');
  const uploadStatus = document.getElementById('uploadStatus');

  // Reset status
  uploadStatus.innerHTML = '';
  uploadStatus.className = '';

  // Validation
  if (!subject) {
    showUploadStatus('Please enter a subject name', 'error');
    return;
  }

  if (!file) {
    showUploadStatus('Please select a file', 'error');
    return;
  }

  // Check file type
  const allowedExtensions = [
  'pdf',
  'ppt',
  'pptx',
  'doc',
  'docx',
  'txt',
  'zip',
  'rar',
  'jpg',
  'jpeg',
  'png',
  'mp4',
  'xlsx',
  'xls'
];

const extension = file.name.split('.').pop().toLowerCase();

if (!allowedExtensions.includes(extension)) {
  showUploadStatus('Unsupported file type', 'error');
  return;
}

  // Check file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    showUploadStatus('File size must be less than 10MB', 'error');
    return;
  }

  // Show loading state
  uploadBtn.disabled = true;
  btnText.style.opacity = '0';
  uploadSpinner.style.display = 'block';

  const code = generateCode();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 48); // Expire after 48 hours

  const fileData = {
    id: Date.now(),
    subject: subject,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    code: code,
    blobKey: code,
    uploadDate: new Date().toISOString(),
    expirationDate: expirationDate.toISOString(),
    uploader: localStorage.getItem('userEmail')
  };

  try {
    await saveFileBlob(code, file);

    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    uploadedFiles.push(fileData);
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

    uploadBtn.disabled = false;
    btnText.style.opacity = '1';
    uploadSpinner.style.display = 'none';

    showUploadStatus(`
      <div class="upload-success">
        <p>File uploaded successfully!</p>
        <div class="code-display">
          <strong>Share this code with anyone:</strong>
          <span class="generated-code">${code}</span>
          <button class="copy-btn" onclick="copyToClipboard('${code}', this)">
            📋 Copy
          </button>
        </div>
      </div>
    `, 'success');

    document.getElementById("subject").value = '';
    fileInput.value = '';

    displayUploadedFiles();
  } catch (error) {
    uploadBtn.disabled = false;
    btnText.style.opacity = '1';
    uploadSpinner.style.display = 'none';
    showUploadStatus('Upload failed. Please try again.', 'error');
    console.error('IndexedDB upload error:', error);
  }
}

function showUploadStatus(message, type) {
  const uploadStatus = document.getElementById('uploadStatus');
  uploadStatus.innerHTML = message;
  uploadStatus.className = type;
}

function displayUploadedFiles() {
  const filesList = document.getElementById('filesList');
  let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  const currentUser = localStorage.getItem('userEmail');
  const now = new Date();

  // Remove expired files from storage before rendering
  const validFiles = uploadedFiles.filter(file => {
    const expiration = new Date(file.expirationDate);
    return now <= expiration;
  });

  if (validFiles.length !== uploadedFiles.length) {
    uploadedFiles = validFiles;
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }

  // Filter current user files only
  const userFiles = uploadedFiles.filter(file => file.uploader === currentUser);

  if (userFiles.length === 0) {
    filesList.innerHTML = '<p style="color: #94a3b8; text-align: center;">No files uploaded yet.</p>';
    return;
  }

  filesList.innerHTML = userFiles.map(file => {
    const now = new Date();
    const expiration = new Date(file.expirationDate);
    const isExpired = now > expiration;
    const timeLeft = isExpired ? 'Expired' : `Expires: ${expiration.toLocaleString()}`;

    return `
    <div class="file-item ${isExpired ? 'expired' : ''}">
      <div class="file-info">
        <h4>${file.subject}</h4>
        <p>${file.fileName} (${formatFileSize(file.fileSize)})</p>
        <p style="color: ${isExpired ? '#ef4444' : '#94a3b8'}; font-size: 0.875rem;">${timeLeft}</p>
        <div class="file-code-display">
          <span class="file-code">Code: ${file.code}</span>
          <button class="copy-btn-small" onclick="copyToClipboard('${file.code}', this)">
              📋 Copy
          </button>
        </div>
      </div>
      <div class="file-actions">
        <button class="download-btn" onclick="downloadFile('${file.code}')" ${isExpired ? 'disabled' : ''}>
          ${isExpired ? 'Expired' : 'Download'}
        </button>
        <button class="delete-btn" onclick="deleteFile('${file.code}', '${file.subject}')">
          🗑️ Delete
        </button>
      </div>
    </div>
  `;}).join('');
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function downloadFile(code) {
  const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  const fileIndex = uploadedFiles.findIndex(f => f.code === code);
  const file = uploadedFiles[fileIndex];

  if (!file) {
    showSuccessMessage('File not found.', true);
    return;
  }

  const now = new Date();
  const expiration = new Date(file.expirationDate);
  if (now > expiration) {
    uploadedFiles.splice(fileIndex, 1);
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    if (file.blobKey) {
      await deleteFileBlob(file.blobKey).catch(() => {});
    }
    displayUploadedFiles();
    showSuccessMessage('This file has expired and is no longer available for download.', true);
    return;
  }

  let blob = null;
  if (file.blobKey) {
    blob = await getFileBlob(file.blobKey);
  }

  if (!blob && file.base64Data) {
    const byteString = atob(file.base64Data.split(',')[1]);
    const mimeString = file.base64Data.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    blob = new Blob([ab], { type: mimeString });
  }

  if (blob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccessMessage(`Download completed: ${file.fileName}`);
  } else {
    showSuccessMessage('File not found or corrupted. Please try again.', true);
  }
}

function copyToClipboard(text, button) {

  navigator.clipboard.writeText(text);

  // remove old copied buttons
  document.querySelectorAll('.copy-btn, .copy-btn-small').forEach(btn => {

    if (btn.dataset.copied === "true") {

      btn.innerText = "📋 Copy";
      btn.style.background = "";
      btn.style.color = "";

      btn.dataset.copied = "false";
    }

  });

  // set current button copied
  if (button) {

    button.innerText = "✅ Copied";

    button.style.background = "#10b981";
    button.style.color = "#fff";

    button.dataset.copied = "true";

  }

}

function searchFile() {
  const code = document.getElementById('downloadCode').value.trim().toUpperCase();
  const searchBtn = document.querySelector('.search-btn');
  const btnText = searchBtn.querySelector('.btn-text');
  const searchSpinner = document.getElementById('searchSpinner');
  const searchResult = document.getElementById('searchResult');

  // Reset result
  searchResult.innerHTML = '';
  searchResult.className = '';

  if (!code || code.length !== 6) {
    showSearchResult('Please enter a valid 6-character code', 'not-found');
    return;
  }

  // Show loading state
  searchBtn.disabled = true;
  btnText.style.opacity = '0';
  searchSpinner.style.display = 'block';

  // Simulate search process
  setTimeout(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    // Search by code - any user can download if they have the code
    const file = uploadedFiles.find(f => f.code.toUpperCase() === code.toUpperCase());

    // Hide loading state
    searchBtn.disabled = false;
    btnText.style.opacity = '1';
    searchSpinner.style.display = 'none';

    if (file) {
      const now = new Date();
      const expiration = new Date(file.expirationDate);
      const isExpired = now > expiration;

      searchResult.className = 'found';
      searchResult.innerHTML = `
        <div class="found-file">
          <h4>📄 ${file.subject}</h4>
          <p><strong>File:</strong> ${file.fileName}</p>
          <p><strong>Size:</strong> ${formatFileSize(file.fileSize)}</p>
          <p><strong>Uploaded:</strong> ${new Date(file.uploadDate).toLocaleDateString()}</p>
          <p><strong>Uploaded by:</strong> ${file.uploader}</p>
          <p style="color: ${isExpired ? '#ef4444' : '#94a3b8'};">${isExpired ? 'This file has expired' : `Expires: ${expiration.toLocaleString()}`}</p>
          ${isExpired ? '<p style="color: #ef4444;">File is no longer available for download</p>' : `<button class="download-found-btn" onclick="downloadFile('${file.code}')">Download File</button>`}
        </div>
      `;
    } else {
      showSearchResult('No file found with this code. Please check and try again.', 'not-found');
    }

    // Reset input
    document.getElementById('downloadCode').value = '';
  }, 1500);
}

function showSearchResult(message, type) {
  const searchResult = document.getElementById('searchResult');
  searchResult.innerHTML = `<p>${message}</p>`;
  searchResult.className = type;
}

function calculateAttendance() {
  const total = Number(document.getElementById('totalClasses').value);
  const attended = Number(document.getElementById('attendedClasses').value);
  const target = Number(document.getElementById('targetAttendance').value);
  const result = document.getElementById('attendanceResult');

  if (!total || total <= 0 || attended < 0 || attended > total || target < 0 || target > 100) {
    result.textContent = 'Please enter valid attendance values and target percentage.';
    return;
  }

  const percentage = ((attended / total) * 100).toFixed(2);
  if (percentage >= target) {
    result.innerHTML = `Current attendance is <strong>${percentage}%</strong>. You are already at or above your target.`;
    return;
  }

  if (target === 100) {
    result.innerHTML = `Current attendance is <strong>${percentage}%</strong>. It is not possible to reach 100% attendance after missing a class.`;
    return;
  }

  const neededClasses = Math.max(0, Math.ceil(((target / 100) * total - attended) / (1 - target / 100)));
  result.innerHTML = `Current attendance: <strong>${percentage}%</strong>.<br>To reach <strong>${target}%</strong>, you need to attend at least <strong>${neededClasses}</strong> more class(es) in a row.`;
}

function calculateCgpa() {
  const subjectCount = Number(document.getElementById('subjectCount').value);
  const internalMarks = Number(document.getElementById('internalMarks').value);
  const externalMarks = Number(document.getElementById('externalMarks').value);
  const result = document.getElementById('cgpaResult');

  if (!subjectCount || subjectCount <= 0 || internalMarks < 0 || externalMarks < 0) {
    result.textContent = 'Please enter valid subject count and total marks.';
    return;
  }

  const totalObtained = internalMarks + externalMarks;
  const averagePerSubject = totalObtained / subjectCount;
  const cgpa = Math.min(10, (averagePerSubject / 10)).toFixed(2);

  result.innerHTML = `Based on total marks, your CGPA is <strong>${cgpa}</strong> (out of 10).`;
}

function deleteFile(code, subject) {

  // Remove old popup if exists
  if (activeDeleteDialog) {
    activeDeleteDialog.remove();
    activeDeleteDialog = null;
  }

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "delete-popup-overlay";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "delete-popup-box";

  popup.innerHTML = `
    <div class="delete-popup-icon">🗑️</div>

    <h2 class="delete-popup-title">
      Delete File?
    </h2>

    <p class="delete-popup-text">
      You are about to delete:
    </p>

    <div class="delete-popup-subject">
      ${subject}
    </div>

    <p class="delete-popup-warning">
      This action cannot be undone.
    </p>

    <div class="delete-popup-buttons">

      <button class="cancel-popup-btn">
        Cancel
      </button>

      <button class="confirm-popup-btn">
        Delete File
      </button>

    </div>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  activeDeleteDialog = overlay;

  const cancelBtn = popup.querySelector(".cancel-popup-btn");
  const confirmBtn = popup.querySelector(".confirm-popup-btn");

  // Close popup function
  function closePopup() {
    if (activeDeleteDialog) {
      activeDeleteDialog.remove();
      activeDeleteDialog = null;
    }
  }

  // Cancel button
  cancelBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    closePopup();
  };

  // Confirm delete
confirmBtn.onclick = async function(e) {

    e.preventDefault();
    e.stopPropagation();

    confirmBtn.disabled = true;

    let uploadedFiles =
      JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

    const fileToDelete = uploadedFiles.find(file => file.code === code);
    if (fileToDelete && fileToDelete.blobKey) {
      await deleteFileBlob(fileToDelete.blobKey).catch(() => {});
    }

    uploadedFiles = uploadedFiles.filter(
      file => file.code !== code
    );

    localStorage.setItem(
      "uploadedFiles",
      JSON.stringify(uploadedFiles)
    );

    displayUploadedFiles();

    closePopup();

    showSuccessMessage(`✓ ${subject} deleted successfully!`);
  };

  // Close on outside click
  overlay.onclick = function(e) {
    if (e.target === overlay) {
      closePopup();
    }
  };

  // ESC key close
  function escClose(e) {
    if (e.key === "Escape") {
      closePopup();
      document.removeEventListener("keydown", escClose);
    }
  }

  document.addEventListener("keydown", escClose);
}

function goToUploads() {

  dropdownMenu.classList.remove('show');

  const uploadSection = document.getElementById('uploadedFiles');

  if (uploadSection) {
    uploadSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function openProfileSettings() {
  alert("Profile Settings Coming Soon!");
}

function goToUploads() {

  const uploadsSection =
    document.getElementById("filesList");

  if (uploadsSection) {
    uploadsSection.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function changeUsername() {

  const overlay = document.createElement("div");

  overlay.className = "custom-popup-overlay";

  overlay.innerHTML = `

    <div class="custom-popup-box">

      <button class="popup-close-btn">
        ✖
      </button>

      <div class="custom-popup-icon">👤</div>

      <h2>Change Username</h2>

      <input
        type="text"
        id="newUsernameInput"
        placeholder="Enter new username"
        class="popup-input"
      >

      <button class="custom-popup-btn">
        Save Username
      </button>

    </div>

  `;

  document.body.appendChild(overlay);

  // CLOSE
  overlay.querySelector(".popup-close-btn")
    .onclick = () => overlay.remove();

  // SAVE
  overlay.querySelector(".custom-popup-btn")
    .onclick = () => {

      const input =
        document.getElementById("newUsernameInput");

      const newName =
        input.value.trim();

      if (!newName) return;

      document.getElementById("profileName")
        .textContent = newName;

      localStorage.setItem(
        "customUsername",
        newName
      );

      overlay.remove();

      closeDropdownMenu();

      showCustomPopup(
        "✅ Username Updated",
        "Your username updated successfully!"
      );

    };

}

function showFavorites() {
  alert("Favorite Files feature coming soon!");
}

function showStorageInfo() {

  const uploadedFiles =
    JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

  let total = 0;

  uploadedFiles.forEach(file => {
    total += file.fileSize;
  });

  const mb = (total / (1024 * 1024)).toFixed(2);

  showCustomPopup(
    "💾 Storage Info",
    `You are currently using ${mb} MB storage.`
  );
}

function showAbout() {

  showCustomPopup(
    "📘 About StudentHub",
`


• Upload Files <br>
• Download Using Code <br>
• Attendance Calculator <br>
• CGPA Calculator <br>
• Favorite Files
<br><br>
🚀 Made for students with modern UI. <br>
❤️ Built with passion.
`
  );

}

function customAlert(title, message) {

  const oldAlert =
    document.querySelector(".custom-alert");

  if (oldAlert) oldAlert.remove();

  const alertBox =
    document.createElement("div");

  alertBox.className = "custom-alert";

  alertBox.innerHTML = `
    <div class="custom-alert-box">

      <h2>${title}</h2>

      <p>${message}</p>

      <button onclick="this.parentElement.parentElement.remove()">
        OK
      </button>

    </div>
  `;

  document.body.appendChild(alertBox);
}


// BEAUTIFUL CUSTOM POPUP
function showCustomPopup(title, message) {

  // Remove old popup
  const oldPopup = document.querySelector(".custom-popup-overlay");
  if (oldPopup) oldPopup.remove();

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "custom-popup-overlay";

  // Create popup
  const popup = document.createElement("div");
  popup.className = "custom-popup-box";

  popup.innerHTML = `
    

    

    <h2 class="popup-title">${title}</h2>

    <div class="popup-message">
      ${message}
    </div>

    <button class="popup-ok-btn">
Done ✓
    </button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Buttons
  const okBtn = popup.querySelector(".popup-ok-btn");
  const closeBtn = popup.querySelector(".popup-close-btn");

  // Close function
  function closePopup() {
    overlay.style.opacity = "0";

    setTimeout(() => {
      overlay.remove();

      // IMPORTANT
      // Hide dropdown after popup close
      const dropdownMenu = document.getElementById("dropdownMenu");

      if (dropdownMenu) {
        dropdownMenu.classList.remove("show");
      }

    }, 300);
  }

  // OK button
  okBtn.onclick = function() {
    closePopup();
  };

  // Close button
  closeBtn.onclick = function() {
    closePopup();
  };

  // Outside click close
  overlay.onclick = function(e) {
    if (e.target === overlay) {
      closePopup();
    }
  };

  // ESC close
  document.addEventListener("keydown", function escClose(e) {
    if (e.key === "Escape") {
      closePopup();
      document.removeEventListener("keydown", escClose);
    }
  });

  // Animation
  setTimeout(() => {
    overlay.style.opacity = "1";
  }, 10);
}

// LOAD SAVED USERNAME
window.addEventListener("DOMContentLoaded", () => {

  const savedName =
    localStorage.getItem("customUsername");

  if (savedName) {
    document.getElementById("profileName").textContent =
      savedName;
  }

});

// LOAD SAVED PROFILE PHOTO
window.addEventListener("DOMContentLoaded", () => {

  const savedPhoto =
    localStorage.getItem("profilePhoto");

  if (savedPhoto) {

    const image =
      document.getElementById("profileImage");

    const icon =
      document.getElementById("defaultProfileIcon");

    image.src = savedPhoto;

    image.style.display = "block";

    icon.style.display = "none";
  }

});


function closeDropdownMenu() {

  const dropdown =
    document.getElementById("dropdownMenu");

  if (dropdown) {
    dropdown.classList.remove("show");
  }

}


function forgotPassword() {
  const overlay = document.createElement("div");
  overlay.className = "custom-popup-overlay";

  overlay.innerHTML = `
    <div class="custom-popup-box">
      <button class="popup-close-btn">✖</button>
      <div class="custom-popup-icon">🔐</div>
      <h2>Reset Password</h2>

      <input
        type="email"
        id="forgotEmail"
        placeholder="Enter your email"
        class="popup-input"
      />

      <div class="popup-input-group">
        <input
          type="password"
          id="forgotNewPassword"
          placeholder="Enter new password"
          class="popup-input"
        />
        <button type="button" class="popup-password-toggle" id="forgotPasswordToggle">
          <span class="popup-eye-icon" id="forgotEyeIcon">👁️</span>
        </button>
      </div>

      <div class="password-rules">
        • 8+ characters<br>
        • Uppercase letter<br>
        • Lowercase letter<br>
        • Number required
      </div>

      <button class="custom-popup-btn">Reset Password</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const forgotPasswordToggle = overlay.querySelector('#forgotPasswordToggle');
  const forgotEyeIcon = overlay.querySelector('#forgotEyeIcon');
  const forgotNewPasswordInput = overlay.querySelector('#forgotNewPassword');
  let isForgotPasswordVisible = false;

  forgotPasswordToggle.addEventListener('click', function(e) {
    e.preventDefault();
    isForgotPasswordVisible = !isForgotPasswordVisible;
    forgotNewPasswordInput.type = isForgotPasswordVisible ? 'text' : 'password';
    forgotEyeIcon.textContent = isForgotPasswordVisible ? '🙈' : '👁️';
  });

  overlay.querySelector(".popup-close-btn").onclick = () => overlay.remove();

  overlay.querySelector(".custom-popup-btn").onclick = () => {
    const email = document.getElementById("forgotEmail").value.trim().toLowerCase();
    const newPassword = document.getElementById("forgotNewPassword").value.trim();
    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[email]) {
      showCustomPopup("❌ Email Not Found", "No account exists with this email.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      showCustomPopup(
        "❌ Invalid Password",
        "Use uppercase, lowercase and number with 8+ characters."
      );
      return;
    }

    users[email].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    overlay.remove();
    showCustomPopup("✅ Password Updated", "Your password changed successfully!");
  };
}