import { ResumeSchema } from "./resumeData";
import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import path from 'path';
import { env } from "process";
import React, { useEffect } from "react";
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to a path using `fileURLToPath`
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

let fontsDir = path.join(__dirname, './fonts'); // font folder here, naming the files accordingly

// Register custom fonts with absolute paths
Font.register({
  family: 'EBGaramond',
  fonts: [
    {
      src: path.join(fontsDir, 'EBGaramond/EBGaramond-Regular.ttf'),
      fontWeight: 'normal',
    },
    {
      src: path.join(fontsDir, 'EBGaramond/EBGaramond-Regular.ttf'),
      fontWeight: 'bold',
    },
    {
      src: path.join(fontsDir, 'EBGaramond/EBGaramond-Regular.ttf'),
      fontWeight: 'semibold',
    },
    {
      src: path.join(fontsDir, 'EBGaramond/EBGaramond-Regular.ttf'),
      fontWeight: 'extrabold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'EBGaramond',
    padding: 30,
    margin: 1,
  },
  headerSection: {
    paddingBottom: 4,
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: 'extrabold',
    color: '#1c1b1f',
  },
  contactInfo: {
    fontSize: 11,
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  section: {
    marginBottom: 1,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'semibold',
    marginBottom: 2,
    marginTop: 4,
    textTransform: 'uppercase',
    paddingBottom: 2,
    color: '#333333',
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.2,
  },
  bulletPoint: {
    marginBottom: 3,
    fontSize: 10,
    textAlign: 'justify',
    lineHeight: 1.3,
  },
  experienceHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
    fontWeight: 'semibold',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'semibold',
  },
  title: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: 'normal'
  },
  boldRightText: {
    fontSize: 9,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  normalRightText: {
    fontSize: 9,
    textAlign: 'right',
    fontWeight: 'normal'
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pipe: {
    marginHorizontal: 3,
  },
  link: {
    color: 'black',
    textDecoration: 'underline',
    fontSize: 10,
    marginHorizontal: 3,
  },
});

const renderSection = (title, items, renderItem) => (
  items && Array.isArray(items) && items.length > 0 && (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{title}</Text>
      {items.map((item, index) => renderItem(item, index))}
    </View>
  )
);

// Function to clean up URLs
const cleanUrl = (url) => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/www\./, '');
};

