// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Blog data
const blogs = [
    {
        title: "Understanding Data Science Roles",
        description: "Data science is a wide and varied field, with numerous jobs contributing to the data administration, analysis, and application lifecycle.",
        category: "ds",
        link: "https://medium.com/@yourusername/data-science-roles"
    },
    {
        title: "SQL Interview Problems",
        description: "SELECT Statement Explanation with Real Interview Problems and Answers - Leetcode Crack SQL Interview in 50 Qs",
        category: "sql",
        link: "https://medium.com/@yourusername/sql-interview"
    },
    // Add more blogs here
];

// Project modal data (should match the cards)
const projectData = [
  {
    img: 'images/project1.jpg',
    name: 'Telecommunication Commission prediction',
    description: 'A machine learning system that predicts commission values for telecommunication products using historical data. Implements a complete ML pipeline with data versioning, experiment tracking, workflow orchestration, and containerized deployment.',
    details: 'This project leverages Python, DVC, MLFlow, Docker, FastAPI, and Prefect to create a robust, production-ready ML pipeline for telecom commission prediction. It features data versioning, experiment tracking, workflow orchestration, and containerized deployment for reproducibility and scalability.',
    tools: ['Python', 'DVC', 'MLFlow', 'Docker', 'FastAPI', 'Prefect'],
    code: 'https://github.com/yourusername/telecom-commission'
  },
  {
    img: 'images/project2.jpg',
    name: 'End-to-End Fraud Detection',
    description: 'Production-level fraud detection system for digital transactions. Modular code for ingestion, validation, transformation, model training, evaluation, and real-time prediction.',
    details: 'A modular, production-level fraud detection system for digital transactions. Handles ingestion, validation, transformation, model training, evaluation, and real-time prediction. Built with Python, Pandas, Scikit-Learn, Plotly, and Streamlit.',
    tools: ['Python', 'Pandas', 'Scikit-Learn', 'Plotly', 'Streamlit'],
    code: 'https://github.com/yourusername/fraud-detection'
  },
  {
    img: 'images/project3.jpg',
    name: 'WhatsApp Chat Analysis',
    description: 'Analyze WhatsApp group chat data for message patterns, word usage, and group engagement. Visualizes activity with monthly and weekly graphs.',
    details: 'This project uses advanced statistical and data science techniques to analyze WhatsApp group chat data. Provides insights into message patterns, word usage, file sharing, and group engagement. Built with Python, Pandas, Matplotlib, Seaborn, nltk, and Streamlit.',
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'nltk', 'Streamlit'],
    code: 'https://github.com/yourusername/chat-analysis'
  }
];

// Filter functionality
function initializeFilters() {
    // Project filters
    const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
    projectFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            projectFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            filterProjectItems(filter);
        });
    });

    // Blog filters
    const blogFilterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    blogFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            blogFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            filterBlogItems(filter);
        });
    });
}

function filterProjectItems(category) {
    const items = document.querySelectorAll('.project-card');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterBlogItems(category) {
    const items = document.querySelectorAll('.blog-card');
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Helper to get current active filter
function getActiveProjectFilter() {
    const activeBtn = document.querySelector('.project-filters .filter-btn.active');
    return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
}

// Show projects based on filter and showAll state
function showFilteredProjects(filter, showAll) {
    const cards = Array.from(document.querySelectorAll('.project-card'));
    let shown = 0;
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const match = (filter === 'all' || category === filter);
        if (match) {
            if (!showAll && shown >= 6) {
                card.style.display = 'none';
            } else {
                card.style.display = '';
                shown++;
            }
        } else {
            card.style.display = 'none';
        }
    });
}

