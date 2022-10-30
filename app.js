//array of objects (data which we need to show)
const menu = [
	{
		id: 1,
		title: "buttermilk pancakes",
		category: "breakfast",
		price: 15.99,
		img: "./images/item-1.jpeg",
		desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
	},
	{
		id: 2,
		title: "diner double",
		category: "lunch",
		price: 13.99,
		img: "./images/item-2.jpeg",
		desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
	},
	{
		id: 3,
		title: "godzilla milkshake",
		category: "shakes",
		price: 6.99,
		img: "./images/item-3.jpeg",
		desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
	},
	{
		id: 4,
		title: "country delight",
		category: "breakfast",
		price: 20.99,
		img: "./images/item-4.jpeg",
		desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
	},
	{
		id: 5,
		title: "egg attack",
		category: "lunch",
		price: 22.99,
		img: "./images/item-5.jpeg",
		desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
	},
	{
		id: 6,
		title: "oreo dream",
		category: "shakes",
		price: 18.99,
		img: "./images/item-6.jpeg",
		desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
	},
	{
		id: 7,
		title: "bacon overflow",
		category: "breakfast",
		price: 8.99,
		img: "./images/item-7.jpeg",
		desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
	},
	{
		id: 8,
		title: "american classic",
		category: "lunch",
		price: 12.99,
		img: "./images/item-8.jpeg",
		desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
	},
	{
		id: 9,
		title: "quarantine buddy",
		category: "shakes",
		price: 16.99,
		img: "./images/item-9.jpeg",
		desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
	},
	{
		id: 10,
		title: "steak dinner",
		category: "dinner",
		price: 39.99,
		img: "./images/item-10.jpeg",
		desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
	}
];

//now we need to 1st create dynamic buttons on loading and display all the items in array menu
//so we dynamically add data from array by inserting html

const sectionCenter = document.querySelector(".section-center"); //

const buttonContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {

	displayMenuItems(menu); //this func takes array of objects to display but on loading whole menu is passed to display

	displayButtons(); //dynamically create buttons depending upon categories in array of objects
});


function displayMenuItems(menuItems) { //takes array of objects and create html for each object using map

	let newMenu = menuItems.map(function (item) { //we insert seperate data for each obj using ${} (template literal)
		
		//menuItems=array of objects to display, item=each obj
		//newMenu=contains html for each item
		//same HTML code reused for diff data 
		return `<article class="menu-item"> 
		<img src=${item.img} class="photo" alt=${item.title}>
		<div class="item-info">
			<header>
				<h4>${item.title}</h4>
				<h4 class="price">${item.price}</h4>
			</header>

			<p class="item-text">${item.desc}</p>
		</div>
	</article>`;
	});

	newMenu = newMenu.join(""); //join whole html together to insert it as a single entity

	sectionCenter.innerHTML = newMenu; //insert whole html in div containing items (parent div)

}

function displayButtons() {

	//create array of unique categories using reduce() starting with "all" as all button will always be present
	//and also bcz there will be no category named "all"

	const categories = menu.reduce(function (listOfCategories, currItem) {

		if (!listOfCategories.includes(currItem.category))
			listOfCategories.push(currItem.category);

		return listOfCategories;

	}, ["all"]);

	//now create buttons of unique catgories from categories (array) and inserting seperate data for each category
	let buttons = categories.map(function (category) {

		return `<button class="filter-btn" data-id=${category} type="button">${category}</button>`;
	});

	//join html of all buttons and insert it in div containing buttons
	buttons = buttons.join("");
	buttonContainer.innerHTML = buttons;

	//now since buttons with "filter-btn" class are added dynamically, so these buttons can only be accessed afterwards
	//so selected them using "filter-btn" class after creating them
	const filterBtns = document.querySelectorAll(".filter-btn");

	filterBtns.forEach(function (btn) { //add event listener to each button

		btn.addEventListener("click", function () {

			//now on clicking a button we need to display only items with category=selected button category
			//so we filter out those objects from menu whose category matches with selected button category(dataset.id)
			let selectedCategory = this.dataset.id;
			let newMenu = menu.filter(function (item) {
				//alternatively we can use event.currentTarget.dataset.id
				//where event is parameter pass to callback func
				//as event.currentTarget gives same button clicked
				return (item.category === selectedCategory)
			});

			//but if "all" button clicked so no matching item in menu so again display whole menu as on loading
			if (selectedCategory === "all")
				displayMenuItems(menu);
			else //otherwise display newly created array of obj
				displayMenuItems(newMenu);
		});
	});
}

