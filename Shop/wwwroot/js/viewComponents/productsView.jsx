﻿import MainProducts from "../components/mainProducts.jsx";
import Search from "../components/searchComponent.jsx";
import ShoppingItems from "../components/shoppingItems.jsx";


class AllProducts extends React.Component {

    /**
        kreira se prop
     */
    constructor(props) {
        super(props);
        this.shoppingItem = React.createRef();
        this.searchItemsByUserInput = this.searchItemsByUserInput.bind(this);
    }

    componentDidMount() {
        this.shoppingItem.current.getAllData();
        $(".loading-screen").css("display", "none");
        $("#products-link").css("color", "white");
    }

    /**
        UZIMA VRIJEDNOST IZ SEACH KOMPONENTE PREKO PROPSA I ZOVE SHOPPING ITEM COMPONENTU I NNJENU METODU searchItemsAndUpdateState
        ŠALJE JOJ VRIEJDNOST KOJU JE USER UPISAO U SEARCH KOMPONENTI
     */
    searchItemsByUserInput(x) {
        this.shoppingItem.current.searchItemsAndUpdateState(x);
    }

    render() {
        return (
            <div>
                <div id="main-products-wallpaper">
                    <MainProducts />
                </div>

                
                <div id="search-container">
                    <Search searchItems={this.searchItemsByUserInput} />
                </div>

                <div id="content">
                    <ShoppingItems
                        ref={this.shoppingItem}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <AllProducts />,
    document.getElementById('all-products-view')
);