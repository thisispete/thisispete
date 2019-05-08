export default class Contact {

  constructor(target) {
    $.each(target.find('.svg-icon'), (i, e) => {
      const paper = new Raphael(e, 60, 60);
      const path = paper.path($(e).data('svg'));
      path.attr({
        "fill" : "#CCC",
        "stroke-width" : "0.000001"
      });
      const clicktarget = $(e).parent();
      clicktarget.attr('href', $(e).data('url'));
      clicktarget.hover(h => {
        path.animate({
          "fill" : "#FFF"
        }, 200);
      }, h => {
        path.animate({
          "fill" : "#CCC"
        }, 200);
      });
    });
  }
}
