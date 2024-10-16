import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui/themes/base/slider.css'; // Importa los estilos del slider de jQuery UI

function PriceRangeSlider({ minPrice, maxPrice }) {
  const rangeSliderRef = useRef(null);
  const minAmountRef = useRef(null);
  const maxAmountRef = useRef(null);

  useEffect(() => {
    const rangeSlider = $(rangeSliderRef.current);
    const minamount = $(minAmountRef.current);
    const maxamount = $(maxAmountRef.current);

    rangeSlider.slider({
      range: true,
      min: minPrice,
      max: maxPrice,
      values: [minPrice, maxPrice],
      slide: function (event, ui) {
        minamount.val('$' + ui.values[0]);
        maxamount.val('$' + ui.values[1]);
        
        // Resalta el rango seleccionado
        $('.ui-slider-range').css('background-color', '');
        const rangeLeft = ((ui.values[0] - minPrice) / (maxPrice - minPrice)) * 100;
        const rangeWidth = ((ui.values[1] - ui.values[0]) / (maxPrice - minPrice)) * 100;
        $('.ui-slider-range').css('left', rangeLeft + '%');
        $('.ui-slider-range').css('width', rangeWidth + '%');
      }
    });

    minamount.val('$' + minPrice);
    maxamount.val('$' + maxPrice);

    return () => {
      rangeSlider.slider('destroy');
    };
  }, [minPrice, maxPrice]);

  return (
    <div className="sidebar__item">
      <h4>Price</h4>
      <div className="price-range-wrap">
        <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
          data-min="10" data-max="540" ref={rangeSliderRef}>
          <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
          <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
          <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
        </div>
        <div className="range-slider">
          <div className="price-input">
            <input type="text" id="minamount" ref={minAmountRef} readOnly />
            <input type="text" id="maxamount" ref={maxAmountRef} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
