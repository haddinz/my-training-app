import { ChangeEvent, useState } from "react";
import { AddProductType } from "../../types/productType";
import { useNavigate } from "react-router-dom";
import { Button, Layout } from "../../components";
import { AddProductHooks } from "../../hooks/productHooks";

import "../../styles/product/AddProduct.style.scss";

function AddProduct() {
  const [product, setProduct] = useState<AddProductType>({
    name: "",
    price: "",
    description: "",
    createdAt: new Date(),
  });

  const navigate = useNavigate();

  const { isLoading, postData: addProduct } = AddProductHooks(product);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await addProduct();
    navigate("/");
  };

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoFocus
              required
              value={product.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              name="price"
              required
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              required
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <Button text={isLoading ? "submit" : "loading...."} color="primary" />
        </form>
      </div>
    </Layout>
  );
}

export default AddProduct;
