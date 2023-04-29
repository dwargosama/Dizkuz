import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IssueCard from "../../Components/IssueCard";
import Button from "react-bootstrap/Button";
import "./IssuePage.css";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import AddImg from "./AddImg.png";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function NewIssueModal(props) {
  const addIssue = () => {
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Enter Issue name"
          style={{ marginBottom: "5px" }}
        />
        <Form.Control
          type="textarea"
          placeholder="Enter Issue description"
          style={{ marginTop: "5px" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={addIssue}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function IssuePage() {
  const navigate = useNavigate();

  const [alertHead, setAlertHead] = useState("");
  const [alertBody, setAlertBody] = useState("");
  const [alertVarient, setAlertVarient] = useState("");
  const [Alertshow, setAlertShow] = useState(false);
  const [rerenderer, setRerenderer] = useState( false);
  const [modalShow, setModalShow] = React.useState(false);
  const [HtmlLoaded, setHtmlLoaded] = useState(false);
  const [IssueComponent, setIssueComponent] = useState(<></>);
  const [CategoryName, setCategoryName] = useState("");
  const [OrganisationName, setOrganisationName] = useState("");

  const JumpToAddIssue = () => {
    setModalShow(true);
  };

  let currentUser_ = {};

  useEffect(() => {
    currentUser_ = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser_ == null) {
      navigate("/landing");
    }

    const doWork = async () => {
      try {
        const dizkuzData = JSON.parse(localStorage.getItem("dizkuzData"));
        const currentUser_ = JSON.parse(localStorage.getItem("currentUser"));

        setOrganisationName(dizkuzData.currentOrganisationName);
        setCategoryName(dizkuzData.currentCategoryName);

        const CatID = dizkuzData.currentCategory;

        const inp = {
          email: currentUser_.email,
          password: currentUser_.password,
          ID: CatID,
        };
        const response = await fetch("http://localhost:8080/issues", {
          method: "POST",
          body: JSON.stringify(inp),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const fetchData = await response.json();
        if (fetchData.status === "authFailed") {
          localStorage.removeItem("currentUser");
          navigate("/landing");
        } else if (fetchData.status == "failed") {
          setAlertHead("Unknown error occured");
          setAlertBody(
            "Due to some unexpected error, the issues were not loaaded. Please try again."
          );
          setAlertVarient("danger");
          setAlertShow(true);
        } else {
          const LoadedData = fetchData.data;
          const Issues = LoadedData;

          let tempVar;
          if (Issues.length == 0) {
            tempVar = (
              <div
                style={{
                  paddingTop: "100px",
                  paddingBottom: "50px",
                  color: "darkred",
                }}
              >
                <h4>Sorry, No Member exists.</h4>
              </div>
            );
          } else {
            tempVar = Issues.map((issue) => {
              return (
                <div>
                  <IssueCard
                    title={issue.title}
                    body={issue.body}
                    id={issue.id}
                    author={issue.author}
                    date={issue.date}
                    key={issue.id}
                  />
                </div>
              );
            });
          }
          const tempIssueComponent = tempVar;

          // setreloader(!reloader);
          setRerenderer( ! rerenderer);
          setIssueComponent(tempIssueComponent);
          setHtmlLoaded(true);
        }
      } catch (error) {
        setAlertHead("Unexpected error occured!");
        setAlertBody(
          "Due to some unexpected error we were not able to get the issues for you. Please check your connection and try again..."
        );
        setAlertVarient("danger");
        setAlertShow(true);
      }
    };

    doWork();
  }, []);

  return HtmlLoaded ? (
    <>
      <NavBar />
      <div className="IssuePageOuterContainer" style={{ paddingTop: "70px" }}>
        <h3 style={{ textAlign: "center" }}>
          {OrganisationName}/<b>{CategoryName}</b>
        </h3>
        <hr />
        <div className="IssuePageContainer">
          <div className="NewIssue" onClick={JumpToAddIssue}>
            <div>
              <div className="NewIssueCont">
                <img src={AddImg} height={"100px"} />
              </div>
              <div>Add new issue</div>
            </div>
          </div>
          {IssueComponent}
        </div>
      </div>
      <NewIssueModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </>
  ) : (
    <>
      <NavBar />
      <div className="SpinnerContainer">
        <Spinner animation="border" variant="dark" />
      </div>
      <Footer />
    </>
  );
}
