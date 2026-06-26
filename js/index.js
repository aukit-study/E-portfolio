let allProjects = [];
let allExperiences = [];
let activeCategory = 'All';

// Render Combined Projects & Experience with entrance animations
function renderCombinedContent() {
    const container = document.getElementById('project-container');
    if (!container) return;

    container.innerHTML = '';

    const showExperience = (activeCategory === 'All' || activeCategory === 'Work Experience');
    const showProjects = (activeCategory !== 'Work Experience');

    // 1. Render Experience
    if (showExperience && allExperiences.length > 0) {
        const expSection = document.createElement('div');
        expSection.className = "mb-10 transform opacity-0 scale-95 transition-all duration-300 ease-out";

        let timelineHTML = `
            <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">Work Experience</h3>
            <div class="space-y-6 border-l-2 border-indigo-200 pl-5 ml-2">
        `;
        allExperiences.forEach(exp => {
            timelineHTML += `
                <div class="relative">
                    <div class="absolute -left-[26px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-400 border-2 border-white shadow-sm"></div>
                    <div class="glass-card-inner p-4">
                        <span class="text-xs text-gray-400 font-medium">${exp.duration}</span>
                        <h4 class="text-base font-semibold text-gray-900 mt-0.5">${exp.role}</h4>
                        <p class="text-xs text-indigo-500 font-medium">${exp.company_name}</p>
                        <p class="text-sm text-gray-600 mt-2 leading-relaxed">${exp.description}</p>
                    </div>
                </div>
            `;
        });
        timelineHTML += `</div>`;
        expSection.innerHTML = timelineHTML;
        container.appendChild(expSection);

        // Animate experience timeline entry
        setTimeout(() => {
            expSection.classList.remove('opacity-0', 'scale-95');
            expSection.classList.add('opacity-100', 'scale-100');
        }, 50);
    }

    // 2. Render Projects
    if (showProjects) {
        const filteredProjects = activeCategory === 'All'
            ? allProjects
            : allProjects.filter(p => p.type === activeCategory);

        if (filteredProjects.length > 0) {
            // Add sub-header for projects if showing 'All' along with experience
            if (activeCategory === 'All' && allExperiences.length > 0) {
                const subHeader = document.createElement('h3');
                subHeader.className = "text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6 mt-8 opacity-0 transition-opacity duration-300";
                subHeader.textContent = "Featured Projects";
                container.appendChild(subHeader);
                setTimeout(() => subHeader.classList.remove('opacity-0'), 100);
            }

            filteredProjects.forEach((project, index) => {
                const tags = project.tech_stack ? project.tech_stack.split(',').map(t => t.trim()) : [];
                const tagsHTML = tags.map(tag => `<span class="skill-tag">${tag}</span>`).join(' ');

                const card = document.createElement('div');
                card.className = "glass-card-inner p-5 mb-2 transform opacity-0 scale-95 transition-all duration-300 ease-out cursor-pointer group";
                
                card.onclick = (e) => {
                    if(e.target.closest('a')) return; // Don't trigger if clicking a link
                    const details = card.querySelector('.project-details');
                    const chevron = card.querySelector('.chevron-icon');
                    details.classList.toggle('hidden');
                    if (details.classList.contains('hidden')) {
                        chevron.classList.remove('rotate-180');
                    } else {
                        chevron.classList.add('rotate-180');
                    }
                };

                card.innerHTML = `
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors flex items-center gap-2">
                                ${project.title}
                                <svg class="chevron-icon w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </h3>
                            <p class="text-xs text-gray-400 mt-0.5">Role: ${project.role}</p>
                        </div>
                        <span class="bg-gray-900 text-white text-xs px-2.5 py-1 rounded-full font-medium shrink-0">${project.type}</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">${project.description}</p>
                    
                    <div class="project-details hidden mt-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/60 border border-gray-200/60 p-3 rounded-xl text-xs text-gray-500 mb-4">
                            <div><strong>🎯 กลุ่มเป้าหมาย:</strong> ${project.target_audience}</div>
                            <div><strong>⚠️ ปัญหาที่แก้ไข:</strong> ${project.problem_solved}</div>
                        </div>
                        <div class="text-xs text-gray-600 border-l-2 border-indigo-300 pl-3 my-3 italic">
                            <strong>สิ่งที่ได้เรียนรู้:</strong> ${project.what_i_learned}
                        </div>
                    </div>
                    
                    <div class="flex flex-wrap items-center justify-between gap-4 pt-3 mt-1 border-t border-gray-100">
                        <div class="flex flex-wrap gap-1">${tagsHTML}</div>
                        ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="text-xs text-gray-900 font-medium hover:underline z-10">🔗 View GitHub →</a>` : ''}
                    </div>
                `;
                container.appendChild(card);

                // Staggered entry animation delay
                const staggerDelay = (activeCategory === 'All' && allExperiences.length > 0) ? 200 : 0;
                setTimeout(() => {
                    card.classList.remove('opacity-0', 'scale-95');
                    card.classList.add('opacity-100', 'scale-100');
                }, staggerDelay + (index * 50));
            });
        } else if (activeCategory !== 'All') {
            const noProjects = document.createElement('p');
            noProjects.className = "text-gray-400 text-sm italic py-4";
            noProjects.textContent = "ไม่มีโปรเจกต์ในหมวดหมู่นี้";
            container.appendChild(noProjects);
        }
    }
}

// Generate the category filter buttons dynamically
function renderCategoryFilters() {
    const filterContainer = document.getElementById('category-filter-container');
    if (!filterContainer) return;

    // Show all categories even if there are no entries
    const categories = [
        'All',
        'Work Experience',
        'Production Project',
        'Academic Project',
        'Personal Project'
    ];

    filterContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.type = 'button';

        let label = cat;
        if (cat === 'All') label = 'ทั้งหมด';
        else if (cat === 'Work Experience') label = 'Work Experience';

        btn.textContent = label;

        // Base button style
        const baseStyle = "filter-btn";

        if (cat === activeCategory) {
            btn.className = `${baseStyle} filter-btn-active`;
        } else {
            btn.className = baseStyle;
        }

        btn.addEventListener('click', () => {
            activeCategory = cat;
            renderCategoryFilters();
            renderCombinedContent();
        });

        filterContainer.appendChild(btn);
    });
}

// Render self-development section (Certifications, Workshops & Events)
function renderSelfDevelopment(activities) {
    const certsContainer = document.getElementById('certifications-container');
    const workshopsContainer = document.getElementById('workshops-container');

    if (!certsContainer || !workshopsContainer) return;

    certsContainer.innerHTML = '';
    workshopsContainer.innerHTML = '';

    // Filter into two groups case insensitively
    const certs = activities.filter(act => {
        const roleLower = (act.role || '').toLowerCase();
        return roleLower === 'certifications' || roleLower === 'certification' || roleLower === 'cert';
    });

    const workshops = activities.filter(act => {
        const roleLower = (act.role || '').toLowerCase();
        return roleLower === 'workshops & events' || roleLower === 'workshop' || roleLower === 'event' || roleLower === 'workshops' || roleLower === 'events';
    });

    // Helper to render items in a column
    const renderList = (items, container, fallbackText) => {
        if (items.length === 0) {
            container.innerHTML = `<p class="text-gray-400 text-sm italic py-2">${fallbackText}</p>`;
            return;
        }

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "glass-card-inner p-4 flex gap-4 items-start transform opacity-0 scale-95 transition-all duration-300 ease-out";

            let imgHTML = '';
            if (item.image_url) {
                imgHTML = `
                    <div class="relative group cursor-pointer shrink-0" onclick="openImageModal('${item.image_url}')">
                        <img src="${item.image_url}" alt="${item.title}" class="w-12 h-12 rounded object-cover border border-gray-100 transition-opacity group-hover:opacity-75" />
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded">
                            <span class="text-white text-xs">🔍</span>
                        </div>
                    </div>
                `;
            } else {
                // Default icon based on type
                const isCert = container === certsContainer;
                imgHTML = `
                    <div class="w-12 h-12 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-lg shrink-0 text-gray-400">
                        ${isCert ? '🏆' : '🎤'}
                    </div>
                `;
            }

            card.innerHTML = `
                ${imgHTML}
                <div class="min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 leading-tight">${item.title}</h4>
                    <p class="text-xs text-gray-500 mt-1.5 leading-relaxed">${item.description || ''}</p>
                </div>
            `;
            container.appendChild(card);

            // Animate card entrance
            setTimeout(() => {
                card.classList.remove('opacity-0', 'scale-95');
                card.classList.add('opacity-100', 'scale-100');
            }, index * 50);
        });
    };

    renderList(certs, certsContainer, 'ยังไม่มีข้อมูลเกียรติบัตร');
    renderList(workshops, workshopsContainer, 'ยังไม่มีข้อมูลการอบรมและสัมมนา');
}

// Fetch Work Experiences from Supabase
async function fetchExperiences() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/experiences?is_visible=eq.true&order=id.desc`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        const experiences = await response.json();

        if (response.ok && Array.isArray(experiences)) {
            allExperiences = experiences;
        } else {
            console.error("Failed to fetch experiences from Supabase");
            allExperiences = [];
        }
    } catch (e) {
        console.error("Error fetching experiences:", e);
        allExperiences = [];
    }
}

// Fetch Projects from Supabase
async function fetchProjects() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?is_visible=eq.true&order=id.desc`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        const projects = await response.json();

        if (response.ok && Array.isArray(projects)) {
            allProjects = projects;
        } else {
            console.error("Failed to fetch projects from Supabase");
            allProjects = [];
        }
    } catch (error) {
        console.error("Error fetching projects:", error);
        allProjects = [];
    }
}

// Fetch Self-Development Activities from Supabase
async function fetchSelfDevelopment() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/activities?is_visible=eq.true&order=id.desc`, {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        });
        const activities = await response.json();

        if (response.ok && Array.isArray(activities)) {
            renderSelfDevelopment(activities);
        } else {
            console.error("Failed to fetch activities from Supabase");
            renderSelfDevelopment([]);
        }
    } catch (error) {
        console.error("Error fetching activities:", error);
        renderSelfDevelopment([]);
    }
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Await core portfolio data
    await Promise.all([fetchExperiences(), fetchProjects()]);

    // Render core portfolio section
    renderCategoryFilters();
    renderCombinedContent();

    // Fetch and render self-development section
    fetchSelfDevelopment();
});

// Image Modal Functions
function openImageModal(url) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    if (!modal || !modalImg) return;
    
    modalImg.src = url;
    modal.classList.remove('hidden');
    // small delay for transition to work
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (!modal) return;
    
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.getElementById('modal-image').src = '';
    }, 300); // match transition duration
}

// Close modal on click outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
});
