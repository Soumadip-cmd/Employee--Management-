import React from 'react'

const LoginLoading = () => {
  return (
    <>
     <button class="btn btn-primary form-btn " type="button"  disabled style={{background:"#0e2238"}}>
  <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
  <span role="status">Login...</span>
</button> 
    </>
  )
}

export default LoginLoading
