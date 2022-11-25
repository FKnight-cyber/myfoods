import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, styled } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& label.Mui-focused": {
    color: "#7ed957",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#7ed957",
      fontSize: "0.9em",
    },
    borderRadius: '10px'
  },
}));

const textFieldInputLabelStyle = {
  fontSize: "0.9em",
  alignSelf: "center",
  justifySelf: "center",
};

const textFieldStyle = {
  width: "230px",
};

const SendMessages = ({messageData}) => {
  const CHARACTER_LIMIT = 1000;

  const [numberEmptyError, setNumberEmptyError] = useState(false);
  const [messageEmptyError, setMessageEmptyError] = useState(false);

  const [mobileNumber, setMobileNumber] = useState('');

  const [message, setMessage] = useState(
    `Nome:  ${messageData.name}
CEP:  ${messageData.CEP}
Bairro: ${messageData.district}
Rua:  ${messageData.road}
Número da casa:  ${messageData.number}\n
${renderOrder(messageData.products)}
Total:  ${messageData.total}\n
PIX:  ryannicholas.vieira@gmail.com
Se fizer o pagamento por PIX envie o comprovante!
`);

  const { token, setProductsInCart } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (mobileNumber.length < 1) {
      setNumberEmptyError(true);
      setTimeout(() => setNumberEmptyError(false), 3000);
    } else if (message.length < 1) {
      setMessageEmptyError(true);
      setTimeout(() => setMessageEmptyError(false), 3000);
    } else {

      const body = {
        products: messageData.products.map(product => product.id)
      }

      const promisePurchase = axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase`,body,{
        headers:{'x-access-token': `${token}`}
      });
  
      promisePurchase.then(res => {
        setMessage(`_*Nome:*_ ${messageData.name}
        _*CEP:*_ ${messageData.CEP}
        _*Bairro:*_ ${messageData.district}
        _*Rua:*_ ${messageData.road}
        _*Número da casa:*_ ${messageData.number}\n
      ${renderOrder(messageData.products)}
      _*Total:*_ ${messageData.total}\n
      _*PIX:*_ ryannicholas.vieira@gmail.com
      _*Se fizer o pagamento por PIX envie o comprovante!*_
      `);

      let url = `https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`;

      url += `?text=${encodeURI(`_*Telefone:*_  ${mobileNumber}\n` + message)}&app_absent=0`;

        const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/clean`,{
              headers:{'x-access-token': `${token}`}
          });
        
        promise.then(res => {
          console.log("ok");
        });

        promise.catch(Error => {
          console.log(Error.response.data)
        });

        setProductsInCart(0);
        navigate("/initialpage");
        window.open(url);
      });

      promisePurchase.catch(Error => {
        console.log(Error.response.data)
      });
    }
  };


  function renderOrder(products){
    return products.map((product) => (`${product.products.name}: x${product.quantity}\n`));
};

  return (
    <div className='communication'>
      <div className='whatsapp-card app'>
        <div className='title flex_middle'>
          <div style={{ marginRight: "0.5em" }}>
            <WhatsAppIcon />
          </div>
          <div>Envie seu pedido!</div>
        </div>
        {numberEmptyError && (
          <div className='errors'>Mobile number cannot be empty!</div>
        )}
        {messageEmptyError && (
          <div className='errors'>Message cannot be empty!</div>
        )}
        {!numberEmptyError && !messageEmptyError && (
          <div className='errors-null'>.</div>
        )}
        <div className='search_contact app'>
          <CssTextField
            error={numberEmptyError}
            label='Mobile Number'
            placeholder='Mobile Number'
            name='mobileNumber'
            value={mobileNumber}
            onChange={e => setMobileNumber(e.target.value)}
            size='small'
            style={{
              margin: "1em 0em",
            }}
            inputProps={{
              style: textFieldStyle,
            }}
            InputLabelProps={{
              style: textFieldInputLabelStyle,
            }}
            required
          />
        </div>
        <div className='message app' style={{ marginTop: "1.5em" }}>
          <CssTextField
            multiline
            maxRows={4}
            label='Message'
            placeholder='Oi! envie seu pedido!'
            size='large'
            InputLabelProps={{
              style: textFieldInputLabelStyle,
            }}
            inputProps={{
              style: {
                width: "230px",
                height: "40vh",
                overflowY: "scroll",
              },
              maxLength: CHARACTER_LIMIT,
            }}
            FormHelperTextProps={{
              style: {
                margin: 0,
                padding: "0 0 0 5px",
                fontSize: 10,
              },
            }}
            name='message'
            value={message}
            required
            error={message.length > CHARACTER_LIMIT - 1 || messageEmptyError}
            helperText={
              !(message.length > CHARACTER_LIMIT - 1)
                ? `${message.length}/${CHARACTER_LIMIT}`
                : "Max length exceeded"
            }
          />
        </div>
        <div style={{ marginTop: "1.5em" }}>
        <Button
            onClick={() => navigate(-1)}
            variant='outlined'
            color='error'
            size='large'
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            variant='outlined'
            color='success'
            size='large'
          >
            Enviar
          </Button>
        </div>
        <h1 style={{ marginTop: "1.5em" }}>PIX: ryannicholas.vieira@gmail.com</h1>
      </div>
    </div>
  );
};

SendMessages.propTypes = {
  number: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default SendMessages;