import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/contact/UpdateContact.style.scss";
import { Button, Layout } from "../../components";
import { UpdateContactType } from "../../types/contactType";
import { UpdateContactHooks } from "../../hooks/contactHooks";
import { useTranslation } from "react-i18next";

function UpdateContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { t } = useTranslation();
  const updateContactKey = ["name", "email", "phone", "address"];

  const [editContact, setEditContact] = useState<UpdateContactType>({
    id: id ?? "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const {
    isLoading,
    memoData: contact,
    updateData,
  } = UpdateContactHooks(id ?? "", editContact);

  useEffect(() => {
    if (contact) {
      setEditContact({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      });
    }
  }, [contact, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditContact({
      ...editContact,
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
          {updateContactKey.map((item, index) => (
            <div key={index}>
              <label htmlFor={item}>{t(`updateContact.${item}`)}</label>
              <input
                type="text"
                required
                name={item}
                value={editContact[item as keyof UpdateContactType]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              name="name"
              value={editContact.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              required
              value={editContact.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              required
              value={editContact.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              required
              value={editContact.address}
              onChange={handleChange}
            />
          </div> */}

          <div>
            <Button.Primary>
              {isLoading ? "loading...." : "submit"}
            </Button.Primary>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateContact;
