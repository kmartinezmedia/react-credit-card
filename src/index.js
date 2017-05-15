import React from 'react';
import classnames from 'classnames';
import {getCreditCardType, formatCardNumber, validateExpMonth, validateExpYear} from './utils';
import './styles.css';


export default class ReactCreditCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardExpMonth: "",
      cardExpYear: "",
      cardNumber: "",
      cardName: "",
      cardSecurityCode: "",
      cardType: "unknown",
      showBack: false
    };
  }

  componentDidMount = () => {
    this.cardNumber.focus();
  }

  onChangeHandler = ({e, stateName, formatFn = false, cb = false}) => {
    let value;
    // check if we want to format the input value
    formatFn ? value = formatFn(e.target.value) : value = e.target.value;

    this.setState({ [`${stateName}`]: value})
    // if there is a callback run it here
    cb && cb(value);
  }

  onFocusHandler = (stateName) => {
    this.setState({
      showBack: stateName == 'cardSecurityCode' ? true : false
    })
  }

  validateNumbers = (value) => {
    const type = getCreditCardType(value);
    this.setState({
      cardType: type
    })
    if (value.length == 19) {
      this.cardName.focus();
    }
  }

  validateSecurityCode = (value) => {
    if (value.length == 3) {
      this.setState({
        showBack: false
      })
    }
  }

  validateExpMonth = (value) => {
    if (value.length == 2) {
      const isValid = validateExpMonth(value);
      isValid && this.cardExpYear.focus();
    }
  }

  validateExpYear = (value) => {
    if (value.length == 2) {
      const isValid = validateExpYear(value);
      isValid && this.cardSecurityCode.focus();
    }
  }

  render() {

    const {
      cardExpMonth,
      cardExpYear,
      cardNumber,
      cardName,
      cardSecurityCode,
      cardType,
      showBack
    } = this.state;

    const {
      cardWidth
    } = this.props;

    const cardClass = classnames(
      "react-credit-card__card",
      `react-credit-card__card--${cardType}`,
      {"react-credit-card__card--show-back": showBack}
    );

    const frontClass = classnames(
      "react-credit-card__front",
      `react-credit-card__front--${cardType}`
    );

    const backClass = classnames(
      "react-credit-card__back",
      `react-credit-card__back--${cardType}`
    );

    const logoClass = classnames(
      "react-credit-card__logo",
      `react-credit-card__logo--${cardType}`
    );

    return (
      <div className="react-credit-card">
        <div
          className={cardClass}
          style={{
            width: cardWidth,
            height: cardWidth / 1.5
          }}>

          {/* front of card */}
          <div className={frontClass}>
            <div className="react-credit-card__top-content">
              <div className="react-credit-card__chip"></div>
              <div className={logoClass}></div>
            </div>

            <div className="react-credit-card__middle-content">
              <label
                className="react-credit-card__label"
                htmlFor="cardNumber">
                {'Card number'}
              </label>
              <input
                className="react-credit-card__input react-credit-card__input--card-number"
                type="text"
                name="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength="19"
                value={cardNumber}
                onChange={(e) => this.onChangeHandler({e, stateName: 'cardNumber', formatFn: formatCardNumber, cb: this.validateNumbers})}
                ref={(input) => { this.cardNumber = input; }}
              />
            </div>

            <div className="react-credit-card__bottom-content">

              <div className="react-credit-card__name">
                <label
                  className="react-credit-card__label"
                  htmlFor="cardName">
                  {'Card holder'}
                </label>
                <input
                  className="react-credit-card__input"
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => this.onChangeHandler({e, stateName: 'cardName'})}
                  ref={(input) => { this.cardName = input; }}
                  />
              </div>

              <div className="react-credit-card__expiration">
                <label
                  className="react-credit-card__label"
                  htmlFor="cardExpMonth">
                  {'Expires'}
                </label>
                <div className="react-credit-card__dates">
                  <input
                    className="react-credit-card__input react-credit-card__input--month"
                    type="text"
                    name="cardExpMonth"
                    placeholder="MM"
                    maxLength="2"
                    value={cardExpMonth}
                    onChange={(e) => this.onChangeHandler({e, stateName: 'cardExpMonth', cb: this.validateExpMonth})}
                    ref={(input) => { this.cardExpMonth = input; }}
                  />
                  <span>{'/'}</span>
                  <input
                    className="react-credit-card__input react-credit-card__input--year"
                    type="text"
                    name="cardExpYear"
                    placeholder="YY"
                    maxLength="2"
                    value={cardExpYear}
                    onChange={(e) => this.onChangeHandler({e, stateName: 'cardExpYear', cb: this.validateExpYear})}
                    ref={(input) => { this.cardExpYear = input; }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* end of front */}
          {/* back of card */}
          <div className={backClass}>
          <div className="react-credit-card__black-stripe"></div>
            <div className="react-credit-card__white-stripe">
              <input
                className="react-credit-card__input react-credit-card__input--security-code"
                name="cardSecurityCode"
                type="text"
                placeholder="xxx"
                value={cardSecurityCode}
                onChange={(e) => this.onChangeHandler({e, stateName: 'cardSecurityCode', cb: this.validateSecurityCode})}
                onFocus={() => this.onFocusHandler('cardSecurityCode')}
                ref={(input) => { this.cardSecurityCode = input; }}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
