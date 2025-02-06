import Navbar from "../components/Navbar/Navbar";
import ContactHome from "../components/Contact/ContactHome";
import "../Css/Contact.css";
const Contact = () => {
  return (
    <body>
      <Navbar />
      <ContactHome />
      <div className="copyright">
        <p>Copyrights By Teams 2 - 2024</p>
      </div>
    </body>
  );
};
export default Contact;
