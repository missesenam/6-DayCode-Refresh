const form = document.getElementById("moodForm");
const input = document.getElementById("moodInput");
const grid = document.getElementById("imageGrid");

const accessKey = "kXllzlVxNA2Q4v6vZynI5ZoP-V7zgucmwGxH-0vQP9w";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const mood = input.value.trim().toLowerCase();
  if (!mood) return;

  grid.innerHTML = "";

  fetchMoodImages(mood);
});

async function fetchMoodImages(mood) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${mood}&per_page=6&client_id=${accessKey}`
    );
    const data = await response.json();
    data.results.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.urls.small;
      img.alt = image.alt_description || "Mood image";
      grid.appendChild(img);
    });
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
}
