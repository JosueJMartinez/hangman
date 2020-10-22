import React, { Component } from "react";
import { randomWord } from "../words";
import "../../css/Hangman.css";
import img0 from "../../img/0.jpg";
import img1 from "../../img/1.jpg";
import img2 from "../../img/2.jpg";
import img3 from "../../img/3.jpg";
import img4 from "../../img/4.jpg";
import img5 from "../../img/5.jpg";
import img6 from "../../img/6.jpg";
import AlphaButton from "./AlphaButton";
import Axios from "axios";

const RANDOM_WORD_API =
  "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: "",
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    const word = this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
    return word;
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .map(ltr => (
        <AlphaButton
          key={ltr}
          ltr={ltr}
          handleGuess={this.handleGuess}
          isGuessed={this.state.guessed.has(ltr)}
        />
      ));
  }

  handleRestart = async e => {
    try {
      const res = await Axios.get(RANDOM_WORD_API);

      this.setState(prev => ({
        ...prev,
        nWrong: 0,
        guessed: new Set(),
        answer: res.data[0].word,
      }));
    } catch (e) {
      console.log(e);
      this.setState(prev => ({
        ...prev,
        nWrong: 0,
        guessed: new Set(),
        answer: randomWord(),
      }));
    }
  };

  isWon = () => {
    const word = this.guessedWord();
    const isWon = !word.includes("_");

    if (isWon) {
      return (
        <div>
          <p className="Hangman-word">{this.state.answer}</p>
          <button id="restart" onClick={this.handleRestart}>
            Restart?
          </button>
        </div>
      );
    }

    if (this.state.nWrong === this.props.maxWrong) {
      return (
        <div>
          <p className="Hangman-word">{this.state.answer}</p>
          <h2>You lost</h2>
          <button id="restart" onClick={this.handleRestart}>
            Restart?
          </button>
        </div>
      );
    }

    return (
      <div>
        <p className="Hangman-word">{word}</p>
        <p className="Hangman-btns">{this.generateButtons()}</p>
      </div>
    );
  };

  async componentDidMount() {
    try {
      const res = await Axios.get(RANDOM_WORD_API);
      this.setState(prev => ({ ...prev, answer: res.data[0].word }));
    } catch (e) {
      console.log(e);
      this.setState(prev => ({ ...prev, answer: randomWord() }));
    }
  }

  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong}/${this.props.maxWrong}`}
        />
        <p>Number of wrong guesses: {this.state.nWrong}</p>

        {this.isWon()}
        <div />
      </div>
    );
  }
}

export default Hangman;
