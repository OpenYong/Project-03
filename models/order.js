import moment from "moment";

class Order {
  constructor(id, shopName, items, totalAmount, date) {
    this.id = id;
    this.shopName = shopName;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("YYYY-MM-DD, hh:mm a");
  }
}

export default Order;
