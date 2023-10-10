import error from '../images/error.svg';

interface InfoTooltipProps {
  isOpen: boolean,
  onClose: ()=>void,
  errorText: string,
}

function InfoTooltip ({
  isOpen,
  onClose,
  errorText,
}: InfoTooltipProps) {
  return (
    <section className={`popup ${(isOpen) ? 'popup_opened': ''}`}>
      <div className="popup__container">
      <button className="button popup__close-button" onClick={onClose} aria-label="close window with notification"></button>
        <img 
          src={error}
          alt ={'Error sign'}
          className="popup__image popup__image_type_tooltip"
        />
        <p className="popup__caption">{ errorText }</p>
      </div>
    </section>
  )
}

export default InfoTooltip;