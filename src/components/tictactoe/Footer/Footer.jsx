
import "./Footer.css";


const Footer = ({ setShowModal }) => {
  const showModal = () => {
    setShowModal(true);
  };

  return (
    <footer>

      <a onClick={showModal}>Click</a>
    </footer>
  );
};

export default Footer;
