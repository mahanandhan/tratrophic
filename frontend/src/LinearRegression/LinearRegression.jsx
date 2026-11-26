
import React, { useEffect, useState } from "react";

/* --------------------------------
   TABLE OF CONTENTS
--------------------------------- */

const sections = [
  { id: "installation", label: "Installation" },
  { id: "importing", label: "Importing" },
  { id: "creating-model", label: "Creating a Model" },
  { id: "training", label: "Training" },
  { id: "prediction", label: "Prediction" },
  { id: "complete-example", label: "Complete Example" },
  { id: "understanding-code", label: "Understanding the Code" },
  { id: "model-parameters", label: "Model Parameters" },
];

/* --------------------------------
   CODE SYNTAX HIGHLIGHTING
--------------------------------- */

function highlightLine(line) {
  const tokenRegex =
    /(#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:import|from|as|class|def|return|for|in|if|else|True|False|None)\b|\b(?:LinearRegression|StandardScalar|numpy)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*(?=\s*\())/g;

  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(
        <span key={lastIndex} className="text-[#d4d4d4]">
          {line.slice(lastIndex, match.index)}
        </span>
      );
    }

    const value = match[0];
    let color = "#9cdcfe";

    if (value.startsWith("#")) {
      color = "#6a9955";
    } else if (value.startsWith('"') || value.startsWith("'")) {
      color = "#ce9178";
    } else if (
      /^(import|from|as|class|def|return|for|in|if|else|True|False|None)$/.test(value)
    ) {
      color = "#c586c0";
    } else if (
      /^(LinearRegression|StandardScalar|numpy)$/.test(value)
    ) {
      color = "#4ec9b0";
    } else if (/^\d/.test(value)) {
      color = "#b5cea8";
    } else {
      color = "#dcdcaa";
    }

    tokens.push(
      <span key={match.index} style={{ color }}>
        {value}
      </span>
    );

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    tokens.push(
      <span key={lastIndex} className="text-[#d4d4d4]">
        {line.slice(lastIndex)}
      </span>
    );
  }

  return tokens;
}

/* --------------------------------
   CODE BLOCK
--------------------------------- */

