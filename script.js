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

  // File password toggle
  const filePasswordToggle = document.getElementById('filePasswordToggle');
  const filePasswordEyeIcon = document.getElementById('filePasswordEyeIcon');
  const filePasswordInput = document.getElementById('filePassword');
  let isFilePasswordVisible = false;

  filePasswordToggle.addEventListener('click', function() {
    isFilePasswordVisible = !isFilePasswordVisible;
    filePasswordInput.type = isFilePasswordVisible ? 'text' : 'password';
    filePasswordEyeIcon.textContent = isFilePasswordVisible ? '🙈' : '👁️';
  });

  if (fileInput) {
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        const fileCount = this.files.length;
        if (fileCount === 1) {
          fileName.textContent = '✓ Selected: ' + this.files[0].name;
        } else {
          fileName.textContent = `✓ Selected: ${fileCount} files`;
        }
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
  const filePassword = document.getElementById("filePassword").value.trim();
  const fileInput = document.getElementById("file");
  const files = Array.from(fileInput.files);
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

  if (files.length === 0) {
    showUploadStatus('Please select files', 'error');
    return;
  }

  // Check file types and total size
  let totalSize = 0;
  const allowedExtensions = [
    'pdf', 'ppt', 'pptx', 'doc', 'docx', 'txt', 'zip', 'rar',
    'jpg', 'jpeg', 'png', 'mp4', 'xlsx', 'xls'
  ];

  for (const file of files) {
    const extension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      showUploadStatus(`Unsupported file type: ${file.name}`, 'error');
      return;
    }
    totalSize += file.size;
  }

  // Check total size (100MB limit)
  if (totalSize > 100 * 1024 * 1024) {
    showUploadStatus('Total file size must be less than 100MB', 'error');
    return;
  }

  // Show loading state
  uploadBtn.disabled = true;
  btnText.style.opacity = '0';
  uploadSpinner.style.display = 'block';

  const code = generateCode();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 48); // Expire after 48 hours

  try {
    if (files.length > 1 && typeof JSZip === 'undefined') {
      throw new Error('JSZip failed to load. Refresh the page and try again.');
    }

    let finalBlob;
    let finalFileName;
    let fileList = [];

    if (files.length === 1) {
      // Single file
      finalBlob = files[0];
      finalFileName = files[0].name;
      fileList = [{
        name: files[0].name,
        size: files[0].size,
        type: files[0].type
      }];
    } else {
      // Multiple files - create ZIP
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
        fileList.push({
          name: file.name,
          size: file.size,
          type: file.type
        });
      }

      finalBlob = await zip.generateAsync({ type: 'blob' });
      finalFileName = `${subject.replace(/[^a-zA-Z0-9]/g, '_')}_files.zip`;
    }

    const fileData = {
      id: Date.now(),
      subject: subject,
      fileName: finalFileName,
      fileSize: finalBlob.size,
      fileType: files.length === 1 ? files[0].type : 'application/zip',
      code: code,
      blobKey: code,
      password: filePassword || null,
      fileList: fileList, // Store list of files
      isMultiFile: files.length > 1,
      uploadDate: new Date().toISOString(),
      expirationDate: expirationDate.toISOString(),
      uploader: localStorage.getItem('userEmail')
    };

    await saveFileBlob(code, finalBlob);

    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    uploadedFiles.push(fileData);
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

    uploadBtn.disabled = false;
    btnText.style.opacity = '1';
    uploadSpinner.style.display = 'none';

    // Show QR modal if QRCode library is available
    if (typeof QRCode !== 'undefined') {
      showQrModal(code);
    } else {
      showUploadStatus('Upload completed, but QR generator could not load. Refresh and try again.', 'success');
    }

    document.getElementById("subject").value = '';
    document.getElementById("filePassword").value = '';
    fileInput.value = '';

    displayUploadedFiles();
  } catch (error) {
    uploadBtn.disabled = false;
    btnText.style.opacity = '1';
    uploadSpinner.style.display = 'none';
    showUploadStatus(`Upload failed: ${error.message}`, 'error');
    console.error('Upload error:', error);
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

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'fas fa-file-pdf';
    if (['ppt', 'pptx'].includes(ext)) return 'fas fa-file-powerpoint';
    if (['zip', 'rar', '7z'].includes(ext)) return 'fas fa-file-archive';
    if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) return 'fas fa-file-video';
    if (['doc', 'docx'].includes(ext)) return 'fas fa-file-word';
    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) return 'fas fa-file-image';
    if (['xlsx', 'xls', 'csv'].includes(ext)) return 'fas fa-file-excel';
    return 'fas fa-file';
  };

  filesList.innerHTML = userFiles.map(file => {
    const now = new Date();
    const expiration = new Date(file.expirationDate);
    const isExpired = now > expiration;
    const timeLeft = isExpired ? 'Expired' : `Expires: ${expiration.toLocaleString()}`;

    const fileIcon = getFileIcon(file.fileName);
    return `
    <div class="file-item ${isExpired ? 'expired' : ''}">
      <div class="file-info">
        <h4>${file.subject}</h4>
        <p><i class="file-type-icon ${fileIcon}"></i> ${file.fileName} (${formatFileSize(file.fileSize)})</p>
        <p style="color: ${isExpired ? '#ef4444' : '#94a3b8'}; font-size: 0.875rem;">${timeLeft}</p>
        <div class="file-code-display">
          <span class="file-code">Code: ${file.code}</span>
          <button class="copy-btn-small" onclick="copyToClipboard('${file.code}', this)">
              📋 Copy
          </button>
          <button class="qr-icon-btn" onclick="toggleInlineQr('${file.code}')" ${isExpired ? 'disabled' : ''} title="Show QR code">
            <i class="fas fa-qrcode"></i>
          </button>
        </div>
        <div class="file-qr-inline" id="qrInline-${file.code}" style="display: none;">
          <div class="qr-inline-body">
            <div class="qr-inline-code-container" id="qrInlineContainer-${file.code}"></div>
            <div class="qr-inline-actions">
              <button class="qr-inline-action-btn" onclick="downloadInlineQR('${file.code}')">Download QR</button>
            </div>
          </div>
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

  // Show download modal
  showDownloadModal(file);

  let blob = null;
  try {
    // Simulate progress for better UX
    await simulateDownloadProgress(file);

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

      // Browser/device download started
      updateDownloadProgress(100, 'Download started on your device', 0);
      setTimeout(() => {
        closeDownloadModal();
        showSuccessMessage(`Download started: ${file.fileName}. Check your browser downloads.`);
      }, 800);
    } else {
      throw new Error('File data not found');
    }
  } catch (error) {
    console.error('Download error:', error);
    updateDownloadProgress(0, 'Download failed. Please try again.', 0);
    document.getElementById('cancelDownloadBtn').style.display = 'none';
    document.getElementById('retryDownloadBtn').style.display = 'inline-block';
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

function searchFile(autoDownload = false) {
  const codeInput = document.getElementById('downloadCode');
  const code = codeInput.value.trim().toUpperCase();
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
          ${file.isMultiFile ? `<p><strong>Contains:</strong> ${file.fileList.length} files</p>` : ''}
          <p style="color: ${isExpired ? '#ef4444' : '#94a3b8'};">${isExpired ? 'This file has expired' : `Expires: ${expiration.toLocaleString()}`}</p>
          ${file.password ? '<p style="color: #f59e0b;">🔒 This file is password protected</p>' : ''}
          ${isExpired ? '<p style="color: #ef4444;">File is no longer available for download</p>' : `<button class="download-found-btn" onclick="initiateDownload('${file.code}')">Download File</button>`}
          ${file.isMultiFile && !isExpired ? `<button class="preview-btn" onclick="showFileList('${file.code}')">View Files</button>` : ''}
        </div>
      `;

      if (!isExpired && autoDownload) {
        if (file.password) {
          initiateDownload(file.code);
        } else {
          downloadFile(file.code);
        }
      }
    } else {
      showSearchResult('No file found with this code. Please check and try again.', 'not-found');
    }

    // Reset input
    if (!autoDownload) {
      document.getElementById('downloadCode').value = '';
    }
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

// QR Code Modal Functions
function showQrModal(code) {
  const modal = document.getElementById('qrModal');
  const codeText = document.getElementById('qrCodeText');

  // Set the code text
  codeText.textContent = code;

  // Generate QR code
  const qrLink = getShareUrl(code);
  const canvasContainer = document.getElementById('qrCodeContainer');
  canvasContainer.innerHTML = '';

  if (!qrLink) {
    const warning = document.createElement('div');
    warning.className = 'qr-unreachable-warning';
    warning.innerHTML = `
      <p>QR links do not work from localhost or private IPs.</p>
      <p>Please host StudentHub on a public or LAN-accessible address, then regenerate the QR.</p>
      <p><strong>File code:</strong> ${code}</p>
    `;
    canvasContainer.appendChild(warning);
    showUploadStatus('QR cannot be shared because the site is not reachable from other devices.', 'error');
  }

  if (typeof QRCode !== 'undefined' && qrLink) {
    if (typeof QRCode.toCanvas === 'function') {
      const newCanvas = document.createElement('canvas');
      newCanvas.id = 'qrCodeCanvas';
      newCanvas.width = 200;
      newCanvas.height = 200;
      canvasContainer.appendChild(newCanvas);
      QRCode.toCanvas(newCanvas, qrLink, {
        width: 200,
        height: 200,
        color: {
          dark: '#00FFFF',
          light: '#0f172a'
        }
      }, function (error) {
        if (error) {
          console.error(error);
          showUploadStatus('QR generation failed. Please refresh and try again.', 'error');
        }
      });
    } else if (typeof QRCode === 'function') {
      // qrcodejs fallback
      const qrWrapper = document.createElement('div');
      qrWrapper.id = 'qrCodeFallback';
      canvasContainer.appendChild(qrWrapper);
      new QRCode(qrWrapper, {
        text: qrLink,
        width: 200,
        height: 200,
        colorDark: '#00FFFF',
        colorLight: '#0f172a',
        correctLevel: QRCode.CorrectLevel.H
      });
    } else {
      showUploadStatus('QR generator loaded, but could not create QR code.', 'error');
    }
  } else {
    showUploadStatus('QR generator not loaded. Please refresh the page and try again.', 'error');
  }

  // Show modal with animation
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);

  // Store current code for sharing functions
  window.currentShareCode = code;
}

