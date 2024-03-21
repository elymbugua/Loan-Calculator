var principle = 0;

var time = 0;

var interest_rate = 1;

var total_amount;

var daily_repayment = 0;

var timerange = 0;

var drawchart = function () {
  var canvas = document.getElementById("calc_chart");

  var context = canvas.getContext("2d");

  context.lineWidth = 1;

  launchsliders(context, canvas);

  drawscales(context, 0, timerange);

  principle = $("#slider_v").slider("value");

  time = $("#slider_h").slider("value");

  //innnitialize the chart
  var init_amount = calc_amount_payable(principle, time, interest_rate);

  markchart(context, init_amount, principle, time);

  $("#p_amount").html("\u00a3" + principle);

  $("#days").html(time + " Days");

  show_amount_daily(init_amount);

  $("#amount_intervals").change(function () {
    clear_rect(context, canvas);

    var range = $("#amount_intervals").val();
    var min = 0;
    var max = 150;
    var value = 80;
    var start_y = min;
    time = 7;

    $("#slider_v")
      .slider("option", "min", min)
      .slider("option", "max", max)
      .slider("option", "value", value);

    var newamount = calc_amount_payable(value, time, interest_rate);

    if (range == "2") {
      min = 150;
      max = 300;
      value = 230;
      start_y = min;

      principle = value;

      time = $("#slider_h").slider("option", "min") + 7;

      $("#slider_h").slider(
        "option",
        "value",
        $("#slider_h").slider("option", "min") + 7
      );

      $("#slider_v")
        .slider("option", "min", min)
        .slider("option", "max", max)
        .slider("option", "value", value);

      drawscales(context, start_y, $("#slider_h").slider("option", "min"));

      newamount = calc_amount_payable(value, time, interest_rate);

      markchart(context, newamount, value, time);

      $("#p_amount").html("\u00A3" + value);

      $("#days").html($("#slider_h").slider("option", "value") + " Days");

      show_amount_daily(calc_amount_payable(value, time, interest_rate));
    } else if (range == "3") {
      min = 300;
      max = 450;
      value = 380;
      start_y = min;

      principle = value;

      time = $("#slider_h").slider("option", "min") + 7;

      $("#slider_h").slider(
        "option",
        "value",
        $("#slider_h").slider("option", "min") + 7
      );

      $("#slider_v")
        .slider("option", "min", min)
        .slider("option", "max", max)
        .slider("option", "value", value);

      drawscales(context, start_y, $("#slider_h").slider("option", "min"));

      newamount = calc_amount_payable(value, time, interest_rate);

      markchart(context, newamount, value, time);

      $("#p_amount").html("\u00A3" + value);

      $("#days").html($("#slider_h").slider("option", "value") + " Days");

      show_amount_daily(calc_amount_payable(value, time, interest_rate));
    } else if (range == "1") {
      principle = value;

      time = $("#slider_h").slider("option", "min") + 7;

      $("#slider_h").slider(
        "option",
        "value",
        $("#slider_h").slider("option", "min") + 7
      );

      drawscales(context, start_y, $("#slider_h").slider("option", "min"));

      markchart(context, newamount, value, time);

      $("#p_amount").html("\u00A3" + value);

      $("#days").html($("#slider_h").slider("option", "value") + " Days");

      show_amount_daily(calc_amount_payable(value, time, interest_rate));
    }
  });

  $("#timeplus").click(function () {
    clear_rect(context, canvas);

    timerange++;

    if (timerange == 0) {
      adjustx(context, timerange);
      markchart(
        context,
        calc_amount_payable(
          $("#slider_v").slider("option", "value"),
          $("#slider_h").slider("option", "value"),
          interest_rate
        ),
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value")
      );
    } else if (timerange == 1) {
      adjustx(context, timerange);
      markchart(
        context,
        calc_amount_payable(
          $("#slider_v").slider("option", "value"),
          $("#slider_h").slider("option", "value"),
          interest_rate
        ),
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value")
      );
    } else {
      timerange = 0;
      adjustx(context, timerange);
      markchart(
        context,
        calc_amount_payable(
          $("#slider_v").slider("option", "value"),
          $("#slider_h").slider("option", "value"),
          interest_rate
        ),
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value")
      );
    }

    principle = $("#slider_v").slider("option", "value");

    time = $("#slider_h").slider("option", "value");

    $("#days").html($("#slider_h").slider("option", "value") + " Days");

    show_amount_daily(
      calc_amount_payable(
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value"),
        interest_rate
      )
    );
  });

  $("#timeminus").click(function () {
    clear_rect(context, canvas);

    timerange--;

    if (timerange >= 0 && timerange <= 1) {
      adjustx(context, timerange);
      markchart(
        context,
        calc_amount_payable(
          $("#slider_v").slider("option", "value"),
          $("#slider_h").slider("option", "value"),
          interest_rate
        ),
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value")
      );
    } else {
      timerange = 1;
      adjustx(context, timerange);
      markchart(
        context,
        calc_amount_payable(
          $("#slider_v").slider("option", "value"),
          $("#slider_h").slider("option", "value"),
          interest_rate
        ),
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value")
      );
    }

    principle = $("#slider_v").slider("option", "value");

    time = $("#slider_h").slider("option", "value");

    $("#days").html($("#slider_h").slider("option", "value") + " Days");

    show_amount_daily(
      calc_amount_payable(
        $("#slider_v").slider("option", "value"),
        $("#slider_h").slider("option", "value"),
        interest_rate
      )
    );
  });

  $("#amount_intervals").val("1");

  $("#takeloan").click(function () {
    //create an xmlhttprequest object for use in ajax request
    var request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else if (window.AcitveXObject) {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    }

    request.open("get", "../loan_particulars.php", true);

    request.send(null);

    if (request.readyState == 2) {
      var response = request.responseText;

      $("#content_holder").append(response).css("dispplay", "");
    }
  });
};

