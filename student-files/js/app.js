/**-----------------------------------
 *          StartUp
 -------------------------------------*/
//  my api
const API = 'https://randomuser.me/api/?results=12';
const SearchMarkup = document.querySelector('.search-container');
const GalleryMarkup = document.querySelector('.gallery');
const Body = document.querySelector('body');

/**-----------------------------------
//  FETCH FUNCTIONS
 -------------------------------------*/
fetch(API)
	.then((res) => res.json())
	.then((data) => {
		generateList(data.results);
		popup(data.results);
	})
	.then(search)
	.catch((err) => console.log('sorry an error just occurred', error));

/**-----------------------------------
//  HELPER FUNCTIONS
 -------------------------------------*/

function search() {
	SearchMarkup.insertAdjacentHTML(
		'beforeend',
		`  <form action="#" method="get">
	<input type="search" id="search-input" 
	class="search-input" placeholder="Search...">

	<input type="submit" value="&#x1F50D;"
	 id="search-submit" class="search-submit">
</form>`
	);
}

function generateList(info) {
	info.forEach((item) => {
		htmlList = `<div class="card">
	<div class="card-img-container">
		<img class="card-img" src="${item.picture.large}" alt="profile picture">
	</div>
	<div class="card-info-container">
		<h3 id="name" class="card-name cap">${item.name.title} ${item.name.first} ${item.name.last}</h3>
		<p class="card-text">${item.email}</p>
		<p class="card-text cap">${item.location.city}, ${item.location.state}</p>
	</div>
</div>`;
		GalleryMarkup.insertAdjacentHTML('beforeend', htmlList);
	});
}

function popup(info) {
	const employeeCards = document.querySelectorAll('.card');
	employeeCards.forEach((employeeCard) =>
		employeeCard.addEventListener('click', () => {
			const modalContainer = document.querySelector('.modal-container');
			modalWindow(employeeCards);
			modalContainer.style.display = 'block';
		})
	);
}

function modalWindow(item) {
	let modal = `
	<div class="modal-container">
		<div class="modal">
			<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
			<div class="modal-info-container">
				<img class="modal-img" src="" alt="profile picture">
				<h3 id="name" class="modal-name cap">${data.name.title}  ${data.name.first}</h3>
				<p class="modal-text">${data.email}</p>
				<p class="modal-text cap">${data.location.city}</p>
				<hr>
				<p class="modal-text">(555) 555-5555</p>
				<p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
				<p class="modal-text">Birthday: 10/21/2015</p>
			</div>
		</div>
	`;

	GalleryMarkup.insertAdjacentHTML('afterend', modal);
}

/**-----------------------------------
//  EVENT LISTENERS
 -------------------------------------*/
// to close the modal popup
const closeButton = document.querySelector('.modal-close-btn');
closeButton.addEventListener('click', () => {
	const modalContainer = document.querySelector('.modal-container');
	modalContainer.style.display = 'none';
});
