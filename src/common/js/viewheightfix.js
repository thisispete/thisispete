export default class ViewHeightFix{
  constructor(){
    // fix vh => --vh on mobile
    this._update();
    window.addEventListener('resize', () => {
      this._update();
    });
  }

  _update(){
    var visviewh;
    if(window.visualViewport){
      visviewh = window.visualViewport.height;
    }else{
      visviewh = window.innerHeight;
    }
    const winviewh = window.innerHeight;
    const vh = Math.min(visviewh, winviewh) * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

}
