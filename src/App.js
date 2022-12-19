import { useState, useEffect, useCallback } from "react";

const questionnaireTemplateMocks = [
  {
    type: "singleInput",
    question: {
      text: "What is your gross annual income?",
      responseFields: [
        {
          label: "Gross Annual Income",
          type: "number",
        },
      ],
    },
  },
  {
    type: "thisOrThat",
    question: {
      text: "Are you purchasing a new home or refinancing an existing home?",
      responseFields: [
        {
          label: "Purchasing A New Home",
          // type: "button", implied button
        },
        {
          label: "Refinancing My Home",
          // type: "button", implied button
        },
      ],
    },
  },
  {
    type: "singleInput",
    question: {
      text: "What is your name?",
      responseFields: [
        {
          label: "Name",
          type: "text",
        },
      ],
    },
  },
]

const getRandomQuestionnaireTemplateMock = () => questionnaireTemplateMocks[Math.floor(Math.random() * questionnaireTemplateMocks.length)];

const App = () => {
  const [currentStep, setCurrentStep] = useState(null);
  const [stepComponent, setStepComponent] = useState(null);

  const getAndSetNextStep = () => setCurrentStep(getRandomQuestionnaireTemplateMock)

  const handleSubmit = useCallback(getAndSetNextStep, [])

  useEffect(getAndSetNextStep, []);

  useEffect(() => {
    if (currentStep) {
      switch (currentStep.type) {
        case "singleInput":
          setStepComponent(<SingleInput type={currentStep.type} question={{ text: currentStep.question.text, responseFields: currentStep.question.responseFields }} handleSubmit={handleSubmit} />)
          break;
        case "thisOrThat":
          setStepComponent(<ThisOrThat type={currentStep.type} question={{ text: currentStep.question.text, responseFields: currentStep.question.responseFields }} handleSubmit={handleSubmit} />)
          break;
        default:
          setStepComponent(null);
      }
    }
  }, [currentStep, handleSubmit])

  if (!currentStep || !stepComponent) return null;

  return <AppComponent stepComponent={stepComponent} />;
};

const SingleInput = ({ type, handleSubmit, question: { text, responseFields } }) =>
  <>
    <h1>Current Step</h1>
    <h2>{type}</h2>
    <h3>{text}</h3>
    <ul>
      {responseFields.map(({ label, type }, index) =>
        <li key={index}>
          <label>{label}</label>
          <input type={type} />
          <input type='submit' value='Continue' onClick={handleSubmit} />
        </li>
      )}
    </ul>
  </>

const ThisOrThat = ({ type, handleSubmit, question: { text, responseFields } }) =>
  <>
    <h1>Current Step</h1>
    <h2>{type}</h2>
    <h3>{text}</h3>
    <ul>
      {responseFields.map(({ label }, index) =>
        <li key={index}>
          <button onClick={handleSubmit}>{label}</button>
        </li>
      )}
    </ul>
  </>


const AppComponent = ({ stepComponent }) =>
  <main className='container'>
    {stepComponent}
  </main>
  

export default App;
