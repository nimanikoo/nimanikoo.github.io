// App Configuration
const API_BASE = 'https://api.github.com/users';
const GITHUB_REPOS_LIMIT = 6;

// State Management
let appData = null;

// ============================================================================
// Data Loading
// ============================================================================

/**
 * Load data from data.json file
 */
async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error(`Failed to load data.json: ${response.status}`);
    }
    appData = await response.json();
    return appData;
  } catch (error) {
    console.error('Error loading data:', error);
    showError('Failed to load personal data');
    return null;
  }
}

// ============================================================================
// Rendering Functions
// ============================================================================

/**
 * Render header information from data
 */
function renderHeader() {
  if (!appData) return;

  const { personal } = appData;

  document.getElementById('navBrand').textContent = personal.name;
  document.getElementById('heroName').textContent = personal.name;
  document.getElementById('heroTitle').textContent = personal.title;
  document.getElementById('heroSubtitle').textContent = personal.subtitle;

  // Contact Links
  document.getElementById('emailLink').href = `mailto:${personal.email}`;
  document.getElementById('githubLink').href = `https://github.com/${personal.github}`;
  document.getElementById('linkedinLink').href = personal.linkedin;

  // Update page title
  document.title = `${personal.name} - ${personal.title}`;
}

/**
 * Render about section
 */
function renderAbout() {
  if (!appData) return;
  document.getElementById('aboutText').textContent = appData.about;
}

/**
 * Render skills section
 */
function renderSkills() {
  if (!appData || !appData.skills) return;

  const skillsGrid = document.getElementById('skillsGrid');
  skillsGrid.innerHTML = '';

  appData.skills.forEach(skillGroup => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';

    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = skillGroup.category;

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'skill-items';

    skillGroup.items.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      itemsContainer.appendChild(tag);
    });

    categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(itemsContainer);
    skillsGrid.appendChild(categoryDiv);
  });
}

/**
 * Render experience section
 */
function renderExperience() {
  if (!appData || !appData.experience) return;

  const experienceList = document.getElementById('experienceList');
  experienceList.innerHTML = '';

  appData.experience.forEach(job => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'experience-item';

    const titleEl = document.createElement('h3');
    titleEl.textContent = job.title;

    const companyEl = document.createElement('div');
    companyEl.className = 'experience-company';
    
    if (job.url) {
      const link = document.createElement('a');
      link.href = job.url;
      link.target = '_blank';
      link.textContent = job.company;
      companyEl.appendChild(link);
    } else {
      companyEl.textContent = job.company;
    }

    const periodEl = document.createElement('div');
    periodEl.className = 'experience-period';
    periodEl.textContent = job.period;

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = job.description;

    itemDiv.appendChild(titleEl);
    itemDiv.appendChild(companyEl);
    itemDiv.appendChild(periodEl);
    itemDiv.appendChild(descriptionEl);

    experienceList.appendChild(itemDiv);
  });
}

/**
 * Render education section
 */
function renderEducation() {
  if (!appData || !appData.education) return;

  const educationList = document.getElementById('educationList');
  if (!educationList) return;
  educationList.innerHTML = '';

  appData.education.forEach(edu => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'experience-item'; // Reuses styles from experience

    const titleEl = document.createElement('h3');
    titleEl.textContent = edu.degree;

    const institutionEl = document.createElement('div');
    institutionEl.className = 'experience-company';
    institutionEl.textContent = edu.institution;

    const periodEl = document.createElement('div');
    periodEl.className = 'experience-period';
    periodEl.textContent = edu.period;

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = edu.description;

    itemDiv.appendChild(titleEl);
    itemDiv.appendChild(institutionEl);
    itemDiv.appendChild(periodEl);
    itemDiv.appendChild(descriptionEl);

    educationList.appendChild(itemDiv);
  });
}

/**
 * Render projects from GitHub API
 */
async function renderProjects() {
  if (!appData) return;

  const { github } = appData.personal;
  const projectsGrid = document.getElementById('projectsGrid');
  const projectsLoading = document.getElementById('projectsLoading');
  const projectsError = document.getElementById('projectsError');

  try {
    const repos = await fetchGitHubRepos(github);
    
    projectsLoading.style.display = 'none';

    if (!repos || repos.length === 0) {
      projectsError.textContent = 'No public repositories found';
      projectsError.style.display = 'block';
      return;
    }

    projectsGrid.innerHTML = '';

    repos.forEach(repo => {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'project-card';

      const nameEl = document.createElement('div');
      nameEl.className = 'project-name';
      nameEl.textContent = repo.name;

      const descriptionEl = document.createElement('p');
      descriptionEl.className = 'project-description';
      descriptionEl.textContent = repo.description || 'No description provided';

      const metaDiv = document.createElement('div');
      metaDiv.className = 'project-meta';

      const languageEl = document.createElement('span');
      languageEl.textContent = repo.language || 'N/A';

      const linkEl = document.createElement('a');
      linkEl.href = repo.html_url;
      linkEl.target = '_blank';
      linkEl.className = 'project-link';
      linkEl.textContent = 'View →';

      metaDiv.appendChild(languageEl);
      metaDiv.appendChild(linkEl);

      cardDiv.appendChild(nameEl);
      cardDiv.appendChild(descriptionEl);
      cardDiv.appendChild(metaDiv);

      projectsGrid.appendChild(cardDiv);
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    projectsLoading.style.display = 'none';
    projectsError.textContent = 'Failed to load projects from GitHub';
    projectsError.style.display = 'block';
  }
}

// ============================================================================
// GitHub API Integration
// ============================================================================

/**
 * Fetch repositories from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Filtered and sorted repositories
 */
async function fetchGitHubRepos(username) {
  try {
    const url = `${API_BASE}/${username}/repos?per_page=100&sort=updated&direction=desc`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    let repos = await response.json();

    // Filter out forks
    repos = repos.filter(repo => !repo.fork);

    // Sort by updated date (already sorted by API, but ensuring it)
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Return top 6
    return repos.slice(0, GITHUB_REPOS_LIMIT);

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
}

// ============================================================================
// Mobile Menu Handling
// ============================================================================

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ============================================================================
// Error Handling
// ============================================================================

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  const projectsError = document.getElementById('projectsError');
  projectsError.textContent = message;
  projectsError.style.display = 'block';
}

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize the application
 */
async function initApp() {
  try {
    // Load data from JSON
    await loadData();

    if (!appData) {
      showError('Failed to initialize application');
      return;
    }

    // Render static sections
    renderHeader();
    renderAbout();
    renderSkills();
    renderExperience();
    renderEducation();

    // Initialize mobile menu
    initMobileMenu();

    // Load projects from GitHub
    renderProjects();

  } catch (error) {
    console.error('Application initialization error:', error);
    showError('Failed to initialize application');
  }
}

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
