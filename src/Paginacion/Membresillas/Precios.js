import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { baseURL } from '../../api.js';
import { obtenerFechaHoraActual } from "../utilidades/dateUtils.js";

import Header from '../../Esquema/Header.js';
import Footer from '../../Esquema/Footer';

const Precios = () => {


  return (
    <>
    <Header />
      <div class="card mb-3">
        <div class="card-body">
          <div class="row g-0">
            <div class="col-12 mb-3">
              <div class="row justify-content-center justify-content-sm-between">
                <div class="col-sm-auto text-center">
                  <h5 class="d-inline-block">Billed Annually</h5><span class="badge badge-subtle-success rounded-pill ms-2">Save 25%</span>
                </div>
                <div class="col-sm-auto d-flex justify-content-center mt-1 mt-sm-0">
                  <label class="form-check-label me-2" for="customSwitch1">Monthly</label>
                  <div class="form-check form-switch mb-0">
                    <input class="form-check-input falcon-dual-switch" id="customSwitch1" type="checkbox" checked="checked" />
                    <label class="form-check-label align-top" for="customSwitch1">Yearly</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 border-top border-bottom">
              <div class="h-100">
                <div class="text-center p-4">
                  <h3 class="fw-normal my-0">Single</h3>
                  <p class="mt-3">For teams that need to create project plans with confidence.</p>
                  <h2 class="fw-medium my-4"> <sup class="fw-normal fs-7 me-1">&dollar;</sup>0<small class="fs-10 text-700">/ year</small>
                  </h2><a class="btn btn-outline-primary" href="../../app/e-commerce/billing.html">Start free trial</a>
                </div>
                <hr class="border-bottom-0 m-0" />
                <div class="text-start px-sm-4 py-4">
                  <h5 class="fw-medium fs-9">Track team projects with free:</h5>
                  <ul class="list-unstyled mt-3">
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Timeline
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Advanced Search
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Custom fields <div class="badge badge-subtle-success rounded-pill">New</div>
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Task dependencies
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Private teams & projects
                    </li>
                  </ul><a class="btn btn-link" href="#">More about Single</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 border-top border-bottom dark__bg-1000 px-4 px-lg-0" style={{ backgroundColor: 'rgba(115, 255, 236, 0.18)' }}>
              <div class="h-100">
                <div class="text-center p-4">
                  <h3 class="fw-normal my-0">Business</h3>
                  <p class="mt-3">For teams and companies that need to manage work across initiatives.</p>
                  <h2 class="fw-medium my-4"> <sup class="fw-normal fs-7 me-1">&dollar;</sup>39<small class="fs-10 text-700">/ year</small>
                  </h2><a class="btn btn-primary" href="../../app/e-commerce/billing.html">Get Business</a>
                </div>
                <hr class="border-bottom-0 m-0" />
                <div class="text-start px-sm-4 py-4">
                  <h5 class="fw-medium fs-9">Everything in Premium, plus:</h5>
                  <ul class="list-unstyled mt-3">
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Portfolios
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Lock custom fields
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Onboarding plan
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Resource Management
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Lock custom fields
                    </li>
                  </ul><a class="btn btn-link" href="#">More about Business</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 border-top border-bottom">
              <div class="h-100">
                <div class="text-center p-4">
                  <h3 class="fw-normal my-0">Extended</h3>
                  <p class="mt-3">For organizations that need additional security and support.</p>
                  <h2 class="fw-medium my-4"> <sup class="fw-normal fs-7 me-1">&dollar;</sup>99<small class="fs-10 text-700">/ year</small>
                  </h2><a class="btn btn-outline-primary" href="../../app/e-commerce/billing.html">Purchase</a>
                </div>
                <hr class="border-bottom-0 m-0" />
                <div class="text-start px-sm-4 py-4">
                  <h5 class="fw-medium fs-9">Everything in Business, plus:</h5>
                  <ul class="list-unstyled mt-3">
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Portfolios
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Tags <div class="badge badge-subtle-primary rounded-pill">Coming soon</div>
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Onboarding plan
                    </li>
                    <li class="py-1"><span class="me-2 fas fa-check text-success"> </span> Resource Management
                    </li>
                  </ul><a class="btn btn-link" href="#">More about Extended</a>
                </div>
              </div>
            </div>
            <div class="col-12 text-center">
              <h5 class="mt-5">Looking for personal or small team task management?</h5>
              <p class="fs-8">Try the <a href="#">basic version</a> of Falcon</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Precios;
