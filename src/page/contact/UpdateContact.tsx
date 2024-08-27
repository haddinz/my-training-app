import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/contact/UpdateContact.style.scss";
import { Button, Layout } from "../../components";
import { UpdateContactType } from "../../types/contactType";
import { UpdateContactHooks } from "../../hooks/contactHooks";

function UpdateContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editContact, setEditContact] = useState<UpdateContactType>({
    id: id ?? "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const {
    isLoading,
    data: contact,
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

          <div>
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
          </div>

          <div>
            <Button.Primary>
              {isLoading ? "submit" : "loading...."}
            </Button.Primary>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateContact;
