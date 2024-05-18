import "../Styles/modal.css"
import Close from "../Images/close.png"

const ErrorModal = (props) => {
    return (
        <div className="modal-container">
          <div className="error-msg">
            <div className="error-text">
              <p>{props.message}</p>
            </div>
            
            <div className="image-container">
              <img src={Close} className="closeImage" onClick={props.onClose} alt="Close" />
            </div>
          </div>
        </div>
    )
   }
   
   export default ErrorModal