import React from 'react';
import { Box } from "@mui/material";
import Header from '../../components/Admin/Topbar';
import FaqAccordion from '../../components/Admin/Accordion';

export default function FAQ() {
    return (
        <Box m="20px" height = '100vh'>
            <Header title='FAQ' subtitle='Frequently Asked Questions' />
            <FaqAccordion question = 'What is the purpose of this website?' answer = 'This website is a part of the project for the course CSN-254: Software Engineering Lab. The purpose of this website is to provide a platform for the users to report traffic violations and for the traffic police to view and take action on the reported violations.'/>
            <FaqAccordion question = 'How can I report a traffic violation?' answer = 'You can report a traffic violation by clicking on the "Report Violation" button on the top right corner of the navigation bar. You will be redirected to a page where you can fill in the details of the violation and submit it.'/>
            <FaqAccordion question = 'How can I view the reported violations?' answer = 'You can view the reported violations by clicking on the "View Violations" button on the top right corner of the navigation bar. You will be redirected to a page where you can view the reported violations.'/>
            <FaqAccordion question = 'How can I view the reported violations?' answer = 'You can view the reported violations by clicking on the "View Violations" button on the top right corner of the navigation bar. You will be redirected to a page where you can view the reported violations.'/>
            <FaqAccordion question = 'How can I view the reported violations?' answer = 'You can view the reported violations by clicking on the "View Violations" button on the top right corner of the navigation bar. You will be redirected to a page where you can view the reported violations.'/>
            <FaqAccordion question = 'How can I view the reported violations?' answer = 'You can view the reported violations by clicking on the "View Violations" button on the top right corner of the navigation bar. You will be redirected to a page where you can view the reported violations.'/>
        </Box>
    );
}
