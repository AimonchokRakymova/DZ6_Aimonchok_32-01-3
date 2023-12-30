document.addEventListener('DOMContentLoaded', async () => {
    const cardContainer = document.getElementById('cardContainer');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        data.forEach(post => {
            const card = createCard(post.title, post.body);
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
});

const createCard = (title, description) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = 'path/to/your/image.jpg';
    card.appendChild(image);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    const cardDescription = document.createElement('p');
    cardDescription.textContent = description;

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);

    card.appendChild(cardContent);

    return card;
};
