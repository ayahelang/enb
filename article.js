async function loadArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch("data/experiments.json");
    const data = await res.json();

    const exp = data.find((e) => e.id === id);

    if (!exp) {
        document.body.innerHTML = "<h1>Experiment not found</h1>";
        return;
    }

    document.getElementById("title").innerText = exp.title;

    document.getElementById("content").innerText =
        exp.article || generateArticle(exp);

    document.getElementById("video").innerHTML =
        `<iframe src="${exp.video}" width="100%" height="400"></iframe>`;

    document.title = exp.title;

    document.getElementById("metaDesc").setAttribute("content", exp.description);
    document.getElementById("metaKeywords").setAttribute("content", exp.keywords.join(", "));

    document.getElementById("ogTitle").setAttribute("content", exp.title);
    document.getElementById("ogDesc").setAttribute("content", exp.description);

    const schema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: exp.title,
        description: exp.description,
        thumbnailUrl: exp.image,
        uploadDate: exp.date,
        embedUrl: exp.video,
    };

    document.getElementById("schema").textContent = JSON.stringify(schema);

    showRelated(data, id);
}

function showRelated(data, currentId) {
    const related = data.filter((e) => e.id !== currentId).slice(0, 3);
    const container = document.getElementById("related");

    container.innerHTML = "<h3>Related Experiments</h3>";

    related.forEach((r) => {
        container.innerHTML += `
        <a href="article.html?id=${r.id}">
        ${r.title}
        </a>
      `;
    });
}

function generateArticle(exp) {
    return `
  ${exp.title}
  
  Eksperimen ini membahas:
  ${exp.description}
  
  Simak video di atas untuk hasil lengkap.
  `;
}

loadArticle();

if (!exp.video) {
    document.getElementById("video").innerHTML = "<p>No video available</p>";
}