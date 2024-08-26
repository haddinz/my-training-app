import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../utils/store";
// import {
//   getProduct,
//   productSelectors,
//   updateProduct,
// } from "../../utils/slice/productSlice";
import "../../styles/product/UpdateProduct.style.scss";
import { Button, Layout } from "../../components";
import { UpdateProductHooks } from "../../hooks/productHooks";
import { UpdateProductType } from "../../types/productType";

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editProduct, setEditProduct] = useState<UpdateProductType>({
    id: id ?? "",
    name: "",
    price: "",
    description: "",
  });

  const {
    isLoading,
    data: product,
    updateData,
  } = UpdateProductHooks(id ?? "", editProduct);

  useEffect(() => {
    if (product) {
      setEditProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [id, product]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await updateData();
    navigate("/");
  };

  return (
    <Layout>
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
            <Button
              text={isLoading ? "submit" : "loading...."}
              color="primary"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
