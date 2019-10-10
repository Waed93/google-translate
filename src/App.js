import React, { Component } from "react";
import cookie from "react-cookies";

import { googleTranslate } from "./utils/googleTranslate";

class App extends Component {
  state = {
    languageCodes: [],
    language: cookie.load("language") ? cookie.load("language") : "ar",
    question: cookie.load("question")
      ? cookie.load("question")
      : "الثلاثاء .. كتلة حارة نسبياً وامتداد منخفض البحر الأحمرتندفع نحو المملكة كتلة حارة نسبياً قادمة عبر السعودية، حيث يطرأ ارتفاع واضح على درجات الحرارة وتكون الأجواء حارة نسبياً وجافة أثناء ساعات النهار في معظم المناطق، نتيجة لامتداد منخفض البحر الاحمر وهبوب رياح جنوبية شرقية معتدلة السرعة، تنشط فوق الجبال.كما تتكاثر السحب المتوسطة والعالية يتخللها بعض السحب الركامية على أجزاء من جنوب وشرق المملكة، وتكون فرص هطول بعض زخات الأمطار واردة لاسيما في المناطق الصحراوية، تترافق محلياً بنشاط على حركة الرياح المثيرة للغبار.ويستمر تأثر المملكة بالكتلة الحارة نسبياً في النصف الثاني من الاسبوع حيث تبقى درجات الحرارة أعلى من معدلاتها بالنسبة لهذا الوقت من العام، وذلك بفعل التوقعات باندفاع كتلة باردة نحو تونس، تعمل على جذب المرتفع المداري والكتلة الحارة نسبياً نحو بلاد الشام بما فيها المملكة."
  };

  componentDidMount() {
    // load all of the language options from Google Translate to your app state

    googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
      getLanguageCodes(languageCodes); // use a callback function to setState
    });

    const getLanguageCodes = languageCodes => {
      this.setState({ languageCodes });
    };
  }

  render() {
    const { languageCodes, language, question } = this.state;

    return (
      <div style={this.divStyle}>
        {/* iterate through language options to create a select box */}
        <select
          className="select-language"
          value={language}
          onChange={e => this.changeHandler(e.target.value)}
        >
          {languageCodes.map(lang => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
        <br/>

        <p>{question}</p>

      </div>
    );
  }

  changeHandler = language => {
    let { question } = this.state;
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = transQuestion => {
      if (question !== transQuestion) {
        this.setState({ question: transQuestion });
        cookie.save("question", transQuestion, { path: "/" });
      }
    };

    // translate the question when selecting a different language
    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, function(err, translation) {
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    this.setState({ language });
    cookie.save("language", language, { path: "/" });
  };

  // just some inline css to center our demo
  divStyle = {
    justifyContent: "center",
    height: "100vh",
    width: "100wh",
    paddingLeft:"20%",
    paddingRight:"20%",
    paddingTop:"20%",
  };
}

export default App;