var launchsliders = function (thecontext, thecanvas) {
  var amount;
  var v_min = $("#slider_v").slider("option", "min");
  var v_max = $("#slider_v").slider("option", "max");
  var start_y = 0;

  $("#slider_v").slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 150,
    step: 1,
    value: 80,
    animate: "fast",
    slide: function (event, ui) {
      //algorithm okay

      start_y = $(this).slider("option", "min");

      if (ui.value == 0) principle = 0;
      else principle = ui.value;

      amount = calc_amount_payable(ui.value, time, interest_rate);

      $("#p_amount").html("\u00a3" + ui.value);

      show_amount_daily(amount);

      clear_rect(thecontext, thecanvas);

      drawscales(thecontext, start_y, $("#slider_h").slider("option", "min"));

      markchart(thecontext, amount, ui.value, time);
    },

    stop: function (event, ui) {
      //this event is triggered when the user stops sliding
      //only mark the chart when the user stops sliding

      start_y = $(this).slider("option", "min");

      clear_rect(thecontext, thecanvas);
      drawscales(thecontext, start_y, $("#slider_h").slider("option", "min"));
      markchart(thecontext, amount, ui.value, time);
      show_amount_daily(amount);
    },
  });

  $("#slider_h").slider({
    range: "min",
    min: 0,
    max: 15,
    step: 1,
    value: 7,
    animate: "fast",
    slide: function (event, ui) {
      //algorithm okay

      start_y = $("#slider_v").slider("option", "min");

      if (ui.value == 0) time = 0;
      else time = ui.value;

      amount = calc_amount_payable(principle, ui.value, interest_rate);

      $("#days").html(ui.value + " Days");

      show_amount_daily(amount);

      clear_rect(thecontext, thecanvas);

      drawscales(thecontext, start_y, $("#slider_h").slider("option", "min"));

      markchart(thecontext, amount, principle, ui.value);
    },

    stop: function (event, ui) {
      start_y = $("#slider_v").slider("option", "min");

      clear_rect(thecontext, thecanvas);
      drawscales(thecontext, start_y, $("#slider_h").slider("option", "min"));
      markchart(thecontext, amount, principle, ui.value);
      show_amount_daily(amount);
    },
  });
};

