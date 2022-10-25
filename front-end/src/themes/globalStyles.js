import { createGlobalStyle } from "styled-components";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import 'react-calendar/dist/Calendar.css';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

* {
	box-sizing: border-box;
	::-webkit-scrollbar {
    	display: none;
	}	
}

 /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	font-family: 'Oswald';
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

*{
	body{
		font-family: 'Lato', sans-serif;
	}
}

.swiper {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  padding-left: 20px;
  overflow-x: scroll;
}

.swiper-slide {
  background: #fff;
  font-style: italic;
  color: #000;
  max-height: 50vh !important;

  @media (min-width: 760px) {
    padding: 10px;
    width: 500px !important;
    border: solid 2px black;
    border-radius: 12px;
    margin-top: 4px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    .info{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 50%;
    }

    .buttons{
      width: 140px;
      height: 50px;

      .order{
        width: 140px;
      }
    }

    input{
      width: 60px;
    }
  }
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:root {
   --background-color: rgb(241, 246, 247);
    --light-color: rgb(255, 255, 255);
    --light-dark-font-color: rgb(51, 50, 50);
    --closing-color: rgb(245, 41, 41);
    --grey-color: grey;
    --check-color: rgb(42, 199, 42);
    --aunsh-website-color: rgb(0, 145, 255);
}

/* --------------------------------- GLOBAL STYLES ------------------- */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--background-color) !important;
  font-family: 'Montserrat', sans-serif;
}

/* ------------------------------- BASICS ------------------------ */
.disabled_change_cursor {
    cursor: not-allowed;
}

.closing:hover {
  color: var(--closing-color)
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cursor_pointer {
  cursor: pointer;
}

.flex_middle {
    display: flex;
  align-items: center;
  justify-content: center;
}

/* --------------------------------- COMMUNICATION ---------------------- */
.communication .whatsapp-card {
  background-color: var(--light-color);
  border-radius: 10px;
  width: 360px;
  height: 90vh;
  overflow-y: scroll;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0.5em;
  
}

.communication .whatsapp-card .title {
  color: var(--check-color);
  font-size: 1.4em;
  margin-top: 0.5em;
}

.communication .whatsapp-card .search_contact_whatsapp {
  width: 95%;
  display: grid;
  grid-template-columns: 10fr 1fr;
  column-gap: 1em;
  margin: 1em 0;
}

.communication .whatsapp-card .search_contact_whatsapp .add_new_client {
  margin-top: 0.5em;
  color: var(--grey-color);
  cursor: pointer;
}

/* --------------------------------- ERRORS ---------------------------------- */
.errors {
  font-size: 0.75em;
  background-color: var(--closing-color);
  color: var(--light-color);
  width: 90%;
  padding: 0.2em 0.5em;
  border-radius: 10px;
  text-align: center;
  margin-top: 0.8em;
}

.errors-null {
  font-size: 0.75em;
  background-color: none;
  color: var(--light-color);
  width: 90%;
  padding: 0.2em 0.5em;
  border-radius: 10px;
  text-align: center;
  margin-top: 0.8em;
}

/* ------------------------------------- FOOTER --------------------------------- */
.footer {
  position: fixed;
  width: 100%;
  bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Comfortaa', cursive;
}

.footer .text,
.footer--admin .text {
  font-size: 0.8em;
  color: rgb(167, 167, 167);
  font-weight: bold;
}

.footer .text a,
.footer--admin .text a {
  font-size: 0.9em;
  color: rgb(167, 167, 167);
  font-weight: bold;
  text-decoration: none;
}

.footer .text a:hover,
.footer--admin .text a:hover {
  color: var(--aunsh-website-color);
  font-weight: bold;
}

/* --------------------------------- CREATOR LINK ---------------------------------- */
.creator-link a {
  position: fixed;
  top: 10px;
  right: 20px;
  font-size: 2.2em;
  color: var(--grey-color);
  font-family: 'Comfortaa', cursive;
  cursor: pointer;
  text-decoration: none;
}

.creator-link a:hover {
  color: var(--aunsh-website-color);
}

`;

export default GlobalStyle;