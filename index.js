"use strict";

var arabic_alphabet  =  require('./arabic_alphabet');
var ArabicText = require('./arabic_text');

var map =  {};

map[arabic_alphabet.HAMZA] =  '\'';
map[arabic_alphabet.ALIF_WITH_MADDA_ABOVE] =  String.fromCharCode(0x0100);
map[arabic_alphabet.ALIF_WITH_HAMZA_ABOVE] =  '\'a';
map[arabic_alphabet.WAW_WITH_HAMZA_ABOVE] =  '\'u';
map[arabic_alphabet.ALIF_WITH_HAMZA_BELOW] =  '\'i';
map[arabic_alphabet.YA_WITH_HAMZA_ABOVE] =  'i\'';  // Ya with Hamza ABOVE
// NOTE] =  Alif doesn't seem to have transcription in ALA-LC, so I am using the
// same one for Alif with Madda.
map[arabic_alphabet.ALIF] =  String.fromCharCode(0x0101);
map[arabic_alphabet.BA] =  'b';  // Ba
map[arabic_alphabet.TA_MARBUTA] =  String.fromCharCode(0x1e97);
map[arabic_alphabet.TA] =  't';
map[arabic_alphabet.THA] =  String.fromCharCode(0x1e6f);
map[arabic_alphabet.JEEM] =  String.fromCharCode(0x01e7);
map[arabic_alphabet.HHA] =  String.fromCharCode(0x1e25);
map[arabic_alphabet.KHA] =  String.fromCharCode(0x1e96);
map[arabic_alphabet.DAL] =  'd';
map[arabic_alphabet.THAL] =  String.fromCharCode(0x1e0f);
map[arabic_alphabet.RA] =  'r';
map[arabic_alphabet.ZAY] =  'z';
map[arabic_alphabet.SEEN] =  's';
map[arabic_alphabet.SHEEN] =  String.fromCharCode(0x0161);
map[arabic_alphabet.SAD] =  String.fromCharCode(0x1e63);
map[arabic_alphabet.DAD] =  String.fromCharCode(0x1e0d);
map[arabic_alphabet.TAH] =  String.fromCharCode(0x1e6d);
map[arabic_alphabet.ZAH] =  String.fromCharCode(0x1e93);
map[arabic_alphabet.AIN] =  String.fromCharCode(0x02bf);
map[arabic_alphabet.GHAIN] =  String.fromCharCode(0x0121);
// Removing Tatweel in the transcription
map[arabic_alphabet.TATWEEL] =  '';
map[arabic_alphabet.FA] =  'f';
map[arabic_alphabet.QAF] =  'q';
map[arabic_alphabet.KAF] =  'k';
map[arabic_alphabet.LAM] =  'l';
map[arabic_alphabet.MEEM] =  'm';
map[arabic_alphabet.NOON] =  'n';
map[arabic_alphabet.HA] =  'h';
map[arabic_alphabet.WAW] =  'w';
map[arabic_alphabet.ALIF_MAKSURA] =  String.fromCharCode(0x1ef3);
map[arabic_alphabet.YA] =  String.fromCharCode(0x012b);
map[arabic_alphabet.FATHATAN] =  'an';   // Rafid
map[arabic_alphabet.DAMMATAN] =  'un';   // Rafid
map[arabic_alphabet.KASRATAN] =  'in';   // Rafid
map[arabic_alphabet.FATHA] =  'a';
map[arabic_alphabet.DAMMA] =  'u';
map[arabic_alphabet.KASRA] =  'i';
// Shadda in ALA-LC is represented by doubling the letter.
//arabic_alphabet.SHADDA] =  String.fromCharCode(),  // Shadda
// Sukon in ALA-LC doesn't have a representation in ALA-LC.
map[arabic_alphabet.SUKUN] =  '';  // Sukun
// Alif Khanjariya
map[String.fromCharCode(0x0670)] =  String.fromCharCode(0x0101);  // Alif Khanjariya
// TODO] =  Implement the transcription of Hamzat Al-Wasl
//String.fromCharCode(0x0671)] =  String.fromCharCode(),  // Alif with Hamzat Wasl
// The following letters don't have a representation in ALA-LC.
map[arabic_alphabet.HAMZAABOVE] =  '';
map[arabic_alphabet.SMALL_HIGH_SEEN] =  '';
map[arabic_alphabet.SMALL_HIGH_ROUNDED_ZERO] =  '';
map[arabic_alphabet.SMALL_HIGH_UPRIGHT_RECTANGULAR_ZERO_] =  '';
map[arabic_alphabet.SMALL_HIGH_MEEM_ISOLATED_FORM] =  '';
map[arabic_alphabet.SMALL_LOW_SEEN] =  '';
map[arabic_alphabet.SMALL_WAW] =  '';
map[arabic_alphabet.SMALL_YA] =  '';
map[arabic_alphabet.SMALL_HIGH_NOON] =  '';
map[arabic_alphabet.EMPTY_CENTRE_LOW_STOP] =  '';
map[arabic_alphabet.EMPTY_CENTRE_HIGH_STOP] =  '';
map[arabic_alphabet.ROUNDED_HIGH_STOP_WITH_FILLED_CENTRE] =  '';
map[arabic_alphabet.SMALL_LOW_MEEM] =  '';

function unicode_to_phonetic(text) {
  var arabic_text = new ArabicText(text);
  var i,len;
  var res = '';

  for (i = 0, len = text.length; i < len; i++) {
    var position = i;
    // Whitespace
    if (arabic_text.is_whitespace(position)) {
      res += ' ';
      continue;
    }

    // Handle Hamza
    if (arabic_text.is_hamza(position) && arabic_text.is_word_start(position)) {
      // Hamza at the beginning of a word is not encoded in ALA-LC.
      continue;
    }

    // Handle Ta Marbuta
    if (arabic_text.is_ta_marbuta(position)) {
      // Ta Marbuta is transcribed as either 't' or 'h' depending on the
      // context.
      res += 't';
      continue;
    }

    // Handle al
    if (arabic_text.is_al(position) && arabic_text.is_word_start(position)) {
      if ((position < len-2) && arabic_text.is_solar(position+2)) {
        res += 'a' + map[arabic_text.text[position+2]] + '-';
      } else {
        res += 'al-';
      }
      i++; // skip the next letter because its already processed.
      continue;
    }

    // Handle Alif with Madda
    if (arabic_text.is_alif_with_madda_above(position)) {
      if (arabic_text.is_word_start(position)) {
        // Alif with Madda at the beginning of a word is replaced with
        // ā
        res += String.fromCharCode(0x0101);
      } else {
        // Alif with Madda at the beginning of a word is replaced with
        // `ā
        res += '\'' + String.fromCharCode(0x0101);
      }
      continue;
    }

    if (arabic_text.is_fatha_followed_by_alif(position)) {
      // Treat like an Alif.
      res += map[arabic_alphabet.ALIF];
      i++;
      continue;
    }

    if (arabic_text.is_kasra_followed_by_ya(position)) {
      // Treat like a Ya
      res += map[arabic_alphabet.YA];
      i++;
      continue;
    }

    if (arabic_text.is_damma_followed_by_waw(position)) {
      // Treat like a Waw
      res += map[arabic_alphabet.WAW];
      i++;
      continue;
    }

    // Handle the rest
    if (map[arabic_text.text[position]]) {
      res += map[arabic_text.text[position]];
    }
  }

  return res;
};

module.exports = unicode_to_phonetic;
