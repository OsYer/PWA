import React from "react";
import styles from  "./Error500.module.css";
import { Link } from "react-router-dom";

const Error500 = () => {

  return (
    <div class={styles.containerScroller}>
      <div class={`${styles.containerFluid} ${styles.pageBodyWrapper} ${styles.fullPageWrapper}
        container-fluid page-body-wrapper full-page-wrapper`}>
        <div class={`${styles.contentWrapper} ${styles.dFlex} ${styles.alignItemsCenter} ${styles.textCenter} 
          ${styles.errorPage} ${styles.bgInfo}
          content-wrapper d-flex align-items-center text-center error-page bg-info`}>
          <div class={`${styles.row} ${styles.flexGrow} row flex-grow`}>
            <div class={`${styles.colLg7} ${styles.mxAuto} ${styles.textWhite} 
            col-lg-7 mx-auto text-white`}>
              <div class={`${styles.row} ${styles.alignItemsCenter} ${styles.dFlex} ${styles.flexGrow}
              row align-items-center d-flex flex-row`}>
                <div class={`${styles.colLg6} ${styles.textLgRight} ${styles.prLg4}
                col-lg-6 text-lg-right pr-lg-4`}>
                  <h1 class={`${styles.display1} ${styles.mb0} display-1 mb-0`}>500</h1>
                </div>
                <div class={`${styles.colLg6} ${styles.errorPageDivider} ${styles.textLgLeft} ${styles.plLg4}
                col-lg-6 error-page-divider text-lg-left pl-lg-4`}>
                  <h2>¡LO SIENTO!</h2>
                  <h3 className={`${styles.fontWeightLight} font-weight-light`}>¡Error Interno del Servidor!</h3>
                </div>
              </div>
              <div class={`${styles.row} ${styles.mt5} row mt-5`}>
                <div class={`${styles.col12} ${styles.textCenter} ${styles.mtXl2} col-12 text-center mt-xl-2`}>
                  <Link class={`${styles.textWhite} ${styles.fontWeightMedium} text-white font-weight-medium`} to="/">Volver al inicio</Link>
                </div>
              </div>
              {/* <div class="row mt-5">
                <div class="col-12 mt-xl-2">
                  <p class="text-white font-weight-medium text-center">Copyright &copy; 2021  All rights reserved.</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error500;