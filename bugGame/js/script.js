const body = document.body;
const getByClass = className => document.getElementsByClassName(className); //функция для поиска элемента по классу
const getById = id => document.getElementById(id); // поиск по id
const startGameBtn = getById('start'); //кнопка для запуска игры
const allLevels = document.querySelectorAll('.level');
const gameMap = getById('game-map');
const content = getById('content');

//выбор уровней сложности
function currentLevelGame (item) {
	switch(item) {
		case 'low-level':
			return 3;
			break;
		case 'middle-level':
			return 6;
			break;
		case 'hard-level':
			return 10;
			break;
	}
}

//Удаление и выделения активного пункта меню 
const chooseLevel = (elem) => {
    allLevels.forEach((item) => item.classList.remove("level_active"));
    elem.target.classList.add("level_active");
    console.log('click')
}

allLevels.forEach((item) => item.addEventListener("click", chooseLevel));


// Создание игрового поля
function createCards(currentLevel) {
	for (let i = 0; i < currentLevel; ++i) {
		const card = document.createElement('div');
		const cardWrap = document.createElement('div');
		const front = document.createElement('div');
		const back = document.createElement('div');

		card.classList.add('card');
		cardWrap.classList.add('card-wrap', 'card-hover');
		front.classList.add('card-item_over');
		back.classList.add('card-item_back');

		gameMap.appendChild(card);
		card.appendChild(cardWrap);
		cardWrap.appendChild(front);
		cardWrap.appendChild(back);
	}

	hardLevel(currentLevel);
}

const hardLevel = (currentLevel) => {
	if (currentLevel > 6) {
		gameMap.classList.add('cards_hard');
	} else {
		gameMap.classList.remove('cards_hard');
	}
}

// функция для добавления "жука" на рандомную карту
function createBug(currentLevel, cards) {
	const bug = Math.floor(Math.random() * currentLevel);

	for (let i = 0; i < currentLevel; ++i) {
		if (i == bug) {
			cards[i].classList.remove('card-item_over');
			cards[i].classList.add('card-item_bug');
		}
	}
}
	
//удаление карт
function deleteAllCards() {
	const game = document.getElementById('game-map');
	while (game.firstChild) {
		game.removeChild(game.firstChild);
	}
}

	//добавление переворота для карт
	function flipCards () {
		let isStart = true;
		const allCards = document.querySelectorAll('.card-wrap')
		allCards.forEach((item) => item.addEventListener('click', () => {
			if (isStart) {
				item.classList.remove('card-hover');
				item.classList.add('card_click');
				isStart = false;
			} else {
				content.classList.remove('none');
				gameMap.classList.add('none');
				isStart = true;
				deleteAllCards();
				console.log('click for end game');
			}
		}))
	}


//функция для создания игрового поля
function startGame () {
	let currentLevel = document.querySelector('.level_active').firstElementChild.getAttribute('id');
	let currentLevelForStart = currentLevelGame(currentLevel);
	console.log(currentLevel)

	content.classList.add('none');
	gameMap.classList.remove('none');

	//создаем "жука"
	createCards(currentLevelForStart);
	const numberOfBack = document.querySelectorAll('.card-item_over');
	createBug(currentLevelForStart, numberOfBack);

	flipCards();



}

// функция для удаления карт
function deleteElements() {
    const game = getById('game-map');
    while (game.firstChild) {
       game.removeChild(game.firstChild);
    }
}

//Работа с кнопкой "Начать игру"
startGameBtn.addEventListener('click', startGame);