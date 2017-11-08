'use strict';

//This is a cool stopwatch that I will use for myself everyday. It's awesome! At least for me.

var _ReactBootstrap = ReactBootstrap;
var Button = _ReactBootstrap.Button;
var ButtonToolbar = _ReactBootstrap.ButtonToolbar;
var Modal = _ReactBootstrap.Modal;
var Form = _ReactBootstrap.Form;
var FormControl = _ReactBootstrap.FormControl;
var FormGroup = _ReactBootstrap.FormGroup;
var ControlLabel = _ReactBootstrap.ControlLabel;

var isWorking = true;

if (!localStorage.stopwatch) {
  localStorage.setItem('seconds', "00");
  localStorage.setItem('minutes', "00");
  localStorage.setItem('hours', "00");
  localStorage.setItem('stopwatch', "00:00:00");
  document.title = localStorage.stopwatch;
} else {
  document.title = localStorage.stopwatch;
}

var StopwatchBox = new React.createClass({
  getInitialState: function getInitialState() {
    return {
      seconds: localStorage.seconds,
      minutes: localStorage.minutes,
      hours: localStorage.hours,
      showModal: false
    };
  },
  componentWillMount: function componentWillMount() {

    var seconds = this.state.seconds;
    var minutes = this.state.minutes;
    var hours = this.state.hours;

    this.setState({
      stopwatchTime: hours + ":" + minutes + ":" + seconds
    });
  },
  closeModal: function closeModal() {
    this.setState({ showModal: false });
  },
  openModal: function openModal() {
    window.clearInterval(this.state.stopwatchInterval);
    this.setState({
      isStopwatchOn: false,
      showModal: true
    });
    //this.setState({ showModal: true });
  },
  startButton: function startButton() {

    function startTimer() {
      var seconds = parseInt(this.state.seconds);
      var minutes = parseInt(this.state.minutes);
      var hours = parseInt(this.state.hours);

      var clock = document.querySelector('h2');
      if (isWorking) {
        clock.classList.add('change-color');
        isWorking = !isWorking;
      } else {
        clock.classList.remove('change-color');
        isWorking = !isWorking;
      }

      seconds += 1;
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
      }

      if (minutes > 59) {
        seconds = 0;
        minutes = 0;
        hours += 1;
      }

      seconds = seconds.toString();
      minutes = minutes.toString();
      hours = hours.toString();

      if (parseInt(seconds[0]) < 10 && seconds[1] === undefined) {
        seconds = "0" + seconds;
      }
      if (parseInt(minutes[0]) < 10 && minutes[1] === undefined) {
        minutes = "0" + minutes;
      }
      if (parseInt(hours[0]) < 10 && hours[1] === undefined) {
        hours = "0" + hours;
      }
      localStorage.setItem('seconds', seconds);
      localStorage.setItem('minutes', minutes);
      localStorage.setItem('hours', hours);
      localStorage.setItem('stopwatch', hours + ":" + minutes + ":" + seconds);
      document.title = localStorage.stopwatch;

      this.setState({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        stopwatchTime: hours + ":" + minutes + ":" + seconds
      });
    }
    if (!this.state.isStopwatchOn) {
      var stopwatchInterval = window.setInterval(startTimer.bind(this), 1000);

      this.setState({
        isStopwatchOn: true,
        stopwatchInterval: stopwatchInterval
      });
    } else {
      window.clearInterval(this.state.stopwatchInterval);
      this.setState({
        isStopwatchOn: false
      });
    }
  },
  resetButton: function resetButton() {

    window.clearInterval(this.state.stopwatchInterval);

    this.setState({
      seconds: "00",
      minutes: "00",
      hours: "00",
      stopwatchTime: "00:00:00",
      isStopwatchOn: false
    });
  },
  editTime: function editTime() {

    var seconds = document.getElementById('formSeconds').value;
    var minutes = document.getElementById('formMinutes').value;
    var hours = document.getElementById('formHours').value;
    var regex = /^[0-9]+$/;

    if (parseInt(seconds[0]) < 10 && seconds[1] === undefined) {
      seconds = "0" + seconds;
    }
    if (parseInt(minutes[0]) < 10 && minutes[1] === undefined) {
      minutes = "0" + minutes;
    }
    if (parseInt(hours[0]) < 10 && hours[1] === undefined) {
      hours = "0" + hours;
    }

    if ((Number(seconds) || Number(minutes) || Number(hours)) < 0 || (Number(seconds) || Number(minutes)) > 60 || (seconds || minutes || hours) === "" || !(regex.test(seconds) && regex.test(minutes) && regex.test(hours))) {
      alert('Sorry. There was an error. Try again.');
    } else {
      console.log(hours + ":" + minutes + ":" + seconds);
      localStorage.setItem('seconds', seconds);
      localStorage.setItem('minutes', minutes);
      localStorage.setItem('hours', hours);
      localStorage.setItem('stopwatch', hours + ":" + minutes + ":" + seconds);

      this.setState({
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        stopwatchTime: hours + ":" + minutes + ":" + seconds,
        showModal: false
      });
    }
  },
  keyPress: function keyPress(myFunction) {
    key('ctrl+d', function () {
      myFunction();
      console.log(myFunction);
      return false;
    });
  },
  render: function render() {

    return React.createElement(
      'div',
      { className: 'middle-screen' },
      React.createElement(
        'h2',
        null,
        this.state.stopwatchTime
      ),
      this.keyPress(this.openModal),
      React.createElement(
        'div',
        { className: 'button-group' },
        React.createElement(
          Button,
          { bsStyle: 'primary', onClick: this.startButton },
          'Start/Stop'
        ),
        React.createElement(
          Button,
          { bsStyle: 'danger', onClick: this.resetButton },
          'Reset'
        ),
        React.createElement(
          Button,
          { bsStyle: 'info', onClick: this.openModal },
          'Edit time'
        )
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          null,
          React.createElement(
            Modal.Title,
            null,
            'Edit Stopwatch Time'
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            'div',
            { className: 'form-align' },
            React.createElement(
              Form,
              { inline: true },
              React.createElement(
                FormGroup,
                { controlId: 'formStopwatch' },
                React.createElement(FormControl, { id: 'formHours', type: 'text', placeholder: 'Hours' }),
                ' ',
                ' : ',
                React.createElement(FormControl, { id: 'formMinutes', type: 'text', placeholder: 'Minutes' }),
                ' ',
                ' : ',
                React.createElement(FormControl, { id: 'formSeconds', type: 'text', placeholder: 'Seconds' })
              )
            )
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.editTime, bsStyle: 'primary' },
            'Edit Time'
          ),
          React.createElement(
            Button,
            { onClick: this.closeModal },
            'Close'
          )
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(StopwatchBox, null), document.getElementById('chron'));