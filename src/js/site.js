// import $ from './vendor/jquery.min';
import calculator from './modules/calculator';

const RRCALC = {};

RRCALC.calculator = calculator;

Object.keys(RRCALC).forEach(function (key) {
  if (RRCALC[key].hasOwnProperty('init')) {
    RRCALC[key].init();
  }
});

if (!window.RRCALC) {
  window.RRCALC = RRCALC;
}