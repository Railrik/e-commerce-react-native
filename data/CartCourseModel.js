class CartCourse {
    constructor(id, price, title) {
        this.id = id;
        this.price = price;
        this.title = title;
    }

    toJSON() {
        return {
            id: this.id,
            price: this.price,
            title: this.title
        };
    }
}
export default CartCourse;