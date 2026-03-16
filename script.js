document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card")
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)"
        })
        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none"
        })
    })

})

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)"
    })
    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none"
    })
})

async function loadExperiments() {
    const res = await fetch("data/experiments.json")
    const data = await res.json()
    const container = document.getElementById("experimentsGrid")
    if (!container) return
    data.forEach(exp => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
    <img src="${exp.image}">
    <h3>${exp.title}</h3>
    <p>${exp.description}</p>
    <a href="article.html?id=${exp.id}" class="toolbtn">
    Read Experiment
    </a>
    `
        container.appendChild(card)
    })
}

loadExperiments()

function toggleMenu() {
    const nav = document.getElementById("navMenu")
    if (nav.classList.contains("active")) {
        nav.classList.remove("active")
    } else {
        nav.classList.add("active")
    }
}

async function loadYoutubeVideos() {
    const videos = [
        "https://www.youtube.com/embed/YOURVIDEOID",
        "https://www.youtube.com/embed/YOURVIDEOID"
    ]
    const container = document.querySelector(".video-grid")
    if (!container) return
    container.innerHTML = ""
    videos.forEach(v => {
        const iframe = document.createElement("iframe")
        iframe.src = v
        container.appendChild(iframe)
    })
}

loadYoutubeVideos()

async function loadTools() {
    const res = await fetch("data/tools.json")
    const tools = await res.json()
    const container = document.querySelector("#tools .grid")
    if (!container) return
    container.innerHTML = ""
    tools.forEach(tool => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
    <img src="${tool.image}">
    <h3>${tool.name}</h3>
    <p>${tool.price}</p>
    <a href="${tool.link}" class="toolbtn" target="_blank">
    Buy Tool
    </a>
    `
        container.appendChild(card)
    })
}

loadTools()

const topBtn = document.getElementById("topBtn")

window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 2) {
        topBtn.style.display = "block"
    } else {
        topBtn.style.display = "none"
    }
})

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})