function closeQrModal() {
  const modal = document.getElementById('qrModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function copyCode() {
  const code = window.currentShareCode;
  if (code) {
    navigator.clipboard.writeText(code);
    showSuccessMessage('Code copied to clipboard!');
  }
}

function isLocalHost(hostname) {
  return /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(hostname);
}

function getShareUrl(code) {
  const origin = window.location.origin;
  const hostname = window.location.hostname;
  if (origin.startsWith('file:') || isLocalHost(hostname)) {
    return null;
  }

  return `${origin}${window.location.pathname}?download=${code}`;
}

function copyLink() {
  const code = window.currentShareCode;
  if (code) {
    const url = getShareUrl(code);
    const message = url
      ? `Download the file using this link: ${url}`
      : `Open StudentHub and use code ${code} to download the file.`;

    navigator.clipboard.writeText(message);
    showSuccessMessage('Share text copied to clipboard!');
  }
}

function shareWhatsApp() {
  const code = window.currentShareCode;
  if (code) {
    const url = getShareUrl(code);
    const message = url
      ? `Download my file from StudentHub: ${url}`
      : `Open StudentHub and use code ${code} to download my file.`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}

function downloadQR() {
  const container = document.getElementById('qrCodeContainer');
  const canvas = container.querySelector('canvas');
  const img = container.querySelector('img');
  let dataUrl = null;

  if (canvas) {
    dataUrl = canvas.toDataURL();
  } else if (img) {
    dataUrl = img.src;
  }

  if (dataUrl && window.currentShareCode) {
    const link = document.createElement('a');
    link.download = `qr-code-${window.currentShareCode}.png`;
    link.href = dataUrl;
    link.click();
    showSuccessMessage('QR code downloaded!');
  } else {
    showSuccessMessage('QR code download failed. Please regenerate the QR and try again.', true);
  }
}

function toggleInlineQr(code) {
  const target = document.getElementById(`qrInline-${code}`);
  const allInline = document.querySelectorAll('.file-qr-inline');

  allInline.forEach(el => {
    if (el !== target) {
      el.style.display = 'none';
    }
  });

  if (!target) return;

  const isOpen = target.style.display === 'block';
  if (isOpen) {
    target.style.display = 'none';
    return;
  }

  const container = document.getElementById(`qrInlineContainer-${code}`);
  if (container) {
    container.innerHTML = '';
    const qrLink = getShareUrl(code);

    if (!qrLink) {
      const warning = document.createElement('div');
      warning.className = 'qr-unreachable-warning';
      warning.innerHTML = `
        <p>QR links do not work from localhost or private IPs.</p>
        <p>Host StudentHub on a public or LAN-accessible address and try again.</p>
        <p><strong>File code:</strong> ${code}</p>
      `;
      container.appendChild(warning);
    } else if (typeof QRCode !== 'undefined') {
      if (typeof QRCode.toCanvas === 'function') {
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 160;
        container.appendChild(canvas);
        QRCode.toCanvas(canvas, qrLink, {
          width: 160,
          height: 160,
          color: {
            dark: '#00FFFF',
            light: '#0f172a'
          }
        }, function(error) {
          if (error) {
            console.error(error);
            container.textContent = 'QR generation failed.';
          }
        });
      } else if (typeof QRCode === 'function') {
        const wrapper = document.createElement('div');
        container.appendChild(wrapper);
        new QRCode(wrapper, {
          text: qrLink,
          width: 160,
          height: 160,
          colorDark: '#00FFFF',
          colorLight: '#0f172a',
          correctLevel: QRCode.CorrectLevel.H
        });
      } else {
        container.textContent = 'QR generator unavailable.';
      }
    } else {
      container.textContent = 'QR generator unavailable.';
    }
  }

  target.style.display = 'block';
}

function downloadInlineQR(code) {
  const container = document.getElementById(`qrInlineContainer-${code}`);
  if (!container) return;

  const canvas = container.querySelector('canvas');
  const img = container.querySelector('img');
  let dataUrl = null;

  if (canvas) {
    dataUrl = canvas.toDataURL();
  } else if (img) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    const link = document.createElement('a');
    link.download = `qr-code-${code}.png`;
    link.href = dataUrl;
    link.click();
    showSuccessMessage('QR code downloaded!');
  } else {
    showSuccessMessage('Unable to download QR code. Please open the QR again.', true);
  }
}

function getDownloadCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('download')) {
    return params.get('download').toUpperCase();
  }

  const hash = window.location.hash;
  if (hash.startsWith('#download=')) {
    return hash.substring(10).toUpperCase();
  }

  return null;
}

