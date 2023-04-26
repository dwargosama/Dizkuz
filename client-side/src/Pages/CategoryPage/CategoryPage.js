import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CategoryCard from '../../Components/CategoryCard';
import './CategoryPage.css';
import Modal from 'react-bootstrap/Modal';
import Footer from '../../Components/Footer';
import NavBar from '../../Components/NavBar';
import Form from 'react-bootstrap/Form';

function NewCategoryModal(props) {

  const addCategory = () =>{
    props.onHide();
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" placeholder="Enter category name" />
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addCategory}>
            Create
          </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default function CategoryPage() {
  const navigate = useNavigate();

    // modal
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [ HtmlLoaded, setHtmlLoaded] = useState( false);
  const [ Categories, setCategories] = useState( {} );

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
  };
  const handleLeave = () => {
    setShow(false)
    // console.log( "organisation : ", prop.id);
  }

    const [orgName, setOrgName] = useState( 'Organization test');


    const CategoryComponent = Categories.map((category) =>{
        return(
        <div>
            <CategoryCard title={category.title} description={category.description} id={category.id} key={category.id}/>
        </div>
        );
      });

    const openMembers = () => {
        console.log( "Members");
    }

    const JumpToNewCategory = () => {
      setModalShow( true);
    }

    let currentUser_ = {};
  
    useEffect( () => {
      currentUser_ = JSON.parse(localStorage.getItem('currentUser'));
      if( currentUser_ == null){
        navigate( '/landing');
      }

      const dizkuzData = JSON.parse(localStorage.getItem('currentUser'));
      const OrgID = dizkuzData.currentOrganisation;

      // List contains all categories in which organisationID == OrgID

      

    }, []);

  return (
    <>
    <NavBar />
    <div className='CategoryConainer' style={{paddingTop : '70px'}}>

        <h3 style={{textAlign: 'center'}}>{orgName}</h3>
        <hr/>
        <div className='OrganisationButton2'>
            <Button className='orgbtn_' variant="outline-primary" onClick={openMembers}>Members</Button>
            <Button className='orgbtn_' variant="primary" onClick={JumpToNewCategory}>New Category</Button>
        </div>
        {CategoryComponent}
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Once you leave this, you won't be able to access it ever again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLeave}>
            Leave
          </Button>
        </Modal.Footer>
    </Modal>
    <NewCategoryModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    <Footer />
    </>
  )
}
