class ShoppingItems extends React.Component {
        
    state = {
        productsInState: 0,
        products: []
    }

    constructor(props) {
        super(props);
        this.addItemToCart = this.addItemToCart.bind(this); 
        this.ReturnToShopping = this.ReturnToShopping.bind(this);
        this.GoToShoppingCart = this.GoToShoppingCart.bind(this);
    }

    searchItemsAndUpdateState(x) {
        $.ajax({
            url: "/Home/GetSearchedProducts",
            type: "POST",
            data: { "userData": x },
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
    }

    getTopData() {
        $.ajax({
            url: "/Home/GetTopProducts",
            type: "POST",
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });

        this.CheckWhichRoleIsLoggedIn();
    }

    getAllData() {
        $.ajax({
            url: "/Home/GetAllProducts",
            type: "POST",
            success: function (json) {
                this.setState({ products: json.products, productsInState: json.numberOfProductsInShoppingBag });
            }.bind(this),
            error: function () {
                window.location.href = "/Error";
            }.bind(this)
        });
        
        this.CheckWhichRoleIsLoggedIn();
    }

    addItemToCart(index) {
        $.ajax({
            url: "/Cart/AddToCart",
            type: "POST",
            data: { "id": index },
            success: function (nameOfItem) {
                $(".added-to-shopping-cart-full-popup").css("display", "flex");
            },
            error: function () {
                window.location.href = "/Login";
            }
        });
    }

    ReturnToShopping() {
        $(".added-to-shopping-cart-full-popup").css("display", "none");
    }

    GoToShoppingCart() {
        window.location = "/Cart";
    }

    CheckWhichRoleIsLoggedIn() {
        $.ajax({
            url: "/Users/CurrentUserRoleIsLoggedInAsync",
            type: "POST",
            success: function (role) {
                if (role === "Member" || role === "Unauthorize")
                    $(".add-to-cart-button").css("dislay", "flex");
                else {
                    $(".add-to-cart-button").css("display", "none");
                }
            },
            error: function () {
                window.location.href = "/Error";
            }
        });
    }


    render() {
        console.log(this.state.products);
        if (this.state.products.length !== 0 || this.state.products == "undefined") {
            return (
                <div className="container">
                    {
                        this.state.products.map(item =>
                            <div key={item.id} className="item-container">
                                <div className="item-container-image">
                                    <img className="lazyload" data-src={item.imageURL} />
                                </div>

                                <div className="item-data">
                                    <div>
                                        <p className="item-name"> {item.name}</p>
                                        <p className="item-price"> Rs {item.price}</p>
                                    </div>

                                    <button aria-label="Add item" className="add-to-cart-button" onClick={() => this.addItemToCart(item.id)}> </button>
                                </div>
                            </div>
                        )
                    }
                    <div className="added-to-shopping-cart-full-popup">
                        <div className="added-to-shopping-cart-popup">
                            <img src="../images/added.png" />
                            <h2> Product is added to Shopping Cart </h2>
                            <div>
                                <button onClick={() => this.ReturnToShopping()}> Return to shopping </button>
                                <button onClick={() => this.GoToShoppingCart()}> Go to shopping cart </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div id="empty-search-container">
                    <h2>We're sorry :(  </h2>
                    <h2>There are no products matching your search </h2>

                </div>
             )
        }
    }
}

export default ShoppingItems;