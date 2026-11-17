const members = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const spotlightContainer = document.querySelector("#spotlight-container");

if (gridButton && listButton && members) {
    gridButton.addEventListener("click", () => {
        members.classList.remove("list");
        members.classList.add("grid");
    });

    listButton.addEventListener("click", () => {
        members.classList.remove("grid");
        members.classList.add("list");
    });
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    if (members) {
        displayMembers(data);
    }

    if (spotlightContainer) {
        displaySpotlights(data);
    }
}

if (members || spotlightContainer) {
    getMembers();
}

function displayMembers(data) {
    data.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const name = document.createElement("h2");
        name.textContent = member.name;
        card.appendChild(name);

        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";
        card.appendChild(image);

        const address = document.createElement("p");
        address.textContent = member.address;
        card.appendChild(address);

        const phone = document.createElement("p");
        phone.textContent = member.phone;
        card.appendChild(phone);

        const membership = document.createElement("p");
        membership.textContent = `Membership: ${member.membership}`;
        card.appendChild(membership);

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";
        card.appendChild(website);

        members.appendChild(card);
    });
}

function displaySpotlights(data) {
    const eligibleMembers = data.filter(member =>
        member.membership === "Gold" || member.membership === "Silver"
    );

    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const spotlights = shuffled.slice(0, 3);

    spotlights.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const name = document.createElement("h3");
        name.textContent = member.name;
        card.appendChild(name);

        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} logo`;
        card.appendChild(image);

        const address = document.createElement("p");
        address.textContent = member.address;
        card.appendChild(address);

        const phone = document.createElement("p");
        phone.textContent = member.phone;
        card.appendChild(phone);

        const membership = document.createElement("p");
        membership.textContent = `Membership: ${member.membership}`;
        card.appendChild(membership);

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";
        card.appendChild(website);

        spotlightContainer.appendChild(card);
    });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#last-modified").textContent = document.lastModified;