import { useDispatch } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { ChangeEvent, useState } from "react";
import { AddProductType } from "../../types/productType";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../utils/slice/productSlice";
import "../../styles/product/AddProduct.style.scss";
import { Button } from "../../components";

function AddProduct() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<AddProductType>({
    name: "",
    price: "",
    description: "",
    createdAt: new Date(),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await dispatch(addProduct(product));
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(true);
      console.log("error", error);
    }
  };

  return (
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

        <Button text={isLoading ? "submit" : "loading...."} color="primary"/>
      </form>
    </div>
  );
}

export default AddProduct;
