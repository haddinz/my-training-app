import "../../styles/product/Products.style.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { DeleteProductHooks, GetProductHooks } from "../../hooks/productHooks";
import { formatDate } from "../../utils/getFormatDate";
import Layout from "../../components/Layout";

function Products() {
  const navigate = useNavigate();
  const { isLoading, data: products } = GetProductHooks();
  const { isLoading: deleteLoading, deleteData } = DeleteProductHooks();

  const deleteHandler = (id: string) => {
    deleteData(id);
  };

  return (
    <Layout>
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
                      text={deleteLoading ? "loading..." : "Delete"}
                      color="danger"
                      func={() => deleteHandler(product.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Products;
