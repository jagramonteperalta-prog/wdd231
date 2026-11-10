const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayProphets(data.prophets);

    } catch (error) {
        console.error('Unable to load prophets:', error);
        cards.innerHTML = '<p>Unable to load prophet data.</p>';
    }
}

function displayProphets(prophets) {
    if (!cards) {
        console.warn('No #cards element found in the document.');
        return;
    }

    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        card.classList.add('card');

        const h2 = document.createElement('h2');
        h2.textContent = `${prophet.name} ${prophet.lastname}`;

        const birthDate = document.createElement('p');
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

        const birthPlace = document.createElement('p');
        birthPlace.textContent = `Birth Place: ${prophet.birthplace}`;

        const image = document.createElement('img');
        image.src = prophet.imageurl;
        image.alt = `${prophet.name} ${prophet.lastname}`;
        image.loading = 'lazy';

        card.appendChild(h2);
        card.appendChild(image);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        cards.appendChild(card);
    });
}

getProphetData();
