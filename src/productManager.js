import fs from "fs";

class ProductManager {
  products;

  constructor(file) {
    this.path = file;
  }

  async getProducts() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async getId() {
    let data = await this.getProducts();
    return data.length + 1;
  }

  async addProduct(newProduct) {
    try {
      if (!fs.existsSync(this.path)) {
        const emptyList = [];
        emptyList.push({ ...newProduct, id: await this.getId() });

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(emptyList, null, "\t")
        );
      } else {
        const data = await this.getProducts();
        const repeatCode = data.some((e) => e.code == newProduct.code);
        repeatCode == true
          ? console.log("Repeated code")
          : data.push({ ...newProduct, id: await this.getId() });
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(data, null, "\t")
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsById(id) {
    const data = await this.getProducts();
    let productFind = data.find((e) => e.id == id);
    return productFind === undefined ? console.log("Not found") : productFind;
  }

  async deleteProduct(id) {
    const data = await this.getProducts();
    let i = data.findIndex((e) => e.id === id);
    data.splice(i, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }

  async updateProducts(id, product) {
    let data = await this.getProducts();
    let i = data.findIndex((e) => e.id === id);
    product.id = id;
    data.splice(i, 1, product);
    await fs.promises.writeFile(this.path, JSON.stringify(data));
  }
}

const funcionAsync = async () => {
  const productManager = new ProductManager();
  console.log(await productManager.getProducts());
  await productManager.addProduct(
    "lechelita",
    "Leche deslactosada",
    300,
    "soy_una_img.png",
    "#2116",
    20
  );
  await productManager.getProducts();
  await productManager.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    500,
    "img.png",
    "#3123",
    25
  );
  console.log(await productManager.getProducts());
  await productManager.getProductsById(2);
  await productManager.addProduct(
    "producto prueba 2 ",
    "Este es un producto de prueba 2",
    550,
    "img2.png",
    "#1221",
    30
  );
  await productManager.updateProducts(2, {
    title: "producto de prueba 3 ",
    description: "Este es un producto de prueba 3",
    price: 600,
    thumbnail: "img3.png",
    code: "#9574",
    stock: 25,
    id: 5,
  });
  await productManager.deleteProduct(2);
};

//funcionAsync()

export default ProductManager;