// Project filter logic
function initializeProjectFilters() {
    const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const showAllBtn = document.getElementById('show-all-projects-btn');
    let showingAll = false;

    function updateShowAllBtn() {
        // Count matching projects
        const filter = getActiveProjectFilter();
        const cards = Array.from(document.querySelectorAll('.project-card'));
        const matchCount = cards.filter(card =>
            filter === 'all' || card.getAttribute('data-category') === filter
        ).length;
        if (matchCount > 6) {
            showAllBtn.style.display = '';
            showAllBtn.textContent = showingAll ? 'Show Less' : 'Show All Projects';
        } else {
            showAllBtn.style.display = 'none';
        }
    }

    projectFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            projectFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showingAll = false;
            const filter = button.getAttribute('data-filter');
            showFilteredProjects(filter, showingAll);
            updateShowAllBtn();
        });
    });

    showAllBtn.addEventListener('click', function() {
        showingAll = !showingAll;
        const filter = getActiveProjectFilter();
        showFilteredProjects(filter, showingAll);
        updateShowAllBtn();
    });

    // Initial state
    showFilteredProjects(getActiveProjectFilter(), showingAll);
    updateShowAllBtn();
}

// Helper to get current active blog filter
function getActiveBlogFilter() {
    const activeBtn = document.querySelector('.blog-filters .filter-btn.active');
    return activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
}

// Show blogs based on filter and showAll state
function showFilteredBlogs(filter, showAll) {
    const cards = Array.from(document.querySelectorAll('.blog-card'));
    let shown = 0;
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const match = (filter === 'all' || category === filter);
        if (match) {
            if (!showAll && shown >= 6) {
                card.style.display = 'none';
            } else {
                card.style.display = '';
                shown++;
            }
        } else {
            card.style.display = 'none';
        }
    });
}

// Blog filter logic
function initializeBlogFilters() {
    const blogFilterButtons = document.querySelectorAll('.blog-filters .filter-btn');
    const loadMoreBtn = document.querySelector('#blogs .load-more-btn');
    let showingAll = false;

    function updateLoadMoreBtn() {
        const filter = getActiveBlogFilter();
        const cards = Array.from(document.querySelectorAll('.blog-card'));
        const matchCount = cards.filter(card =>
            filter === 'all' || card.getAttribute('data-category') === filter
        ).length;
        if (loadMoreBtn) {
            if (matchCount > 6) {
                loadMoreBtn.style.display = '';
                loadMoreBtn.textContent = showingAll ? 'Show Less' : 'Load More Blogs';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    blogFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            blogFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showingAll = false;
            const filter = button.getAttribute('data-filter');
            showFilteredBlogs(filter, showingAll);
            updateLoadMoreBtn();
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            showingAll = !showingAll;
            const filter = getActiveBlogFilter();
            showFilteredBlogs(filter, showingAll);
            updateLoadMoreBtn();
        });
    }

    // Initial state
    showFilteredBlogs(getActiveBlogFilter(), showingAll);
    updateLoadMoreBtn();
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectFilters();
    initializeFilters();
    initializeBlogFilters();

    // Load More Blogs logic (if button exists)
    const loadMoreBlogsBtn = document.querySelector('.load-more-btn');
    if (loadMoreBlogsBtn) {
        loadMoreBlogsBtn.addEventListener('click', function() {
            // Set 'All' filter active in blog-filters
            const allBtn = document.querySelector('.blog-filters .filter-btn[data-filter="all"]');
            document.querySelectorAll('.blog-filters .filter-btn').forEach(btn => btn.classList.remove('active'));
            if (allBtn) allBtn.classList.add('active');
        });
    }
});

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

function isDesktop() {
    return window.innerWidth > 900;
}

function openProjectModal(index) {
    if (!isDesktop()) return;
    const modal = document.getElementById('project-modal');
    const data = projectData[index];
    if (!data) return;
    modal.querySelector('.modal-img').src = data.img;
    modal.querySelector('.modal-img').alt = data.name;
    modal.querySelector('.modal-title').textContent = data.name;
    modal.querySelector('.modal-description').textContent = data.details;
    const toolsDiv = modal.querySelector('.modal-tools');
    toolsDiv.innerHTML = '';
    data.tools.forEach(tool => {
        const span = document.createElement('span');
        span.className = 'skill-pill';
        span.textContent = tool;
        toolsDiv.appendChild(span);
    });
    const codeBtn = modal.querySelector('.modal-code-btn');
    codeBtn.href = data.code;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
} 