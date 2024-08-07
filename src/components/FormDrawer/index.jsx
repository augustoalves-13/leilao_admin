import { useEffect, useState } from "react";
import Button from "../Button";
import { EntryField } from "../inputs";
import "./index.scss";

const FormDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(props.fields.reduce((acc, field) => {
    if(field.name) {
      acc[field.name] = '';
    }
    return acc
  }, {}))

  useEffect(()=>{
    props.onChange(formData)
  },[formData, props.onChange])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    setVisible(props.open)
  }, [props.open]);

  return props.open && (
      <section
        className={`drawer-modal-container-main ${
          visible ? "drawer-enable" : "drawer-disabled"
        }`}
      >
        <div className={`formDrawer-container-main`}>
          <header>
            <h3>{props.options?.name}</h3>
          </header>
          <section className="form-contents">
            {props.fields.map((item) => (
              <EntryField name={item?.name} type={item?.type} label={item?.label} onChange={handleChange} selectOptions={item.selectOptions} value={formData[item.name]} placeholder={item.placeholder} id={item.id}/>
            ))}
          </section>
          <div className="buttons-container">
            <Button onClick={props.handleClose} type="outlined">
              {props.options?.cancelText}
            </Button>

            <Button onClick={props.onSubmit}>
              {props.options?.submitText}
            </Button>
          </div>
        </div>
      </section>
    )
  
};

export default FormDrawer;
