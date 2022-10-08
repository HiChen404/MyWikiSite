import React, { useEffect } from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageFeatures from '../components/HomepageFeatures'
import Head from '@docusaurus/Head'
import HeroImg from '../../static/img/Hero.jpg'
import mount1 from '../../static/images/monutain_01.png'
import mount2 from '../../static/images/monutain_01.png'
import man from '../../static/images/man.png'
import tree1 from '../../static/images/trees_01.png'
import tree2 from '../../static/images/trees_02.png'
import plants from '../../static/images/plants.png'
import { useParallax } from 'react-scroll-parallax'
import { ParallaxProvider } from 'react-scroll-parallax'
import { useMediaQuery } from 'react-responsive'

const svgList = [
  {
    title: 'github',
    Svg: require('../../static/img/github.svg').default,
    color: 'black',
    link: 'https://github.com/HiChen404/MyWikiSite',
  },
  {
    title: 'wechat',
    Svg: require('../../static/img/wechat.svg').default,
    color: '#64dd17',
    link: 'https://mp.weixin.qq.com/s/ytNsiyIjCb-URVLY90uSMw',
  },
  {
    title: 'zhihu',
    Svg: require('../../static/img/zhihu.svg').default,
    color: '#2979ff',
    link: 'https://www.zhihu.com/people/li-kang-ning',
  },
]
const Svg = ({ Svg, color, title, link }) => {
  return (
    <a href={link} target='_blank'>
      <Svg className={styles.svg} style={{ fill: color }} />
    </a>
  )
}

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
          我是陈晨,热爱计算机的一切,
          <br />
          我在这里记录知识，希望同样能够帮助到你。
        </p>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <a className={styles.hero_a} href='/'>
              Click
            </a>
          </button>
          <span className={styles.buttonLeftText}>
            Get Started. <br /> 开启学习之旅.
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

function MyNewHero() {
  const logoParallax = useParallax({
    speed: -5,
    translate: 'yes',
    translateX: [100, -50],
  })
  const mount1Parallax = useParallax({
    translateX: ['100px', '-100px'],
    translateY: ['100px', '-100px'],
  })
  // const mount2Parallax = useParallax({
  //   speed: 50,
  // })
  const tree1Parallax = useParallax({
    translateX: ['-100px', '-30px'],
  })
  const tree2Parallax = useParallax({
    // speed: 10,
    translateX: ['-10px', '100px'],
  })
  const manParallax = useParallax({
    // speed: -200,
    translateX: ['-200px', '0px'],
  })
  const plantsParallax = useParallax({
    // speed: -50,
    translateX: ['-100px', '0px'],
  })

  return (
    <>
      <section className={styles.parallax}>
        {/* <h2 className={styles.text}>Parallax Website</h2> */}
        <div className={styles.container} ref={logoParallax.ref}>
          <h1 id='404lab' className={styles.h1}>
            Hello,
            <br />
            404Lab.
            <svg
              width='300'
              height='180'
              viewBox='0 0 209 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6 33.9991C87.0176 34.1765 203 6 203 6'
                stroke='#43E229'
                stroke-width='11.5'
                stroke-linecap='round'
                stroke-linejoin='round'
                id={styles.tick}
              />
            </svg>
          </h1>
        </div>
        <img src={mount1} className={styles.m1} ref={mount1Parallax.ref} />
        <img src={tree2} className={styles.t2} ref={tree2Parallax.ref} />
        <img src={mount2} className={styles.m2} />
        <img src={tree1} className={styles.t1} ref={tree1Parallax.ref} />
        <img src={man} className={styles.man} ref={manParallax.ref} />
        <img src={plants} className={styles.plants} ref={plantsParallax.ref} />
      </section>
    </>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  })

  return (
    <ParallaxProvider>
      <Layout
        // title={`${siteConfig.title}`}
        title='Home'
        description='Wiki知识库/vscode/javascript/软件/工具'>
        {/* <HomepageHeader /> */}
        <main>
          {isDesktopOrLaptop ? <MyNewHero /> : null}

          {/* <HomepageFeatures /> */}
          <MyHero />
        </main>
      </Layout>
    </ParallaxProvider>
  )
}