export const Template = ({ data, fontColor }) => {
  if (!data) {
    throw Error("No data provided to the resume template");
  }
  useEffect(() => {
    if (fontColor) {
      styles.name.color = `#${fontColor}`;
      styles.sectionHeader.color = `#${fontColor}`;
    }
  }, [fontColor])

  return (<Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.name}>{`${data.PersonalInfo?.Name}`}</Text>

        <View style={styles.contactInfo}>
          <Text>{data.PersonalInfo?.Email}</Text>

          {data.PersonalInfo?.Phone && (
            <>
              <Text style={styles.pipe}>|</Text>
              <Text>{data.PersonalInfo.Phone}</Text>
            </>
          )}
          {data.PersonalInfo?.Address && (
            <>
              <Text style={styles.pipe}>|</Text>
              <Text>{data.PersonalInfo.Address}</Text>
            </>
          )}
          {data.Introduction?.Website && (
            <>
              <Text style={styles.pipe}>|</Text>
              <Link style={styles.link} src={data.Introduction.Website}>{cleanUrl(data.Introduction.Website)}</Link>
            </>
          )}
          {data.Introduction?.LinkedIn && (
            <>
              <Text style={styles.pipe}>|</Text>
              <Link style={styles.link} src={data.Introduction.LinkedIn}>{cleanUrl(data.Introduction.LinkedIn)}</Link>
            </>
          )}
          {data.Introduction?.Github && (
            <>
              <Text style={styles.pipe}>|</Text>
              <Link style={styles.link} src={data.Introduction.Github}>{cleanUrl(data.Introduction.Github)}</Link>
            </>
          )}
        </View>

      </View>

      {data.Objective && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Objective</Text>
          <Text style={{ fontSize: 11, marginBottom: 4 }}>{data.Objective}</Text>
        </View>
      )}

      {/* Experience Section */}
      {renderSection("Experience", data.Experience, (exp, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.experienceHeader}>
            <Text style={styles.companyName}>{exp.Company}</Text>
            <Text style={styles.boldRightText}>{exp.StartDate} - {exp.EndDate}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.title}>{exp.Title}</Text>
            <Text style={styles.normalRightText}>{exp.Location}</Text>
          </View>
          {exp.Description.split('\n').map((desc, idx) => (
            <Text key={idx} style={styles.bulletPoint}>•   {desc}</Text>
          ))}
        </View>
      ))}

      {/* Education Section */}
      {renderSection("Education", data.Education, (edu, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.experienceHeader}>
            <Text style={styles.companyName}>{edu.School}</Text>
            <Text style={styles.boldRightText}>{edu.GraduationDate}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.title}>{edu.Degree} in {edu.FieldOfStudy}</Text>
            <Text style={styles.normalRightText}>{edu.Location}</Text>
          </View>
          {edu.Description.split('\n').map((desc, idx) => (
            <Text key={idx} style={styles.bulletPoint}>•   {desc}</Text>
          ))}
        </View>
      ))}

      {renderSection("Projects", data.Projects || [], (project, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.experienceHeader}>
            <Text style={styles.companyName}>{project.Title}</Text>
            <Text style={styles.boldRightText}>{project.Date}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.text}>{project.Description}</Text>
          </View>
          {project.Link && (
            <Text style={styles.text}>Link: <Link style={styles.link} src={project.Link}>{cleanUrl(project.Link)}</Link></Text>
          )}
        </View>
      ))}

      {/* Skills Section */}
      {renderSection("Skills", Object.entries(data.Skills), ([category, skills], index) => (
        <View key={index} style={styles.section}>
          {category.toLowerCase() != "uncategorized" && <Text style={styles.experienceHeader}>{category}</Text>}
          {skills.map((skill, idx) => (
            <Text key={idx} style={styles.bulletPoint}>•   {skill}</Text>
          ))}
        </View>
      ))}

      {/* Additional Sections */}
      {renderSection("Certifications", data.OptionalSection?.Certifications, (cert, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{cert.Name}</Text>
            <Text style={styles.boldRightText}>{cert.Date} </Text>
          </View>
          <Text style={styles.title}>{cert.Details}</Text>
        </View>
      ))}

      {renderSection("Licenses", data.OptionalSection?.Licenses, (license, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{license.Name}</Text>
            <Text style={styles.boldRightText}>{license.Date} </Text>
          </View>
          <Text style={styles.title}>{license.Details}</Text>
        </View>
      ))}

      {renderSection("Publications", data.OptionalSection?.Publications, (pub, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{pub.Name}</Text>
            <Text style={styles.boldRightText}>{pub.Date}</Text>
          </View>
          <Text style={styles.title}>{pub.Details}</Text>
        </View>
      ))}

      {renderSection("Presentations", data.OptionalSection?.Presentations, (pres, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{pres.Name}</Text>
            <Text style={styles.boldRightText}>{pres.Date}</Text>
          </View>
          <View style={styles.sectionContent}>
            <Text style={styles.title}>{pres.Details}</Text>
          </View>
        </View>
      ))}

      {renderSection("Patents", data.OptionalSection?.Patents, (patent, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{patent.Name}</Text>
            <Text style={styles.boldRightText}>{patent.Date}</Text>
          </View>
          <Text style={styles.text}>{patent.Details}</Text>
        </View>
      ))}

      {renderSection("Awards", data.OptionalSection?.Awards, (award, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{award.Name}</Text>
            <Text style={styles.boldRightText}>{award.Date}</Text>
          </View>
          <Text style={styles.title}>{award.Details}</Text>
        </View>
      ))}

      {renderSection("Honors", data.OptionalSection?.Honors, (honor, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{honor.Name}</Text>
            <Text style={styles.boldRightText}>{honor.Date}</Text>
          </View>
          <Text style={styles.title}>{honor.Details}</Text>
        </View>
      ))}

      {renderSection("Professional Affiliations", data.OptionalSection?.ProfessionalAffiliations, (affiliation, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{affiliation.Name}</Text>
            <Text style={styles.boldRightText}>{affiliation.Date}</Text>
          </View>
          <Text style={styles.title}>{affiliation.Details}</Text>
        </View>
      ))}

      {renderSection("Volunteer Experience", data.OptionalSection?.VolunteerExperience, (volunteer, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionContent}>
            <Text style={styles.companyName}>{volunteer.Name}</Text>
            <Text style={styles.boldRightText}>{volunteer.Date}</Text>
          </View>
          <Text style={styles.title}>{volunteer.Details}</Text>
        </View>
      ))}
    </Page>
  </Document>)
}