'use client';
import CodeFusionHero from "./hero";
import EventRegistration from "./about";
// import HomePage from './components/HomePage';
import HackathonTimeline from "./eventtimeline";
import AcademicContactWithCoordinators from "./contact";
import Prize from "./prize";
export default function CodefusionPage() {
  return <>
    <CodeFusionHero/>
    <EventRegistration/>
    <Prize/>
    <HackathonTimeline/>
    <AcademicContactWithCoordinators/>
  </>
}
