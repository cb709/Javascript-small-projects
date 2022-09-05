const API_KEY = `925a0c58abb383c0fddaaa3abafa0e30`

const loadDataByCityName = (city_name) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}


// -------------show weather details---------------------------------


// -------------search---------------
document.getElementById('search-btn').addEventListener('click', function(){
    const searchText = document.getElementById('input-text').value;
    if(searchText == '') {
        removeDisplayNoneById('notification')
    }else {
        loadDataByCityName(searchText);
        setDisplayNoneById('notification')
    }
    searchText.value = '';
    
})


// ------------set and remove display none---------------------
const setDisplayNoneById = (id) => {
    document.getElementById(id).classList.add('d-none');
}
const removeDisplayNoneById = (id) => {
    document.getElementById(id).classList.remove('d-none');
}


// ---------------------------- default location---------------
loadDataByCityName('dhaka')