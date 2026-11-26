
import React, { useEffect, useState } from "react";

/* --------------------------------
   TABLE OF CONTENTS
--------------------------------- */

const sections = [
  { id: "requirements", label: "Requirements" },
  { id: "installation", label: "Installation" },
  { id: "virtual-environment", label: "Virtual Environment (Optional)" },
  { id: "verify-installation", label: "Verify Installation" },
];

/* --------------------------------
   CODE BLOCK
--------------------------------- */

function CodeBlock({ language = "bash", code }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Unable to copy code:", error);
    }
  };

  return (
    <div className="my-7 w-full overflow-hidden rounded-xl border border-[#292929] bg-[#0d0d0d]">

      <div className="flex h-12 items-center justify-between border-b border-[#292929] bg-[#141414] px-5">
        <span className="text-sm text-neutral-400">
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

      <div className="overflow-x-auto py-5">
        <pre className="min-w-max text-[15px] leading-8">
          <code>
            {code.trim().split("\n").map((line, index) => (
              <div key={index} className="flex">
                <span className="w-14 shrink-0 select-none pr-4 text-right text-neutral-600">
                  {index + 1}
                </span>

                <span className="pr-8 text-[#d4d4d4]">
                  {line}
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

/* --------------------------------
   MAIN INSTALLATION PAGE
--------------------------------- */

function Installation() {
  const [activeSection, setActiveSection] = useState("requirements");

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

        .installation-content code:not(pre code) {
          border: 1px solid #303030;
          border-radius: 5px;
          background: #171717;
          padding: 3px 7px;
          color: #91d49b;
          font-size: 0.9em;
        }

        .installation-link {
          transition: all 150ms ease;
        }

        .installation-link:hover {
          color: #91d49b;
        }

        .installation-link-active {
          color: #91d49b !important;
          border-left: 2px solid #91d49b;
          background: rgba(145, 212, 155, 0.08);
        }
      `}</style>

      <div className="grid w-full grid-cols-1 items-start gap-12 px-2 py-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 lg:px-4 xl:gap-14">

        {/* MAIN CONTENT */}

        <main className="installation-content min-w-0 w-full">

          {/* INTRODUCTION */}

          <div className="mb-12">
            <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
              <span>Getting Started</span>
              <span>/</span>
              <span className="text-[#91d49b]">
                Installation
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Installation
            </h1>

            <p className="mt-7 max-w-5xl text-lg leading-9 text-neutral-400">
              Get started with TratrophicAI. Follow this guide
              to install the package and prepare your Python
              environment.
            </p>
          </div>

          {/* REQUIREMENTS */}

          <SectionHeading id="requirements">
            Requirements
          </SectionHeading>

          <Explanation>
            Before installing TratrophicAI, make sure Python
            and pip are available on your system.
          </Explanation>

          <SubHeading>Python Version</SubHeading>

          <Explanation>
            TratrophicAI requires Python 3.9 or newer.
            Check your installed Python version using:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`python --version`}
          />

          <SubHeading>Check pip</SubHeading>

          <Explanation>
            pip is used to install Python packages.
            Check whether pip is available:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`python -m pip --version`}
          />

          <SubHeading>NumPy Dependency</SubHeading>

          <Explanation>
            TratrophicAI uses NumPy for numerical operations.
            NumPy is installed automatically when pip installs
            TratrophicAI and its dependencies.
          </Explanation>

          {/* INSTALLATION */}

          <SectionHeading id="installation">
            Installation
          </SectionHeading>

          <Explanation>
            You can install TratrophicAI directly using pip.
            You do not need to create a virtual environment.
          </Explanation>

          <SubHeading>Install TratrophicAI</SubHeading>

          <Explanation>
            Open your terminal or PowerShell and run:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`python -m pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ tratrophicai==0.1.0`}
          />

          <Explanation>
            This installs TratrophicAI version 0.1.0 from
            TestPyPI. The additional PyPI index allows pip
            to find dependencies such as NumPy.
          </Explanation>

          <Explanation>
            Once installation is complete, TratrophicAI
            is available in the Python environment where
            you installed it.
          </Explanation>

          {/* OPTIONAL VIRTUAL ENVIRONMENT */}

          <SectionHeading id="virtual-environment">
            Virtual Environment (Optional)
          </SectionHeading>

          <Explanation>
            A virtual environment keeps the packages of
            different Python projects separate. This step
            is optional. You can skip it if you want to
            install TratrophicAI directly.
          </Explanation>

          <SubHeading>1. Create a Virtual Environment</SubHeading>

          <CodeBlock
            language="bash"
            code={`python -m venv .venv`}
          />

          <SubHeading>2. Activate the Environment</SubHeading>

          <Explanation>
            Windows PowerShell:
          </Explanation>

          <CodeBlock
            language="powershell"
            code={`.venv\\Scripts\\Activate.ps1`}
          />

          <Explanation>
            Windows Command Prompt:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`.venv\\Scripts\\activate.bat`}
          />

          <SubHeading>3. Install TratrophicAI</SubHeading>

          <Explanation>
            After activating the environment, install
            TratrophicAI using:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`python -m pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ tratrophicai==0.1.0`}
          />

          {/* VERIFY INSTALLATION */}

          <SectionHeading id="verify-installation">
            Verify Installation
          </SectionHeading>

          <Explanation>
            To check whether TratrophicAI has been installed,
            run the following command:
          </Explanation>

          <CodeBlock
            language="bash"
            code={`python -m pip show tratrophicai`}
          />

          <Explanation>
            This command displays information about the
            installed package, including its version and
            installation location.
          </Explanation>

          <Explanation>
            You can also check whether Python can import
            TratrophicAI:
          </Explanation>

          <CodeBlock
            language="python"
            code={`import tratrophicai

print("TratrophicAI installed successfully!")`}
          />

          <Explanation>
            If the program runs without an import error,
            TratrophicAI is ready to use in your current
            Python environment.
          </Explanation>

          {/* FOOTER */}

          <div className="mt-20 border-t border-[#292929] py-10">
            <p className="text-sm text-neutral-500">
              TratrophicAI Documentation
            </p>

            <p className="mt-2 text-sm text-neutral-400">
              Installation · Version 0.1.0
            </p>
          </div>

        </main>

        {/* RIGHT SIDE NAVIGATION */}

        <aside className="sticky top-0 hidden h-fit self-start xl:block">
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
                  className={`installation-link -ml-px border-l-2 px-4 py-3 text-left text-sm ${
                    activeSection === section.id
                      ? "installation-link-active font-medium"
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

export default Installation;
