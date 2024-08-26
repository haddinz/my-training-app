import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../utils/store";
import {
  getProduct,
  productSelectors,
  updateProduct,
} from "../../utils/slice/productSlice";
import "../../styles/product/UpdateProduct.style.scss";
import { Button } from "../../components";

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editProduct, setEditProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const product = useSelector((state: RootState) => {
    return productSelectors.selectById(state, id ?? "");
  });

  useEffect(() => {
    dispatch(getProduct);

    if (product) {
      setEditProduct({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [dispatch, product]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(
      updateProduct({
        id: id || "",
        name: editProduct.name,
        price: editProduct.price,
        description: editProduct.description,
      })
    );
    setIsLoading(false);
    navigate("/");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditProduct({
      ...editProduct,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-update">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            required
            autoFocus
            name="name"
            value={editProduct.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            required
            name="price"
            value={editProduct.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            required
            value={editProduct.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button text={isLoading ? "submit" : "loading...."} color="primary" />
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
