import styles from '@PETE/pete.module.scss';

export default function PETE() {
  return(
    <div id={styles.PETElogo}>
      <h1 className={styles.hidden}>PETE</h1>
      <svg version="1.1" width="60" height="78">
        <path d="M50.836,38.745l-15.166,-25.43c-2.393,-4.034 -4.283,-6.055 -5.669,-6.055c-1.41,0 -3.31,2.021 -5.707,6.055l-15.125,25.43c-1.765,3.002 -2.648,5.232 -2.648,6.694c0,2.136 1.993,3.22 5.978,3.22l35.009,0c3.984,0 5.979,-1.084 5.979,-3.22c0,-1.462 -0.885,-3.692 -2.651,-6.694m7.558,1.123c1.079,1.866 1.621,3.779 1.621,5.716c0,2.371 -0.751,4.395 -2.267,6.053c-1.514,1.671 -3.375,2.505 -5.593,2.505l-44.306,0c-2.215,0 -4.085,-0.834 -5.597,-2.505c-1.509,-1.658 -2.267,-3.682 -2.267,-6.053c0,-1.937 0.544,-3.85 1.626,-5.716l20.491,-34.828c1.965,-3.36 4.595,-5.04 7.899,-5.04c3.276,0 5.911,1.68 7.902,5.04l20.491,34.828Z" />
        <path d="M8.574,69.958l3.57,0c1.183,0 2.017,-0.25 2.516,-0.738c0.492,-0.488 0.74,-1.175 0.74,-2.067c0,-0.635 -0.147,-1.19 -0.442,-1.645c-0.288,-0.456 -0.676,-0.756 -1.154,-0.901c-0.302,-0.095 -0.872,-0.138 -1.706,-0.138l-3.524,0l0,5.489Zm-1.833,8.042l0,-15.362l5.2,0c0.915,0 1.615,0.056 2.099,0.146c0.671,0.128 1.242,0.37 1.699,0.724c0.462,0.358 0.834,0.846 1.108,1.486c0.283,0.637 0.426,1.332 0.426,2.109c0,1.307 -0.374,2.406 -1.121,3.315c-0.743,0.914 -2.097,1.371 -4.045,1.371l-3.533,0l0,6.211l-1.833,0Z" />
        <path d="M19.653,77.999l0,-15.36l9.96,0l0,1.829l-8.131,0l0,4.669l7.599,0l0,1.833l-7.599,0l0,5.2l8.457,0l0,1.829l-10.286,0Z" />
        <path d="M35.976,77.999l0,-13.531l-4.552,0l0,-1.829l10.935,0l0,1.829l-4.554,0l0,13.531l-1.829,0Z" />
        <path d="M44.306,77.999l0,-15.36l9.955,0l0,1.829l-8.126,0l0,4.669l7.601,0l0,1.833l-7.601,0l0,5.2l8.454,0l0,1.829l-10.283,0Z" />
      </svg>
    </div>
  )
}