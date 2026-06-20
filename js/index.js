// Mock Data Fallbacks for Local Testing / Empty Database

const MOCK_PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Web Portal",
        role: "Lead Frontend Developer",
        type: "Production Project",
        description: "แพลตฟอร์มซื้อขายสินค้าออนไลน์ครบวงจร มีหน้าแดชบอร์ดจัดการสต็อกสินค้า ระบบการชำระเงิน และระบบการแจ้งเตือนแบบเรียลไทม์",
        target_audience: "ร้านค้าออนไลน์ทั่วไป",
        problem_solved: "ช่วยลดระยะเวลาขั้นตอนการสั่งซื้อสินค้าให้รวดเร็วขึ้น",
        what_i_learned: "การบริหารจัดการ State และประสิทธิภาพการเรนเดอร์ React",
        tech_stack: "Next.js, Tailwind CSS, Redux, Node.js",
        github_url: "https://github.com",
        is_visible: true
    },
    {
        id: 2,
        title: "Personal Portfolio & Blog",
        role: "Full Stack Developer",
        type: "Personal Project",
        description: "เว็บไซต์พอร์ตโฟลิโอส่วนตัวและเว็บบล็อกเพื่อบันทึกการเรียนรู้ เขียนด้วย React และขับเคลื่อนด้วยระบบคลาวด์จาก Supabase",
        target_audience: "ผู้ที่สนใจเยี่ยมชมผลงานและอ่านบทความไอที",
        problem_solved: "เพิ่มช่องทางนำเสนอตัวตนและทักษะออนไลน์ได้ง่าย",
        what_i_learned: "การตั้งค่าและการเขียนนโยบายความปลอดภัย RLS บน Supabase",
        tech_stack: "React, Supabase REST API, CSS Grid, Tailwind CSS",
        github_url: "https://github.com",
        is_visible: true
    }
];

const MOCK_ACTIVITIES = [
    {
        id: 1,
        title: "Responsive Web Design Certification",
        role: "Certifications",
        description: "freeCodeCamp - หลักสูตรทักษะการออกแบบเว็บแบบตอบสนองต่อผู้ใช้งานทุกอุปกรณ์",
        image_url: "",
        is_visible: true
    },
    {
        id: 2,
        title: "Super AI Engineer Workshop",
        role: "Workshops & Events",
        description: "สมาคมปัญญาประดิษฐ์ประเทศไทย (AIAT) - งานฝึกอบรมพัฒนาทักษะวิศวกรรมปัญญาประดิษฐ์",
        image_url: "",
        is_visible: true
    }
];

// App State
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
            <div class="space-y-6 border-l-2 border-gray-200 pl-4 ml-2">
        `;
        allExperiences.forEach(exp => {
            timelineHTML += `
                <div class="relative">
                    <div class="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div>
                        <span class="text-xs text-gray-400 font-medium">${exp.duration}</span>
                        <h4 class="text-base font-medium text-gray-900 mt-0.5">${exp.role}</h4>
                        <p class="text-xs text-gray-500 font-medium">${exp.company_name}</p>
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
                const tagsHTML = tags.map(tag => `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">${tag}</span>`).join(' ');

                const card = document.createElement('div');
                card.className = "bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 transform opacity-0 scale-95 transition-all duration-300 ease-out";
                card.innerHTML = `
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900">${project.title}</h3>
                            <p class="text-xs text-gray-400 mt-0.5">Role: ${project.role}</p>
                        </div>
                        <span class="bg-gray-900 text-white text-xs px-2.5 py-1 rounded-full font-medium">${project.type}</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">${project.description}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg text-xs text-gray-500 mb-4">
                        <div><strong>🎯 กลุ่มเป้าหมาย:</strong> ${project.target_audience}</div>
                        <div><strong>⚠️ ปัญหาที่แก้ไข:</strong> ${project.problem_solved}</div>
                    </div>
                    <div class="text-xs text-gray-600 border-l-2 border-gray-300 pl-3 my-3 italic">
                        <strong>สิ่งที่ได้เรียนรู้:</strong> ${project.what_i_learned}
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100">
                        <div class="flex flex-wrap gap-1">${tagsHTML}</div>
                        ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="text-xs text-gray-900 font-medium hover:underline">🔗 View GitHub →</a>` : ''}
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
        'Competition Project',
        'Academic Project',
        'Personal Project',
        'Open Source / Contributions'
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
        const baseStyle = "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none";
        
        if (cat === activeCategory) {
            btn.className = `${baseStyle} bg-black text-white shadow-sm`;
        } else {
            btn.className = `${baseStyle} bg-gray-100 text-gray-600 hover:bg-gray-200`;
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
            card.className = "bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4 items-start transform opacity-0 scale-95 transition-all duration-300 ease-out";
            
            let imgHTML = '';
            if (item.image_url) {
                imgHTML = `<img src="${item.image_url}" alt="${item.title}" class="w-12 h-12 rounded object-cover border border-gray-100 shrink-0" />`;
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

// Fetch Work Experiences from Supabase (or Fallback to Mock)
async function fetchExperiences() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/experiences?is_visible=eq.true&order=id.desc`, {
            headers: { 
                "apikey": SUPABASE_KEY, 
                "Authorization": `Bearer ${SUPABASE_KEY}` 
            }
        });
        const experiences = await response.json();

        if (response.ok && Array.isArray(experiences) && experiences.length > 0) {
            allExperiences = experiences;
        } else {
            console.log("Using mock experience data");
            allExperiences = MOCK_EXPERIENCES;
        }
    } catch (e) { 
        console.error("Error fetching experiences, using fallback:", e); 
        allExperiences = MOCK_EXPERIENCES;
    }
}

// Fetch Projects from Supabase (or Fallback to Mock)
async function fetchProjects() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?is_visible=eq.true&order=id.desc`, {
            headers: { 
                "apikey": SUPABASE_KEY, 
                "Authorization": `Bearer ${SUPABASE_KEY}` 
            }
        });
        const projects = await response.json();

        if (response.ok && Array.isArray(projects) && projects.length > 0) {
            allProjects = projects;
        } else {
            console.log("Using mock projects data");
            allProjects = MOCK_PROJECTS;
        }
    } catch (error) {
        console.error("Error fetching projects, using fallback:", error);
        allProjects = MOCK_PROJECTS;
    }
}

// Fetch Self-Development Activities from Supabase (or Fallback to Mock)
async function fetchSelfDevelopment() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/activities?is_visible=eq.true&order=id.desc`, {
            headers: { 
                "apikey": SUPABASE_KEY, 
                "Authorization": `Bearer ${SUPABASE_KEY}` 
            }
        });
        const activities = await response.json();

        if (response.ok && Array.isArray(activities) && activities.length > 0) {
            renderSelfDevelopment(activities);
        } else {
            console.log("Using mock activities data");
            renderSelfDevelopment(MOCK_ACTIVITIES);
        }
    } catch (error) {
        console.error("Error fetching activities, using fallback:", error);
        renderSelfDevelopment(MOCK_ACTIVITIES);
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