var drawscales = function (acontext, y_value, x_value) {
  acontext.closePath();

  acontext.beginPath();

  acontext.save();

  acontext.strokeStyle = "#cccccc";

  acontext.lineWidth = 1;

  acontext.moveTo(35, 380);

  acontext.lineTo(615, 380);

  acontext.moveTo(615, 380);

  acontext.lineTo(610, 375);

  acontext.moveTo(615, 380);

  acontext.lineTo(610, 385);

  acontext.stroke();

  acontext.moveTo(35, 385);

  acontext.lineTo(35, 5);

  acontext.moveTo(35, 5);

  acontext.lineTo(30, 10);

  acontext.moveTo(35, 5);

  acontext.lineTo(40, 10);

  acontext.stroke();

  acontext.moveTo(30, 380);

  acontext.lineTo(35, 380);

  acontext.stroke();
  //draw the x-axis scale

  acontext.moveTo(35, 380);

  //repeatedly draw the scale

  var x = 35;
  var xinc = x_value;
  var yinc = y_value;

  for (x; x <= 575; x += 36) {
    acontext.moveTo(x, 380); //scale mark position
    acontext.lineTo(x, 390);
    acontext.stroke();
    acontext.moveTo(x, 405);

    //callibrate x-axis
    acontext.fillText(xinc.toString(), x, 405);
    xinc++;
  }

  //draw the y-axis

  acontext.moveTo(35, 357);

  var y = 380;

  for (y; y != 12; y -= 23) {
    //good algorithm

    acontext.moveTo(35, y);
    acontext.lineTo(25, y);
    acontext.stroke();

    //callibrate y-axis

    acontext.moveTo(5, x);
    acontext.fillText(yinc.toString(), 5, y);
    yinc += 10;
  }

  acontext.restore();
};

