import questions from "./functions/helpers/questions";

const parseAnswer = (answer: string): JSX.Element => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts = answer.split(urlRegex);

  return (
    <>
      {parts.map((part, index) =>
        urlRegex.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline break-words whitespace-normal"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
};

export default function FAQSection() {
  return (
    <>
      <h2 className="text-2xl ml-12 mt-10 mb-3 font-semibold text-gray-800">
        Frequently asked questions
      </h2>
      <div className="bg-white border border-gray-200 divide-y divide-gray-200 rounded-xl mr-12 ml-12 mb-12">
        {questions.map((item, index) => (
          <details key={index} className="p-6 group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h5 className="text-lg font-medium text-gray-900">
                {item.question}
              </h5>

              <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <p className="mt-4 leading-relaxed text-gray-700">
              {parseAnswer(item.answer)}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
