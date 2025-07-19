
// src/pages/PublicHome.js
import React from "react";
import Header from "../components/public/Header";
import AdSection from "../components/public/AdSection";
import NotificationSection from "../components/public/NotificationSection";
import LeakJodiSection from "../components/public/LeakJodiSection";
import InfoBoxSection from "../components/public/InfoBoxSection";
import SattaResultButton from "../components/public/SattaResultButton";
import MainResultSection from "../components/public/MainResultSection";
import GameResultSections from "../components/public/GameResultSections";
import MonthlyResultTable from "../components/public/MonthlyResultTable";
import Footer from "../components/public/Footer";
import BlogSection from "../components/public/BlogSection";
// 
import Section1 from "../components/public/Section1";
import Section2 from "../components/public/Section2";
import Section3 from "../components/public/Section3";
import Section4 from "../components/public/Section4";
import Section5 from "../components/public/Section5";
// import Section6 from "../components/public/Section6";
import Section7 from "../components/public/Section7";
import Section8 from "../components/public/Section8";


import SectionFooter from "../components/public/SectionFooter";


export default function PublicHome() {
  return (
    <div className="bg-yellow-200 min-h-screen">
      <Header />
      <AdSection />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* <Section6 /> */}
      <Section7 />
      <Section8 />
      {/* <NotificationSection /> */}
      {/* <LeakJodiSection /> */}
      {/* <InfoBoxSection /> */}
      {/* <SattaResultButton /> */}
      {/* <MainResultSection /> */}
      {/* <GameResultSections /> */}
      {/* <MonthlyResultTable /> */}
      <BlogSection />
      <SectionFooter /> 
      {/* <Footer /> */}
     
    </div>
  );
}
