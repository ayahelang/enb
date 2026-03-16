const cards = document.querySelectorAll(".card")

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