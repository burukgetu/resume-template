import { ResumeSchema } from "./resumeData";
import { Document, Font, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

import path from 'path';
import React, { useEffect } from "react";
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to a path using `fileURLToPath`
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

let fontsDir = path.join(__dirname, './fonts'); // font folder here, naming the files accordingly
let phoneIcon = './images/phone.png'; // The source for the mail icon
let mailIcon = './images/mail.png'; // The source for the mail icon
let locationIcon = './images/location.png'; // The source for the mail icon

// Register the custom font
Font.register({
    family: 'kumbh',
    fonts: [
      {
        src: path.join(fontsDir, 'KumbhSans/KumbhSans-Regular.ttf'),
        fontWeight: 'normal',
      },
      {
        src: path.join(fontsDir, 'KumbhSans/KumbhSans-Medium.ttf'),
        fontWeight: 'bold',
      },
      {
        src: path.join(fontsDir, '/KumbhSans/KumbhSans-ExtraLight.ttf'),
        fontWeight: 'light',
      },
      {
        src: path.join(fontsDir, 'KumbhSans/KumbhSans-ExtraBold.ttf'),
        fontWeight: 'ultrabold',
      },
    ]
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      fontFamily: 'kumbh',
      margin: 1,
    },
    headerSection: {
      display: "flex",
      flexDirection: "row",
      paddingVertical: "27",
    },
    personalInfo: {
      backgroundColor: "#333332",
      height: "95",
      width: "340",
      display: "flex",
      justifyContent: "center",
      gap: 5,
      alignItems: "flex-start",
      paddingLeft: 80
    },
    role: {
      fontSize: 9,
      letterSpacing: 1,
      color: "white"
    },
    name: {
      fontSize: 20,
      fontFamily: "kumbh",
      fontWeight: 'ultrabold',
      letterSpacing: 1.1,
      color: 'white',
    },
    icons: {
      border: "1.5",
      width: 22,
      borderRadius: "50%",
      padding: 3.5
    },
    iconText: {
      fontSize: 9
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      paddingLeft: 18,
      paddingTop: 5
    },
    iconContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 13,
      alignItems: "center"
    },
    border: {
      width: "83%",
      borderBottomWidth: 2,
      borderBottomColor: '#333332',
      alignSelf: 'center',
    },
    section: {
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 80,
      paddingTop: 13,
      paddingBottom: 9,
      justifyContent: 'flex-start',
      gap: 53,
      width: 620
    },
    sectionItem: {
      display: 'flex',
      gap: 1,
    },
    sectionItems: {
      display: 'flex',
      gap: 10
    },
    text: {
      color: "#333332",
      fontSize: 9,
      fontWeight: 400,
      marginBottom: 3,
      lineHeight: 1.4,
      width: 280,
    },
    degree: {
      fontSize: 10,
      marginBottom: 3,
      lineHeight: 1,
      textAlign: 'justify',
      width: 85,
      fontWeight: "ultrabold",
      wordBreak: 'break-word',
    },
    educationItem: {
      display: "flex",
      flexDirection: "row",
      gap: 5
    },
    companyName: {
      fontFamily: "kumbh",
      fontSize: 10,
      fontWeight: 'ultrabold',
    },
    companyPosition: {
      color: "#333332",
      fontSize: 9,
      fontWeight: 400,
      marginBottom: 7
    },
    experienceHeader: {
      display: "flex",
      gap: 2
    },
    school: {
      fontSize: 8,
      fontWeight: 400,
      width: 70
    },
    title: {
      fontSize: 15,
      fontWeight: 'ultrabold',
      width: 100,
      letterSpacing: 1,
      fontFamily: "kumbh",
    },
    description: {
      width: 200,
      fontSize: 9,
      paddingTop: 3,
      lineHeight: 1.3
    },
    link: {
      color: 'black',
      textDecoration: 'underline',
      fontSize: 10,
      marginHorizontal: 3,
    },
    footer: {
      display: 'flex',
      flexDirection: "row",
      gap: 65,
      paddingHorizontal: 80,
      paddingVertical: 11,
    },
    footerText: {
      fontSize: 8,
      marginBottom: 3,
      lineHeight: 1.2,
      letterSpacing: 0.1
    },
    reference: {
      marginLeft: -38
    },
    languages: {
      paddingTop: 15,
      display: "flex",
      width: 100,
      gap: 5
    },
    languageItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    progressBarBackground: {
      height: 3,
      backgroundColor: '#9e9e9d',
      borderRadius: 5,
      width: '55',
    },
    progressBarFilling: {
      height: '100%',
      backgroundColor: 'black',
    },
    expertices: {
      paddingTop: 13,
      paddingLeft: 5,
      display: "flex",
      width: 130,
    },
    expertiseItem: {
      display: "flex",
      flexDirection: "row",
      marginTop: -10,
      paddingTop: 5,
      minHeight: 10,
    },
    dot: {
      display: 'flex',
      height: 25,
      width: 18
    },
    expertiseText: {
      fontSize: 8,
      lineHeight: 1,
      letterSpacing: 0.1,
      width: 100,
      transform: "translateY(7px)"
    },
    refText: {
      fontSize: 9
    }
  });

  // Function to parse array type datas
  const renderSection = (title, items, renderItem) => (
    items && Array.isArray(items) && items.length > 0 && (
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.sectionItems}>
          {items.map((item, index) => renderItem(item, index))}
        </View>
      </View>
    )
  );

  export const Template = ({ data, fontColor }) => {
    if (!data) {
      throw Error("No data provided to the resume template");
    }
    useEffect(() => {
      if (fontColor) {
        styles.name.color = `#${fontColor}`;
      }
    }, [fontColor])

    // The resume template document design
    return (<Document>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.headerSection}>
              <View style={styles.personalInfo}>          
                <Text style={styles.name}>{`${(data.PersonalInfo?.Name)?.toLocaleUpperCase()}`}</Text>
                <Text style={styles.role}>{`${(data.Introduction?.Title)?.toLocaleUpperCase()}`}</Text>
              </View>
              <View style={styles.contactInfo}> 
                {data.PersonalInfo?.Phone && (
                  <View style={styles.iconContainer}>         
                    <Image src={phoneIcon} style={styles.icons} />
                    <Text style={styles.iconText}>{`${data.PersonalInfo?.Phone}`}</Text>
                  </View>
                )}
                {data.PersonalInfo?.Email && (
                  <View style={styles.iconContainer}>         
                    <Image src={mailIcon} style={styles.icons} />
                    <Text style={styles.iconText}>{`${data.PersonalInfo?.Email}`}</Text>
                  </View>
                )}
                {data.PersonalInfo?.Address && (
                  <View style={styles.iconContainer}>         
                    <Image src={locationIcon} style={{ ...styles.icons, padding: 0 }} />
                    <Text style={styles.iconText}>{`${data.PersonalInfo?.Address}`}</Text>
                  </View>
                )}
              </View>
          </View>
  
          {/* Border */}
          <View style={styles.border}></View>
  
          {/* About me section */}
          {data.Introduction?.About && (
            <View style={styles.section}>
              <Text style={styles.title}>About Me</Text>
              <Text style={styles.text}>{data.Introduction.About}</Text>
            </View>
          )}
  
          {/* Border */}
          <View style={styles.border}></View>
  
          {/* Experience Section */}
          {renderSection("Experience", data.Experience, (exp, index) => (
            <View key={index} style={styles.sectionItem}>
                <Text style={styles.companyName}>{exp.Company}  {exp.StartDate} - {exp.EndDate}</Text>
                <Text style={styles.companyPosition}>{exp.Title}</Text>
                <Text style={styles.text}>{exp.Description}</Text>
            </View>
          ))}
  
          {/* Border */}
          <View style={styles.border}></View>
  
          {/* Education Section */}
          {renderSection("Education", data.Education, (edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.companyName}>{edu.GraduationDate}</Text>
                <Text style={styles.school}>{edu.School}</Text>
              
                <Text style={styles.degree}>{edu.Degree} in {edu.FieldOfStudy}</Text>
              </View>
              <View>
                <Text style={styles.description}>{edu.Description}</Text>
              </View>
            </View>
          ))}
  
          {/* Border */}
          <View style={styles.border}></View>
  
          <View style={styles.footer}>
              {data.OptionalStringSection?.Languages && (
                <View>
                    <Text style={styles.title}>Language</Text>
                    <View style={styles.languages}>
                      {data.OptionalStringSection?.Languages.map((lang, index) => (
                        <View style={styles.languageItem}>
                          <Text key={index} style={styles.footerText}>{lang}</Text>
                          <View style={styles.progressBarBackground}>
                            <View style={{ ...styles.progressBarFilling, width: "70%" }} />
                          </View>
                        </View>
                      ))}
                    </View>
                </View>
              )}
              {data.OptionalStringSection?.Interests && (
                <View>
                    <Text style={styles.title}>Expertise</Text>
                    <View style={styles.expertices}>
                      {data.OptionalStringSection?.Interests.map((interests, index) => (
                        <View style={styles.expertiseItem}>
                          <Text style={styles.dot}>•</Text>
                          <Text key={index} style={styles.expertiseText}>{interests}</Text>
                        </View>
                      ))}
                    </View>
                </View>
              )}
              {data.OptionalStringSection?.References && (
                <View style={styles.reference}>
                    <Text style={styles.title}>Reference</Text>
                    <View style={styles.languages}>
                      {data.OptionalStringSection?.References.map((refs, index) => (
                        <Text key={index} style={styles.refText}>{refs}</Text>
                      ))}
                    </View>
                </View>
              )}
          </View>
        </Page>
      </Document>)
    }