import React from 'react';

export const FormErrors = ({formErrors, showErrors}) => {
  return (
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(showErrors && formErrors[fieldName].length > 0){
        return (
          <p className="red-text" key={i}>{formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>
  );
};
