import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageFeatures from '../components/HomepageFeatures'
import Head from '@docusaurus/Head'
import HeroImg from '../../static/img/Hero.jpg'

const svgList = [
  { title: 'github', Svg: require('../../static/img/github.svg').default, color: 'black' },
  { title: 'wechat', Svg: require('../../static/img/wechat.svg').default, color: '#64dd17' },
  { title: 'zhihu', Svg: require('../../static/img/zhihu.svg').default, color: '#2979ff' },
]
const Svg = ({ Svg, color, title }) => <Svg className={styles.svg} style={{ fill: color }} />
// const MySEO = () => (
//   <Head>
//     {/* <title>dfsdfsdf</title> */}
//     <script type="text/javascript" src="../../baidu.js"></script>
//   </Head>
// );

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <h1 className='hero__title'>{siteConfig.title}</h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className='button button--secondary button--lg' to='/docs/intro'>
            🖱Click Here!
          </Link>
        </div>
      </div>
    </header>
  )
}

function MyHero() {
  return (
    <div className={styles.myHeroContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.leftContainer_h1}>
          Always <br /> Ready to Code.
        </h1>
        <p className={styles.leftContainer_p}>
          Spin up fresh, automated dev environments
          <br />
          for each task, in the cloud, in seconds.
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Click</button>
          <span className={styles.buttonLeftText}>
            Open a workspace. <br /> Start from any Git context.
          </span>
          <div className={styles.svgContainer}>
            {svgList.map((item, index) => {
              return <Svg {...item} key={item.title} />
            })}
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <img src={HeroImg} alt='HeroImg' />
      </div>
    </div>
  )
}
export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      // title={`${siteConfig.title}`}
      title='Home'
      description='Wiki知识库/vscode/javascript/软件/工具'>
      {/* <MySEO /> */}
      {/* <HomepageHeader /> */}
      <main>
        <MyHero />
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
