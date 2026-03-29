import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StarsBackground from "./StarsBackground";

const DOMAINS = ["Cyber Security", "AIML", "IOT", "Open Innovation"];
const PARTICIPANT_COUNTS = [2, 3, 4];

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzojJXwUexZRER3r-n6Nz-ukCE2uSqyw7Ngyu-encOZTq3NnF89K2xIuHS2resJBlGa/exec";

const stepVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

// --- Extracted outside the Register component so React keeps stable references ---

const FormInput = ({ label, value, onChange, type = "text", placeholder, error, required = true }) => (
  <div className="mb-4">
    <label className="block text-blue-50 font-general text-sm uppercase tracking-wider mb-2">
      {label} {required && <span className="text-violet-300">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`reg-input ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-400 text-xs mt-1 font-general">{error}</p>}
  </div>
);

const FormSelect = ({ label, value, onChange, options, placeholder, error }) => (
  <div className="mb-4">
    <label className="block text-blue-50 font-general text-sm uppercase tracking-wider mb-2">
      {label} <span className="text-violet-300">*</span>
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`reg-input ${error ? "border-red-500" : ""} ${!value ? "text-gray-500" : ""}`}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={typeof opt === "object" ? opt.value : opt} value={typeof opt === "object" ? opt.value : opt}>
          {typeof opt === "object" ? opt.label : opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-400 text-xs mt-1 font-general">{error}</p>}
  </div>
);

const ReviewRow = ({ label, value }) => (
  <div className="flex justify-between py-1 border-b border-white/5">
    <span className="text-blue-50/50 uppercase text-xs">{label}</span>
    <span className="text-blue-75 text-right">{value || "—"}</span>
  </div>
);

// --- Step content components (stable, won't remount on parent re-render) ---

const StepTeamInfo = ({ formData, errors, updateField }) => (
  <>
    <h3 className="font-zentry text-2xl sm:text-3xl font-black text-blue-75 uppercase mb-6">
      Team Information
    </h3>
    <FormInput
      label="Team Name"
      value={formData.teamName}
      onChange={(v) => updateField("teamName", v)}
      placeholder="Enter your team name"
      error={errors.teamName}
    />
    <FormSelect
      label="Domain"
      value={formData.domain}
      onChange={(v) => updateField("domain", v)}
      options={DOMAINS}
      placeholder="Select a domain"
      error={errors.domain}
    />
    <FormSelect
      label="Number of Participants"
      value={formData.participantCount}
      onChange={(v) => updateField("participantCount", v)}
      options={PARTICIPANT_COUNTS.map((c) => ({ value: c, label: `${c} ${c === 1 ? "participant" : "participants"} (including team lead)` }))}
      placeholder="Select team size"
      error={errors.participantCount}
    />
  </>
);

const StepTeamLead = ({ formData, errors, updateTeamLead }) => (
  <>
    <h3 className="font-zentry text-2xl sm:text-3xl font-black text-blue-75 uppercase mb-6">
      Team Lead Details
    </h3>
    <FormInput label="Full Name" value={formData.teamLead.name} onChange={(v) => updateTeamLead("name", v)} placeholder="Enter full name" error={errors["teamLead.name"]} />
    <FormInput label="College" value={formData.teamLead.college} onChange={(v) => updateTeamLead("college", v)} placeholder="Enter college name" error={errors["teamLead.college"]} />
    <FormInput label="USN / Registration Number" value={formData.teamLead.usn} onChange={(v) => updateTeamLead("usn", v)} placeholder="Enter USN or registration number" error={errors["teamLead.usn"]} />
    <FormInput label="Email" type="email" value={formData.teamLead.email} onChange={(v) => updateTeamLead("email", v)} placeholder="Enter email address" error={errors["teamLead.email"]} />
    <FormInput label="Phone Number" type="tel" value={formData.teamLead.phone} onChange={(v) => updateTeamLead("phone", v)} placeholder="Enter 10-digit phone number" error={errors["teamLead.phone"]} />
  </>
);

const StepTeamMembers = ({ formData, errors, updateMember }) => (
  <>
    <h3 className="font-zentry text-2xl sm:text-3xl font-black text-blue-75 uppercase mb-6">
      Team Members
    </h3>
    {formData.members.map((member, i) => (
      <div key={i} className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
        <h4 className="text-violet-300 font-general text-sm uppercase tracking-wider mb-4 font-bold">
          Member {i + 1}
        </h4>
        <FormInput label="Full Name" value={member.name} onChange={(v) => updateMember(i, "name", v)} placeholder="Enter full name" error={errors[`member.${i}.name`]} />
        <FormInput label="USN / Registration Number" value={member.usn} onChange={(v) => updateMember(i, "usn", v)} placeholder="Enter USN" error={errors[`member.${i}.usn`]} />
        <FormInput label="Phone Number" type="tel" value={member.phone} onChange={(v) => updateMember(i, "phone", v)} placeholder="Enter 10-digit phone number" error={errors[`member.${i}.phone`]} />
        <FormInput label="Email" type="email" value={member.email} onChange={(v) => updateMember(i, "email", v)} placeholder="Enter email address" error={errors[`member.${i}.email`]} />
      </div>
    ))}
  </>
);

const StepPPTReview = ({ formData, errors, updateField, submitStatus, submitError }) => (
  <>
    <h3 className="font-zentry text-2xl sm:text-3xl font-black text-blue-75 uppercase mb-6">
      PPT & Review
    </h3>
    <FormInput
      label="PPT Template Link"
      value={formData.pptLink}
      onChange={(v) => updateField("pptLink", v)}
      placeholder="Paste Google Drive / Dropbox link"
      error={errors.pptLink}
    />
    <p className="text-blue-50/50 text-xs font-general mb-6">
  Upload your PPT to Google Drive or Dropbox and paste the shareable link above. 
  <br />
  <span className="text-violet-300">
    Please ensure that the link access is set to "Anyone with the link can view" before submission.
  </span>
</p>
    <FormInput
      label="Team Lead GitHub Link"
      value={formData.teamLeadGithub}
      onChange={(v) => updateField("teamLeadGithub", v)}
      placeholder="https://github.com/username"
      error={errors.teamLeadGithub}
    />
    <FormInput
      label="Best Project GitHub Link"
      value={formData.bestProjectGithub}
      onChange={(v) => updateField("bestProjectGithub", v)}
      placeholder="https://github.com/username/project"
      error={errors.bestProjectGithub}
    />

    {/* Review Summary */}
    <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <h4 className="text-violet-300 font-general text-sm uppercase tracking-wider mb-4 font-bold">
        Review Your Details
      </h4>
      <div className="space-y-2 text-sm font-general">
        <ReviewRow label="Team" value={formData.teamName} />
        <ReviewRow label="Domain" value={formData.domain} />
        <ReviewRow label="Members" value={formData.participantCount} />
        <ReviewRow label="Lead" value={formData.teamLead.name} />
        <ReviewRow label="College" value={formData.teamLead.college} />
        <ReviewRow label="Lead Email" value={formData.teamLead.email} />
        <ReviewRow label="Lead Phone" value={formData.teamLead.phone} />
        {formData.members.map((m, i) => (
          <ReviewRow key={i} label={`Member ${i + 1}`} value={`${m.name} (${m.email})`} />
        ))}
      </div>
    </div>

    {submitStatus === "error" && submitError && (
      <div className="mt-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10">
        <p className="text-red-400 text-sm font-general text-center">
          {submitError}
        </p>
      </div>
    )}
  </>
);

// --- Main component ---

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    teamName: "",
    domain: "",
    participantCount: "",
    pptLink: "",
    teamLeadGithub: "",
    bestProjectGithub: "",
    teamLead: {
      name: "",
      college: "",
      usn: "",
      email: "",
      phone: "",
    },
    members: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  useEffect(() => {
    const count = parseInt(formData.participantCount);
    if (count > 1) {
      const memberCount = count - 1;
      const currentMembers = formData.members;
      const newMembers = Array.from({ length: memberCount }, (_, i) => ({
        name: currentMembers[i]?.name || "",
        usn: currentMembers[i]?.usn || "",
        phone: currentMembers[i]?.phone || "",
        email: currentMembers[i]?.email || "",
      }));
      setFormData((prev) => ({ ...prev, members: newMembers }));
    } else if (count === 1) {
      setFormData((prev) => ({ ...prev, members: [] }));
    }
  }, [formData.participantCount]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const updateTeamLead = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      teamLead: { ...prev.teamLead, [field]: value },
    }));
    if (errors[`teamLead.${field}`])
      setErrors((prev) => ({ ...prev, [`teamLead.${field}`]: null }));
  };

  const updateMember = (index, field, value) => {
    setFormData((prev) => {
      const newMembers = [...prev.members];
      newMembers[index] = { ...newMembers[index], [field]: value };
      return { ...prev, members: newMembers };
    });
    if (errors[`member.${index}.${field}`])
      setErrors((prev) => ({ ...prev, [`member.${index}.${field}`]: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
      if (!formData.domain) newErrors.domain = "Please select a domain";
      if (!formData.participantCount) newErrors.participantCount = "Please select participant count";
    }

    if (step === 1) {
      if (!formData.teamLead.name.trim()) newErrors["teamLead.name"] = "Name is required";
      if (!formData.teamLead.college.trim()) newErrors["teamLead.college"] = "College is required";
      if (!formData.teamLead.usn.trim()) newErrors["teamLead.usn"] = "USN/Reg number is required";
      if (!formData.teamLead.email.trim()) newErrors["teamLead.email"] = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.teamLead.email))
        newErrors["teamLead.email"] = "Invalid email format";
      if (!formData.teamLead.phone.trim()) newErrors["teamLead.phone"] = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.teamLead.phone.replace(/\s/g, "")))
        newErrors["teamLead.phone"] = "Enter a valid 10-digit phone number";
    }

    if (step === 2) {
      formData.members.forEach((member, i) => {
        if (!member.name.trim()) newErrors[`member.${i}.name`] = "Name is required";
        if (!member.usn.trim()) newErrors[`member.${i}.usn`] = "USN is required";
        if (!member.phone.trim()) newErrors[`member.${i}.phone`] = "Phone is required";
        else if (!/^\d{10}$/.test(member.phone.replace(/\s/g, "")))
          newErrors[`member.${i}.phone`] = "Enter a valid 10-digit number";
        if (!member.email.trim()) newErrors[`member.${i}.email`] = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email))
          newErrors[`member.${i}.email`] = "Invalid email format";
      });
    }

    if (step === 3) {
      if (!formData.pptLink.trim()) newErrors.pptLink = "PPT link is required";
      if (!formData.teamLeadGithub.trim()) newErrors.teamLeadGithub = "Team lead GitHub link is required";
      if (!formData.bestProjectGithub.trim()) newErrors.bestProjectGithub = "Best project GitHub link is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSteps = () => {
    const count = parseInt(formData.participantCount);
    if (count > 1) {
      return ["Team Info", "Team Lead", "Team Members", "PPT & Submit"];
    }
    return ["Team Info", "Team Lead", "PPT & Submit"];
  };

  const steps = getSteps();
  const totalSteps = steps.length;

  const getLogicalStep = (visualStep) => {
    const count = parseInt(formData.participantCount);
    if (count > 1) return visualStep;
    if (visualStep === 2) return 3;
    return visualStep;
  };

  const nextStep = () => {
    const logical = getLogicalStep(currentStep);
    if (validateStep(logical)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    const logical = getLogicalStep(currentStep);
    if (!validateStep(logical)) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitError("");

    const payload = {
      teamName: formData.teamName,
      domain: formData.domain,
      participantCount: formData.participantCount,
      pptLink: formData.pptLink,
      teamLeadGithub: formData.teamLeadGithub,
      bestProjectGithub: formData.bestProjectGithub,
      teamLeadName: formData.teamLead.name,
      teamLeadCollege: formData.teamLead.college,
      teamLeadUSN: formData.teamLead.usn,
      teamLeadEmail: formData.teamLead.email,
      teamLeadPhone: formData.teamLead.phone,
      members: formData.members,
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === "success") {
        setSubmitStatus("success");
      } else if (result.duplicateUSNs) {
        console.error("Duplicate USNs:", result.duplicateUSNs);
        setSubmitError(`USN(s) already registered: ${result.duplicateUSNs.join(", ")}`);
        setSubmitStatus("error");
      } else {
        console.error("Submission failed:", result.message);
        setSubmitError("Submission failed. Please try again.");
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Submission failed. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;
  const logicalStep = getLogicalStep(currentStep);

  // Success screen
  if (submitStatus === "success") {
    return (
      <StarsBackground>
        <div className="min-h-screen flex-center flex-col px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="reg-card text-center max-w-md w-full"
          >
            <div className="text-6xl mb-4">&#x1F680;</div>
            <h2 className="font-zentry text-3xl sm:text-4xl font-black text-blue-75 uppercase mb-4">
              Registered!
            </h2>
            <p className="text-blue-50/70 font-general text-sm mb-6">
              Your team <span className="text-violet-300 font-bold">{formData.teamName}</span> has been
              successfully registered for HACKZION V3. We'll send a confirmation to{" "}
              <span className="text-violet-300">{formData.teamLead.email}</span>.
              <div className="mt-4 mb-6">
  <p className="text-blue-50/60 text-xs font-general mb-3">
    Follow our Instagram pages to stay updated
  </p>

  <div className="flex justify-center gap-4">
    <a
      href="https://www.instagram.com/club_omnitrix?igsh=MXMzOXExOG0xNWxmeA=="
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-pink-400"
      >
        <path d="M7.75 2h8.5C19.99 2 22 4.01 22 7.75v8.5C22 19.99 19.99 22 16.25 22h-8.5C4.01 22 2 19.99 2 16.25v-8.5C2 4.01 4.01 2 7.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z"/>
      </svg>
      <span className="text-xs font-general">CLUB_OMNITRIX</span>
    </a>

    <a
      href="https://www.instagram.com/acsess_amcec?igsh=MXYwamdqOHNudzh5Mg=="
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-pink-400"
      >
        <path d="M7.75 2h8.5C19.99 2 22 4.01 22 7.75v8.5C22 19.99 19.99 22 16.25 22h-8.5C4.01 22 2 19.99 2 16.25v-8.5C2 4.01 4.01 2 7.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.75-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z"/>
      </svg>
      <span className="text-xs font-general">ACSESS_AMCEC</span>
    </a>
  </div>
</div>
            </p>
            <button onClick={() => navigate("/")} className="reg-btn w-full">
              Back to Home
            </button>
          </motion.div>
        </div>
      </StarsBackground>
    );
  }

  // Step indicator
  const StepIndicator = (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((stepLabel, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i < currentStep
                  ? "bg-violet-300 text-white"
                  : i === currentStep
                  ? "bg-violet-300/20 border-2 border-violet-300 text-violet-300"
                  : "bg-white/5 border border-white/20 text-gray-500"
              }`}
            >
              {i < currentStep ? "\u2713" : i + 1}
            </div>
            <span
              className={`text-[10px] sm:text-xs mt-1 font-general uppercase tracking-wider whitespace-nowrap ${
                i <= currentStep ? "text-violet-300" : "text-gray-600"
              }`}
            >
              {stepLabel}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 sm:w-12 h-px mt-[-16px] transition-colors duration-300 ${
                i < currentStep ? "bg-violet-300" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Render the correct step content (no motion wrapper — animation is on the outer div only)
  const renderStepContent = () => {
    if (logicalStep === 0) return <StepTeamInfo formData={formData} errors={errors} updateField={updateField} />;
    if (logicalStep === 1) return <StepTeamLead formData={formData} errors={errors} updateTeamLead={updateTeamLead} />;
    if (logicalStep === 2) return <StepTeamMembers formData={formData} errors={errors} updateMember={updateMember} />;
    if (logicalStep === 3) return <StepPPTReview formData={formData} errors={errors} updateField={updateField} submitStatus={submitStatus} submitError={submitError} />;
  };

  return (
    <StarsBackground>
      <div className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="w-full max-w-xl mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-blue-50/50 hover:text-blue-50 font-general text-sm uppercase tracking-wider transition-colors mb-4 flex items-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <img
              src="/img/hackzion logo.png"
              alt="Hackzion Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            />
            <div>
              <h1 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-blue-75 uppercase">
                Register
              </h1>
              <p className="text-blue-50/50 font-general text-sm mt-2">
                Join HACKZION V3 — fill in your team details below.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="reg-card w-full max-w-xl" ref={formRef}>
          {StepIndicator}

          {/* AnimatePresence only triggers on step change, not on typing */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 gap-4">
            {currentStep > 0 ? (
              <button onClick={prevStep} className="reg-btn-outline flex-1">
                Previous
              </button>
            ) : (
              <div />
            )}
            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="reg-btn flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Registration"
                )}
              </button>
            ) : (
              <button onClick={nextStep} className="reg-btn flex-1">
                Next
              </button>
            )}
          </div>
          
          {/* Brochure reminder */}
          {isLastStep && (
            <div className="mt-6 p-4 rounded-xl border border-violet-300/30 bg-violet-300/10">
              <div className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet-300 flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div className="flex-1">
                  <p className="text-violet-300 text-sm font-general font-bold uppercase tracking-wider mb-2">
                    Read the Brochure Before Submitting
                  </p>
                  <p className="text-blue-50/70 text-xs font-general mb-3">
                    Please download and read the brochure carefully to understand all the details about HACKZION V3 before submitting your registration.
                  </p>
                  <a
                    href="/pdf/brochure.pdf"
                    download="HackZion-V3-Brochure"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-300/20 border border-violet-300/50 rounded-lg hover:bg-violet-300/30 transition-all duration-200 cursor-pointer group text-violet-300 text-xs font-general uppercase tracking-wider font-bold"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:scale-110 transition-transform"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Brochure
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StarsBackground>
  );
};

export default Register;
