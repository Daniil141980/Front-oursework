function updateFavorites() {
    let placeholder = document.querySelector("#favorites-output");
    let out = "";
    let total = 0;
    let totalCost = 0;

    // iterate sessionStorage for favorites
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);

        if (key.startsWith("favorite_product_")) {
            let product = JSON.parse(sessionStorage.getItem(key));

            if (product && product.quantity > 0) {
                total += product.quantity;
                totalCost += product.quantity * product.price;

                out += `<div class="favorites-item">
                            <img src="${product.image}" width="150px" height="150px" class="favorites-item-image">
                            <div class="favorites-data">
                                <h3 class="favorites-item-name">${product.name}</h3>
                                <div class="favorites-counter">
                                    <div id="btn5"><button onclick="incrementCountFavorites(${product.id})">+</button></div>
                                    <h4 class="favorites-item-quantity">${product.quantity}</h4>
                                    <div id="btn5" onclick="decrementCountFavorites(${product.id})"><button>-</button></div>
                                </div>
                                <div class="favorites-total-price-item">
                                    <h4>Cost:</h4>
                                    <h4 class="favorites-item-price">$${product.quantity * product.price}</h4>
                                    <div id="btn5" onclick="removeFromFavorites(${product.id})"><button>Remove</button></div>
                                </div>
                            </div>
                        </div>`;
            } else {
                // Remove invalid or zero quantity items from sessionStorage
                sessionStorage.removeItem(key);
                i--;
            }
        }
    }

    if (totalCost !== 0) {
        out += `<div class="favorites-total-cost">
                    <h4>Total:<br/>$${totalCost}</h4>
                </div>`;
    }

    placeholder.innerHTML = out;
}

function decrementCountFavorites(id) {
    let product = JSON.parse(sessionStorage.getItem(`favorite_product_${id}`));

    if (product) {
        product.quantity--;

        if (product.quantity === 0) {
            sessionStorage.removeItem(`favorite_product_${id}`);
        } else {
            sessionStorage.setItem(`favorite_product_${id}`, JSON.stringify(product));
        }

        updateFavorites();
    }
}

function incrementCountFavorites(id) {
    let product = JSON.parse(sessionStorage.getItem(`favorite_product_${id}`));

    if (product) {
        product.quantity++;
        sessionStorage.setItem(`favorite_product_${id}`, JSON.stringify(product));
        updateFavorites();
    }
}

function removeFromFavorites(id) {
    // Найдите индекс товара в массиве избранного
    let index = favorites.indexOf(id);
    if (index !== -1) {
        // Удалите товар из массива избранного
        favorites.splice(index, 1);

        // Удалите товар из localStorage
        localStorage.removeItem(`favorite_product_${id}`);

        // Обновите количество избранных товаров в заголовке
        updateFavoritesCount();
        console.log(`Товар ${id} удален из избранного.`);
    }
}

fetch("./data/products.json")
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        let placeholder = document.querySelector("#data-output");
        let out = "";
        let totalCost = 0;
        // iterate localStorage
        for (let i = 0; i < sessionStorage.length; i++) {

            // set iteration key name
            let key = sessionStorage.key(i);

            // use key name to retrieve the corresponding value
            let product = JSON.parse(sessionStorage.getItem(key));
            totalCost += product.quantity * product.price;

            out += `<div class="favorites-item">
            <img src="${product.image}" width="150px" height="150px" class="favorites-item-image">
            <div class="favorites-data">
                <h3 class="favorites-item-name">${product.name}</h3>
                <div class="favorites-counter">
                    <div id="btn5"><button onclick="incrementCountFavorites(${product.id})">+</button></div>
                    <h4 class="favorites-item-quantity">${product.quantity}</h4>
                    <div id="btn5" onclick="decrementCountFavorites(${product.id})"><button>-</button></div>
                </div>
                <div class="favorites-total-price-item">
                    <h4>Cost:</h4>
                    <h4 class="favorites-item-price">$${product.quantity * product.price}</h4>
                    <div id="btn5" onclick="removeFromFavorites(${product.id})"><button>Remove</button></div>
                </div>
            </div>
        </div>`;
        }

        if (totalCost !== 0) {
            out += `<div class="favourites-total-cost">
                <h4>Total:<br/>$${totalCost}</h4>
            </div>`
        }

        placeholder.innerHTML = out;
    });
