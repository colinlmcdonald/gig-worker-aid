const sup = [
  {
    route: "/",
    component: "Intro",
    title:
      "The goal of this questionnaire is to help you better understand what unemployment options are best for you."
  },
  {
    route: "/select-state",
    component: "SelectState",
    title: "What state will you be applying for assistance from?",
    changeIsRequired: true,
    sidebar: {
      title: "Selecing A State",
      content: "Some information about how to apply for a state.",
      link: {
        text: "More Information",
        href: "/info/selecting-a-state"
      }
    }
  },
  {
    route: "/employment-status",
    component: "ButtonSelection",
    title: "What is your employment status?",
    dispatchKey: "employmentStatus",
    changeIsRequired: true,
    options: [
      {
        title: "Full-time Employee",
        dispatchValue: "fte",
        next: "/worked-in-california"
      },
      {
        title: "Part-time Employee",
        dispatchValue: "pte",
        next: "/worked-in-california"
      },
      {
        title: "Self-employed",
        dispatchValue: "se",
        next: "/work-hours"
      },
      {
        title: "Independent Contractor",
        dispatchValue: "ic",
        next: "/work-hours"
      },
      {
        title: "I was unable to start a new job due to COVID-19",
        dispatchValue: "nj"
      },
      {
        title: "I'm not sure",
        dispatchValue: "ns",
        next: "/which-tax-documents-submit"
      }
    ]
  },
  {
    route: "/work-hours",
    dispatchKey: "workHoursImpacted",
    title: "Have your work hours or income been impacted by COVID-19?",
    options: [
      {
        title: "Yes",
        dispatchValue: "impacted",
        next: "/dua"
      },
      {
        title: "No",
        dispatchValue: "notImpacted",
        next: "/not-eligible-ui"
      }
    ]
  },
  {
    route: "/dua",
    component: "ButtonSelection",
    description:
      "Due to the recently enacted Disaster Unemployment Assistance (DUA), people who are self-employed and/or independent contractors can qualify for Unemployment Insurance.",
    next: "/employed-through-no-fault"
  },
  {
    route: "/worked-in-california",
    component: "ButtonSelection",
    dispatchKey: "workedInCaliforniaLastEighteen",
    title: "Have you worked in California in the past 18 months?",
    changeIsRequired: true,
    options: [
      {
        title: "Yes",
        dispatchValue: "eligible",
        next: "/employed-through-no-fault"
      },
      {
        title: "No",
        dispatchValue: "notEligible",
        next: "/not-eligible-ui"
      }
    ]
  },
  {
    route: "/employed-through-no-fault",
    component: "ButtonSelection",
    dispatchKey: "employedThroughNoFault",
    title:
      "Are you recently fully or partially unemployed through no fault of your own (this includes if you've been impacted by COVID-19)?",
    changeIsRequired: true,
    options: [
      {
        title: "Yes",
        dispatchValue: "noFault",
        next: "/out-of-work-reasons"
      },
      {
        title: "No",
        dispatchValue: "fault",
        next: ""
      },
      {
        title: "I'm not sure",
        dispatchValue: "unkn",
        next: "/out-of-work-reasons"
      }
    ]
  },
  {
    route: "/out-of-work-reasons",
    component: "ButtonSelection",
    dispatchKey: "outOfWorkReason",
    title: "Have you been kept out of work due to COVID-19 or other reasons?",
    changeIsRequired: true,
    options: [
      {
        title: "My employer has reduced my hours",
        dispatchValue: "reducedHours",
        next: "/work-requirements"
      },
      {
        title: "I've been put on furlough",
        dispatchValue: "furlough",
        next: "/work-requirements"
      },
      {
        title: "I've lost my job",
        dispatchValue: "lostJob",
        next: "/work-requirements"
      },
      {
        title:
          "I'm unable to work to work due to COVID-19 school closures because I don't have childcare",
        dispatchValue: "schoolClosures",
        next: "/work-requirements"
      },
      {
        title:
          "I've had to work remotely, but my work hours or income have not changed",
        dispatchValue: "remoteWork",
        next: "/not-eligible-ui"
      },
      {
        title: "My work has not been impacted at all",
        dispatchValue: "noImpact",
        next: "/not-eligible-ui"
      }
    ]
  },
  {
    route: "/work-requirements",
    component: "ButtonSelection",
    dispatchKey: "workRequirements",
    title: "Do you meet all of these requirements?",
    changeIsRequired: true,
    multiSelect: true,
    verificationCallback: function(state) {
      // TODO - this is wrong and need to make sure that the only option that wasn't selected
      // is the last one (can't remember what it was)
      const { workRequirements, outOfWorkReason } = state;
      if (outOfWorkReason === "furlough") {
        return workRequirements.length === 3
          ? "/income-requirements"
          : "/not-eligible-ui";
      }
      return workRequirements.length === 4
        ? "/income-requirements"
        : "/not-eligible-ui";
    },
    options: [
      {
        title: "Physically able to work",
        dispatchValue: "physicallyAble"
      },
      {
        title: "Available for work",
        dispatchValue: "availableForWork"
      },
      {
        title: "Ready and willing to accept work immediately",
        dispatchValue: "readyAndWilling"
      },
      {
        title: "Actively looking for work",
        dispatchValue: "activelyLooking"
      }
    ]
  },
  {
    route: "/income-calculator",
    component: "IncomeCalculator",
    title: "Great, let's see if you meet the income requirements!",
    changeIsRequired: true,
    sidebar: {
      title: "Income Requirements",
      content: "Here is some content on income requirements"
    }
  },
  {
    route: "/ui-qualification",
    component: "UIQualification",
    title: "Based on our calculations:"
  },
  {
    route: "/alternative-period",
    component: "AlternativePeriod",
    title: "Alternative Period Income",
    changeIsRequired: true
  },
  {
    route: "/not-eligible-ui",
    component: "ButtonSelection",
    dispatchKey: "",
    description:
      "You are not eligible for California Unemployment Insurance. However, if you've worked in another state, you might be eligible to apply for insurance there. \n Let's see if you're eligible for Disability Insurance or Paid Family Leave pertaining to COVID-19. Let's continue!",
    next: "/medical-conditions"
  },
  {
    route: "/medical-conditions",
    component: "ButtonSelection",
    dispatchKey: "medicalCondition",
    title:
      "Which of the following most accurately describes your current situation?",
    multiSelect: true,
    verificationCallback: function(state) {
      const { medicalCondition } = state;
      const eligibleForDisabilityInsurance = medicalCondition.every(
        c => c === "sick" || c === "quarantine"
      );
      const eligibleForPFL = medicalCondition.every(c => c === "familySick");
      const eligibleForDIAndPFL = medicalCondition.every(
        c => c === "sick" || c === "quarantine" || c === "familySick"
      );
      if (eligibleForDisabilityInsurance) {
        return "/eligible-health-di";
      }
      if (eligibleForPFL) {
        return "/eligible-health-pfl";
      }
      if (eligibleForDIAndPFL) {
        return "/eligible-health-di-pfl";
      }
      return "/not-eligible-health";
    },
    options: [
      {
        title:
          "I've been sick and/or have had symptoms of COVID-19 which a medical professional has or can certify",
        dispatchValue: "sick"
      },
      {
        title: "I've been forced to quarantine myself",
        dispatchValue: "quarantine"
      },
      {
        title:
          "I'm taking care of a family member who has been sick with, or currently has symptoms of, COVID-19 and a medical professional can or has certified this",
        dispatchValue: "familySick",
        next: "/eligible-health-pfl"
      },
      {
        title: "This doesn't apply to me!",
        dispatchValue: "ineligible"
      }
    ]
  },
  {
    route: "/eligible-health-di",
    component: "Info",
    description:
      "You're most likely eligible for Disability Insurance in addition to Pandemic Unemployment Assistance ($600 / week). Start your application!",
    terminal: true
  },
  {
    route: "/eligible-health-pfl",
    component: "Info",
    description:
      "You're most likely eligible for Paid Family Leave in addition to Pandemic Unemployment Assistance ($600 / week). Start your application!",
    terminal: true
  },
  {
    route: "/eligible-health-di-pfl",
    component: "Info",
    description:
      "You can only receive assistance from one aid assisstance at a time, but you can apply for them concurrently. For example, if you run out of Paid Family Leave and you cebome sick, you can apply for Disability Insurance.",
    terminal: true
  },
  {
    route: "/not-eligible-health",
    component: "Info",
    description:
      "Ah, sorry! We're not able to determine if you are eligible for Paid Family Leave or Disability Insurance due to COVID-19. If you are sick or caring for a family member, you might be eligible for Disability Insurance or Paid Family Leave at any time.",
    terminal: true
  },
  {
    route: "/which-tax-documents-submit",
    component: "ButtonSelection",
    dispatchKey: "taxDocuments",
    title: "Which tax documents do you submit?",
    changeIsRequired: true,
    options: [
      {
        title: "W2",
        dispatchValue: "w2",
        next: "" // TODO
      },
      {
        title: "1099",
        dispatchValue: "1099",
        next: "" // TODO
      },
      {
        title: "I don't know",
        dispatchValue: "unkn",
        next: "/tax-documents-unknown"
      }
    ]
  },
  {
    route: "/tax-documents-unknown",
    component: "ButtonSelection",
    dispatchKey: "taxDocumentsUnknown",
    title: "Are you?",
    changeIsRequired: true,
    options: [
      {
        title:
          "Startup founder or employee of a start-up AND are paid by the company (i.e. your social security/medicare taxes are witheld",
        dispatchValue: "startupAndCompany",
        next: "" // TODO
      },
      {
        title: "A startup founder, but don't receive payment for your start-up",
        dispatchValue: "startup",
        next: "" // TODO
      },
      {
        title: "A single Member LLC and receive payment from the Member LLC",
        dispatchValue: "memberLlcAndPaid",
        next: "/tax-documents-unknown" // TODO
      },
      {
        title: "A single Member LLC and only receive distributions",
        dispatchValue: "memberLlcAndDistributions",
        next: "" // TODO
      }
    ]
  },
  {
    route: "/"
  }
];

console.log(
  sup
    .map(
      ({ route, title, description }) => `
      Title: ${title}
      Description: ${description}
      Route: ${route}\n
    `
    )
    .join("")
);

export default sup;
