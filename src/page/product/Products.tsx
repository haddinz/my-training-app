import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../utils/store";
import { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  getProduct,
  productSelectors,
} from "../../utils/slice/productSlice";
import "../../styles/product/Products.style.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";

function Products() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(productSelectors.selectAll);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(getProduct());
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
      setIsLoading(true);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("product", products)

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {isLoading || products.length === 0 ? (
        <div className="loading">loading......</div>
      ) : (
        <div className="div-container">
          <div className="head-card-container">
            <h1>Products Selectors</h1>
          </div>
          <div className="add-container">
            <Button
              text="Add Product"
              func={() => navigate("/product/add")}
              color="primary"
            />
          </div>
          <div className="card-container">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <p>{product.name}</p>
                <p>price: {product.price}</p>
                <p>{product.description}</p>
                <p>{formatDate(product.createdAt)}</p>
                <div className="card-btn-container">
                  <Button
                    text="Update"
                    color="primary"
                    func={() => navigate(`/product/update/${product.id}`)}
                  />
                  <Button
                    text="Delete"
                    color="danger"
                    func={() => dispatch(deleteProduct(product.id))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
