import { useRef } from "react";
import "../Contact/Contact.css";
import Container from "react-bootstrap/Container";
import { init } from "emailjs-com";
import emailjs from '@emailjs/browser';

init()
const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
// nhớ phần send-form nhập cái đầu tiên là email ID, cái sau là privateId, và cái cuối là...
        emailjs
            .sendForm('service_b54qjf7', 'template_z6cu3ab', form.current, {
                publicKey: 'm_s_RQqh0HNtmCtlX',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
            alert("Email send! , Done")
    };
    return (
        <body >
           <div className="backgroundContact">
                <Container>
                    <div className="contactDetail">
                        <img src="./Images/logocont.png" alt="Not having it" style={{ float: "left", width: "400px" }} />
                        <h4>
                            Phone number:
                        </h4><br />
                        <p>
                            1800 28 28 24
                        </p><br />
                        <h4>
                            Address:
                        </h4><br />
                        <p>
                            778/10 Nguyen Kiem St, Phu Nhuan District
                        </p><br />
                        <h4>
                            Email Address:
                        </h4><br />
                        <p>
                            aptech2@aprotrain.com
                        </p>
                    </div>
                </Container>
                <div className="formBx">
                    <form ref={form} onSubmit={sendEmail}>
                        <h3>Contact Us</h3>
                        <input type="text" placeholder="Full Name" className="formInt" name="user_name" /><br />
                        <input type="email" placeholder="Email" className="formInt" name="user_email" /><br />
                        {/* <input type="text" placeholder="Your Message" className="formInt" name="email_verified_at" ></input> */}
                        <textarea name="message" id="" className="formInt" placeholder="Your Messages" style={{ paddingTop: "50px" }}></textarea>
                        <input type="submit" value="Send" name="submit" style={{ border: "15px", marginTop: "20px", marginBottom: "100px" }} />
                    </form>
                </div>
           </div>
        </body>
    );
}

export default Contact;