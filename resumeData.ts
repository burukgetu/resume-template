
export const cleanText = (text: string) => {
  return text.replace(/[^a-zA-Z0-9 ]/g, ' ');
}
export type Experience = {
  Title: string,
  Company: string,
  StartDate: string,
  EndDate?: string,
  Description: string,
  Location?: string;
}
export type Education = {
  School: string,
  Degree: string,
  FieldOfStudy: string,
  Description: string,
  GraduationDate: string,
  Grade: string,
  Location?: string;
}

export type Project = {
  Title: string,
  Date: string,
  Description: string,
  Link: string,

}
export interface PersonalInfo {
  Name?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
}
export type Introduction = {
  Title: string;
  Website?: string;
  LinkedIn?: string;
  Github?: string;
  About?: string;
}

export type Skill = {
  Name: string,
  Category?: string;
}


export type OptionalSectionGeneric = {
  Name: string;
  Details: string;
  Date: string;
}

export type Certification = {
  Name: string;
  IssuingOrganization: string;
  DateObtained: string;
  ExpirationDate?: string;
}

export type License = {
  Name: string;
  IssuingOrganization: string;
  DateObtained: string;
  ExpirationDate?: string;
}

export type Publication = {
  Title: string;
  CoAuthors?: string;
  JournalName?: string;
  PublicationDate: string;
}

export type Presentation = {
  Title: string;
  ConferenceName: string;
  Date: string;
  Location: string;
}

export type Patent = {
  Title: string;
  PatentNumber: string;
  DateFiledGranted: string;
  Description: string;
  CoInventors?: string;
}

export type ProfessionalAffiliation = {
  OrganizationName: string;
  RoleTitle: string;
  DatesOfMembership: string;
}

export type Award = {
  Name: string;
  IssuingOrganization: string;
  Date: string;
}[];

export type Honor = {
  Name: string;
  IssuingOrganization: string;
  Date: string;
}


export type Language = {
  Language: string;
  ProficiencyLevel: string;
}
export type Skills = {
  [key:string ]: string[];
}

export type ResumeSchema = {
  Title?: string,
  LastUpdated?: string,
  PersonalInfo?: PersonalInfo,
  Objective?: string,
  Introduction?: Introduction,
  Experience?: Experience[],
  Education?: Education[],
  Projects?: Project[],
  Skills?: Skills,
  OptionalSection?: OptionalSection,
  OptionalStringSection?: OptionalStringSection,


}




export type OptionalSection = Record<string, OptionalSectionGeneric[]> & {
  // optional sections
  Certifications?: OptionalSectionGeneric[],
  Licenses?: OptionalSectionGeneric[],
  Publications?: OptionalSectionGeneric[],
  Presentations?: OptionalSectionGeneric[],
  Patents?: OptionalSectionGeneric[],
  ProfessionalAffiliations?: OptionalSectionGeneric[],
  VolunteerExperience?: OptionalSectionGeneric[];
  Awards?: OptionalSectionGeneric[],
  Honors?: OptionalSectionGeneric[],

}
export type OptionalStringSection = {
  Languages?: string[],
  Interests?: string[];
  Hobbies?: string[];
  References?: string[];
  Workshops?: string[];
  Seminars?: string[];
  Courses?: string[];
}



