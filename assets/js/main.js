const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=218c41195ffeb245961664510b44cb26&page=1'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280/'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=218c41195ffeb245961664510b44cb26&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)
async function getMovies(url) {
	const res = await fetch(url)
	const data = await res.json()

	showMovies(data.results)
}

function showMovies(movies) {
	main.innerHTML = ''

	movies.forEach((movie) => {
		const {title,poster_path, vote_average, overview} = movie

		const movieElement = document.createElement('div')
		movieElement.classList.add('col-md-3')

		movieElement.innerHTML = `
			<div class="movie">
				<img src="${IMAGE_PATH + poster_path}" alt="${title} ">
				<div class="movie-info">
					<h3>${title}</h3>
					<span class="${getClassByRate(vote_average)}">${vote_average}</span>
				</div>
				<div class="movie-overview">
					<h3>Overview</h3>
					${overview}
				</div>
			</div>`
		main.appendChild(movieElement)
	})
}

function getClassByRate(vote){
	if(vote >=8){
		return 'green'
	} else if(vote >= 5){
		return 'yellow'
	} else {
		return 'red'
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const searchTerm = search.value

	if(searchTerm && searchTerm !== ''){
		getMovies(SEARCH_API + searchTerm)

		search.value = ''
	} else {
		window.location.reload()
	}
})