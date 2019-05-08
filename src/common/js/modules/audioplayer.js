import Svglib from '../svglib.js'

export default class AudioPlayer {

  constructor(target) {
    audiojs.createAll();
    target.find('.play').first().attr('id', 'Audio-Play');
    target.find('.pause').first().attr('id', 'Audio-Pause');
    target.find('.loading').first().attr('id', 'Audio-Loading');
    target.find('.error').first().attr('id', 'Audio-Error');

    Svglib.getPlay('Audio-Play');
    Svglib.getPause('Audio-Pause');
    Svglib.getLoading('Audio-Loading');
    Svglib.getError('Audio-Error');
  }
}
