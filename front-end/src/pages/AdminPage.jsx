import {
  faCheck,
  faInfo,
  faPen,
  faPlus,
  faSearch,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Image,
} from "react-bootstrap";

const AdminPage = () => {
  const [dsbb, setDsbb] = useState([]);

  const [bb, setBb] = useState({});
  const [selectedBeach, setSelectedBeach] = useState({});

  // State showInfoModal cho phép ẩn/hiện modal chi tiết bãi biển
  const [showInfoModal, setShowInfoModal] = useState(false);
  const handleCloseInfoModal = () => setShowInfoModal(false);
  const handleShowInfoModal = () => setShowInfoModal(true);
  const [showTextField, setShowTextField] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/beach")
      .then((res) => setDsbb(res.data));
  }, []);

  const toggleTextField = (id) => {
    setShowTextField((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIdToDelete(id);
  };

  const [idToDelete, setIdToDelete] = useState();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBb({ ...bb, [name]: value });
    console.log(bb);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/beach", bb)
      .then((res) => setDsbb([...dsbb, res.data]));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/beach/${id}`)
      .then(() => setDsbb(dsbb.filter((item) => item.id != id)));
    handleClose();
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <h1>Thêm thông tin bãi biển</h1>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Link Ảnh</Form.Label>
                <Form.Control
                  type="text"
                  name="avartar_url"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mã quốc gia:</Form.Label>
                <Form.Control
                  type="text"
                  name="nationid"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tên bãi biển:</Form.Label>
                <Form.Control type="text" name="name" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Khách tham quan:</Form.Label>
                <Form.Control
                  type="text"
                  name="visitor"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số sao:</Form.Label>
                <Form.Control
                  type="text"
                  name="ratingScore"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="success" type="submit" onClick={handleAdd}>
                <FontAwesomeIcon icon={faPlus} /> Thêm
              </Button>
            </Form>
          </Col>

          <Col md={9}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Mã số</th>
                  <th>Tên bãi biển</th>
                  <th>Khách tham quan</th>
                  <th>Số sao</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {dsbb.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.avartar_url} style={{ width: "100px" }} />
                    </td>
                    <td>{item.id}</td>
                    <td>
                      {showTextField[item.id] ? (
                        <input
                          style={{ width: "200px" }}
                          type="text"
                          className="form-control"
                          defaultValue={item.name}
                        />
                      ) : (
                        item.name
                      )}
                    </td>

                    <td>
                      {showTextField[item.id] ? (
                        <input
                          style={{ width: "100px" }}
                          type="text"
                          className="form-control"
                          defaultValue={item.visitor}
                        />
                      ) : (
                        item.visitor
                      )}
                    </td>

                    <td>
                      {showTextField[item.id] ? (
                        <input
                          style={{ width: "50px" }}
                          type="text"
                          className="form-control"
                          defaultValue={item.ratingScore}
                        />
                      ) : (
                        item.ratingScore
                      )}
                    </td>

                    <td>
                      <Button
                        variant="info"
                        style={{ marginRight: "5px" }}
                        onClick={() => {
                          setSelectedBeach(item);
                          handleShowInfoModal();
                        }}
                      >
                        <FontAwesomeIcon icon={faInfo} />
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => {
                          setSelectedBeach(item);
                          console.log(item.id);
                          toggleTextField(item.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleShow(item.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn xóa?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete(idToDelete)}>
            <FontAwesomeIcon icon={faCheck} /> Xóa
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal hiển thị chi tiết bãi biển */}
      <Modal
        show={showInfoModal}
        size="lg"
        centered
        onHide={handleCloseInfoModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedBeach.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <Image
                src={selectedBeach.avartar_url}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={4}>
              <dl>
                <dt>Mô tả:</dt>
                <dd>{selectedBeach.description}</dd>
                <dt>Khách tham quan:</dt>
                <dd>{selectedBeach.visitor}</dd>
                <dt>Mã số quốc gia:</dt>
                <dd>{selectedBeach.nationid}</dd>
                <dt>Số sao:</dt>
                <dd>{selectedBeach.ratingScore}</dd>
                <dt>Mã nhúng map:</dt>
                <dd>{selectedBeach.map_html_code}</dd>
              </dl>
            </Col>
            <Col md={4}></Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfoModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseInfoModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPage;