// Check for download code on page load
window.addEventListener('load', function() {
  const code = getDownloadCodeFromUrl();
  if (code) {
    document.getElementById('downloadCode').value = code;
    document.getElementById('download').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      searchFile(true);
    }, 500);
  }

  const subjectInput = document.getElementById('subject');
  const filePasswordInput = document.getElementById('filePassword');
  if (subjectInput) subjectInput.value = '';
  if (filePasswordInput) filePasswordInput.value = '';
});

// Download Modal Functions
let downloadCancelled = false;
let currentDownloadFile = null;

function showDownloadModal(file) {
  currentDownloadFile = file;
  downloadCancelled = false;

  const modal = document.getElementById('downloadModal');
  const fileName = document.getElementById('downloadFileName');
  const fileSize = document.getElementById('downloadFileSize');
  const cancelBtn = document.getElementById('cancelDownloadBtn');
  const retryBtn = document.getElementById('retryDownloadBtn');

  fileName.textContent = file.fileName;
  fileSize.textContent = formatFileSize(file.fileSize);

  // Reset progress
  updateDownloadProgress(0, 'Preparing download...', 0);
  cancelBtn.style.display = 'inline-block';
  retryBtn.style.display = 'none';

  // Show modal
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function closeDownloadModal() {
  const modal = document.getElementById('downloadModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  currentDownloadFile = null;
  downloadCancelled = false;
}

function updateDownloadProgress(percent, status, speed) {
  const progressFill = document.getElementById('downloadProgressFill');
  const progressPercent = document.getElementById('downloadProgressPercent');
  const progressSpeed = document.getElementById('downloadProgressSpeed');
  const statusText = document.getElementById('downloadStatus');

  progressFill.style.width = `${percent}%`;
  progressPercent.textContent = `${Math.round(percent)}%`;
  progressSpeed.textContent = speed > 0 ? `${speed.toFixed(1)} MB/s` : '';
  statusText.textContent = status;
}

async function simulateDownloadProgress(file) {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const fileSizeMB = file.fileSize / (1024 * 1024);
    const estimatedSpeed = Math.max(1, Math.min(10, fileSizeMB / 2)); // Simulate 1-10 MB/s

    const interval = setInterval(() => {
      if (downloadCancelled) {
        clearInterval(interval);
        reject(new Error('Download cancelled'));
        return;
      }

      progress += Math.random() * 15 + 5; // Random progress increment
      if (progress >= 95) {
        progress = 95;
        clearInterval(interval);
        updateDownloadProgress(95, 'Finalizing download...', estimatedSpeed);
        setTimeout(() => {
          if (!downloadCancelled) {
            resolve();
          }
        }, 500);
        return;
      }

      const currentSpeed = estimatedSpeed * (0.5 + Math.random() * 0.5); // Vary speed
      updateDownloadProgress(progress, 'Downloading...', currentSpeed);
    }, 200);
  });
}

