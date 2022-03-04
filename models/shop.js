class Shop {
  constructor(
    id,
    ownerId,
    shopName,
    imageUrl,
    description,
    hasParkingLot,
    hasTables
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.shopName = shopName;
    this.imageUrl = imageUrl;
    this.description = description;
    this.hasParkingLot = hasParkingLot;
    this.hasTables = hasTables;
  }
}

export default Shop;
