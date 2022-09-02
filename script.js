const projects = [
  {
    name: "Food Search App",
    tools: "HTML, CSS, Bootstrap, JS, MealDB API",
    description: "Simple food search app with meal db api",
    link: "../search-food/index.html"
  },
  {
    name: "Phone Hunter",
    tools: "HTML, CSS, Bootstrap, JS, Programming Hero API",
    description: "Simple Phone search app with Programming hero Phone Hunter api",
    link: "../phone-hunter/index.html"
  },
  {
    name: "Country info App",
    tools: "HTML, CSS, Bootstrap, JS, Rest Countries API",
    description: "Simple Country search app with Rest Countries api",
    link: "../countries-info/index.html"
  }
];



function showProjects(projects) {
  const projectContainer = document.getElementById("project-container");
  const totalProjects = projects;
  totalProjects.forEach((project) => {
    projectContainer.innerHTML += `
        <div class="card-deck col-lg-4 col-md-6 mb-4 project-card">
          <div class="card bg-dark border text-white">
            <div class="card-body">
                <h5 class="card-title">${project.name}</h5>
                <p class="card-text">Tools: ${project.tools}</p>
            </div>
            <div class="card-footer">
                <small class="text-white"><a class="text-white" href="${project.link}" >View Project</a></small>
            </div>
          </div>
        </div>
        `;
  });
}

showProjects(projects);
