import {useState} from "react";
import FormItem from "./FormItem";




// React with a multi input form.
// @see https://beta.reactjs.org/apis/react/useState#examples-objects
// @see https://daveceddia.com/react-forms/
const DataInput = () => {
    const initialFormValues = {
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
      };
    const [formData, setFormData] = useState(initialFormValues);
    const noneEmpty = 
  // turn the formData into an array so we can use every()
    Object.values(formData)
      .every((item) => item.length > 0)  // every will only be true, 
    // if EVERY item returns true in the callback

  const inputHandler = (e, stateName) => {
    setFormData((previousState) => {
      return {
        ...previousState,
        [stateName]: e.target.value,
      }
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    setFormData(initialFormValues)
  }

  return (
    <form className='col col-sm-12 col-lg-5' onSubmit={submitForm}>
    <FormItem 
       label='Age' 
       stateName='age' 
       type='number' 
       formData={formData} 
       inputHandler={inputHandler} 
      />
    <FormItem 
       label='Weight' 
       stateName='weight' 
       type='number' 
       formData={formData} 
       inputHandler={inputHandler} 
      />
    <FormItem
        label='Height' 
        stateName='height' 
        type='number' 
        formData={formData} 
        inputHandler={inputHandler} 
     />
     <div className="mb-3">
        <button disabled={!noneEmpty} type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default DataInput;