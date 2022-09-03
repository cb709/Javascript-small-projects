//----------- getting categories form api------------
const getCategoriesFromApi = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
    .then(res =>  res.json())
    .then(data => showCategories(data))
    .catch( err => console.log(err))
}

// ------- showing categories into nav -------------
const showCategories = (data) => {
    const categories = data.data['news_category'];
    const categoryList = document.getElementById('category-list');
    categories.forEach(categorie => {
        categoryList.innerHTML += `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" onclick="getNewsByCategoryID('${categorie['category_id']}')">${categorie['category_name']}</a>
            </li>
        `
    });

}

// ---------- show category news by category id------------------
const getNewsByCategoryID = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then( res => res.json())
    .then( data => showNewsByCategory(data))
    .catch( err => console.log(err))
}

//---------show news by category-----------------
const showNewsByCategory = (data) => {
    const allNews = data.data;
    const allNewsDiv = document.getElementById('news-container');
    allNewsDiv.innerHTML = ` `;
    allNews.forEach(news => {
        // console.log(news)
        const {
            author: {
                img,
                name,
                published_date
            },
            category_id,
            details,
            image_url,
            rating: {
                badge,
                number
            },
            thumbnail_url,
            title,
            id
        } = news;

        // -------------show all news------------
        allNewsDiv.innerHTML +=    `
            <div class="col">
                <div class="card h-100 rounded-3">
                    <div class="row">
                        <div class="col col-md-4 col-lg-2 card-image">
                            <img src="${thumbnail_url}" class="card-img-top">
                        </div>
                        <div class="col col-md-8 col-lg-10 card-body">
                            <div class="news">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${details.slice(0,200)}...</p>
                            </div>
                            <div class="info row">
                                <div class="author-box col-4">
                                    <div class="author-image">
                                        <img src="${img}" alt="">
                                    </div>
                                    <div class="author-info">
                                        <h5>Author: ${name}</h5>
                                        <p>Published Date: ${published_date}</p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <h5>Rating: ${badge} ${number} </h5>
                                </div>
                                <div class="col-4">
                                    <a href="#" onclick="getNewsDetails(id)"> Read News</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })

}




getCategoriesFromApi();