var markchart = function (context, amount, y, x) {
  //amount is the loanable funds
  //x is the time
  //y is the principle
  //on the x-axis 18px represents 1 day
  //on the y-axis 23px represent 10 pounds
  //where the two lines meet is the coordinate p(x_mark,y_mark)

  //save the context
  context.save();

  context.strokeStyle = "#888888";

  context.lineWidth = 3;

  var xfactor = x - 16 * timerange; //where are u on the chart

  x_mark = xfactor * 36; //this places the x-mark on correct graph position on  x
  //and ensures it doesn't go off the chart **algo Okay

  if (y >= 150) {
    // scale increments are multiples of 150 --

    var factor = Math.floor(y / 150);
    y_mark = ((y - 150 * factor) / 10) * 23;

    if (y_mark == 0) {
      if ($("#slider_v").slider("option", "min") - y == 0) {
        //you are at the bottom of the chart place the line at y=380
        y_mark = 0;
      } // you are at the topmost of the chart mark at y=35
      else y_mark = 345;
    }
  } else y_mark = (y / 10) * 23;

  context.moveTo(35, 380);

  context.moveTo(35 + x_mark, 380);

  context.lineTo(35 + x_mark, 30);

  //stroke the line x= 35 + x_mark
  context.stroke();

  //draw the semi-circles on top of x=35 + x_mark

  context.moveTo(35 + x_mark, 12);

  context.save();

  context.strokeStyle = "#ffffff";

  context.fillStyle = "#888888";

  context.lineWidth = 1;

  context.font = "10px arial";

  context.arc(35 + x_mark, 20, 10, Math.PI * 0, Math.PI * 2);

  context.fill();

  context.restore();

  context.save();

  context.closePath();

  context.beginPath();

  context.moveTo(15 + x_mark, 17);

  context.fillStyle = "#ffffff";

  context.fillRect(15 + x_mark, 17, 30, 6);

  context.closePath();

  context.restore();

  context.moveTo(35, 380 - y_mark);

  context.lineTo(590, 380 - y_mark);

  //stroke the line y=380 - y_mark

  context.stroke();

  // draw the semi-circles on top of y= 380- y_mark;

  context.moveTo(600, 380 - y_mark);

  context.save();

  context.fillStyle = "#888888";

  context.arc(600, 380 - y_mark, 10, 0, Math.PI * 2);

  context.fill();

  context.restore();

  context.save();

  context.fillStyle = "#ffffff";

  context.closePath();

  context.beginPath();

  context.moveTo(597, 380 - y_mark - 15);

  context.fillRect(597, 380 - y_mark - 15, 6, 25);

  context.closePath();

  context.restore();

  context.restore();

  context.save(); //maintains the context state

  context.font = "15px arial";

  context.fillStyle = "#ff0000";

  context.textAlign = "right";

  if (xfactor > 12) {
    context.fillText(
      "You Repay \u00a3" + Math.round(amount).toString(),
      x_mark,
      380 - y_mark - 23
    );
  } else
    context.fillText(
      "You Repay \u00a3" + Math.round(amount).toString(),
      x_mark + 40 + 115,
      380 - y_mark - 23
    );

  context.restore(); //gives back the context original properties

  context.save();

  context.font = "14px 'Trebuchet ms'";

  context.fillStyle = "#000000";

  var metric = context.measureText("DAILY REPAYMENT SCHEDULE");

  var textwidth = metric.width;

  if (xfactor <= 6)
    context.fillText(
      "DAILY REPAYMENT SCHEDULE",
      (251 - 185) / 2,
      380 - y_mark - 10
    );
  else
    context.fillText(
      "DAILY REPAYMENT SCHEDULE",
      35 + (x_mark - textwidth) / 2,
      380 - y_mark - 10
    );

  context.restore();

  context.save();

  //draw the daily payment indicators

  context.font = "13px arial";

  context.strokeStyle = "#888888";

  context.moveTo(35, 380);

  var daycounter = 1;

  var days = $("#slider_h").slider("option", "min") + 1;

  for (daycounter; daycounter <= xfactor; daycounter++) {
    context.moveTo(35 + daycounter * 36, 380);

    context.save();

    context.fillStyle = "#ff0000";

    context.fillText(
      "\u00A3" +
        Math.round(calc_amount_payable(y, days, interest_rate).toString()),
      35 + daycounter * 36 + 5,
      370
    ); //awesome

    context.restore();

    context.lineTo(35 + daycounter * 36, 380 - y_mark);

    context.stroke();

    days++;
  }

  context.restore();
};

var calc_amount_payable = function (principle, time, interest) {
  //algorithm okay

  //interest is charged per day and compounded

  var amount_pyble = principle * Math.pow(1 + interest / 100, time);

  if (principle == 0 || time == 0) amount_pyble = 0;

  total_amount = Math.round(amount_pyble);

  return amount_pyble;
};

var clear_rect = function (acontext, acanvas) {
  //redraw the chart every time the user selects a new value

  acontext.closePath();
  acontext.beginPath();
  acontext.clearRect(0, 0, acanvas.width, acanvas.height);
  acontext.closePath();
};

var show_amount_daily = function (r_amount) {
  $("#amount_display").html(
    "Amount Repayable: \u00A3" +
      Math.round(r_amount) +
      " at 1% interest per day"
  );
};

var adjustx = function (thecontext, rangevalue) {
  //adjusts the x-axis scale

  switch (
    rangevalue //thank you for switching
  ) {
    case 0:
      $("#slider_h")
        .slider("option", "min", 0)
        .slider("option", "max", 15)
        .slider("option", "value", 7);
      drawscales(thecontext, $("#slider_v").slider("option", "min"), 0);
      $("#timelabel").html("0 - 15 Days");
      break;

    case 1:
      $("#slider_h")
        .slider("option", "min", 16)
        .slider("option", "max", 31)
        .slider("option", "value", 23);
      drawscales(thecontext, $("#slider_v").slider("option", "min"), 16);
      $("#timelabel").html("16 - 31 Days");
      break;
  }
};

var calc_daily_rep = function () {
  daily_repayment = "\u00A3" + Math.round(total_amount / time);
  return daily_repayment;
};
