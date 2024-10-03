import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function CloseSubmenu({ history }) {
    useEffect(() => {
      const unlisten = history.listen(() => {
        //submenu
        // let nav = document.querySelector(".navbar-collapse");
        // let navSub = document.querySelector(".navbar-toggler");
        // let navSub2 = document.querySelector(".nav-open");
        // if (nav.classList.contains("show")) {
        //   nav.classList.remove("show");
        // } 
        // if (navSub.classList.contains("toggled")) {
        //   navSub.classList.remove("toggled");
        // }
        // if (navSub2.classList.contains("nav-open")) {
        //   navSub2.classList.remove("nav-open");
        // }
      });
      return () => {
        unlisten();
      }
    }, []);
  
    return (null);
  }
  
  export default withRouter(CloseSubmenu);