export const DefaultResumeData: ResumeSchema = {
  PersonalInfo: {
    Name: "John Doe",
    Email: "john.doe@example.com",
    Phone: "123-456-7890",
    Address: "1234 Elm Street, Springfield, USA",
  },
  Objective: "To secure a challenging position in a reputable organization to expand my learnings, knowledge, and skills.",
  Introduction: {
    Title: "Senior Software Engineer",
    Website: "https://johndoe.dev",
    LinkedIn: "https://linkedin.com/in/johndoe",
    Github: "https://github.com/johndoe",
    About: "A highly skilled software engineer with over 10 years of experience in developing scalable web applications.",
  },
  Experience: [
    {
      Title: "Lead Developer",
      Company: "Tech Solutions Inc.",
      StartDate: "Jan 2019",
      EndDate: "Present",
      Description: "Led a team of developers to create an innovative AI-driven platform that increased user engagement by 50%.",
      Location: "San Francisco, CA",
    },
    {
      Title: "Software Engineer",
      Company: "Innovative Apps",
      StartDate: "Jan 2015",
      EndDate: "Dec 2018",
      Description: "Developed and maintained a suite of mobile applications used by over 1 million users worldwide.",
      Location: "Boston, MA",
    },
  ],
  Education: [
    {
      School: "University of Technology",
      Degree: "Bachelor of Science",
      FieldOfStudy: "Computer Science",
      Description: "Focused on software engineering and artificial intelligence.",
      GraduationDate: "May 2014",
      Grade: "3.8 GPA",
      Location: "Boston, MA",
    },
  ],
  Projects: [
    {
      Title: "AI Chatbot Platform",
      Date: "2021",
      Description: "Developed an AI-based chatbot platform used by e-commerce websites to automate customer support.",
      Link: "https://github.com/johndoe/ai-chatbot",
    },
  ],
  Skills: {
    "Frontend":[ "JavaScript", "React"] ,
    "Uncategorized": ["Problem solving"] ,
    "Backend": ["Machine Learning", "Python"]
 },
  OptionalSection: {
    Certifications: [
      {
        Name: "Certified Kubernetes Administrator",
        Details: "The Linux Foundation",
        Date: "March 2020",
      },
    ],
    Licenses: [
      {
        Name: "Professional Engineer (PE) License",
        Details: "National Council of Examiners for Engineering and Surveying (NCEES)",
        Date: "March 2018",
      },
    ],
    Publications: [
      {
        Name: "Scaling AI in Production",
        Details: "Journal of AI Research, Coauthors: Jane Smith, Bob Johnson",
        Date: "June 2020",
      },
    ],
    Presentations: [
      {
        Name: "Building Scalable Microservices",
        Details: "Tech Conference 2022",
        Date: "October 2022",
      },
    ],
    Patents: [
      {
        Name: "Automated AI Model Tuning System",
        Details: " Patent numberL: US12345678B2, A system for automated tuning of AI models to optimize performance based on dynamic data.",
        Date: "September 2021",
      },
    ],
    ProfessionalAffiliations: [
      {
        Name: "Association for Computing Machinery",
        Details: "Member",
        Date: "2014 - Present",
      },
    ],
    VolunteerExperience: [
      {
        Name: "Coding Mentor",
        Details: "Mentored students in Python programming and guided them through projects at Code for Good",
        Date: "2020 - 2022",
      },
    ],
    Awards: [
      {
        Name: "Employee of the Year",
        Details: "Tech Solutions Inc.",
        Date: "December 2020",
      },
    ],
    Honors: [
      {
        Name: "Top 10 Under 30 Innovators",
        Details: "Tech Innovators Magazine",
        Date: "June 2021"
      }
    ],
  },
  OptionalStringSection: {
    Languages: [
      "English",
      "Spanish",
    ],
    // Hobbies: ["Hiking", "Photography"],
    Interests: [
      "Artificial Intelligence and Machine Learning",
      "Data Privacy and Cybersecurity",
      "Blockchain Technology",
      "Open Source Software Development",
    ],
    References: [
      "Available upon request."
    ],
    // ProfessionalDevelopment: [
    //   {
    //     Workshops: "Advanced React Workshop",
    //     Seminars: "AI in Healthcare",
    //     Courses: "Full-Stack Web Development",
    //   },
    // ],
  }
}


export const EmptyResumeData: ResumeSchema = {
  PersonalInfo: {
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
  },
  Objective: "",
  Introduction: {
    Title: "",
    Website: "",
    LinkedIn: "",
    Github: "",
    About: "",
  },
  Experience: [
    {
      Title: "",
      Company: "",
      StartDate: "",
      EndDate: "",
      Description: "",
      Location: "",
    },
  ],
  Education: [
    {
      School: "",
      Degree: "",
      FieldOfStudy: "",
      Description: "",
      GraduationDate: "",
      Grade: "",
    },
  ],
  Projects: [
    {
      Title: "",
      Date: "",
      Description: "",
      Link: "",
    },
  ],
  Skills: [
    { Name: "" },
  ],
  OptionalSection: {
    Certifications: [
      {
        Name: "",
        Date: "",
        Details: "",
      },
    ],
    Licenses: [
      {
        Name: "",
        Date: "",
        Details: "",
      },
    ],
    Publications: [
      {
        Name: "",
        Date: "",
        Details: "",
      },
    ],
    Presentations: [
      {
        Name: "",
        Date: "",
        Details: "",
      },
    ],
    Patents: [
      {
        Name: "",
        Date: "",
        Details: "",
      },
    ],

    Awards: [
      {
        Name: "",
        Date: "",
        Details: "",
      },
    ],

    // Languages: [
    //   "",
    // ],
    // Hobbies: [""],
    // Interests: [""],
    // References: "",

  }
}
