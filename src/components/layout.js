/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "./index.module.css"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logoLink}>
            <StaticImage
              src="../images/blurrd.svg"
              alt="Blurrd logo"
              placeholder="tracedSVG"
              layout="constrained"
              width={150} // Set this to 150
              className={styles.logo}
              imgClassName={styles.logoImg}
            />
          </Link>
        </div>
      </header>
      <main>{children}</main>
      {/* Footer removed */}
    </div>
  )
}

export default Layout