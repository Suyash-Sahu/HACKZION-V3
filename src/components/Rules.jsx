import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
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
      title: "Team Formation",
      content: [
        "Each team must consist of 2–4 members.",
        "Participants can be part of only one team.",
        "Cross-college teams are not allowed."
      ]
    },
    {
      title: "Registration",
      content: [
        "All participants must complete registration before the deadline.",
        "Valid college ID is mandatory during check-in.",
        "No spot registrations."
      ]
    },
    {
      title: "Code of Conduct",
      content: [
        "Maintain professional and respectful behavior at all times.",
        "Any form of harassment, discrimination, or misconduct will lead to immediate disqualification.",
        "Follow venue rules and organizer instructions strictly."
      ]
    },
    {
      title: "Project Guidelines",
      content: [
        "Projects must be developed during the hackathon duration only.",
        "Plagiarism or use of fully pre-developed projects will result in disqualification."
      ]
    },
    {
      title: "Submission Rules",
      content: [
        "All teams must submit:",
        "• Source code (via GitHub)",
        "• PPT/demo presentation",
        "• Project description document",
        "Late submissions will not be accepted."
      ]
    },
    {
      title: "Disqualification",
      content: [
        "Any violation of rules",
        "Use of unfair means",
        "Misbehavior or damage to property"
      ]
    },
    {
      title: "General Guidelines",
      content: [
        "Participants must carry their own laptops and chargers.",
        "The decision of judges will be final and binding."
      ]
    }
  ];

  return (
    <div id="rules" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        
        <div className="relative size-full">
          <AnimatedTitle
            title="RULES & REGULATIONS"
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
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">{rule.title}</h3>
                  <ul className="space-y-2">
                    {rule.content.map((item, idx) => (
                      <li key={idx} className="text-blue-50 text-sm md:text-base">{item}</li>
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