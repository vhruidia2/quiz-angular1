export class Product {
  //atributos y sus tipos
  _id: string;
  name: string;
  image: string;
  description: string;
  stock: number;
  price: number;
  //keyWords: string[]

  //constructor instaciar o inicializar los atributos
  constructor(
    _id = '',
    name = '',
    image = '',
    description = '',
    stock = 0,
    price = 0
  ) {
    (this._id = _id),
      (this.name = name),
      (this.image = image),
      (this.description = description),
      (this.stock = stock);
    this.price = price;
  }
}
