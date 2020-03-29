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
    title: "What kind of employee are you (pre-COVID outbreak)?",
    dispatchKey: "employmentStatus",
    changeIsRequired: true,
    options: [
      {
        title: "Full-time",
        dispatchValue: "fte",
        next: "/worked-in-california"
      },
      {
        title: "Part-time",
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
        title: "I'm not sure!",
        dispatchValue: "ns",
        next: "/which-tax-documents-submit"
      }
    ]
  },
  {
    route: "/work-hours",
    dispatchKey: "workHoursImpacted",
    component: "ButtonSelection",
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
      "Are you recently fully or partially unemployed through no fault of our own or due to the COVID-19 outbreak?",
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
        next: "/not-eligible-ui"
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
    title: "Has your work been impacted by COVID-19 outbreak or otherwise?",
    changeIsRequired: true,
    options: [
      {
        title: "Hours are reduced",
        dispatchValue: "reducedHours",
        next: "/work-requirements"
      },
      {
        title: "Furloughed (mandatory time-off)",
        dispatchValue: "furlough",
        next: "/work-requirements"
      },
      {
        title: "Lost my job",
        dispatchValue: "lostJob",
        next: "/work-requirements"
      },
      {
        title: "Taking care of kids due to school closures",
        dispatchValue: "schoolClosures",
        next: "/work-requirements"
      },
      {
        title: "Remote work, but no other impact",
        dispatchValue: "remoteWork",
        next: "/not-eligible-ui"
      },
      {
        title: "Not really, no",
        dispatchValue: "noImpact",
        next: "/not-eligible-ui"
      }
    ]
  },
  {
    route: "/work-requirements",
    component: "ButtonSelection",
    dispatchKey: "workRequirements",
    title: "Could you or are you doing the following for work?",
    changeIsRequired: true,
    multiSelect: true,
    verificationCallback: function(state) {
      // TODO - this is wrong and need to make sure that the only option that wasn't selected
      // is the last one (can't remember what it was)
      const { workRequirements, outOfWorkReason } = state;
      if (outOfWorkReason === "furlough") {
        return workRequirements.length === 3
          ? "/weekly-benefits-amount"
          : "/not-eligible-ui";
      }
      return workRequirements.length === 4
        ? "/weekly-benefits-amount"
        : "/not-eligible-ui";
    },
    options: [
      {
        title: "Physically able",
        dispatchValue: "physicallyAble"
      },
      {
        title: "Available",
        dispatchValue: "availableForWork"
      },
      {
        title: "Accept immediately",
        dispatchValue: "readyAndWilling"
      },
      {
        title: "Actively looking for work",
        dispatchValue: "activelyLooking"
      }
    ]
  },
  {
    route: "/weekly-benefits-amount",
    component: "Info",
    title: "Calculating Your Benefits - Weekly Benefits Amount (WBA)",
    description: [
      "California's WBA ranges from $40 to $450. Through the funds authorized by Congress all WBAs will increase by $600 regardless of whether or not you were affected by COVID-19.",
      "Your WBA is calculated using the Standard or Alternative Base Period."
    ],
    next: "/standard-base-period-info"
  },
  {
    route: "/standard-base-period-info",
    component: "Info",
    title: "Calculating Your Benefits - Standard Base Period",
    description: [
      "The Standard Base Period is the previous 4 quarters, skipping the most recently completed one. ",
      "For example, if the month is April 2020, to calculate your Standard Base Period you would skip the previous quarter (Q1 of 2020) and use the 4 quarters prior to that (Q1 - Q4 2019)."
    ],
    next: "/alternative-base-period-info"
  },
  {
    route: "/alternative-base-period-info",
    component: "Info",
    title: "Calculating Your Benefits - Alternate Base Period",
    description: [
      "The Alternate Base Period is just like the Standard Base Period, except you do not skip the most previously completed quarter. ",
      "Using the previous example, if the month is April 2020, the Alternate Base Period would include the previous 4 quarters to that (Q1 2020, Q2 - Q4 2019)."
    ],
    next: "/income-calculator-1"
  },
  {
    route: "/income-calculator-1",
    component: "IncomeCalculator",
    title:
      "Let's see if you meet the income requirements for Unemployment Insurance",
    changeIsRequired: true,
    props: { next: "1" },
    next: "/income-calculator-2"
  },
  {
    route: "/income-calculator-2",
    component: "IncomeCalculator",
    title:
      "Let's see if you meet the income requirements for Unemployment Insurance",
    changeIsRequired: true,
    props: { next: "2" },
    next: "/income-calculator-3"
  },
  {
    route: "/income-calculator-3",
    component: "IncomeCalculator",
    title:
      "Let's see if you meet the income requirements for Unemployment Insurance",
    changeIsRequired: true,
    props: { next: "3" },
    next: "/income-calculator-4"
  },
  {
    route: "/income-calculator-4",
    component: "IncomeCalculator",
    title:
      "Let's see if you meet the income requirements for Unemployment Insurance",
    changeIsRequired: true,
    props: { next: "4" },
    next: "/ui-qualification"
  },
  {
    route: "/alternative-income-calculator-1",
    component: "AlternativePeriod",
    title: "Alternative Period Income",
    changeIsRequired: true,
    props: { next: "1" },
    next: "/ui-qualification"
  },
  {
    route: "/ui-qualification",
    component: "UIQualification",
    title: "Ok! Here's what we've calcuated...",
    terminal: function(state) {
      return state.qualifiedForUI;
    }
  },
  {
    route: "/alternative-period",
    changeIsRequired: true
  },
  {
    route: "/not-eligible-ui",
    component: "Info",
    dispatchKey: "",
    description: [
      "Ah, bummer. You're likely not eligible for California Unemployment Insurance. If you've worked in another state, you could apply there. If you think we made an error, you can always apply at edd.ca.gov. ",
      "If you've been impacted by the COVID-19 outbreak, continue with the quiz to discover other benefit programs!"
    ],
    next: "/medical-conditions"
  },
  {
    route: "/medical-conditions",
    component: "ButtonSelection",
    dispatchKey: "medicalCondition",
    title: "Which of the following has happened to you because of COVID-19?",
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
        title: "Tested positive or had symptoms",
        dispatchValue: "sick"
      },
      {
        title: "Required to quarantine",
        dispatchValue: "quarantine"
      },
      {
        title: "Caring for someone who's sick or has symptoms",
        dispatchValue: "familySick",
        next: "/eligible-health-pfl"
      },
      {
        title: "None of the above!",
        dispatchValue: "ineligible"
      }
    ]
  },
  {
    route: "/eligible-health-di",
    component: "Info",
    description: [
      "You are likely elligible for Disability Insurance in addition to Pandemic Unemployment Assistance ($600/week).",
      "To learn more and get instructions on how to sign up, check out our: "
    ],
    link: {
      href:
        "https://docs.google.com/document/d/17mQjm7Ddtf2CzXnnJFOMzDHTm7CtYTQRLP7DXXnMnvc/edit?usp=sharing",
      text: "Disability Insurance Guide"
    },
    terminal: true
  },
  {
    route: "/eligible-health-pfl",
    component: "Info",
    description: [
      "You are likely elligible for Paid Family Leave in addition to Pandemic Unemployment Assistance ($600/week).",
      "To learn more and get instructions on how to sign up, check out our: "
    ],
    link: {
      href:
        "https://docs.google.com/document/d/1vEL8ECuYCUAFWOnIKUtJkyB4_qp9SBtqwqV3AbpYhuw/edit?usp=sharing",
      text: "Paid Family Leave Guide"
    },
    terminal: true
  },
  {
    route: "/eligible-health-di-pfl",
    component: "Info",
    description:
      "To learn more about how to sign up for PFL and DI Benefits, check out our guides on each:",
    terminal: true,
    links: [
      {
        href:
          "https://docs.google.com/document/d/1vEL8ECuYCUAFWOnIKUtJkyB4_qp9SBtqwqV3AbpYhuw/edit?usp=sharing",
        text: "Paid Family Leave Guide"
      },
      {
        href:
          "https://docs.google.com/document/d/17mQjm7Ddtf2CzXnnJFOMzDHTm7CtYTQRLP7DXXnMnvc/edit?usp=sharing",
        text: "Disability Insurance Guide"
      }
    ]
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
    title: "Which tax form(s) will you file for 2019?",
    changeIsRequired: true,
    multiSelect: true,
    verificationCallback: function(state) {
      const { taxDocuments } = state;
      if (taxDocuments.find(d => d === "unkn")) {
        return "/tax-documents-unknown";
      } else {
        return "/worked-in-california";
      }
    },
    options: [
      {
        title: "W2",
        dispatchValue: "w2"
      },
      {
        title: "1099",
        dispatchValue: "1099"
      },
      {
        title: "I don't know",
        dispatchValue: "unkn"
      }
    ]
  },
  {
    route: "/tax-documents-unknown",
    component: "ButtonSelection",
    dispatchKey: "taxDocumentsUnknown",
    title: "Who pays you?",
    changeIsRequired: true,
    options: [
      {
        title: "A company (my taxes are witheld)",
        dispatchValue: "startupAndCompany",
        next: "/worked-in-california"
      },
      {
        title: "A single member LLC or sole proprietorship",
        dispatchValue: "startup",
        next: "/worked-in-california"
      },
      {
        title: "I don't take a salary from my company",
        dispatchValue: "memberLlcAndPaid",
        next: "/not-eligible-ui"
      },
      {
        title: "I lost my job before I started",
        dispatchValue: "lostJob",
        next: "/worked-in-california"
      }
    ]
  },
  {
    route: "/"
  }
];

// console.log(
//   sup
//     .map(
//       ({ route, title, description }) => `
//       Title: ${title}
//       Description: ${description}
//       Route: ${route}\n
//     `
//     )
//     .join("")
// );

export default sup;
