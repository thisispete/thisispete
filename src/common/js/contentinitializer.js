import ImageGallery from './modules/imagegallery.js';
import VideoGallery from './modules/videogallery.js';
import ComboGallery from './modules/combogallery.js';
import FlashGallery from './modules/flashgallery.js';
import Contact from './modules/contact.js';
import AudioPlayer from './modules/audioplayer.js';

export default class ContentInitializer {

  static init(target = $('#content div').first()) {
    switch(target.attr('id')) {
      case 'imageGallery':
        new ImageGallery(target);
        break;
      case 'videoGallery':
        new VideoGallery(target);
        break;
      case 'comboGallery':
        new ComboGallery(target);
        break;
      case 'flashGallery':
        new FlashGallery(target);
        break;
      case 'contactGrid':
        new Contact(target);
        break;
      case 'audioPlayer':
        new AudioPlayer(target);
        break;
    }
  }
}
