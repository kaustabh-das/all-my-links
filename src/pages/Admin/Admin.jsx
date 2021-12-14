import React, { useState } from "react";
import InputModel from "../../components/InputModel/InputModel";
import Layout from "../../components/Layout/Layout";
import "./app.adminpage.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Button, Modal } from "react-bootstrap";

const Admin = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Layout>
      <div className="admin_page">
        <button variant="primary" onClick={() => setModalShow(true)}>
          Add New Link
        </button>
        {modalShow && (
          <InputModel
            onRequestClose={() => setModalShow(false)}
            setModalShow={setModalShow}
          />
        )}
        <h1>Admin Page</h1>
      </div>
    </Layout>
  );
};

export default Admin;