function cancelDownload() {
  downloadCancelled = true;
  closeDownloadModal();
  showSuccessMessage('Download cancelled', true);
}

function retryDownload() {
  if (currentDownloadFile) {
    document.getElementById('retryDownloadBtn').style.display = 'none';
    document.getElementById('cancelDownloadBtn').style.display = 'inline-block';
    downloadFile(currentDownloadFile.code);
  }
}

// Password Modal Functions
let currentPasswordFile = null;

function initiateDownload(code) {
  const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  const file = uploadedFiles.find(f => f.code === code);

  if (file && file.password) {
    // File is password protected
    currentPasswordFile = file;
    showPasswordModal();
  } else {
    // Direct download
    downloadFile(code);
  }
}

function showPasswordModal() {
  const modal = document.getElementById('passwordModal');
  const passwordInput = document.getElementById('downloadPassword');
  const errorDiv = document.getElementById('passwordError');

  // Reset modal
  passwordInput.value = '';
  errorDiv.style.display = 'none';
  passwordInput.style.borderColor = '#334155';

  // Setup password toggle
  const toggleBtn = document.getElementById('downloadPasswordToggle');
  const eyeIcon = document.getElementById('downloadPasswordEyeIcon');
  let isVisible = false;

  toggleBtn.onclick = function() {
    isVisible = !isVisible;
    passwordInput.type = isVisible ? 'text' : 'password';
    eyeIcon.textContent = isVisible ? '🙈' : '👁️';
  };

  // Show modal
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);

  // Focus input
  setTimeout(() => passwordInput.focus(), 100);
}

