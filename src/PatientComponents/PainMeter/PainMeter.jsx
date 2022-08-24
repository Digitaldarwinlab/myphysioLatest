import React, { useEffect } from "react";
import $ from "jquery";
import "./Painmeter.css";

const PainMeter = (props) => {
  useEffect(() => {
    $(".pain-scale__level").hover(
      function () {
        $(this)
          .addClass("pain-scale__level--active")
          .prevAll()
          .addClass("pain-scale__level--active");
      },
      function () {
        $(this)
          .removeClass("pain-scale__level--active")
          .prevAll()
          .removeClass("pain-scale__level--active");
      }
    );

    $(".pain-scale__level").click(function () {
      $(this)
        .siblings()
        .removeClass(
          "pain-scale__level--selected pain-scale__level--active-emoji"
        );
      $(this)
        .addClass(
          "pain-scale__level--selected pain-scale__level--active-emoji pain-scale__level--blink"
        )
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $(this).removeClass("pain-scale__level--blink");
          }
        );
      $(".pain-scale__label")
        .siblings()
        .removeClass("pain-scale__label--selected");
      $(`#` + JSON.stringify(this.value)).addClass(
        "pain-scale__label--selected"
      );
      $(this)
        .prevAll()
        .addClass("pain-scale__level--selected pain-scale__level--blink")
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $(this).removeClass("pain-scale__level--blink");
          }
        );
    });
  }, []);

  return (
    <div style={{ marginTop: "15px" }}>
      <ul className="pain-scale" style={{ marginBottom: "10px" }}>
        <li className="pain-scale__label" id="1">
          1
        </li>
        <li className="pain-scale__label" id="2">
          2
        </li>
        <li className="pain-scale__label" id="3">
          3
        </li>
        <li className="pain-scale__label" id="4">
          4
        </li>
        <li className="pain-scale__label" id="5">
          5
        </li>
        <li className="pain-scale__label" id="6">
          6
        </li>
        <li className="pain-scale__label" id="7">
          7
        </li>
        <li className="pain-scale__label" id="8">
          8
        </li>
        <li className="pain-scale__label" id="9">
          9
        </li>
        <li className="pain-scale__label" id="10">
          10
        </li>
      </ul>
      <ul className="pain-scale">
        <li
          className="pain-scale__level pain-scale__level--1"
          value={1}
          onClick={(e) => {
            props.setPain  && props.setPain(1); 
            props.handleChange && props.handleChange("PainMeter", 1);
          }}
        >
          <span className="pain-scale__number">1</span>
          <span className="pain-scale__emoji"> 😎 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--2"
          value={2}
          onClick={(e) => {
            props.setPain  && props.setPain(2)
          props.handleChange &&  props.handleChange && props.handleChange("PainMeter", 2);
          }}
        >
          <span className="pain-scale__number">2</span>
          <span className="pain-scale__emoji"> 😉 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--3"
          value={3}
          onClick={(e) => {
            props.setPain  && props.setPain(3);
            props.handleChange &&  props.handleChange("PainMeter", 3);
          }}
        >
          <span className="pain-scale__number">3</span>
          <span className="pain-scale__emoji"> 😃 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--4"
          value={4}
          onClick={(e) => {
            props.setPain  && props.setPain(4);
            props.handleChange &&  props.handleChange("PainMeter", 4);
          }}
        >
          <span className="pain-scale__number">4</span>
          <span className="pain-scale__emoji"> 😊 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--5"
          value={5}
          onClick={(e) => {
            props.setPain  && props.setPain(5);
            props.handleChange &&  props.handleChange("PainMeter", 5);
          }}
        >
          <span className="pain-scale__number">5</span>
          <span className="pain-scale__emoji"> 😱 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--6"
          value={6}
          onClick={(e) => {
            props.setPain  && props.setPain(6);
            props.handleChange &&  props.handleChange("PainMeter", 6);
          }}
        >
          <span className="pain-scale__number">6</span>
          <span className="pain-scale__emoji"> 😐 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--7"
          value={7}
          onClick={(e) => {
            props.setPain  && props.setPain(7);
            props.handleChange &&  props.handleChange("PainMeter", 7);
          }}
        >
          <span className="pain-scale__number">7</span>
          <span className="pain-scale__emoji"> ☹️ </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--8"
          value={8}
          onClick={(e) => {
            props.setPain  && props.setPain(8);
            props.handleChange &&  props.handleChange("PainMeter", 8);
          }}
        >
          <span className="pain-scale__number">8</span>
          <span className="pain-scale__emoji"> 😞 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--9"
          value={9}
          onClick={(e) => {
            props.setPain  && props.setPain(9);
            props.handleChange &&  props.handleChange("PainMeter", 9);
          }}
        >
          <span className="pain-scale__number">9</span>
          <span className="pain-scale__emoji"> 😖 </span>
        </li>
        <li
          className="pain-scale__level pain-scale__level--10"
          value={10}
          onClick={(e) => {
            props.setPain  && props.setPain(10);
            props.handleChange && props.handleChange("PainMeter", 10);
          }}
        >
          <span className="pain-scale__number">10</span>
          <span className="pain-scale__emoji"> 😭 </span>
        </li>
      </ul>
      <ul className="legend"></ul>
    </div>
  );
};

export default PainMeter;
