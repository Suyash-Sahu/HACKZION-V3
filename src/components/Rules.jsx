import gsap from "gsap";
import { useRef } from "react";

import AnimatedTitle from "./AnimatedTitle";

const Rules = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  const rules = [
    {
      title: "Preliminary Round Overview",
      content: [
        "This is an online submission round and the first stage of HackZion V3.",
        "Teams must analyze a problem and present a structured solution approach.",
        "Focus is on understanding, design, and planning — not full product development."
      ]
    },
    {
      title: "Domains",
      content: [
        "Cybersecurity",
        "Artificial Intelligence / Machine Learning",
        "Internet of Things (IoT)",
        "Open Innovation"
      ]
    },
    {
      title: "Submission Requirements",
      content: [
        "Teams must create their own domain-based problem statement.",
        "Submit a 5-slide presentation explaining the solution.",
        "Presentation should be clear, structured, and concise."
      ]
    },
    {
      title: "Slide Structure",
      content: [
        "Slide 1: Problem Understanding",
        "Slide 2: Proposed Solution",
        "Slide 3: System Design / Architecture",
        "Slide 4: Technology Stack",
        "Slide 5: Execution & Scalability",
        "Order of slides can be adjusted if needed."
      ]
    },
    {
      title: "Evaluation Criteria",
      content: [
        "Clarity of problem understanding",
        "Effectiveness of the proposed solution",
        "Structure of system design",
        "Relevance of the technology stack"
      ]
    },
    {
      title: "Additional Consideration",
      content: [
        "Teams must submit a GitHub link of their best project.",
        "Used as a tie-breaker to assess technical capability."
      ]
    },
    {
      title: "Final Round Selection",
      content: [
        "Top teams from each domain will be shortlisted.",
        "Selected teams will participate in a 24-hour on-site hackathon."
      ]
    },
    {
      title: "Final Round Overview",
      content: [
        "Problem statements will be given at the event.",
        "Teams will choose one problem to solve.",
        "A working prototype must be built within 24 hours.",
        "Final presentation will be evaluated by judges."
      ]
    },
    {
      title: "Registration",
      content: [
        "Registration fee: Rs. 1000"
      ]
    }
  ];

  return (
    <div id="rules" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        
        <div className="relative size-full">
          <AnimatedTitle
            title="RULES & GUIDELINES"
            containerClass="mb-12 pointer-events-none mix-blend-difference relative z-10"
          />
          
          <div className="max-w-4xl w-full mx-auto px-4">
            <div className="space-y-8">
              {rules.map((rule, index) => (
                <div 
                  key={index}
                  ref={index === 0 ? frameRef : null}
                  onMouseMove={index === 0 ? handleMouseMove : undefined}
                  onMouseLeave={index === 0 ? handleMouseLeave : undefined}
                  onMouseUp={index === 0 ? handleMouseLeave : undefined}
                  onMouseEnter={index === 0 ? handleMouseLeave : undefined}
                  className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    {rule.title}
                  </h3>
                  <ul className="space-y-2">
                    {rule.content.map((item, idx) => (
                      <li key={idx} className="text-blue-50 text-sm md:text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Rules;