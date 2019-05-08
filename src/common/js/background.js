export default class Background {
  constructor(){
    $('#bg').on('click', this.loadNext);
    this.loadNext();
  }
  loadNext(){
    let bg = $('#bg');
    bg.off('click');
    var newbg = bg.clone();
    bg.attr('id', '').addClass('oldbg');
    newbg.css('background-image', `url("/bg/${Math.floor(Math.random() * 9999999)}")` );
    bg.before(newbg);
    setTimeout(() => {
      bg.fadeOut(400, () => {
        setTimeout(() => {
          $('.oldbg').remove();
          bg = null;
          newbg = null;
          $('#bg').on('click', this.loadNext);
        }, 1000);
      });
    }, 700);
  }
}
