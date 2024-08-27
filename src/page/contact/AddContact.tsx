import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Layout } from "../../components";
import "../../styles/contact/AddContac.style.scss"
import { AddContactType } from "../../types/contactType";
import { AddContactHooks } from "../../hooks/contactHooks";

function AddContact() {
  const [contact, setContact] = useState<AddContactType>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const { isLoading, postData: addContact } = AddContactHooks(contact);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await addContact();
    navigate("/");
  };

  return (
    <Layout>
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
              value={contact.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={contact.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              name="phone"
              required
              value={contact.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              name="address"
              required
              value={contact.address}
              onChange={handleChange}
            />
          </div>

          <Button.Primary>
            {isLoading ? "submit" : "loading...."}
          </Button.Primary>
        </form>
      </div>
    </Layout>
  );
}

export default AddContact;
