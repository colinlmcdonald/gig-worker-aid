export default [
  {
    route: "/",
    component: "Intro",
    description:
      "The goal of this questionnaire is to help you better understand what unemployment options are best for you."
  },
  {
    route: "/select-state",
    component: "SelectState",
    description: "What state will you be applying for assistance from?",
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
    route: "/select-type",
    component: "SelectAid",
    description: "Which category do you fall in?",
    changeIsRequired: true,
    sidebar: {
      title: "Select Aid Category",
      contents: [
        {
          title: "Full-time Employment",
          content:
            "Commodo nulla facilisi nullam vehicula ipsum a arcu. Semper feugiat nibh sed pulvinar proin gravida. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Morbi quis commodo odio aenean sed adipiscing diam donec. "
        },
        {
          title: "Self-employed",
          content:
            "Commodo nulla facilisi nullam vehicula ipsum a arcu. Semper feugiat nibh sed pulvinar proin gravida. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Morbi quis commodo odio aenean sed adipiscing diam donec. "
        },
        {
          title: "Part-time Employment",
          content:
            "Commodo nulla facilisi nullam vehicula ipsum a arcu. Semper feugiat nibh sed pulvinar proin gravida. Nec feugiat in fermentum posuere urna nec tincidunt praesent. Morbi quis commodo odio aenean sed adipiscing diam donec. "
        }
      ]
    },
    routes: [
      {
        route: "/fte",
        component: "FullTimeEmployment",
        description: "To determine your eligibility, please enter your salary",
        routes: [
          {
            route: "/ui-calculation",
            component: "UICalculation",
            description: "Based on our calculations you will make:"
          }
        ]
      },
      {
        route: "/se",
        component: "SelfEmployed"
      },
      {
        route: "/pte",
        component: "PartTimeEmployment",
        sidebar: {
          title: "Base Period Income",
          content:
            "Your Base Period is a 4 quarter time frame that skips the most recently completed quarter. For example, if the current month is April 2020, to calculate your base period you would skip the most recently completed quarter (Q1 of 2020) and look at the previous 4 quarters (Q1 - Q4 of 2019)."
        },
        routes: [
          {
            route: "/ui-qualification",
            component: "UIQualification",
            description: "Based on our calculations:",
            routes: [
              {
                route: "/alternative-period",
                component: "AlternativePeriod",
                description: "Alternative Period Income",
                routes: [
                  {
                    route: "/ui-qualification",
                    component: "UIQualification",
                    description: "Based on our calculations:"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    route: "/"
  }
];
