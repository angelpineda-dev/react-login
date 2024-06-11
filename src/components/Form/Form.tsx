import React from 'react';
import './Form.scss';

interface Form {
    title?:string;
    children: JSX.Element;
    onSubmit: () => void;
    sideAction?: JSX.Element | null;
}

const Form = ({
    title = '',
    children,
    onSubmit,
    sideAction = null,
}: Form) => {


  return (
    <>
        {title && <h2 className='title'>{title}</h2> }

          <form onSubmit={onSubmit} className='form'>
              {children}
              <div className={`form_footer ${sideAction ? 'justify-between' : 'justify-end'}`}>
                  {sideAction}
                  <input type="submit" value="Guardar" />
            </div>
        </form>

    </>
  )
}

export default Form