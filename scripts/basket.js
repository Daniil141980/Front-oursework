function update() {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    let total = 0;
    let totalCost = 0;
    let mapProduct = JSON.parse(sessionStorage.getItem("1") || "{}")
    Object.keys(mapProduct).forEach((element) => {
        let product = mapProduct[element];

        total += product.quantity;
        totalCost += product.quantity * product.price;

        out += `<div class="shopping-cart-item">
                        <a href="game_page.html?id=${product.id}"><img src=${product.image} width="240px" height="135px" class="shopping-cart-item-image"></a>
                        <div class="shopping-cart-data">
                            <h3 class="shopping-cart-item-name">${product.name}</h3>
                            <div class="shopping-cart-counter">
                                <div id="btn5"><button onclick="incrementCount(${product.id})">+</button></div>
                                <h4 class="shopping-cart-item-quantity">${product.quantity}</h4>
                                <div id="btn5"><button onclick="decrementCount(${product.id})">-</button></div>
                            </div>
                            <div class="shopping-cart-total-price-item">
                                <h4>Cost:</h4>
                                <h4 class="shopping-cart-item-price">${product.quantity * product.price} ₽</h4>
                            </div>
                        </div>
                    </div>`;
    })

    if (totalCost !== 0) {
        out += `<div class="cart-total-cost">
                <h4>Total:<br/>${totalCost} ₽</h4>
            </div>`
    }

    placeholder.innerHTML = out;

    // updating count of products in header
    placeholder = document.querySelector("#header-product-count");
    placeholder.innerHTML = `${total}`;
}

function decrementCount(id) {
    let mapProduct = JSON.parse(sessionStorage.getItem("1"))
    let product = mapProduct[id];
    product.quantity--;
    if (product.quantity === 0) {
        delete mapProduct[id]
        sessionStorage.setItem("1", JSON.stringify(mapProduct))
    } else {
        sessionStorage.setItem("1", JSON.stringify(mapProduct))
    }
    update();
}

function incrementCount(id) {
    let mapProduct = JSON.parse(sessionStorage.getItem("1"))
    let product = mapProduct[id];
    product.quantity++;
    sessionStorage.setItem("1", JSON.stringify(mapProduct))
    update();
}

fetch("./data/products.json")
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        let placeholder = document.querySelector("#data-output");
        let out = "";
        let totalCost = 0;
        let mapProduct = JSON.parse(sessionStorage.getItem("1") || "{}")
        Object.keys(mapProduct).forEach((element) => {
            let product = mapProduct[element];

            totalCost += product.quantity * product.price;

            out += `<div class="shopping-cart-item">
                        <a href="game_page.html?id=${product.id}"><img src=${product.image} width="240px" height="135px" class="shopping-cart-item-image"></a>
                        <div class="shopping-cart-data">
                            <h3 class="shopping-cart-item-name">${product.name}</h3>
                            <div class="shopping-cart-counter">
                                <div id="btn5"><button onclick="incrementCount(${product.id})">+</button></div>
                                <h4 class="shopping-cart-item-quantity">${product.quantity}</h4>
                                <div id="btn5"><button onclick="decrementCount(${product.id})">-</button></div>
                            </div>
                            <div class="shopping-cart-total-price-item">
                                <h4>Cost:</h4>
                                <h4 class="shopping-cart-item-price">${product.quantity * product.price} ₽</h4>
                            </div>
                        </div>
                    </div>`;
        })

        if (totalCost !== 0) {
            out += `<div class="cart-total-cost">
                <h4>Total:<br/>${totalCost} ₽</h4>
            </div>`
        }

        placeholder.innerHTML = out;
    });
