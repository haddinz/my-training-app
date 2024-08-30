import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Contact } from "../types/contactType";
import { DeleteContactHooks } from "../hooks/contactHooks";
import { useTranslation } from "react-i18next";

interface ContactItems {
  tableHeadKeys: string[];
  contactFilter: Contact[];
}

function ContactItems({
  tableHeadKeys,
  contactFilter,
}: ContactItems) {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoading: deleteLoading, deleteData } = DeleteContactHooks();

  const deleteHandler = (id: string) => {
    deleteData(id);
  };

  return (
    <table>
      <thead>
        <tr>
          {tableHeadKeys.map((item, index) => (
            <th key={index}>{t(`tableHead.${item}`)}</th>
          ))}
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
  );
}

export default ContactItems;
