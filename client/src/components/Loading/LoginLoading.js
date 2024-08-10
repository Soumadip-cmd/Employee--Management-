import React from 'react'

const LoginLoading = () => {
  return (
    <>
     <button className="btn btn-primary form-btn " type="button"  disabled style={{background:"#0e2238"}}>
  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
  <span role="status">Login...</span>
</button> 
    </>
  )
}

export default LoginLoading
