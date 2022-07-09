import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .sv_q.sv_qstn {
    font-size: 2.5rem;
    overflow: hidden;
  }
  
  .sv_nav_btn {
    margin-top: 2rem;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.invert};
    border: none;
    padding: 1rem 1.5rem;
    font-size: 2.5rem;
    cursor: pointer;
    font-weight: bold;
    border-radius:0.7rem; 

    &:hover {
      opacity: 0.8;
    }

    & > svg {
      height: 3rem;
      width: auto;
    }
  }
  
  .sv_q_radiogroup_label {
    display: grid;
    font-size: 2.3rem;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem
  }
  
  .sv-action-bar.sv-action-bar--default-size-mode.sv_nav {
    padding: 0;
  }
  
  .sv_progress {
    font-size: 1.5rem;
  }
  
  .sv_completed_page {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > p {
      font-size: 2rem;
    }
    
    & > h1 {
      margin: 0;
      font-size: 3.5rem;
    }
  }
  
  .sv_qcbc {
    display: grid;
    gap: 1.6rem;
  }
`
