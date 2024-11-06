
// Fetch and display initial anime data
// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
// Function to handle search
async function searchAnime() {
const query = document.querySelector('input[type="text"]').value;
const apiUrl = `https://api.jikan.moe/v4/anime?q=${query}&limit=20`;

try {
const response = await fetch(apiUrl);
if (!response.ok) throw new Error("Failed to fetch anime data");

const data = await response.json();
displayResults(data.data);
} catch (error) {
console.error("Error:", error);
}
}

// Function to display search results
function displayResults(animeList) {
const resultsContainer = document.getElementById("results");
resultsContainer.innerHTML = ""; // Clear previous results

animeList.forEach((anime) => {
const animeElement = document.createElement("div");
animeElement.classList.add(
  "anime-item",
  "bg-white",
  "rounded-lg",
  "shadow-lg",
  "p-4",
  "m-2",
  "flex",
  "justify-between",
  "gap-2",
  "hover:bg-gray-100",
  "transition-all-0.3s",
  "flex-col",
  "items-center",
  "text-center",
  "w-full",
  "md:w-60"
);

animeElement.innerHTML = `
  <h3 class="text-lg font-semibold text-blue-950 mb-2">${anime.title}</h3>
  <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="rounded-md h-40 w-full object-cover mb-3" />
  <p class="text-sm text-gray-700 font-medium mb-1">Score: ${anime.score ?? "N/A"}</p>
  <p class="text-gray-600 text-xs">${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : "No synopsis available."}</p>
`;

resultsContainer.appendChild(animeElement);
});
}
// Add event listener to the search button
document.querySelector("button").addEventListener("click", searchAnime);
