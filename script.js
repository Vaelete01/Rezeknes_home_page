function processFile(text) {
    // Remove unnecessary spaces and split into lines
    const lines = text.trim().split('\n').map(line => line.trim());

    if (lines.length < 2) {
        console.error("Invalid file format");
        return "";
    }

    const date = lines[0]; // First line - date
    const title = lines[1]; // Second line - title
    const mainText = lines.slice(2).filter(line => line.trim() !== ''); // Main text without empty lines

    // Generate HTML
    let html = `
        <div class="card">
            <span class="date">${date}</span>
            <div class="card-header">
                <h3 class="card-title">${title}</h3>
            </div>
            <div class="card-body">
    `;

    mainText.forEach(paragraph => {
        html += `<p class="card-text">${paragraph}</p>\n`;
    });

    html += `      </div>
        </div>`;

    return html;
}

// Array of posts
const posts = [
    { date: "22.03.2025", title: "Post 1", content: "Content of post 1" },
    { date: "23.03.2025", title: "Post 2", content: "Content of post 2" },
    { date: "24.03.2025", title: "Post 3", content: "Content of post 3" },
    { date: "25.03.2025", title: "Post 4", content: "Content of post 4" },
    { date: "26.03.2025", title: "Post 5", content: "Content of post 5" },
    { date: "27.03.2025", title: "Post 6", content: "Content of post 6" },
    { date: "28.03.2025", title: "Post 7", content: "Content of post 7" },
    { date: "29.03.2025", title: "Post 8", content: "Content of post 8" },
    { date: "30.03.2025", title: "Post 9", content: "Content of post 9" },
    { date: "31.03.2025", title: "Post 10", content: "Content of post 10" },
    { date: "01.04.2025", title: "Post 11", content: "Content of post 11" },
];

const postsPerPage = 10; // Number of posts per page
let currentPage = 1; // Current page

function displayPosts(page) {
    const container = document.getElementById("announcements-container");
    container.innerHTML = ""; // Clear container

    // Calculate indexes for displaying posts
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, posts.length);

    // Create a document fragment (to reduce re-rendering)
    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i < endIndex; i++) {
        const post = posts[i];

        // Create a card
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.innerHTML = `
            <span class="date">${post.date}</span>
            <div class="card-header">
                <h3 class="card-title">${post.title}</h3>
            </div>
            <div class="card-body">
                <p class="card-text">${post.content}</p>
            </div>
        `;

        fragment.appendChild(card);
    }

    container.appendChild(fragment);
}

function displayPagination() {
    const controls = document.getElementById("pagination-controls");
    controls.innerHTML = ""; // Clear the pagination container

    const totalPages = Math.ceil(posts.length / postsPerPage);

    // "Previous" button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentPage === 1; // Disable if on the first page
    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            updateUI();
        }
    };
    controls.appendChild(prevButton);

    // Current page info
    const pageInfo = document.createElement("span");
    pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
    controls.appendChild(pageInfo);

    // "Next" button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage >= totalPages; // Disable if on the last page
    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateUI();
        }
    };
    controls.appendChild(nextButton);
}

function updateUI() {
    displayPosts(currentPage);
    displayPagination();
}

// Initialization
document.addEventListener("DOMContentLoaded", updateUI);
