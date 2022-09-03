const mainHeading = document.getElementById("main-heading");
const phonesContainer = document.getElementById("phones-container");

//========== search form input text ==========
document.getElementById("search-btn").addEventListener("click", () => {
  const searchText = document.getElementById("search-input").value;
  if (searchText === "") {
    alert("Enter phone name to search");
  } else {
    loadPhonesData(searchText);
  }
});

//=============== fetching data with a keyword

const loadPhonesData = async (text) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  const res = await fetch(url);
  const data = await res.json();
  showPhones(data);
};

//======= showing phones based on api data

const showPhones = (data) => {
  const phones = data.data;
  if (phones.length == 0) {
    phonesContainer.innerHTML = ` `;
    mainHeading.innerHTML = `No Phones Found !`;
  } else {
    phonesContainer.innerHTML = ` `;
    mainHeading.innerHTML = `Phone Hunter`;
    phones.forEach((phone) => {
      phonesContainer.innerHTML += `
        <div class="col-lg-3 col-sm-6 col-6 mb-3">    

                <div class="card h-100">
                <a class="btn p-3" data-toggle="modal" data-target="#phone-details" onclick="getPhoneDetails('${phone.slug}')">
                    <img src="${phone.image}" class="card-img-top"/>
                    <div class="card-body">
                        <h6 class="card-title">${phone.brand} - ${phone.phone_name}</h6>
                    </div>
                    </a>   
                </div>
 
        </div>    
    `;
    });
  }
};

// =======Get phone deatils from api==========
const getPhoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data));
}

// ==================show phone details in modal==========
const showPhoneDetails = (data) => {
    console.log(data.data)
    const {
        brand,
        name,
        image,
        releaseDate,
        mainFeatures: {
            chipSet,
            displaySize,
            memory,
            sensors,
            storage
        }
    } = data.data;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="phone-detailsLabel">${brand} - ${name}</h5>
                <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <img src="${image}">
            <p><b>Release Date:</b> ${releaseDate}</p>
            <p><b>Chipset:</b> ${chipSet}</p>
            <p><b>Memory:</b> ${memory}</p>
            <p><b>Display:</b> ${displaySize}</p>
            <p><b>Storage:</b> ${storage}</p>
            <p><b>Sensors:</b> ${[...sensors]}</p>
            </div>
            <div class="modal-footer">
                <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                >
                    Close
                </button>
            </div>
        </div>
    `
}
loadPhonesData("iphone");