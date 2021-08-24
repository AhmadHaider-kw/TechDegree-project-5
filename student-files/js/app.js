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
		const employeeCards = document.querySelectorAll('.card');
		for (let i = 0; i < employeeCards.length; i++) {
			employeeCards[i].addEventListener('click', () => {
				const selectedEmployee = data.results[i];
				const modalContainer = document.querySelector('.modal-container');
				modalWindow(selectedEmployee);
				const closeButton = document.querySelector('.modal-close-btn');
				closeButton.addEventListener('click', () => {
					const modalContainer = document.querySelector('.modal-container');
					modalContainer.style.display = 'none';
				});
			});
		}
	})
	.then(search)
	.catch((err) => console.log('sorry an error just occurred'));

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

function modalWindow(item) {
	// https://elijahmanor.com/blog/format-js-dates-and-times
	let date = new Date(item.dob.date).toLocaleDateString('en-US', {
		weekday: 'long',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});

	// https://stackoverflow.com/questions/18375929/validate-phone-number-using-javascript
	// https://stackoverflow.com/questions/16702924/how-to-explain-1-2-in-javascript-when-using-regular-expression
	let cell = item.cell;
	console.log(cell);
	function ValidatePhoneNumber(phoneNumber) {
		const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})/;
		let phone = phoneNumber.replace(regex, '($1)-$2-$3');
		return phone;
	}

	let modal = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${
									item.picture.large
								}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${item.name.first} ${
		item.name.last
	}</h3>
                <p class="modal-text">${item.email}</p>
                <p class="modal-text cap">${item.location.city}</p>
                <hr>
                <p class="modal-text">${ValidatePhoneNumber(cell)}</p>
                <p class="modal-text">${item.location.street.number} ${
		item.location.street.name
	}, ${item.location.city}, ${item.location.state} ${item.location.postcode}</p>
                <p class="modal-text">Birthday: ${date}</p>
            </div>
        </div>
    </div>
	`;
	GalleryMarkup.insertAdjacentHTML('afterend', modal);
}
