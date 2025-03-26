// Project data
const projectsData = {
    cybersecurity: {
      title: "Cybersecurity Vulnerability Assessment",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: `
        <p>This project involved conducting a full security assessment of a local business network with 25+ endpoints. 
        I performed both automated and manual testing to identify vulnerabilities across the network, web applications, 
        and employee devices.</p>
        <p>The assessment revealed several critical vulnerabilities including unpatched systems, weak password policies, 
        and misconfigured firewall rules. I provided detailed remediation steps and helped implement security best practices 
        that reduced the attack surface by 80%.</p>
      `,
      features: [
        "Performed network scanning with Nmap",
        "Conducted vulnerability assessment with OpenVAS",
        "Executed penetration tests using Metasploit Framework",
        "Identified 15+ critical vulnerabilities",
        "Created detailed technical report with remediation steps"
      ],
      technologies: ["Penetration Testing", "Network Security", "Kali Linux", "Nmap", "Metasploit", "OWASP"],
      // links: [
      //   { text: "View Report", url: "#", class: "btn" },
      //   { text: "GitHub Code", url: "#", class: "btn-outline" }
      // ]
    },
    university: {
      title: "University Mini-Project",
      image: "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: `
        <p>This team project involved developing a comprehensive student management system for our Object-Oriented Programming 
        course. The system handled student registration, course management, and grade tracking.</p>
        <p>As team leader, I designed the database schema and implemented the core functionality using Java and MySQL. 
        The project received top marks for its clean architecture, comprehensive documentation, and user-friendly interface.</p>
      `,
      features: [
        "Student registration and profile management",
        "Course enrollment system",
        "Grade tracking and reporting",
        "User authentication and authorization",
        "Data persistence with MySQL"
      ],
      technologies: ["Java", "OOP", "MySQL", "Team Collaboration"],
      // links: [
      //   { text: "View Demo", url: "#", class: "btn" },
      //   { text: "Documentation", url: "#", class: "btn-outline" }
      // ]
    }
  };
  
  // Load project data based on URL parameter
  document.addEventListener("DOMContentLoaded", function() {
    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();
    
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("project");
  
    if (projectId && projectsData[projectId]) {
      const project = projectsData[projectId];
  
      // Set page title
      document.title = `${project.title} | Christopher Wasonga`;
  
      // Populate project data
      document.getElementById("project-title").textContent = project.title;
      document.getElementById("project-image").src = project.image;
      document.getElementById("project-image").alt = project.title;
      document.getElementById("project-description").innerHTML = project.description;
  
      // Populate features
      const featuresList = document.getElementById("project-features");
      project.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
      });
  
      // Populate technologies
      const techStack = document.getElementById("tech-stack");
      project.technologies.forEach(tech => {
        const span = document.createElement("span");
        span.className = "tech-badge";
        span.textContent = tech;
        techStack.appendChild(span);
      });
  
      // Populate action buttons
      const projectActions = document.getElementById("project-actions");
      project.links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.className = `btn ${link.class}`;
        a.textContent = link.text;
        if (link.url.startsWith("http")) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        projectActions.appendChild(a);
      });
    } else {
      // Redirect if project not found
      window.location.href = "index.html#projects";
    }
  });

  document.querySelector('.back-button')?.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.setItem('returningFromProject', 'true');
    window.location.href = this.getAttribute('href');
});