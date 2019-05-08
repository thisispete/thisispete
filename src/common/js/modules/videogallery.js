export default class VideoGallery {

  constructor(target) {
    target.on('click', 'ol a', e => {
      e.preventDefault();
      target.find('#videoFrame').attr('src', $(e.currentTarget).data('path'));
    });
  }
}
