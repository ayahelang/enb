document.addEventListener("DOMContentLoaded", () => {
    let currentCategory = "all"
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
    // semua function lain tetap di bawah sini...


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
            {
                id: "VIDEO_ID_1",
                title: "Power Bank Test"
            },
            {
                id: "VIDEO_ID_2",
                title: "Fake Charger"
            }
        ]
        const container = document.querySelector(".video-grid")
        if (!container) return
        container.innerHTML = ""
        videos.forEach(v => {
            const div = document.createElement("div")
            div.className = "video-card"
            div.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${v.id}"></iframe>
    <p>${v.title}</p>
    `
            container.appendChild(div)
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

    let experimentsData = []

    async function loadExperiments() {
        const res = await fetch("data/experiments.json")
        const data = await res.json()
        experimentsData = data
        renderExperiments(data)
    }

    function renderExperiments(data) {
        const container = document.getElementById("experimentsGrid")
        container.innerHTML = ""
        // SORT TERBARU
        data.sort((a, b) => new Date(b.date) - new Date(a.date))
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

    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters)
    }

    function filterCategory(category, event) {
        currentCategory = category
        document.querySelectorAll(".filters button").forEach(btn => {
            btn.classList.remove("active")
        })
        event.target.classList.add("active")
        applyFilters()
    }

    function applyFilters() {
        let filtered = experimentsData
        // FILTER CATEGORY
        if (currentCategory !== "all") {
            filtered = filtered.filter(exp =>
                exp.category === currentCategory
            )
        }
        // FILTER SEARCH
        const keyword = document.getElementById("searchInput")?.value.toLowerCase() || ""
        if (keyword) {
            filtered = filtered.filter(exp =>
                exp.title.toLowerCase().includes(keyword) ||
                exp.description.toLowerCase().includes(keyword)
            )
        }
        renderExperiments(filtered)
    }

})