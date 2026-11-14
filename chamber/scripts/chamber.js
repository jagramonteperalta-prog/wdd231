const members = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("navigation");

gridButton.addEventListener("click", () => {
    members.classList.remove("list");
    members.classList.add("grid");
});

listButton.addEventListener("click", () => {
    members.classList.remove("grid");
    members.classList.add("list");
});

menuButton.addEventListener("click", () => {
    navigation.classList.toogle("open");

    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
})

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displayMembers(data);
}

getMembers();

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

document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#last-modified").textContent = document.lastModified;