function CodeBlock({ language = "python", code }) {
  const [copied, setCopied] = useState(false);

  const lines = code.trim().split("\n");

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Unable to copy code:", error);
    }
  };

  return (
    <div className="my-8 w-full overflow-hidden rounded-xl border border-[#292929] bg-[#0d0d0d]">

      {/* Code Header */}
      <div className="flex h-12 items-center justify-between border-b border-[#292929] bg-[#141414] px-5">
        <span className="text-sm font-medium text-neutral-400">
          {language}
        </span>

        <button
          type="button"
          onClick={copyCode}
          className="rounded-md px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-[#252525] hover:text-[#91d49b]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto py-5">
        <pre className="min-w-max text-[16px] leading-8">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-16 shrink-0 select-none pr-5 text-right text-neutral-600">
                  {index + 1}
                </span>

                <span className="pr-8">
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* --------------------------------
   DOCUMENTATION COMPONENTS
--------------------------------- */

function SectionHeading({ id, children }) {
  return (
    <h2
      id={id}
      className="scroll-mt-8 border-b border-[#242424] pb-4 pt-16 text-3xl font-semibold tracking-tight text-white"
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }) {
  return (
    <h3 className="mb-4 mt-10 text-2xl font-semibold text-white">
      {children}
    </h3>
  );
}

function Explanation({ children }) {
  return (
    <p className="my-6 text-[17px] leading-9 text-neutral-400">
      {children}
    </p>
  );
}

function Term({ name, children }) {
  return (
    <div className="border-b border-[#252525] py-6 last:border-0">
      <h4 className="mb-3 text-lg font-semibold text-[#91d49b]">
        <code>{name}</code>
      </h4>

      <p className="text-[16px] leading-8 text-neutral-400">
        {children}
      </p>
    </div>
  );
}

/* --------------------------------
   MAIN LINEAR REGRESSION PAGE
--------------------------------- */

function LinearRegression() {
  const [activeSection, setActiveSection] = useState("installation");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30px 0px -70% 0px",
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const goToSection = (id) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <style>{`
        ::selection {
          background: #91d49b;
          color: #071009;
        }

        ::-moz-selection {
          background: #91d49b;
          color: #071009;
        }

        .docs-content code:not(pre code) {
          border: 1px solid #303030;
          border-radius: 5px;
          background: #171717;
          padding: 3px 7px;
          color: #91d49b;
          font-size: 0.9em;
        }

        .docs-link {
          transition: all 150ms ease;
        }

        .docs-link:hover {
          color: #91d49b;
        }

        .docs-link-active {
          color: #91d49b !important;
          border-left: 2px solid #91d49b;
          background: rgba(145, 212, 155, 0.08);
        }
      `}</style>

      <div className="grid w-full grid-cols-1 items-start gap-12 px-2 py-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 lg:px-4 xl:gap-14">

        {/* MAIN DOCUMENTATION */}

        <main className="docs-content min-w-0 w-full">

          {/* Page Introduction */}
          <div className="mb-12">
            <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
              <span>Machine Learning</span>
              <span>/</span>
              <span className="text-[#91d49b]">
                Linear Regression
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Linear Regression
            </h1>

            <p className="mt-7 max-w-5xl text-lg leading-9 text-neutral-400">
              Learn how to use the Linear Regression model provided
              by Tratrophic. This guide covers installation, importing,
              creating a model, training, making predictions, and
              understanding the code.
            </p>
          </div>

          {/* INSTALLATION */}

          <SectionHeading id="installation">
            Installation
          </SectionHeading>

          <Explanation>
            Before using Linear Regression, make sure Python and NumPy
            are available in your environment. Tratrophic uses NumPy
            for its numerical operations.
          </Explanation>

          <SubHeading>Install NumPy</SubHeading>

          <Explanation>
            Open your terminal and run the following command to install
            NumPy:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`pip install numpy`}
          />

          <Explanation>
            If you are using the Tratrophic source project, make sure
            its package files are available in your Python project.
            The NumPy command above installs the dependency; it does
            not install Tratrophic itself.
          </Explanation>

          {/* IMPORTING */}

          <SectionHeading id="importing">
            Importing
          </SectionHeading>

          <Explanation>
            After setting up your environment, the next step is to
            import the LinearRegression class into your Python file.
          </Explanation>

          <CodeBlock
            language="python"
            code={`from tratrophicai import LinearRegression`}
          />

          <Explanation>
            This statement imports the LinearRegression class from
            the linear_model module. You can now create and use a
            Linear Regression model in your program.
          </Explanation>

          {/* CREATING A MODEL */}

          <SectionHeading id="creating-model">
            Creating a Model
          </SectionHeading>

          <Explanation>
            To use Linear Regression, first create an instance of
            the LinearRegression class.
          </Explanation>

          <CodeBlock
            language="python"
            code={`model = LinearRegression()`}
          />

          <Explanation>
            Here, <code>model</code> is the variable that stores your
            Linear Regression model. You will use this variable to
            train the model and make predictions.
          </Explanation>

          <SubHeading>Customizing the Model</SubHeading>

          <Explanation>
            You can also provide parameters when creating the model.
            These parameters control how the model learns from data.
          </Explanation>

          <CodeBlock
            language="python"
            code={`model = LinearRegression(
    learning_rate=0.01,
    iterations=20000
)`}
          />

          {/* TRAINING */}

          <SectionHeading id="training">
            Training
          </SectionHeading>

          <Explanation>
            Training means giving the model examples so it can learn
            the relationship between the input data and the output
            values.
          </Explanation>

          <SubHeading>Prepare the Training Data</SubHeading>

          <CodeBlock
            language="python"
            code={`X_train = [
    [3000, 5],
    [2000, 4],
    [1200, 2],
    [1000, 2],
    [2500, 5],
    [3200, 6],
    [2200, 4],
    [1500, 3]
]

y_train = [30, 20, 12, 10, 25, 32, 22, 15]`}
          />

          <Explanation>
            In this example, the input contains house sizes and
            numbers of bedrooms. The output contains their corresponding
            house prices.
          </Explanation>

          <SubHeading>Train the Model</SubHeading>

          <Explanation>
            Once your training data is ready, call the fit() method:
          </Explanation>

          <CodeBlock
            language="python"
            code={`model.fit(X_train, y_train)`}
          />

          <Explanation>
            The <code>fit()</code> method trains the model using
            the input features and their corresponding target values.
            After training, the model can be used to predict values
            for new inputs.
          </Explanation>

          {/* PREDICTION */}

          <SectionHeading id="prediction">
            Prediction
          </SectionHeading>

          <Explanation>
            Once the model has been trained, you can provide new input
            data and ask the model to predict the corresponding output.
          </Explanation>

          <CodeBlock
            language="python"
            code={`X_test = [
    [2800, 5],
    [1800, 3]
]

predictions = model.predict(X_test)

print(predictions)`}
          />

          <Explanation>
            The <code>predict()</code> method receives new input data
            and returns the model's predicted values.
          </Explanation>

          {/* COMPLETE EXAMPLE */}

          <SectionHeading id="complete-example">
            Complete Example
          </SectionHeading>

          <Explanation>
            Now let's put everything together. Create a Python file
            named <code>test.py</code> and use the following code to
            train and test your Linear Regression model.
          </Explanation>

          <CodeBlock
            language="python"
            code={`from tratrophicai import LinearRegression

# Training data
X_train = [
    [3000, 5],
    [2000, 4],
    [1200, 2],
    [1000, 2],
    [2500, 5],
    [3200, 6],
    [2200, 4],
    [1500, 3]
]

y_train = [30, 20, 12, 10, 25, 32, 22, 15]

# Testing data
X_test = [
    [2800, 5],
    [1800, 3]
]

y_test = [28, 18]

# Create the model
model = LinearRegression()

# Train the model
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)

# Display results
print("Weights:", model.coef)
print("Bias:", model.intercept)
print("Predictions:", predictions)
print("Actual Values:", y_test)`}
          />

          <SubHeading>Run the Program</SubHeading>

          <Explanation>
            Open your terminal in the directory containing
            <code>test.py</code> and run:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`python test.py`}
          />

          <SubHeading>Understanding the Output</SubHeading>

          <Explanation>
            Your output will contain the model's learned coefficients,
            intercept, predicted values, and actual values. The
            predictions should be close to the actual values.
          </Explanation>

          <CodeBlock
            language="text"
            code={`Weights: [7.56144073e+00 8.00999486e-04]
Bias: 20.749999999999915
Predictions: [27.99989292 17.99977729]
Actual Values: [28, 18]`}
          />

          <Explanation>
            The exact output can vary depending on your training
            settings and implementation.
          </Explanation>

          {/* UNDERSTANDING THE CODE */}

          <SectionHeading id="understanding-code">
            Understanding the Code
          </SectionHeading>

          <Explanation>
            Let's understand the important terms used in the example.
            These are the basic concepts you need to know when using
            the Tratrophic Linear Regression model.
          </Explanation>

          <Term name="X_train">
            This contains the input features used to train the model.
            In our example, each row contains two values: house size
            and number of bedrooms. The model uses these inputs to
            learn patterns.
          </Term>

          <Term name="y_train">
            This contains the actual output values corresponding to
            X_train. In our example, these are the house prices.
            The model learns to predict these values from the inputs.
          </Term>

          <Term name="X_test">
            This contains new input data that is given to the trained
            model. These examples are used to check how the model
            performs on data it was not trained on.
          </Term>

          <Term name="y_test">
            These are the actual output values for the testing data.
            We compare them with the predictions to see how close
            the model's predictions are.
          </Term>

          <Term name="model">
            This variable stores the LinearRegression object.
            It gives you access to the model's methods and learned
            parameters.
          </Term>

          <Term name="LinearRegression()">
            This creates a new Linear Regression model. You can
            optionally pass parameters such as learning_rate and
            iterations when creating it.
          </Term>

          <Term name="fit(X_train, y_train)">
            This method trains the model. It receives the input
            features and their corresponding target values.
          </Term>

          <Term name="predict(X_test)">
            This method uses the trained model to predict output
            values for new input data.
          </Term>

          <Term name="model.coef">
            This contains the coefficients, also called weights,
            learned by the model during training. There is one
            coefficient for each input feature.
          </Term>

          <Term name="model.intercept">
            This contains the intercept, also called the bias.
            It is another learned parameter used when the model
            makes predictions.
          </Term>

          {/* MODEL PARAMETERS */}

          <SectionHeading id="model-parameters">
            Model Parameters
          </SectionHeading>

          <Explanation>
            You can customize the model by changing the parameters
            passed to LinearRegression().
          </Explanation>

          <div className="my-8 w-full overflow-x-auto rounded-xl border border-[#292929]">

            <div className="grid min-w-[600px] grid-cols-[180px_140px_minmax(0,1fr)] border-b border-[#292929] bg-[#141414] px-5 py-5 text-sm font-semibold text-white">
              <span>Parameter</span>
              <span>Default</span>
              <span>Description</span>
            </div>

            <div className="grid min-w-[600px] grid-cols-[180px_140px_minmax(0,1fr)] border-b border-[#292929] px-5 py-6 text-sm">
              <code className="text-[#91d49b]">
                learning_rate
              </code>

              <span className="text-neutral-300">
                0.01
              </span>

              <span className="leading-7 text-neutral-400">
                Controls the size of each learning update.
              </span>
            </div>

            <div className="grid min-w-[600px] grid-cols-[180px_140px_minmax(0,1fr)] px-5 py-6 text-sm">
              <code className="text-[#91d49b]">
                iterations
              </code>

              <span className="text-neutral-300">
                20000
              </span>

              <span className="leading-7 text-neutral-400">
                Controls how many training iterations are performed.
              </span>
            </div>

          </div>

          <Explanation>
            These are the defaults for the implementation currently
            documented here. Make sure they match your actual
            LinearRegression class.
          </Explanation>

          {/* FOOTER */}

          <div className="mt-20 border-t border-[#292929] py-10">
            <p className="text-sm text-neutral-500">
              Tratrophic Documentation
            </p>

            <p className="mt-2 text-sm text-neutral-400">
              Linear Regression · Version 0.1.0
            </p>
          </div>

        </main>

        {/* RIGHT SIDE NAVIGATION */}

        <aside className="sticky top-0 hidden h-fit max-h-full self-start xl:block">
          <div className="max-h-[calc(100vh-100px)] overflow-y-auto pt-6">

            <h3 className="mb-5 text-sm font-semibold text-white">
              On This Page
            </h3>

            <nav className="flex flex-col gap-1 border-l border-[#303030]">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => goToSection(section.id)}
                  className={`docs-link -ml-px border-l-2 px-4 py-3 text-left text-sm ${
                    activeSection === section.id
                      ? "docs-link-active font-medium"
                      : "border-transparent text-neutral-500"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

          </div>
        </aside>

      </div>
    </>
  );
}

export default LinearRegression;
