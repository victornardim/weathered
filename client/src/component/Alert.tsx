import { BsInfoCircle, BsCheckCircle, BsXCircle } from 'react-icons/bs';

function Alert({ options, message, close }) {
  return (
    <main className={`alert ${options.type}`}>
      <i className='icon'>
        {options.type === 'info' && <BsInfoCircle size={20}></BsInfoCircle>}
        {options.type === 'success' && <BsCheckCircle size={20}></BsCheckCircle>}
        {options.type === 'error' && <BsXCircle size={20}></BsXCircle>}
      </i>
      <span className='content'>{message}</span>
      <button className='close' onClick={close}>X</button>
    </main>
  )
}

export default Alert;