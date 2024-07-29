import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/colors/purple.css';

const MultiDatepicker = () => {
   const [dates, setDates] = useState([]);

   return (
      <div style={styles.container}>
         <div style={styles.header}>
            <button style={styles.navButton}>&lt;</button>
            <span style={styles.headerText}>February 2019</span>
            <button style={styles.navButton}>&gt;</button>
         </div>
         <DatePicker
            multiple
            value={dates}
            onChange={setDates}
            format="DD/MM/YYYY"
            className="purple"
            render={<CustomCalendar />}
         />
         <div style={styles.selectedDates}>
            <h4>Выбранные даты:</h4>
            <ul>
               {dates.map((date, index) => (
                  <li key={index}>{date.format('DD/MM/YYYY')}</li>
               ))}
            </ul>
         </div>
      </div>
   );
};

const CustomCalendar = () => (
   <div style={styles.calendar}>
      <div style={styles.dayNames}>
         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} style={styles.dayName}>
               {day}
            </div>
         ))}
      </div>
      <div style={styles.days}>
         {[...Array(31)].map((_, index) => (
            <div key={index} style={styles.day}>
               {index + 1}
            </div>
         ))}
      </div>
   </div>
);

const styles = {
   container: {
      width: '300px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
   },
   header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
   },
   navButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
   },
   headerText: {
      fontSize: '16px',
      fontWeight: 'bold',
   },
   selectedDates: {
      marginTop: '20px',
   },
   calendar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   dayNames: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
   },
   dayName: {
      width: '40px',
      textAlign: 'center',
      fontWeight: 'bold',
   },
   days: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
   },
   day: {
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '2px',
      cursor: 'pointer',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
   },
};

export default MultiDatepicker;
