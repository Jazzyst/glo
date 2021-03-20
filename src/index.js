'use strict';
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import changeImagesHandler from "./modules/changeImagesHandler";
import validateInputs from "./modules/validateInputs";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";


//Timer
countTimer('21 march 2021');

//Menu
toggleMenu();

//popup
togglePopUp();

//Tabs
tabs();

//slider
slider();

//changeImagesHandler
changeImagesHandler();

//validate inputs
validateInputs();

//calculator
calc(100);

//send-ajax-form
sendForm();