function closePasswordModal() {
  const modal = document.getElementById('passwordModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  currentPasswordFile = null;
}

function verifyPassword() {
  const passwordInput = document.getElementById('downloadPassword');
  const errorDiv = document.getElementById('passwordError');
  const password = passwordInput.value.trim();

  if (!password) {  
    showPasswordError('Please enter a password');
    return;
  }

  if (currentPasswordFile && password === currentPasswordFile.password) {
    // Password correct
    const downloadCode = currentPasswordFile.code;
    closePasswordModal();
    downloadFile(downloadCode);
  } else {
    // Password incorrect
    showPasswordError('Incorrect password. Please try again.');
    passwordInput.style.borderColor = '#ef4444';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

function showPasswordError(message) {
  const errorDiv = document.getElementById('passwordError');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  // Shake animation
  const modal = document.querySelector('.password-modal-content');
  modal.style.animation = 'shake 0.5s ease';
  setTimeout(() => {
    modal.style.animation = '';
  }, 500);
}

// File List Modal Functions
function showFileList(code) {
  const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  const file = uploadedFiles.find(f => f.code === code);

  if (!file || !file.fileList) {
    showSuccessMessage('File list not available', true);
    return;
  }

  const modal = document.getElementById('fileListModal');
  const content = document.getElementById('fileListContent');

  content.innerHTML = `
    <div class="file-list-header">
      <h4>${file.subject}</h4>
      <p>Total: ${file.fileList.length} files • ${formatFileSize(file.fileSize)}</p>
    </div>
    <div class="file-list-items">
      ${file.fileList.map(item => `
        <div class="file-list-item">
          <div class="file-list-icon">${getFileIcon(item.name)}</div>
          <div class="file-list-info">
            <div class="file-list-name">${item.name}</div>
            <div class="file-list-size">${formatFileSize(item.size)}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Show modal
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function closeFileListModal() {
  const modal = document.getElementById('fileListModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function getFileIcon(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  const iconMap = {
    pdf: '📄',
    ppt: '📊',
    pptx: '📊',
    doc: '📝',
    docx: '📝',
    txt: '📄',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    mp4: '🎥',
    xlsx: '📊',
    xls: '📊',
    zip: '📦',
    rar: '📦'
  };
  return iconMap[extension] || '📄';
}