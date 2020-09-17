import BG from "@PETE/BG";
import { getBGJson } from "@PETE/content";
import styles from '@PETE/app.module.scss';
import Link from "next/link";

export default function Nope({ bgData }) {

  return (
    <Link href='/'>
      <div id={styles.nope}>
        <BG data={bgData} />
        <svg version="1.1" width="165" height="220">
          <path d="M82.601,0c8.351,0.052 16.472,4.732 20.7,11.955c19.583,33.772 39.094,67.586 58.534,101.441c2.761,4.854 3.774,10.633 2.808,16.12c-1.192,6.77 -5.445,12.946 -11.338,16.476c-3.681,2.205 -7.926,3.395 -12.27,3.422c-39.023,0.081 -78.047,0.081 -117.07,-0c-7.465,-0.047 -14.815,-3.743 -19.268,-9.777c-3.735,-5.061 -5.38,-11.617 -4.436,-17.884c0.443,-2.936 1.441,-5.784 2.904,-8.357c19.44,-33.855 38.951,-67.669 58.534,-101.441c4.212,-7.196 12.331,-11.903 20.7,-11.955c0.067,-0 0.135,-0 0.202,0Zm62.332,118.217c-0.402,-0.708 -50.776,-88.081 -54.263,-94.038c-1.659,-2.808 -4.8,-4.638 -8.09,-4.672c-0.04,-0.001 -0.08,-0.001 -0.12,-0.001c-3.281,0.021 -6.466,1.831 -8.151,4.707c-18.145,31.298 -36.356,62.558 -54.242,94.004c-2.135,3.792 -1.29,9.017 2.13,11.908c1.673,1.413 3.841,2.217 6.04,2.239c0.814,0.006 101.403,0.045 108.526,0c3.664,-0.038 7.194,-2.372 8.64,-5.76c1.138,-2.668 0.963,-5.843 -0.47,-8.387Z" />
          <path d="M38.61,219.703l8.812,0l-0,-12.941l8.146,-0l-0,-7.016l-8.146,-0l-0,-12.084l-8.812,3.274l0,8.81l-13.299,-0l21.695,-26.897l-6.567,-4.911l-27.846,34.614l2.078,4.21l23.939,-0l0,12.941Z" />
          <path d="M84.115,219.718c-3.366,0 -6.285,-0.585 -8.758,-1.757c-2.474,-1.172 -4.513,-2.858 -6.12,-5.058c-1.606,-2.2 -2.792,-4.902 -3.556,-8.106c-0.765,-3.205 -1.148,-6.863 -1.148,-10.976c0,-4.066 0.383,-7.712 1.148,-10.941c0.764,-3.228 1.95,-5.942 3.556,-8.142c1.607,-2.2 3.646,-3.886 6.12,-5.058c2.473,-1.171 5.392,-1.757 8.758,-1.757c3.366,-0 6.285,0.586 8.758,1.757c2.473,1.172 4.513,2.858 6.119,5.058c1.607,2.2 2.792,4.914 3.557,8.142c0.765,3.229 1.148,6.875 1.148,10.941c-0,4.113 -0.383,7.771 -1.148,10.976c-0.765,3.204 -1.95,5.906 -3.557,8.106c-1.606,2.2 -3.646,3.886 -6.119,5.058c-2.473,1.172 -5.392,1.757 -8.758,1.757Zm-0,-6.6c3.875,0 6.642,-1.351 8.299,-4.053c1.657,-2.702 2.486,-6.349 2.486,-10.94l0,-8.609c0,-4.591 -0.829,-8.238 -2.486,-10.94c-1.657,-2.702 -4.424,-4.053 -8.299,-4.053c-1.938,-0 -3.595,0.346 -4.972,1.04c-1.377,0.693 -2.499,1.698 -3.366,3.013c-0.867,1.315 -1.491,2.893 -1.874,4.735c-0.382,1.841 -0.573,3.91 -0.573,6.205l-0,8.609c-0,2.296 0.191,4.364 0.573,6.205c0.383,1.842 1.007,3.42 1.874,4.735c0.867,1.315 1.989,2.32 3.366,3.013c1.377,0.694 3.034,1.04 4.972,1.04Zm-0,-15.065c-1.785,0 -3.022,-0.335 -3.71,-1.004c-0.688,-0.67 -1.033,-1.483 -1.033,-2.439l0,-1.579c0,-0.956 0.345,-1.769 1.033,-2.439c0.688,-0.669 1.925,-1.004 3.71,-1.004c1.785,-0 3.021,0.335 3.71,1.004c0.688,0.67 1.032,1.483 1.032,2.439l0,1.579c0,0.956 -0.344,1.769 -1.032,2.439c-0.689,0.669 -1.925,1.004 -3.71,1.004Z" />
          <path d="M135.45,219.703l8.811,0l0,-12.941l8.146,-0l0,-7.016l-8.146,-0l0,-12.084l-8.811,3.274l0,8.81l-13.3,-0l21.696,-26.897l-6.567,-4.911l-27.847,34.614l2.078,4.21l23.94,-0l0,12.941Z" />
        </svg>
      </div>
    </Link>
  )
}

export async function getStaticProps() {
  const bgData = getBGJson();
  return {
    props: {
      bgData
    }
  }
}
