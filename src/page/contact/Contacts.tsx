import "../../styles/contact/Contact.style.scss";
import { useNavigate } from "react-router-dom";
import { AutoInput, Button } from "../../components";
import Layout from "../../components/Layout";
import { useState } from "react";
import { Contact } from "../../types/contactType";
import { DeleteContactHooks, GetContactHooks } from "../../hooks/contactHooks";

function Contacts() {
  const navigate = useNavigate();
  const { isLoading, data: contacts } = GetContactHooks();
  const { isLoading: deleteLoading, deleteData } = DeleteContactHooks();

  const [contactFilter, setContactFilter] = useState<Contact[]>(contacts || []);

  const changeHandler = (value: string) => {
    if (!contacts) return null;
    setContactFilter(
      contacts.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const deleteHandler = (id: string) => {
    deleteData(id);
  };

  return (
    <Layout>
      <div>
        {isLoading || contacts.length === 0 ? (
          <div className="loading">loading......</div>
        ) : (
          <div className="div-container">
            <div className="head-card-container">
              <h1>Contact Selectors</h1>
            </div>

            <div className="input-container">
              <AutoInput
                suggestions={contacts.map((item) => item.name)}
                onSearch={changeHandler}
              />
            </div>

            {contactFilter.length !== 0 && (
              <table>
                <thead>
                  <tr>
                    <th>no</th>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>address</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {contactFilter.map((item, index) => (
                    <tr className="card" key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td className="card-btn-container">
                        <Button.Primary
                          func={() => navigate(`/contact/update/${item.id}`)}
                        >
                          Update
                        </Button.Primary>
                        <Button.Danger func={() => deleteHandler(item.id)}>
                          {deleteLoading ? "loading..." : "Delete"}
                        </Button.Danger>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Contacts;
