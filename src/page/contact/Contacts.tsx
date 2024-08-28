import "../../styles/contact/Contact.style.scss";
import { useNavigate } from "react-router-dom";
import { AutoInput, Button } from "../../components";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { Contact } from "../../types/contactType";
import { DeleteContactHooks, GetContactHooks } from "../../hooks/contactHooks";
import { useTranslation } from "react-i18next";

function Contacts() {
  const tableHeadKeys = [
    "no",
    "id",
    "name",
    "email",
    "phone",
    "address",
    "action",
  ];

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, data: contacts } = GetContactHooks();
  const { isLoading: deleteLoading, deleteData } = DeleteContactHooks();

  const [contactFilter, setContactFilter] = useState<Contact[]>(contacts || []);

  useEffect(() => {
    setContactFilter(contacts);
  }, [contacts]);

  const clickHandler = (value: string) => {
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
              <h1>{t("contact")}</h1>
            </div>

            <div className="input-container">
              <AutoInput
                contacName={contacts.map((item) => item.name)}
                onClickInput={clickHandler}
              />
            </div>

            {contactFilter.length !== 0 ? (
              <table>
                <thead>
                  <tr>
                    {tableHeadKeys.map((item, index) => (
                      <th key={index}>{t(`tableHead.${item}`)}</th>
                    ))}
                    {/* <th>no</th>
                    <th>id</th>
                    <th>name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>address</th>
                    <th>action</th> */}
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
            ) : (
              <div className="not-found">
                <p>contact is not found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Contacts;
