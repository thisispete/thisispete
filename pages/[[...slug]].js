import Head from 'next/head'
import { getNavPaths, getDataForPath, getNavJson } from '../lib/content'
import App from 'components/App'

export default function Post(props) {
  return (
    <App {...props} />
  )
}

export async function getStaticPaths() {
  const paths = getNavPaths()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(props) {
  const {slug} = props.params;
  let path = '/';
  if(slug && slug.length > 0){ 
    path = slug.join('/')
  }
  const { pageData } = getDataForPath(path);
  const navData = getNavJson();
  return {
    props: {
      navData,
      pageData
    }
  }
}
