"use strict";

var arabic_alphabet = require('./arabic_alphabet');

var solar = [ 
              arabic_alphabet.TA, arabic_alphabet.RA, arabic_alphabet.THA, 
              arabic_alphabet.DAL, arabic_alphabet.THAL, arabic_alphabet.RA, arabic_alphabet.ZAY,
              arabic_alphabet.SEEN, arabic_alphabet.SHEEN, arabic_alphabet.SAD, arabic_alphabet.DAD,
              arabic_alphabet.TAH, arabic_alphabet.ZAH, arabic_alphabet.LAM, arabic_alphabet.NOON
            ];

var lunar = [ 
              arabic_alphabet.BA, arabic_alphabet.JEEM, arabic_alphabet.HHA, arabic_alphabet.KHA,
              arabic_alphabet.AIN, arabic_alphabet.GHAIN, arabic_alphabet.FA, arabic_alphabet.QAF,
              arabic_alphabet.KAF, arabic_alphabet.MEEM, arabic_alphabet.WAW, arabic_alphabet.YA
            ];

function ArabicText(str) {
  this.text = str;
}

ArabicText.prototype.is_blank = function (index) {
  return this.text[index] == ' ';
};

ArabicText.prototype.is_whitespace = ArabicText.prototype.is_blank;

ArabicText.prototype.is_word_start = function(position) {
  return position == 0 || this.text[position - 1] == ' ';
};

ArabicText.prototype.is_hamza = function(position) {
  return this.text[position] == arabic_alphabet.HAMZA;
};

ArabicText.prototype.is_ta_marbuta = function(position) {
  return this.text[position] == arabic_alphabet.TA_MARBUTA;
};

ArabicText.prototype.is_solar = function(position) {
  return solar.indexOf(this.text[position]) > -1
};

ArabicText.prototype.is_lunar = function(position) {
  return lunar.indexOf(this.text[position]) > -1
};

ArabicText.prototype.is_alif = function(position) {
  return this.text[position] == arabic_alphabet.ALIF ||
  this.text[position] == arabic_alphabet.ALIF_WITH_WASLA_ABOVE ||
  this.text[position] == arabic_alphabet.ALIF_KHANJAREEYA;
};

ArabicText.prototype.is_al = function(position) {
  return (position < this.text.length - 1) &&
  this.is_alif(position) &&
  this.text[position + 1] == arabic_alphabet.LAM;
};

ArabicText.prototype.is_fatha_followed_by_alif = function( position) {
  return position < this.text.length - 1 &&
  this.text[position] == arabic_alphabet.FATHA &&
  this.is_alif(position + 1);
};

ArabicText.prototype.is_kasra_followed_by_ya = function( position) {
  return position < this.text.length - 1 &&
  this.text[position] == arabic_alphabet.KASRA &&
  this.text[position + 1] == arabic_alphabet.YA;
};

ArabicText.prototype.is_damma_followed_by_waw = function( position) {
  return position < this.text.length - 1 &&
  this.text[position] == arabic_alphabet.DAMMA &&
  this.text[position + 1] == arabic_alphabet.WAW;
};

ArabicText.prototype.is_alif_with_madda_above = function(position) {
  return this.text[position] == arabic_alphabet.ALIF_WITH_MADDA_ABOVE;
};

module.exports = ArabicText;
