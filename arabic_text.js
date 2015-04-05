"use strict";

var arabic_alphabet = require('./arabic_alphabet');

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
