import { useState } from "react";
import "./index.scss";

export const EntryField = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false)


  
  const Fields = () => {
    switch (props.type) {
      
      case 'file':
        return(
          <div className="file-input-container">
            <p>Selecione o arquivo</p>
            <input type="file" />
          </div>
        )

      case 'select':
        return (
          <select className="default" name={props.name} value={props.value} onChange={props.onChange}>
            <option value="" disabled>Selecione...</option>
            {props.selectOptions.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        )

      case 'divider':
        return (
          <p className="divider">{props.label}</p>
        )

      case "password":
        return (
          <div className="password-input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={props.value}
              name={props.name}
              onChange={props.onChange}
              disabled={props.disabled}
              placeholder={`Insira sua ${props.label}`}
            />
            <button onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 20">
                    <path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"/>
                  </svg>
                )
                :
                (
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 20">
                    <path fill="currentColor" d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"/>
                  </svg>
                )
              }
            </button>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            disabled={props.disabled}
            placeholder={props.placeholder ?? `Insira seu ${props.label}`}
            className="default"
          />
        );
    }
  };

  return (
    <div className="input-container-main">
      <label>{props?.type !== 'divider' && props.label}</label>
      {Fields()}
    </div>
  );
};
