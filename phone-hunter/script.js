 async function loadData(text) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data) ;

}

loadData('all')