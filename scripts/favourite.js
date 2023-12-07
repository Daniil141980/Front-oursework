function update() {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    let total = 0;
    let mapProduct = JSON.parse(sessionStorage.getItem("2") || "{}")
    Object.keys(mapProduct).forEach((element) => {
        let product = mapProduct[element];

        total += product.quantity;

        out += `<div class="shopping-cart-item">
                        <img src=${product.image} width="240px" height="135px" class="shopping-cart-item-image">
                        <div class="shopping-cart-data">
                            <h3 class="shopping-cart-item-name">${product.name}</h3>
                            <div class="shopping-cart-counter">
                                <div id="btn5"><button onclick="decrementCount(${product.id})">❤️</button></div>
                            </div>
                            <div class="shopping-cart-total-price-item">
                                <h4>Скидка будет:</h4>
                                <h4 class="shopping-cart-item-price">${product.sale}</h4>
                            </div>
                        </div>
                    </div>`;
    })



    placeholder.innerHTML = out;

    // updating count of products in header
    placeholder = document.querySelector("#header-favorites-count");
    placeholder.innerHTML = `${total}`;
}

function decrementCount(id) {
    let mapProduct = JSON.parse(sessionStorage.getItem("2"))
    let product = mapProduct[id];
    product.quantity--;
    if (product.quantity === 0) {
        delete mapProduct[id]
        sessionStorage.setItem("2", JSON.stringify(mapProduct))
    } else {
        sessionStorage.setItem("2", JSON.stringify(mapProduct))
    }
    update();
}


fetch("./data/products.json")
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        let placeholder = document.querySelector("#data-output");
        let out = "";
        let mapProduct = JSON.parse(sessionStorage.getItem("2") || "{}")
        Object.keys(mapProduct).forEach((element) => {
            let product = mapProduct[element];

            out += `<div class="shopping-cart-item">
                        <img src=${product.image} width="240px" height="135px" class="shopping-cart-item-image">
                        <div class="shopping-cart-data">
                            <h3 class="shopping-cart-item-name">${product.name}</h3>
                            <div class="shopping-cart-counter">
                                <div id="btn5"><button onclick="decrementCount(${product.id})">❤️</button></div>
                            </div>
                            <div class="shopping-cart-total-price-item">
                                <h4>Скидка будет:</h4>
                                <h4 class="shopping-cart-item-price">${product.sale}</h4>
                            </div>
                        </div>
                    </div>`;
        })

        placeholder.innerHTML = out;
    });
