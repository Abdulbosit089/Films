// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`

let prevBut = document.querySelector('.prev')
let nextBut = document.querySelector('.next')
let spanTitle = document.querySelector('.title')
let filmsDiv = document.querySelector('.append')
let buttons = document.querySelectorAll('.btns')
let searchButton = document.querySelector('.btn')



let sdf = window.localStorage.getItem('page')

if(sdf == 'top_rated'){
    topPage()
}else if(sdf == 'popular'){
    popularPage()
}else if(sdf == 'upcoming'){
    upComingPage()
}else{
    topPage()
}

async function topPage(){
    let page = 1
	let limit = 9
    spanTitle.textContent = page
    window.localStorage.setItem('page',JSON.stringify('top_rated'))

    filmsDiv.innerHTML = null
    let [topRes] = await Promise.all([
        fetch(tokenTop)
    ])
    
    topRes = await topRes.json()

    console.log(topRes.results)

    pagination(topRes,limit,page)
    prevBut.addEventListener('click',()=>{
        if(page>1){
            --page
            spanTitle.textContent = page
            console.log(page)
            pagination(topRes,limit,page)
        }
    })
    nextBut.addEventListener('click',()=>{
        if(page<2){
            page++
            spanTitle.textContent = page
            console.log(page)
            pagination(topRes,limit,page)
        }
    })


}

async function popularPage(){
    let page = 1
	let limit = 9
    
    spanTitle.textContent = page
    window.localStorage.setItem('page',JSON.stringify('popular'))

    filmsDiv.innerHTML = null
    let [popRes] = await Promise.all([
        fetch(tokenPopular)
    ])
    
    popRes = await popRes.json()

    console.log(popRes.results)

    pagination(popRes,limit,page)

    prevBut.addEventListener('click',()=>{
        if(page>1){
            --page
            spanTitle.textContent = page
            console.log(page)
            pagination(popRes,limit,page)
        }
    })
    nextBut.addEventListener('click',()=>{
        if(page<2){
            page++
            spanTitle.textContent = page
            console.log(page)
            pagination(popRes,limit,page)
        }
    })
    
}

async function upComingPage(){
    let page = 1
	let limit = 9
    spanTitle.textContent = page
    window.localStorage.setItem('page',JSON.stringify('upcoming'))

    filmsDiv.innerHTML = null
    let [upRes] = await Promise.all([
        fetch(tokenUpComing)
    ])
    
    upRes = await upRes.json()

    pagination(upRes,limit,page)

    prevBut.addEventListener('click',()=>{
        if(page>1){
            --page
            spanTitle.textContent = page
            console.log(page)
            pagination(upRes,limit,page)
        }
    })
    nextBut.addEventListener('click',()=>{
        if(page<2){
            page++
            spanTitle.textContent = page
            console.log(page)
            pagination(upRes,limit,page)
        }
    })

       
}
let arr = []
function search(film,release_date,title,vote){
    let titl = title.toLowerCase()
        let ps = poisk.value
        ps = ps.toLowerCase()
        date = release_date.slice(0,4)
        if(titl.includes(ps)){
            filmsDiv.append(film)
        }
    
}


function pagination(res,limit,page){
    arr = []
    filmsDiv.innerHTML = null
    for(let i=(page-1)*10;i<limit*page;i++){
        if(res.results[i]){
        const filmName = res.results[i]
        let film = document.createElement ('div')
        film.innerHTML = newElement(filmName)
        film.className = 'movie'
        filmsDiv.append(film)

        
        }
    }
    
}


for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',(event)=>{
        if(buttons[i].value == 'top_rated'){
            topPage()
        }
        else if(buttons[i].value == 'popular'){
            popularPage()
        }
        else if(buttons[i].value == 'upcoming'){
            upComingPage()
        }
    })
}


