import axios from "axios";
import "./CommentSection.css";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useStateContext } from "../../Context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import CommentFeed from "../CommentFeed/CommentFeed";
import { Navigate } from "react-router-dom";

const CommentSection = ({ id }) => {
  //login form
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // register form
  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  //Login success modal

  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [login, setLogin] = useState({});
  const [register, setRegister] = useState({});
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);

  const {
    user,
    token,
    setToken,
    setUser,
    userId,
    setUserId,
    role,
    setRole,
    setAvartar,
  } = useStateContext();

  const cmRef = useRef();
  const emailRef = useRef();

  console.log(id);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Access the value of the input field
    const inputValue = emailRef.current.value;
    alert(`Submitted value: ${inputValue}`);
  };

  const fetchComments = async () => {
    setComments([]);

    try {
      axios.get(`http://127.0.0.1:8000/api/comments/${id}`).then((res) => {
        setComments(res.data);
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id, role]);

  console.log(role);

  const Submit = async (e) => {
    e.preventDefault();
    setComment(cmRef.current.value);
    console.log(cmRef.current.value);
    try {
      await axios.post(`http://127.0.0.1:8000/api/comments`, {
        beachid: id,
        accountid: `${userId}`, // Replace with actual account ID
        comment: cmRef.current.value,
      });
      fetchComments();

      setComment("");
      cmRef.current.value = "";
    } catch (err) {
      console.error(err);
    }

    console.log(userId);
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      console.log(file, fileName);
    } else {
      setFileName("");
      setFile(null);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogin({ ...login, [name]: value });
  };

  const handleChangeRegister = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegister({ ...register, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/api/login`, login)
      .then((res) => {
        setUserId(res.data.users.id);
        setUser(res.data.users.name);
        setToken(res.data.token);
        setRole(res.data.users.role);
        setAvartar(res.data.users.image_url);
        console.log(res.data.users);
        console.log(res.data.token);
        if (res) {
          handleClose();
          handleShowSuccess();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e);
    if (register.password !== register.passwordcfm) {
      alert("Vui lòng xác nhận lại mật khẩu");
      return;
    }
    const fData = new FormData();

    fData.append("image", file);
    fData.append("name", register.name);
    fData.append("email", register.email);
    fData.append("password", register.password);

    axios
      .post(`http://127.0.0.1:8000/api/register`, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res) {
          console.log(res.data);
          setUserId(res.data.user.id);
          setUser(res.data.user.name);
          setToken(res.data.token);
          setAvartar(res.data.user.image_url);
          handleCloseRegister();
          handleShowSuccess();
        }
      })
      .catch((err) => console.log(err));
  };

  console.log("Nguoi dung :" + user, "Token:" + token);

  return (
    <body>
      <div>
        <form action="action_page.php" />
        <label for="fname" style={{ display: "block" }}>
          Comment
        </label>
        <input
          ref={cmRef}
          type="text"
          id="fname"
          name="firstname"
          placeholder="Your comment.."

          // onChange={(e) => {
          //   setCm(e.target.value);
          //   setComment({
          //     beachid: `${id}`,
          //     accountid: "1",
          //     comment: `${cm}`,
          //   });
          //   console.log(cm);
          // }}
        />
        {token ? (
          <button type="submit" value="Submit" onClick={Submit}>
            Submit
          </button>
        ) : (
          <button type="submit" value="Submit" onClick={handleShow}>
            Submit
          </button>
        )}

        <button onClick={handleShowSuccess}>Đăng ký</button>

        <div id="comments">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentFeed
                key={comment.id}
                comment={comment.comment}
                accountid={comment.accountid}
                createdAt={comment.created_at}
              />
            ))
          ) : (
            <p>Chưa có bình luận nào</p>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["warning"].map((variant) => (
            <Alert key={variant} variant={variant}>
              Bạn chưa đăng nhập. <br />
              Vui lòng đăng nhập để có thể bình luận!
            </Alert>
          ))}
          <Form onSubmit={handleLogin}></Form>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  ref={emailRef}
                  type="text"
                  placeholder="Email.."
                  name="email"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password.."
                  name="password"
                  onChange={handleChange}
                />
              </Col>
              <br />
              <br />
              <Row>
                <p></p>
              </Row>
              <Row>
                <Col md={7}></Col>
                <Col md={5}>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      handleShowRegister();
                      handleClose();
                    }}
                  >
                    Bạn chưa có tài khoản ?
                  </a>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  ref={emailRef}
                  type="text"
                  placeholder="Name.."
                  name="name"
                  onChange={handleChangeRegister}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  ref={emailRef}
                  type="text"
                  placeholder="Email.."
                  name="email"
                  onChange={handleChangeRegister}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  style={{ borderRadius: 10 }}
                  placeholder="Password.."
                  name="password"
                  onChange={handleChangeRegister}
                />
              </Col>
              <br />
              <br />
            </Form.Group>
            <br />
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                Confirm Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ borderRadius: 10 }}
                  type="password"
                  placeholder="Password Comfirmation.."
                  name="passwordcfm"
                  onChange={handleChangeRegister}
                />
              </Col>
              <br />
              <br />
            </Form.Group>
            <br />
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Chọn ảnh đại diện</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                name=""
                onChange={(e) => handleFileChange(e)}
              />
            </Form.Group>
          </Form>
          <Row>
            <p></p>
          </Row>
          <Row>
            <Col md={7}></Col>
            <Col md={5}>
              <a href="">Bạn chưa có tài khoản ?</a>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {["success"].map((variant) => (
            <Alert key={variant} variant={variant}>
              Xin chào {user} !
            </Alert>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccess}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </body>
  );
};

export default CommentSection;
