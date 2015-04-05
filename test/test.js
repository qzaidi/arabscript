"use strict";

var arabscript = require('..');
var ArabicText = require('../arabic_text');

var assert = require('assert');

describe('transcription', function() {
  describe('#basmala', function() {

    it('should identify al correctly', function() {
      assert.equal((new ArabicText('ٱلرَّحِيمِ')).is_al(0),true);
    });

    it('should transcribe ar-rahimi', function() {
      assert.equal(arabscript('ٱلرَّحِيمِ'),'al-raḥīmi');
    });

    it('should transcribe basmala', function() {
      assert.equal(arabscript('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'),'bismi al-lahi al-raḥmāni al-raḥīmi');
    });
  });
});
