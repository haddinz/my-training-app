import "../../styles/contact/Contact.style.scss";
import Layout from "../../components/Layout";
import { useState, lazy, useEffect, Suspense } from "react";
import { Contact } from "../../types/contactType";
import { GetContactHooks } from "../../hooks/contactHooks";
import { useTranslation } from "react-i18next";
import { ComponentType } from "react";
import { AutoInput, MessageBox } from "../../components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Delay<T = ComponentType<any>> = Promise<{ default: T }>;

// const AutoInput = lazy(() => import("../../components/AutoInput"));
const ContactItems = lazy(() =>
  delayViewContact(import("../../components/ContactItems"))
);

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

  const { isLoading, data: contacts } = GetContactHooks();

  const [contactFilter, setContactFilter] = useState<Contact[]>(contacts);

  useEffect(() => {
    setContactFilter(contacts);
  }, [contacts]);

  const clickHandler = (value: string) => {
    setContactFilter(
      contacts.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      <div>
        {isLoading || contacts.length === 0 ? (
          <MessageBox>loading.....</MessageBox>
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
            <Suspense fallback={<MessageBox>loading....</MessageBox>}>
              {contactFilter.length !== 0 ? (
                <ContactItems
                  tableHeadKeys={tableHeadKeys}
                  contactFilter={contactFilter}
                />
              ) : (
                <div className="not-found">
                  <p>contact is not found</p>
                </div>
              )}
            </Suspense>
          </div>
        )}
      </div>
    </Layout>
  );
}

// const delayForDemo = (promise: Delay) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 2000);
//   }).then(() => promise);

const delayViewContact = (promise: Delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  }).then(() => promise);

export default Contacts;
